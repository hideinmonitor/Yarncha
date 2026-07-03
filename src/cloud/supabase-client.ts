import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

export type CraftType = "knitting" | "crochet";
export type ChartStatus = "uploaded" | "processing" | "completed" | "failed";

export interface CloudProject {
  id: string;
  user_id: string;
  local_id: string;
  title: string;
  description: string;
  language: string;
  craft_type: CraftType;
  project_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ChartUpload {
  id: string;
  project_id: string;
  user_id: string;
  image_url: string;
  storage_path: string;
  original_filename: string;
  mime_type: string | null;
  status: ChartStatus;
  detected_rows: number | null;
  detected_columns: number | null;
  legend_json: Record<string, unknown>;
  error_message: string | null;
  created_at: string;
}

export interface ChartCell {
  id?: string;
  upload_id: string;
  row_number: number;
  column_number: number;
  symbol: string;
  meaning: string;
  confidence: number | null;
  is_user_corrected: boolean;
}

export interface SyncRecord {
  id: string;
  user_id: string;
  record_type: string;
  local_id: string;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  device_id: string;
  sync_version: number;
  deleted: boolean;
  last_synced_at: string | null;
}

export interface SyncDevice {
  id: string;
  user_id: string;
  name: string;
  user_agent: string;
  last_active_at: string;
  created_at: string;
}

let clientPromise: Promise<SupabaseClient | null> | null = null;

async function readRuntimeConfig() {
  const buildConfig = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
    supabasePublishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ""
  };
  if (buildConfig.supabaseUrl && buildConfig.supabasePublishableKey) return buildConfig;
  try {
    const response = await fetch("/api/config", { cache: "no-store" });
    if (!response.ok) return buildConfig;
    return { ...buildConfig, ...(await response.json()) };
  } catch {
    return buildConfig;
  }
}

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!clientPromise) {
    clientPromise = readRuntimeConfig().then(config => {
      if (!config.supabaseUrl || !config.supabasePublishableKey) return null;
      return createClient(config.supabaseUrl, config.supabasePublishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    });
  }
  return clientPromise;
}

export async function requireUser(): Promise<{ client: SupabaseClient; user: User }> {
  const client = await getSupabase();
  if (!client) throw new Error("Cloud sync is not configured yet.");
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw new Error("Sign in before using cloud features.");
  return { client, user: data.user };
}

