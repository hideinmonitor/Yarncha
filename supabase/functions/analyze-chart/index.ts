import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2.108.2";
import type { Database, Json } from "../database.types.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, idempotency-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

class HttpError extends Error {
  constructor(message: string, readonly status = 400, readonly code = "bad_request") {
    super(message);
  }
}

const chartSchema = {
  type: "object",
  additionalProperties: false,
  required: ["detected_rows", "detected_columns", "legend", "cells", "warnings", "confidence_label"],
  properties: {
    detected_rows: { anyOf: [{ type: "integer", minimum: 1, maximum: 1000 }, { type: "null" }] },
    detected_columns: { anyOf: [{ type: "integer", minimum: 1, maximum: 1000 }, { type: "null" }] },
    legend: { type: "object", maxProperties: 200, additionalProperties: { type: "string", maxLength: 500 } },
    confidence_label: { type: "string", enum: ["low", "medium", "high"] },
    warnings: { type: "array", maxItems: 100, items: { type: "string", maxLength: 500 } },
    cells: {
      type: "array",
      maxItems: 10000,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["row_number", "column_number", "symbol", "meaning", "confidence"],
        properties: {
          row_number: { type: "integer", minimum: 1, maximum: 1000 },
          column_number: { type: "integer", minimum: 1, maximum: 1000 },
          symbol: { type: "string", maxLength: 100 },
          meaning: { type: "string", maxLength: 500 },
          confidence: { type: "number", minimum: 0, maximum: 1 }
        }
      }
    }
  }
};

function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, ...extraHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

function envInteger(name: string, fallback: number, minimum: number, maximum: number) {
  const parsed = Number(Deno.env.get(name));
  return Number.isInteger(parsed) ? Math.max(minimum, Math.min(maximum, parsed)) : fallback;
}

function outputText(response: Record<string, any>) {
  if (typeof response.output_text === "string") return response.output_text;
  return (response.output || []).flatMap((item: any) => item.content || [])
    .map((item: any) => item.text || "").join("");
}

type ChartCell = { row_number: number; column_number: number; symbol: string; meaning: string; confidence: number };
type ChartResult = { detected_rows: number | null; detected_columns: number | null; legend: Record<string, string>; confidence_label: string; warnings: string[]; cells: ChartCell[] };
type Reservation = { status: "reserved" | "reused" | "in-progress" | "rate-limited" | "quota-exhausted" | "retry-exhausted"; ledgerId?: string; response?: Record<string, Json> };

