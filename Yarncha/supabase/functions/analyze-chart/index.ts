import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const chartSchema = {
  type: "object",
  additionalProperties: false,
  required: ["detected_rows", "detected_columns", "legend", "cells", "warnings", "confidence_label"],
  properties: {
    detected_rows: { anyOf: [{ type: "integer", minimum: 1 }, { type: "null" }] },
    detected_columns: { anyOf: [{ type: "integer", minimum: 1 }, { type: "null" }] },
    legend: { type: "object", additionalProperties: { type: "string" } },
    confidence_label: { type: "string", enum: ["low", "medium", "high"] },
    warnings: { type: "array", items: { type: "string" } },
    cells: {
      type: "array",
      maxItems: 10000,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["row_number", "column_number", "symbol", "meaning", "confidence"],
        properties: {
          row_number: { type: "integer", minimum: 1 },
          column_number: { type: "integer", minimum: 1 },
          symbol: { type: "string" },
          meaning: { type: "string" },
          confidence: { type: "number", minimum: 0, maximum: 1 }
        }
      }
    }
  }
};

function outputText(response: any) {
  if (typeof response.output_text === "string") return response.output_text;
  return (response.output || []).flatMap((item: any) => item.content || [])
    .map((item: any) => item.text || "").join("");
}

Deno.serve(async request => {
  let activeUploadId: string | null = null;
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) throw new Error("Authentication required.");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("Authentication required.");
    const { uploadId } = await request.json();
    activeUploadId = uploadId || null;
    if (!uploadId) throw new Error("uploadId is required.");

    const { data: upload, error: uploadError } = await supabase.from("chart_uploads")
      .select("*").eq("id", uploadId).single();
    if (uploadError || !upload) throw new Error("Chart upload was not found.");
    if (!String(upload.mime_type || "").startsWith("image/")) {
      throw new Error("AI chart analysis currently accepts chart images only. Review PDF pages manually or upload an exported page image.");
    }
    await supabase.from("chart_uploads").update({ status: "processing", error_message: null }).eq("id", upload.id);

    const { data: signed, error: signedError } = await supabase.storage.from("knitting-charts")
      .createSignedUrl(upload.storage_path, 600);
    if (signedError || !signed?.signedUrl) throw new Error("A private chart preview could not be created.");

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new Error("The server-side chart model is not configured.");
    const model = Deno.env.get("OPENAI_VISION_MODEL") || "gpt-5.4-mini";
    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: `Read this knitting or crochet chart as a cautious transcription assistant.
Identify the visible chart grid, row and column count, and legend. Return one record per visible cell.
Never guess. If a symbol or meaning is unclear, use the exact string "uncertain" and confidence below 0.5.
Use 1-based row and column numbers. Preserve chart-reading direction only as a warning; do not silently reverse rows.
The output is a draft for mandatory human review, not a final pattern.` },
            { type: "input_image", image_url: signed.signedUrl, detail: "high" }
          ]
        }],
        text: {
          format: {
            type: "json_schema",
            name: "yarncha_chart_transcription",
            strict: true,
            schema: chartSchema
          }
        }
      })
    });
    if (!aiResponse.ok) throw new Error(`Chart model request failed (${aiResponse.status}).`);
    const raw = await aiResponse.json();
    const parsed = JSON.parse(outputText(raw));
    const cells = (parsed.cells || []).map((cell: any) => ({
      upload_id: upload.id,
      row_number: cell.row_number,
      column_number: cell.column_number,
      symbol: String(cell.symbol || "uncertain").slice(0, 100),
      meaning: String(cell.meaning || "uncertain").slice(0, 500),
      confidence: Math.max(0, Math.min(1, Number(cell.confidence) || 0)),
      is_user_corrected: false
    }));
    if (cells.length) {
      const { error: cellsError } = await supabase.from("chart_cells")
        .upsert(cells, { onConflict: "upload_id,row_number,column_number" });
      if (cellsError) throw cellsError;
    }
    await supabase.from("chart_uploads").update({
      status: "completed",
      detected_rows: parsed.detected_rows,
      detected_columns: parsed.detected_columns,
      legend_json: parsed.legend || {},
      error_message: null
    }).eq("id", upload.id);
    await supabase.from("chart_analyses").insert({
      upload_id: upload.id,
      project_id: upload.project_id,
      user_id: userData.user.id,
      model_name: model,
      status: "completed",
      confidence_label: parsed.confidence_label || "low",
      warnings: parsed.warnings || [],
      raw_result: { ...parsed, cells: undefined }
    });
    return new Response(JSON.stringify({
      uploadId: upload.id,
      status: "completed",
      detectedRows: parsed.detected_rows,
      detectedColumns: parsed.detected_columns,
      cellCount: cells.length,
      confidence: parsed.confidence_label,
      warnings: parsed.warnings || []
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const message = String(error?.message || error || "Chart analysis failed.");
    try {
      const authorization = request.headers.get("Authorization") || "";
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authorization } } });
      if (activeUploadId) await supabase.from("chart_uploads").update({ status: "failed", error_message: message }).eq("id", activeUploadId);
    } catch { /* The original error is more useful. */ }
    return new Response(JSON.stringify({ error: message }), { status: /Authentication/.test(message) ? 401 : 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