export async function signUpWithEmail(email: string, password: string) {
  const client = await getSupabase();
  if (!client) throw new Error("Cloud sync is not configured yet.");
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const client = await getSupabase();
  if (!client) throw new Error("Cloud sync is not configured yet.");
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithProvider(provider: "apple" | "google") {
  const client = await getSupabase();
  if (!client) throw new Error("Cloud sync is not configured yet.");
  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin }
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = await getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function currentUser() {
  const client = await getSupabase();
  if (!client) return null;
  const { data } = await client.auth.getUser();
  return data.user || null;
}

function craftType(value: unknown): CraftType {
  return /crochet/i.test(String(value || "")) ? "crochet" : "knitting";
}

function cloudSafeProject(project: Record<string, any>) {
  const copy = structuredClone(project);
  if (copy.chart?.data) copy.chart.data = null;
  copy.annotationHistory = [];
  copy.annotationRedo = [];
  return copy;
}

export async function upsertProject(project: Record<string, any>): Promise<CloudProject> {
  const { client, user } = await requireUser();
  const payload = {
    user_id: user.id,
    local_id: String(project.id),
    title: String(project.name || "Untitled project"),
    description: String(project.notes || ""),
    language: String(project.language || "en"),
    craft_type: craftType(project.type),
    project_data: cloudSafeProject(project)
  };
  const { data, error } = await client.from("knitting_projects")
    .upsert(payload, { onConflict: "user_id,local_id" }).select().single();
  if (error) throw error;
  return data as CloudProject;
}

export async function listProjects(): Promise<CloudProject[]> {
  const { client } = await requireUser();
  const { data, error } = await client.from("knitting_projects").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return (data || []) as CloudProject[];
}

export async function deleteProjectByLocalId(localId: string) {
  const { client, user } = await requireUser();
  const { data: project } = await client.from("knitting_projects").select("id").eq("user_id", user.id).eq("local_id", localId).maybeSingle();
  if (project?.id) {
    for (const kind of ["chart", "cover"]) {
      const folder = `${user.id}/${project.id}/${kind}`;
      const { data: objects } = await client.storage.from("knitting-charts").list(folder, { limit: 1000 });
      if (objects?.length) await client.storage.from("knitting-charts").remove(objects.map(item => `${folder}/${item.name}`));
    }
  }
  const { error } = await client.from("knitting_projects").delete().eq("user_id", user.id).eq("local_id", localId);
  if (error) throw error;
}

export async function upsertToolResults(project: Record<string, any>, projectId: string) {
  const history = Array.isArray(project.toolHistory) ? project.toolHistory : [];
  if (!history.length) return;
  const { client, user } = await requireUser();
  const rows = history.map((item: Record<string, any>) => ({
    project_id: projectId,
    user_id: user.id,
    local_id: String(item.id),
    tool_name: String(item.toolName || "Tool result"),
    craft_type: String(item.craftType || "shared").toLowerCase(),
    inputs: item.inputs || {},
    outputs: item.outputs || {},
    notes: String(item.notes || "")
  }));
  const { error } = await client.from("tool_results").upsert(rows, { onConflict: "user_id,local_id" });
  if (error) throw error;
}

export async function saveUserSettings(settings: Record<string, unknown>) {
  const { client, user } = await requireUser();
  const { error } = await client.from("user_settings").upsert({ user_id: user.id, settings });
  if (error) throw error;
}

export async function loadUserSettings() {
  const { client, user } = await requireUser();
  const { data, error } = await client.from("user_settings").select("settings").eq("user_id", user.id).maybeSingle();
  if (error) throw error;
  return data?.settings || null;
}

export async function upsertSyncRecords(records: Array<Omit<SyncRecord, "user_id" | "last_synced_at"> & { user_id?: string; last_synced_at?: string | null }>) {
  if (!records.length) return [];
  const { client, user } = await requireUser();
  const now = new Date().toISOString();
  const rows = records.map(record => ({
    ...record,
    user_id: user.id,
    last_synced_at: now
  }));
  const { data, error } = await client.from("yarncha_sync_records")
    .upsert(rows, { onConflict: "user_id,id" }).select("*");
  if (error) throw error;
  return (data || []) as SyncRecord[];
}

export async function listSyncRecords(since?: string | null): Promise<SyncRecord[]> {
  const { client, user } = await requireUser();
  let query = client.from("yarncha_sync_records").select("*").eq("user_id", user.id).order("updated_at", { ascending: true });
  if (since) query = query.gt("updated_at", since);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as SyncRecord[];
}

export async function registerSyncDevice(device: { id: string; name: string; user_agent?: string }) {
  const { client, user } = await requireUser();
  const { data, error } = await client.from("yarncha_sync_devices").upsert({
    id: device.id,
    user_id: user.id,
    name: device.name,
    user_agent: device.user_agent || navigator.userAgent || "",
    last_active_at: new Date().toISOString()
  }, { onConflict: "user_id,id" }).select("*").single();
  if (error) throw error;
  return data as SyncDevice;
}

export async function listSyncDevices(): Promise<SyncDevice[]> {
  const { client, user } = await requireUser();
  const { data, error } = await client.from("yarncha_sync_devices").select("*").eq("user_id", user.id).order("last_active_at", { ascending: false });
  if (error) throw error;
  return (data || []) as SyncDevice[];
}

export async function renameSyncDevice(deviceId: string, name: string) {
  const { client, user } = await requireUser();
  const { error } = await client.from("yarncha_sync_devices").update({ name, last_active_at: new Date().toISOString() }).eq("user_id", user.id).eq("id", deviceId);
  if (error) throw error;
}

export async function removeSyncDevice(deviceId: string) {
  const { client, user } = await requireUser();
  const { error } = await client.from("yarncha_sync_devices").delete().eq("user_id", user.id).eq("id", deviceId);
  if (error) throw error;
}

export async function saveProjectVersion(project: Record<string, any>, deviceId: string) {
  if (!project?.id) return null;
  const { client, user } = await requireUser();
  const { data, error } = await client.from("yarncha_project_versions").insert({
    user_id: user.id,
    project_local_id: String(project.id),
    device_id: deviceId,
    project_data: cloudSafeProject(project),
    label: String(project.name || "Project version")
  }).select("*").single();
  if (error) throw error;
  return data;
}

export async function subscribeToSyncRecords(onPayload: (payload: unknown) => void) {
  const { client, user } = await requireUser();
  const channel = client.channel(`yarncha-sync-${user.id}`).on(
    "postgres_changes",
    { event: "*", schema: "public", table: "yarncha_sync_records", filter: `user_id=eq.${user.id}` },
    onPayload
  );
  const status = await channel.subscribe();
  return { channel, status, unsubscribe: () => client.removeChannel(channel) };
}

function safeFilename(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")}` : "";
  return `${crypto.randomUUID()}${extension}`;
}

export async function uploadProjectAsset(
  project: Record<string, any>,
  file: File,
  kind: "chart" | "cover",
  localAssetId: string
) {
  const { client, user } = await requireUser();
  const cloudProject = await upsertProject(project);
  const path = `${user.id}/${cloudProject.id}/${kind}/${safeFilename(file.name)}`;
  const { error: uploadError } = await client.storage.from("knitting-charts").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });
  if (uploadError) throw uploadError;

  let chartUpload: ChartUpload | null = null;
  if (kind === "chart") {
    const { data, error } = await client.from("chart_uploads").insert({
      project_id: cloudProject.id,
      user_id: user.id,
      image_url: path,
      storage_path: path,
      original_filename: file.name,
      mime_type: file.type || null,
      status: "uploaded"
    }).select().single();
    if (error) throw error;
    chartUpload = data as ChartUpload;
  }

  return { cloudProject, path, chartUpload, localAssetId, kind };
}