function validateChartResult(value: any): ChartResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new HttpError("The chart model returned an invalid result.", 502, "invalid_model_output");
  const rows = value.detected_rows;
  const columns = value.detected_columns;
  if (rows !== null && (!Number.isInteger(rows) || rows < 1 || rows > 1000)) throw new HttpError("The chart row count was invalid.", 502, "invalid_model_output");
  if (columns !== null && (!Number.isInteger(columns) || columns < 1 || columns > 1000)) throw new HttpError("The chart column count was invalid.", 502, "invalid_model_output");
  if (!Array.isArray(value.cells) || value.cells.length > 10000) throw new HttpError("The chart cell result exceeded its safe limit.", 502, "invalid_model_output");
  if (!["low", "medium", "high"].includes(value.confidence_label)) throw new HttpError("The confidence result was invalid.", 502, "invalid_model_output");
  if (!Array.isArray(value.warnings) || value.warnings.length > 100) throw new HttpError("The warning result was invalid.", 502, "invalid_model_output");
  const coordinates = new Set<string>();
  const cells = value.cells.map((cell: any) => {
    const row = Number(cell?.row_number), column = Number(cell?.column_number), confidence = Number(cell?.confidence);
    if (!Number.isInteger(row) || row < 1 || row > 1000 || !Number.isInteger(column) || column < 1 || column > 1000) throw new HttpError("A chart cell coordinate was invalid.", 502, "invalid_model_output");
    if ((rows && row > rows) || (columns && column > columns)) throw new HttpError("A chart cell was outside the detected grid.", 502, "invalid_model_output");
    if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) throw new HttpError("A chart confidence value was invalid.", 502, "invalid_model_output");
    const coordinate = `${row}:${column}`;
    if (coordinates.has(coordinate)) throw new HttpError("The chart model returned duplicate cells.", 502, "invalid_model_output");
    coordinates.add(coordinate);
    return {
      row_number: row,
      column_number: column,
      symbol: String(cell?.symbol || "uncertain").slice(0, 100),
      meaning: String(cell?.meaning || "uncertain").slice(0, 500),
      confidence
    };
  });
  const legendEntries = Object.entries(value.legend || {});
  if (legendEntries.length > 200 || legendEntries.some(([key, meaning]) => key.length > 100 || typeof meaning !== "string" || meaning.length > 500)) throw new HttpError("The chart legend was invalid.", 502, "invalid_model_output");
  return {
    detected_rows: rows,
    detected_columns: columns,
    legend: Object.fromEntries(legendEntries) as Record<string, string>,
    confidence_label: value.confidence_label,
    warnings: value.warnings.map((warning: unknown) => String(warning).slice(0, 500)),
    cells
  };
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed.", code: "method_not_allowed" }, 405);

  let supabase: SupabaseClient<Database> | null = null;
  let activeUploadId: string | null = null;
  let activeLedgerId: string | null = null;
  let processingStarted = false;
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) throw new HttpError("Authentication required.", 401, "authentication_required");
    if (Number(request.headers.get("Content-Length") || 0) > 8192) throw new HttpError("Request body is too large.", 413, "request_too_large");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !anonKey) throw new HttpError("The analysis service is not configured.", 503, "service_unavailable");
    supabase = createClient<Database>(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false }
    });
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new HttpError("Authentication required.", 401, "authentication_required");

    let body: Record<string, unknown>;
    try { body = await request.json(); }
    catch { throw new HttpError("A valid JSON body is required."); }
    const uploadId = String(body.uploadId || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uploadId)) throw new HttpError("A valid uploadId is required.");
    activeUploadId = uploadId;
    const idempotencyKey = String(request.headers.get("Idempotency-Key") || body.idempotencyKey || `chart:${uploadId}`);
    if (!/^[A-Za-z0-9._:-]{8,160}$/.test(idempotencyKey)) throw new HttpError("The idempotency key is invalid.");

    const { data: upload, error: uploadError } = await supabase.from("chart_uploads")
      .select("id,project_id,user_id,storage_path,mime_type").eq("id", uploadId).eq("user_id", userData.user.id).single();
    if (uploadError || !upload) throw new HttpError("Chart upload was not found.", 404, "not_found");
    if (!String(upload.mime_type || "").startsWith("image/")) throw new HttpError("AI chart analysis accepts chart images only.", 415, "unsupported_media_type");

    const { data: reservationData, error: reservationError } = await supabase.rpc("reserve_chart_analysis", {
      p_upload_id: uploadId,
      p_idempotency_key: idempotencyKey,
      p_feature: "chart-analysis",
      p_short_limit: envInteger("AI_USER_REQUESTS_PER_MINUTE", 5, 1, 100),
      p_daily_limit: envInteger("AI_USER_REQUESTS_PER_DAY", 30, 1, 10000),
      p_global_daily_limit: envInteger("AI_GLOBAL_REQUESTS_PER_DAY", 1000, 1, 1000000),
      p_stale_after_seconds: envInteger("AI_STALE_REQUEST_SECONDS", 120, 30, 3600)
    });
    const reservation = reservationData as Reservation | null;
    if (reservationError) throw new HttpError("The analysis quota could not be reserved.", 503, "reservation_failed");
    if (reservation?.status === "reused") return jsonResponse({ ...reservation.response, idempotent: true });
    if (reservation?.status === "in-progress") throw new HttpError("This chart analysis is already running.", 409, "already_running");
    if (reservation?.status === "rate-limited") throw new HttpError("Too many chart analyses. Please wait before retrying.", 429, "rate_limited");
    if (reservation?.status === "quota-exhausted") throw new HttpError("The chart-analysis quota has been reached for today.", 429, "quota_exhausted");
    if (reservation?.status === "retry-exhausted") throw new HttpError("This analysis failed repeatedly. Upload the chart again before retrying.", 409, "retry_exhausted");
    if (reservation?.status !== "reserved" || !reservation.ledgerId) throw new HttpError("The analysis request was not reserved.", 503, "reservation_failed");
    activeLedgerId = reservation.ledgerId;

    const { error: processingError } = await supabase.from("chart_uploads").update({ status: "processing", error_message: null }).eq("id", upload.id).eq("user_id", userData.user.id);
    if (processingError) throw new HttpError("The chart could not be locked for analysis.", 409, "processing_lock_failed");
    processingStarted = true;

    const { data: signed, error: signedError } = await supabase.storage.from("knitting-charts").createSignedUrl(upload.storage_path, 300);
    if (signedError || !signed?.signedUrl) throw new HttpError("A private chart preview could not be created.", 500, "signed_url_failed");

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new HttpError("The server-side chart model is not configured.", 503, "model_unavailable");
    const model = Deno.env.get("OPENAI_VISION_MODEL") || "gpt-5.4-mini";
    const timeoutMs = envInteger("AI_REQUEST_TIMEOUT_MS", 45000, 5000, 120000);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let aiResponse: Response;
    try {
      aiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        signal: controller.signal,
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          input: [{ role: "user", content: [
            { type: "input_text", text: "Read this knitting or crochet chart as a cautious transcription assistant. Identify the visible grid and legend and return one record per visible cell. Never guess: use the exact string uncertain and confidence below 0.5 when unclear. Use 1-based coordinates. This is a draft for mandatory human review." },
            { type: "input_image", image_url: signed.signedUrl, detail: "high" }
          ] }],
          text: { format: { type: "json_schema", name: "yarncha_chart_transcription", strict: true, schema: chartSchema } }
        })
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") throw new HttpError("Chart analysis timed out safely.", 504, "timeout");
      throw error;
    } finally {
      clearTimeout(timeout);
    }
    if (!aiResponse.ok) throw new HttpError(`Chart model request failed (${aiResponse.status}).`, 502, "model_error");
    const responseText = await aiResponse.text();
    if (responseText.length > 5_000_000) throw new HttpError("The chart model response was too large.", 502, "invalid_model_output");
    const raw = JSON.parse(responseText);
    const parsed = validateChartResult(JSON.parse(outputText(raw)));
    const cells = parsed.cells.map(cell => ({ ...cell, upload_id: upload.id, is_user_corrected: false }));

    const { error: deleteCellsError } = await supabase.from("chart_cells").delete().eq("upload_id", upload.id);
    if (deleteCellsError) throw deleteCellsError;
    if (cells.length) {
      const { error: cellsError } = await supabase.from("chart_cells").insert(cells);
      if (cellsError) throw cellsError;
    }
    const { error: completeUploadError } = await supabase.from("chart_uploads").update({
      status: "completed",
      detected_rows: parsed.detected_rows,
      detected_columns: parsed.detected_columns,
      legend_json: parsed.legend,
      error_message: null
    }).eq("id", upload.id).eq("user_id", userData.user.id);
    if (completeUploadError) throw completeUploadError;
    const { cells: _cells, ...analysisSummary } = parsed;
    const { error: analysisError } = await supabase.from("chart_analyses").insert({
      upload_id: upload.id,
      project_id: upload.project_id,
      user_id: userData.user.id,
      model_name: model,
      status: "completed",
      confidence_label: parsed.confidence_label,
      warnings: parsed.warnings,
      raw_result: analysisSummary
    });
    if (analysisError) throw analysisError;

    const result = {
      uploadId: upload.id,
      status: "completed",
      detectedRows: parsed.detected_rows,
      detectedColumns: parsed.detected_columns,
      cellCount: cells.length,
      confidence: parsed.confidence_label,
      warnings: parsed.warnings
    };
    const inputTokens = Number(raw.usage?.input_tokens) || 0;
    const outputTokens = Number(raw.usage?.output_tokens) || 0;
    const inputPrice = Math.max(0, Number(Deno.env.get("AI_INPUT_USD_PER_MILLION_TOKENS")) || 0);
    const outputPrice = Math.max(0, Number(Deno.env.get("AI_OUTPUT_USD_PER_MILLION_TOKENS")) || 0);
    const { error: finalizeError } = await supabase.rpc("finalize_chart_analysis", {
      p_ledger_id: activeLedgerId,
      p_status: "completed",
      p_response: result,
      p_error_message: null,
      p_input_tokens: inputTokens,
      p_output_tokens: outputTokens,
      p_estimated_cost_usd: (inputTokens * inputPrice + outputTokens * outputPrice) / 1_000_000
    });
    if (finalizeError) throw finalizeError;
    return jsonResponse(result);
  } catch (error) {
    const failure = error instanceof HttpError ? error : new HttpError("Chart analysis failed safely.", 500, "analysis_failed");
    if (supabase && activeLedgerId) {
      try {
        await supabase.rpc("finalize_chart_analysis", {
          p_ledger_id: activeLedgerId,
          p_status: failure.code === "timeout" ? "timed-out" : "failed",
          p_response: null,
          p_error_message: failure.message,
          p_input_tokens: null,
          p_output_tokens: null,
          p_estimated_cost_usd: null
        });
      } catch { /* Preserve the primary failure response. */ }
    }
    if (supabase && activeUploadId && processingStarted) {
      try {
        await supabase.from("chart_uploads").update({ status: "failed", error_message: failure.message.slice(0, 1000) }).eq("id", activeUploadId);
      } catch { /* Preserve the primary failure response. */ }
    }
    return jsonResponse({ error: failure.message, code: failure.code }, failure.status, failure.status === 429 ? { "Retry-After": "60" } : {});
  }
});
