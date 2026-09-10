import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2.108.2";
import type { Database } from "../database.types.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

async function removeEveryObject(admin: SupabaseClient<Database>, folder: string) {
  const batchSize = 1000;
  let batches = 0;
  while (true) {
    const { data: objects, error: listError } = await admin.storage.from("knitting-charts").list(folder, { limit: batchSize, offset: 0 });
    if (listError) throw listError;
    if (!objects?.length) return;
    const paths = objects.map(item => `${folder}/${item.name}`);
    const { data: removed, error: removeError } = await admin.storage.from("knitting-charts").remove(paths);
    if (removeError) throw removeError;
    if (!removed?.length) throw new Error(`Storage deletion made no progress in ${folder}.`);
    batches += 1;
    if (batches > 10000) throw new Error(`Storage deletion exceeded its safety bound in ${folder}.`);
  }
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) return jsonResponse({ error: "Authentication required." }, 401);
    if (Number(request.headers.get("Content-Length") || 0) > 4096) return jsonResponse({ error: "Request body is too large." }, 413);
    const body = await request.json();
    if (body.confirmation !== "DELETE") return jsonResponse({ error: "Deletion confirmation is required." }, 400);
    const url = Deno.env.get("SUPABASE_URL");
    const anon = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anon || !serviceRole) return jsonResponse({ error: "Account deletion is not configured." }, 503);
    const userClient = createClient<Database>(url, anon, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await userClient.auth.getUser();
    if (error || !data.user) return jsonResponse({ error: "Authentication required." }, 401);
    const admin = createClient<Database>(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: projects, error: projectError } = await admin.from("knitting_projects").select("id").eq("user_id", data.user.id);
    if (projectError) throw projectError;
    for (const project of projects || []) {
      for (const folder of ["cover", "chart"]) await removeEveryObject(admin, `${data.user.id}/${project.id}/${folder}`);
    }
    const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
    if (deleteError) throw deleteError;
    return jsonResponse({ deleted: true });
  } catch (error) {
    console.error("Account deletion failed", error);
    return jsonResponse({ error: "Account deletion could not be completed. No success was reported." }, 500);
  }
});