export async function downloadAsset(path: string): Promise<Blob> {
  const { client } = await requireUser();
  const { data, error } = await client.storage.from("knitting-charts").download(path);
  if (error) throw error;
  return data;
}

export async function listChartUploads(projectId: string): Promise<ChartUpload[]> {
  const { client } = await requireUser();
  const { data, error } = await client.from("chart_uploads").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as ChartUpload[];
}

export async function analyzeChart(uploadId: string) {
  const { client } = await requireUser();
  const { data, error } = await client.functions.invoke("analyze-chart", { body: { uploadId } });
  if (error) throw error;
  return data;
}

export async function listChartCells(uploadId: string): Promise<ChartCell[]> {
  const { client } = await requireUser();
  const { data, error } = await client.from("chart_cells").select("*").eq("upload_id", uploadId)
    .order("row_number").order("column_number");
  if (error) throw error;
  return (data || []) as ChartCell[];
}

export async function updateChartCell(cell: ChartCell) {
  const { client } = await requireUser();
  const { data, error } = await client.from("chart_cells").update({
    symbol: cell.symbol || "uncertain",
    meaning: cell.meaning || "uncertain",
    confidence: cell.confidence,
    is_user_corrected: true
  }).eq("id", cell.id).select().single();
  if (error) throw error;
  return data as ChartCell;
}

export async function saveGeneratedPattern(input: {
  projectId: string;
  uploadId: string;
  patternText: string;
  patternJson: Record<string, unknown>;
  difficultyLevel: string;
}) {
  const { client, user } = await requireUser();
  const { data, error } = await client.from("generated_patterns").insert({
    project_id: input.projectId,
    upload_id: input.uploadId,
    user_id: user.id,
    pattern_text: input.patternText,
    pattern_json: input.patternJson,
    difficulty_level: input.difficultyLevel
  }).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAccountAndData() {
  const { client } = await requireUser();
  const { data, error } = await client.functions.invoke("delete-account", { body: { confirmation: "DELETE" } });
  if (error) throw error;
  return data;
}
