import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) throw new Error("Authentication required.");
    const body = await request.json();
    if (body.confirmation !== "DELETE") throw new Error("Deletion confirmation is required.");
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authorization } } });
    const { data, error } = await userClient.auth.getUser();
    if (error || !data.user) throw new Error("Authentication required.");
    const admin = createClient(url, serviceRole);
    const prefix = data.user.id;
    const folders = ["cover", "chart"];
    const { data: projects } = await admin.from("knitting_projects").select("id").eq("user_id", data.user.id);
    for (const project of projects || []) {
      for (const folder of folders) {
        const path = `${prefix}/${project.id}/${folder}`;
        const { data: objects } = await admin.storage.from("knitting-charts").list(path, { limit: 1000 });
        if (objects?.length) await admin.storage.from("knitting-charts").remove(objects.map(item => `${path}/${item.name}`));
      }
    }
    const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
    if (deleteError) throw deleteError;
    return new Response(JSON.stringify({ deleted: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error?.message || error) }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

