import {
  getSupabase,
  currentUser,
  signUpWithEmail,
  signInWithEmail,
  signInWithProvider,
  signOut,
  upsertProject,
  listProjects,
  deleteProjectByLocalId,
  upsertToolResults,
  saveUserSettings,
  loadUserSettings,
  uploadProjectAsset,
  downloadAsset,
  listChartUploads,
  analyzeChart,
  listChartCells,
  updateChartCell,
  saveGeneratedPattern,
  upsertSyncRecords,
  listSyncRecords,
  registerSyncDevice,
  listSyncDevices,
  renameSyncDevice,
  removeSyncDevice,
  saveProjectVersion,
  subscribeToSyncRecords,
  deleteAccountAndData
} from "./supabase-client.ts";

const QUEUE_KEY = "yarncha.cloud.pendingRecords.v1";
const META_KEY = "yarncha.cloud.meta.v1";
const HISTORY_KEY = "yarncha.cloud.history.v1";
const CONFLICT_KEY = "yarncha.cloud.conflicts.v1";
const DEVICE_KEY = "yarncha.cloud.device.v1";
const SYNC_VERSION = 1;

const cloud = {
  configured: false,
  user: null,
  syncing: false,
  lastError: "",
  syncTimer: null,
  activeUploadId: null,
  activeCells: [],
  realtime: null,
  pendingDownloads: 0
};

function local() {
  if (!window.YarnchaLocal) throw new Error("Yarncha local storage is still starting.");
  return window.YarnchaLocal;
}

function friendlyError(error) {
  const message = String(error?.message || error || "Something went wrong.");
  if (/invalid login/i.test(message)) return "Email or password is incorrect.";
  if (/email not confirmed/i.test(message)) return "Check your email and confirm your Yarncha account first.";
  if (/not configured/i.test(message)) return "Cloud sync is not configured on this deployment yet.";
  if (/network|fetch/i.test(message)) return "Yarncha could not reach cloud storage. Your local copy is still safe.";
  return message;
}

function setCloudStatus(text, tone = "") {
  const status = document.getElementById("save-status");
  if (status && cloud.user) status.textContent = text;
  const cloudStatus = document.getElementById("cloud-sync-status");
  if (cloudStatus) {
    cloudStatus.textContent = text;
    cloudStatus.dataset.tone = tone;
  }
}

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function deviceProfile() {
  const existing = readJson(DEVICE_KEY, null);
  if (existing?.id) return existing;
  const platform = navigator.platform || "browser";
  const profile = {
    id: `device-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`,
    name: `Yarncha on ${platform}`,
    createdAt: new Date().toISOString()
  };
  writeJson(DEVICE_KEY, profile);
  return profile;
}

function syncMeta() {
  return {
    lastSyncAt: null,
    lastPullAt: null,
    lastPushAt: null,
    health: "Waiting to sync",
    ...readJson(META_KEY, {})
  };
}

function setSyncMeta(update = {}) {
  const next = { ...syncMeta(), ...update };
  writeJson(META_KEY, next);
  return next;
}

function addHistory(entry) {
  const history = readJson(HISTORY_KEY, []);
  history.unshift({ id: `sync-history-${Date.now()}`, at: new Date().toISOString(), ...entry });
  writeJson(HISTORY_KEY, history.slice(0, 80));
}

function pendingQueue() {
  return readJson(QUEUE_KEY, []);
}

function writeQueue(records) {
  writeJson(QUEUE_KEY, records);
}

function conflicts() {
  return readJson(CONFLICT_KEY, []);
}

function writeConflicts(items) {
  writeJson(CONFLICT_KEY, items);
}

function stableRecordId(type, localId) {
  return `${type}:${String(localId).replace(/\s+/g, "-")}`;
}

function cloudSafeValue(value) {
  const copy = structuredClone(value ?? null);
  if (copy?.projects) {
    copy.projects = copy.projects.map(project => cloudSafeProjectState(project));
  }
  return copy;
}

function cloudSafeProjectState(project = {}) {
  const copy = structuredClone(project);
  if (copy.chart?.data) copy.chart.data = null;
  copy.annotationHistory = [];
  copy.annotationRedo = [];
  return copy;
}

function recordUpdatedAt(payload = {}, fallback = new Date().toISOString()) {
  return payload.updatedAt || payload.updated_at || payload.lastSavedAt || payload.createdAt || fallback;
}

function makeRecord(type, localId, payload, fallbackUpdatedAt) {
  const device = deviceProfile();
  const updatedAt = recordUpdatedAt(payload, fallbackUpdatedAt);
  return {
    id: stableRecordId(type, localId),
    record_type: type,
    local_id: String(localId),
    payload: cloudSafeValue(payload),
    created_at: payload?.createdAt || updatedAt,
    updated_at: updatedAt,
    device_id: device.id,
    sync_version: SYNC_VERSION,
    deleted: false
  };
}

function buildSyncRecords(state = local().getState()) {
  const now = state.lastSavedAt || new Date().toISOString();
  const projects = (state.projects || []).map(project => makeRecord("project", project.id, project, now));
  const projectToolRecords = (state.projects || []).flatMap(project => (project.toolHistory || []).map(item => makeRecord("tool-result", `${project.id}:${item.id || item.toolName || Date.now()}`, { ...item, projectId: project.id }, now)));
  return [
    ...projects,
    ...projectToolRecords,
    makeRecord("settings", "app", {
      theme: state.theme,
      language: state.language,
      unitSystem: state.unitSystem,
      appPreferences: state.appPreferences,
      account: state.account,
      updatedAt: now
    }, now),
    makeRecord("yarn-stash", "inventory", { items: state.inventory || [], updatedAt: now }, now),
    makeRecord("buy-list", "cart", { items: state.cart || [], budgetSettings: state.budgetSettings, marketBudget: state.marketBudget, purchaseHistory: state.purchaseHistory || [], updatedAt: now }, now),
    makeRecord("library", "spaces", { librarySections: state.librarySections || [], yarnMaterials: state.yarnMaterials || [], techniqueKnowledge: state.techniqueKnowledge || [], updatedAt: now }, now),
    makeRecord("symbols", "learning", {
      symbolFavorites: state.symbolFavorites || [],
      userTechniqueReferences: state.userTechniqueReferences || {},
      userSymbolsOverride: state.userSymbolsOverride || {},
      symbolLearningLibrary: state.symbolLearningLibrary || [],
      updatedAt: now
    }, now),
    makeRecord("project-ideas", "ideas", { projectIdeas: state.projectIdeas || [], ideaFilters: state.ideaFilters || {}, updatedAt: now }, now)
  ];
}

function queueStateForCloud(reason = "local-save") {
  if (!cloud.user) return;
  const byId = new Map(pendingQueue().map(record => [record.id, record]));
  buildSyncRecords().forEach(record => byId.set(record.id, record));
  writeQueue([...byId.values()]);
  setSyncMeta({ health: navigator.onLine === false ? "Waiting to sync" : "Pending sync" });
  addHistory({ status: "queued", reason, count: byId.size });
}

function mergeById(localItems = [], cloudItems = []) {
  const map = new Map((localItems || []).map(item => [String(item.id || `${item.row}-${item.color}-${item.label}`), item]));
  for (const item of cloudItems || []) map.set(String(item.id || `${item.row}-${item.color}-${item.label}`), item);
  return [...map.values()];
}

function mergeNotes(localText = "", cloudText = "") {
  if (!localText) return cloudText || "";
  if (!cloudText || localText === cloudText) return localText;
  if (localText.includes(cloudText)) return localText;
  if (cloudText.includes(localText)) return cloudText;
  return `${localText}\n\n--- Cloud note ---\n${cloudText}`;
}

function mergeProject(localProject = {}, cloudProject = {}) {
  const localTime = Date.parse(recordUpdatedAt(localProject, 0)) || 0;
  const cloudTime = Date.parse(recordUpdatedAt(cloudProject, 0)) || 0;
  const base = cloudTime >= localTime ? { ...localProject, ...cloudProject } : { ...cloudProject, ...localProject };
  base.notes = mergeNotes(localProject.notes, cloudProject.notes);
  base.markers = mergeById(localProject.markers, cloudProject.markers).sort((a, b) => (Number(a.row) || 0) - (Number(b.row) || 0));
  base.buyList = mergeById(localProject.buyList, cloudProject.buyList);
  base.attachments = mergeById(localProject.attachments, cloudProject.attachments);
  base.subCounters = cloudTime >= localTime ? (cloudProject.subCounters || localProject.subCounters || []) : (localProject.subCounters || cloudProject.subCounters || []);
  base.rowReminders = mergeById(localProject.rowReminders, cloudProject.rowReminders);
  base.updatedAt = new Date(Math.max(localTime, cloudTime, Date.now())).toISOString();
  return base;
}

function applyRemoteRecords(records = []) {
  if (!records.length) return { changed: false, conflicts: [] };
  const api = local();
  const current = structuredClone(api.getState());
  const localMeta = syncMeta();
  const nextConflicts = conflicts();
  let changed = false;
  const projectMap = new Map((current.projects || []).map(project => [String(project.id), project]));

  for (const record of records) {
    if (record.device_id === deviceProfile().id) continue;
    if (record.deleted) continue;
    const payload = record.payload || {};
    if (record.record_type === "project") {
      const existing = projectMap.get(String(record.local_id));
      if (existing && Date.parse(record.updated_at) > Date.parse(localMeta.lastPullAt || 0) && Date.parse(existing.updatedAt || existing.lastSavedAt || 0) > Date.parse(localMeta.lastPullAt || 0)) {
        nextConflicts.unshift({
          id: `conflict-${record.id}-${Date.now()}`,
          recordId: record.id,
          projectName: payload.name || existing.name || "Project",
          localPayload: existing,
          cloudPayload: payload,
          localUpdatedAt: existing.updatedAt || current.lastSavedAt,
          cloudUpdatedAt: record.updated_at,
          status: "open"
        });
        projectMap.set(String(record.local_id), mergeProject(existing, payload));
      } else {
        projectMap.set(String(record.local_id), mergeProject(existing, payload));
      }
      changed = true;
    } else if (record.record_type === "settings") {
      Object.assign(current, {
        ...(payload.theme ? { theme: payload.theme } : {}),
        ...(payload.language ? { language: payload.language } : {}),
        ...(payload.unitSystem ? { unitSystem: payload.unitSystem } : {}),
        ...(payload.appPreferences ? { appPreferences: payload.appPreferences } : {})
      });
      changed = true;
    } else if (record.record_type === "yarn-stash") {
      current.inventory = mergeById(current.inventory, payload.items || []);
      changed = true;
    } else if (record.record_type === "buy-list") {
      current.cart = mergeById(current.cart, payload.items || []);
      if (payload.budgetSettings) current.budgetSettings = payload.budgetSettings;
      if (payload.purchaseHistory) current.purchaseHistory = mergeById(current.purchaseHistory, payload.purchaseHistory);
      changed = true;
    } else if (record.record_type === "library") {
      current.librarySections = api.mergeLibrarySections ? api.mergeLibrarySections(current.librarySections, payload.librarySections || []) : (payload.librarySections || current.librarySections);
      current.yarnMaterials = mergeById(current.yarnMaterials, payload.yarnMaterials || []);
      current.techniqueKnowledge = mergeById(current.techniqueKnowledge, payload.techniqueKnowledge || []);
      changed = true;
    } else if (record.record_type === "symbols") {
      current.symbolFavorites = [...new Set([...(current.symbolFavorites || []), ...(payload.symbolFavorites || [])])];
      current.userTechniqueReferences = { ...(current.userTechniqueReferences || {}), ...(payload.userTechniqueReferences || {}) };
      current.userSymbolsOverride = { ...(current.userSymbolsOverride || {}), ...(payload.userSymbolsOverride || {}) };
      current.symbolLearningLibrary = mergeById(current.symbolLearningLibrary, payload.symbolLearningLibrary || []);
      changed = true;
    } else if (record.record_type === "project-ideas") {
      current.projectIdeas = mergeById(current.projectIdeas, payload.projectIdeas || []);
      changed = true;
    }
  }

  current.projects = [...projectMap.values()];
  if (!current.projects.some(project => String(project.id) === String(current.activeProjectId))) current.activeProjectId = current.projects[0]?.id || null;
  writeConflicts(nextConflicts.slice(0, 30));
  if (changed) api.replaceState(current);
  return { changed, conflicts: nextConflicts };
}

async function runFullSync(reason = "manual") {
  if (!cloud.user) return openAccountModal();
  if (cloud.syncing) return;
  cloud.syncing = true;
  const started = new Date().toISOString();
  try {
    if (navigator.onLine === false) {
      setCloudStatus("Waiting to sync", "pending");
      setSyncMeta({ health: "Waiting to sync" });
      return;
    }
    setCloudStatus("Syncing Yarncha…");
    const device = deviceProfile();
    await registerSyncDevice({ ...device, user_agent: navigator.userAgent || "" });
    queueStateForCloud(reason);
    const queue = pendingQueue();
    if (queue.length) {
      await upsertSyncRecords(queue);
      for (const project of local().getState().projects || []) {
        if (project.updatedAt && Date.parse(project.updatedAt) >= Date.parse(started) - 60000) {
          await saveProjectVersion(project, device.id).catch(() => {});
        }
      }
      writeQueue([]);
    }
    const meta = syncMeta();
    const remote = await listSyncRecords(meta.lastPullAt);
    cloud.pendingDownloads = remote.filter(record => record.device_id !== device.id).length;
    const result = applyRemoteRecords(remote);
    const now = new Date().toISOString();
    setSyncMeta({ lastSyncAt: now, lastPullAt: now, lastPushAt: now, health: result.conflicts?.length ? "Needs review" : "Healthy" });
    addHistory({ status: "synced", reason, uploaded: queue.length, downloaded: remote.length, conflicts: result.conflicts?.length || 0 });
    setCloudStatus(result.conflicts?.length ? "Synced · review conflicts" : "✓ Synced to cloud", result.conflicts?.length ? "warning" : "success");
    local().rerenderSettings();
  } catch (error) {
    cloud.lastError = friendlyError(error);
    setSyncMeta({ health: navigator.onLine === false ? "Waiting to sync" : "Needs attention" });
    addHistory({ status: "failed", reason, message: cloud.lastError });
    setCloudStatus(navigator.onLine === false ? "Waiting to sync" : "Saved on this device · Cloud retry needed", "error");
  } finally {
    cloud.syncing = false;
  }
}

function scheduleFullSync(reason = "auto", delay = 1200) {
  if (!cloud.user) return;
  clearTimeout(cloud.syncTimer);
  cloud.syncTimer = setTimeout(() => runFullSync(reason), delay);
}

async function initialize() {
  const client = await getSupabase();
  cloud.configured = Boolean(client);
  if (!client) {
    window.dispatchEvent(new CustomEvent("yarncha:cloud-ready"));
    return;
  }
  cloud.user = await currentUser();
  client.auth.onAuthStateChange((_event, session) => {
    cloud.user = session?.user || null;
    if (cloud.user) {
      scheduleFullSync("sign-in", 400);
      startRealtimeSync().catch(() => {});
    }
    local().rerenderSettings();
  });
  if (cloud.user) {
    await restoreCloudSettings().catch(() => {});
    await restoreCloudProjects().catch(error => { cloud.lastError = friendlyError(error); });
    await runFullSync("launch").catch(() => {});
    await startRealtimeSync().catch(() => {});
  }
  window.dispatchEvent(new CustomEvent("yarncha:cloud-ready"));
  local().rerenderSettings();
  injectChartReader();
}

function openAccountModal() {
  const api = local();
  if (!cloud.configured) {
    api.openModal(`<p class="eyebrow">PRIVATE BETA</p><h2>Cloud setup is not connected</h2><p>This build is ready for Supabase, but the deployment still needs its public Supabase URL and publishable key.</p><div class="privacy-note">Your current projects remain saved locally. No secret service key should ever be placed in the browser.</div><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Close</button></div>`);
    return;
  }
  if (cloud.user) {
    api.openModal(`<p class="eyebrow">YARNCHA ACCOUNT</p><h2>${api.escapeHtml(cloud.user.email || "Signed in")}</h2><div class="sync-status"><strong id="cloud-sync-status">Cloud sync ready</strong><p>Local drafts stay on this device. Your owned cloud projects are protected by account-level database policies.</p></div><div class="modal-actions"><button class="secondary-button" id="cloud-migrate-now">Move my local projects to cloud</button><button class="secondary-button" id="cloud-refresh-now">Refresh from cloud</button><button class="secondary-button" id="cloud-sign-out">Sign out</button></div>`);
    document.getElementById("cloud-migrate-now").onclick = migrateLocalProjects;
    document.getElementById("cloud-refresh-now").onclick = async () => {
      await runBusy("Refreshing…", restoreCloudProjects, "Cloud projects restored");
      api.closeModal();
    };
    document.getElementById("cloud-sign-out").onclick = async () => {
      await signOut();
      cloud.user = null;
      api.closeModal();
      api.toast("Signed out. Local drafts remain on this device.");
    };
    return;
  }
  api.openModal(`<p class="eyebrow">PRIVATE BETA</p><h2>Sign in to Yarncha</h2><p class="muted-copy">Use Apple, Google, or email. Yarncha keeps saving on this device while cloud sync connects in the background.</p><div class="auth-buttons"><button class="auth-button apple" id="cloud-apple-sign-in">Continue with Apple</button><button class="auth-button" id="cloud-google-sign-in">Continue with Google</button></div><div class="form-grid"><div class="field full"><label>Email</label><input id="cloud-email" type="email" autocomplete="email" inputmode="email"></div><div class="field full"><label>Password</label><input id="cloud-password" type="password" autocomplete="current-password" minlength="8"></div></div><p class="form-error" id="cloud-auth-error" role="alert"></p><div class="modal-actions"><button class="secondary-button" id="cloud-sign-up">Create account</button><button class="primary-button" id="cloud-sign-in">Sign in</button></div><div class="privacy-note">Yarncha stores your account with Supabase Auth. Projects, counters, stash, charts, annotations, settings and tool history remain local-first and private to your account when synced.</div>`);
  const credentials = () => ({
    email: document.getElementById("cloud-email").value.trim(),
    password: document.getElementById("cloud-password").value
  });
  const submit = async mode => {
    const errorBox = document.getElementById("cloud-auth-error");
    const { email, password } = credentials();
    if (!email || password.length < 8) {
      errorBox.textContent = "Enter a valid email and a password of at least eight characters.";
      return;
    }
    try {
      errorBox.textContent = "Working…";
      const data = mode === "signup" ? await signUpWithEmail(email, password) : await signInWithEmail(email, password);
      cloud.user = data.user || null;
      if (mode === "signup" && !data.session) {
        errorBox.textContent = "Account created. Check your email to confirm it, then sign in.";
        return;
      }
      api.closeModal();
      api.toast("Signed in. Your local projects are ready to migrate.");
      api.rerenderSettings();
    } catch (error) {
      errorBox.textContent = friendlyError(error);
    }
  };
  document.getElementById("cloud-sign-up").onclick = () => submit("signup");
  document.getElementById("cloud-sign-in").onclick = () => submit("signin");
  document.getElementById("cloud-apple-sign-in").onclick = async () => {
    try { await signInWithProvider("apple"); }
    catch (error) { document.getElementById("cloud-auth-error").textContent = friendlyError(error); }
  };
  document.getElementById("cloud-google-sign-in").onclick = async () => {
    try { await signInWithProvider("google"); }
    catch (error) { document.getElementById("cloud-auth-error").textContent = friendlyError(error); }
  };
}

async function runBusy(startText, task, successText) {
  setCloudStatus(startText);
  try {
    await task();
    setCloudStatus(`✓ ${successText}`, "success");
  } catch (error) {
    cloud.lastError = friendlyError(error);
    setCloudStatus(cloud.lastError, "error");
    throw error;
  }
}

async function syncProject(project, includeAssets = false) {
  if (!cloud.user) return null;
  const row = await upsertProject(project);
  project.cloudId = row.id;
  await upsertToolResults(project,row.id);
  project.cloudAssets ||= {};
  if (includeAssets) {
    for (const descriptor of local().assetDescriptors(project)) {
      if (project.cloudAssets[descriptor.id]?.path) continue;
      const file = await local().getAsset(descriptor.id);
      if (!file) continue;
      const uploaded = await uploadProjectAsset(project, file, descriptor.kind, descriptor.id);
      project.cloudAssets[descriptor.id] = {
        path: uploaded.path,
        kind: descriptor.kind,
        uploadId: uploaded.chartUpload?.id || null,
        name: file.name || descriptor.name || "asset",
        type: file.type || "application/octet-stream"
      };
    }
    await upsertProject(project);
  }
  return row;
}

async function migrateLocalProjects() {
  const api = local();
  if (!cloud.user) return openAccountModal();
  if (!confirm("Move your local projects and their saved chart/cover files to your private cloud account? Local copies will remain on this device.")) return;
  await runBusy("Moving local projects…", async () => {
    cloud.syncing = true;
    try {
      const projects = api.getState().projects || [];
      for (const project of projects) await syncProject(project, true);
      await saveUserSettings(settingsPayload(api.getState()));
      api.saveState();
    } finally {
      cloud.syncing = false;
    }
  }, "Local projects moved to cloud").catch(error => api.toast(friendlyError(error)));
}

function projectTime(project = {}) {
  return Date.parse(project.updatedAt || project.updated_at || project.lastSavedAt || project.createdAt || 0) || 0;
}

function chooseNewestProject(localProject, cloudProject) {
  if (!localProject) return cloudProject;
  if (!cloudProject) return localProject;
  return projectTime(cloudProject) > projectTime(localProject) ? cloudProject : localProject;
}

function hasMeaningfulProjects(state = {}) {
  return Array.isArray(state.projects) && state.projects.length > 0;
}

async function restoreCloudProjects() {
  if (!cloud.user) return;
  const api = local();
  const rows = await listProjects();
  const current = api.getState();
  if (!rows.length && hasMeaningfulProjects(current)) {
    setCloudStatus("Cloud empty · kept device progress", "success");
    return;
  }
  const byLocalId = new Map((current.projects || []).map(project => [String(project.id), project]));
  for (const row of rows) {
    if (!row.local_id || !row.project_data) continue;
    const incoming = {
      ...(row.project_data || {}),
      id: row.local_id,
      name: row.title || row.project_data?.name,
      notes: row.description ?? row.project_data?.notes,
      cloudId: row.id,
      updatedAt: row.project_data?.updatedAt || row.updated_at
    };
    const existing = byLocalId.get(String(row.local_id));
    byLocalId.set(String(row.local_id), chooseNewestProject(existing, incoming));
    for (const [assetId, asset] of Object.entries(incoming.cloudAssets || {})) {
      if (await api.getAsset(assetId)) continue;
      try {
        const blob = await downloadAsset(asset.path);
        await api.putAsset(assetId, new File([blob], asset.name || "asset", { type: asset.type || blob.type }));
      } catch (error) {
        console.warn("Cloud asset restore skipped", assetId, error);
      }
    }
  }
  current.projects = [...byLocalId.values()];
  if (!current.projects.some(project => String(project.id) === String(current.activeProjectId))) {
    current.activeProjectId = current.projects[0]?.id || null;
  }
  api.replaceState(current);
  setCloudStatus("✓ Synced · newest progress kept", "success");
}

function settingsPayload(state) {
  return {
    theme: state.theme,
    language: state.language,
    unitSystem: state.unitSystem,
    budgetSettings: state.budgetSettings
  };
}

async function restoreCloudSettings() {
  if (!cloud.user) return;
  const remote = await loadUserSettings();
  if (!remote) return;
  const api = local();
  const state = api.getState();
  const { theme, language, unitSystem, budgetSettings } = remote;
  Object.assign(state, {
    ...(theme ? { theme } : {}),
    ...(language ? { language } : {}),
    ...(unitSystem ? { unitSystem } : {}),
    ...(budgetSettings ? { budgetSettings } : {})
  });
  api.replaceState(state);
}

function scheduleCloudSync() {
  if (!cloud.user || cloud.syncing) return;
  queueStateForCloud("local-save");
  scheduleFullSync("local-save", 1200);
}

async function startRealtimeSync() {
  if (!cloud.user || cloud.realtime) return;
  cloud.realtime = await subscribeToSyncRecords(payload => {
    const row = payload?.new || payload?.record;
    if (!row || row.device_id === deviceProfile().id) return;
    cloud.pendingDownloads += 1;
    scheduleFullSync("realtime", 600);
  });
}

async function queueChartUpload(projectId, localAssetId, file) {
  if (!cloud.user) return;
  const project = local().getState().projects.find(item => item.id === projectId);
  if (!project) return;
  try {
    setCloudStatus("Uploading chart…");
    const result = await uploadProjectAsset(project, file, "chart", localAssetId);
    project.cloudId = result.cloudProject.id;
    project.cloudAssets ||= {};
    project.cloudAssets[localAssetId] = {
      path: result.path,
      kind: "chart",
      uploadId: result.chartUpload?.id,
      name: file.name,
      type: file.type
    };
    local().saveState();
    setCloudStatus("✓ Chart saved privately", "success");
    injectChartReader();
  } catch (error) {
    local().toast(`Chart kept locally. ${friendlyError(error)}`);
  }
}

async function queueCoverUpload(projectId, localAssetId, file) {
  if (!cloud.user) return;
  const project = local().getState().projects.find(item => item.id === projectId);
  if (!project) return;
  try {
    const result = await uploadProjectAsset(project, file, "cover", localAssetId);
    project.cloudId = result.cloudProject.id;
    project.cloudAssets ||= {};
    project.cloudAssets[localAssetId] = { path: result.path, kind: "cover", name: file.name, type: file.type };
    local().saveState();
  } catch (error) {
    local().toast(`Cover kept locally. ${friendlyError(error)}`);
  }
}

async function deleteCloudProject(localProjectId) {
  if (!cloud.user) return;
  try {
    await deleteProjectByLocalId(String(localProjectId));
  } catch (error) {
    local().toast(`Deleted locally. Cloud deletion needs retry: ${friendlyError(error)}`);
  }
}

async function injectChartReader() {
  const slot = document.getElementById("cloud-chart-reader-slot");
  const host = slot || document.querySelector("#project-detail .manual-chart-tools");
  if (!host) return;
  const project = local().getActiveProject();
  if (!project) return;
  let panel = document.getElementById("cloud-chart-reader");
  if (!panel) {
    panel = document.createElement("section");
    panel.id = "cloud-chart-reader";
    panel.className = slot ? "cloud-chart-reader flow-ai-cloud-panel" : "card cloud-chart-reader";
    host.append(panel);
  }
  if (!cloud.configured) {
    panel.remove();
    return;
  }
  if (!cloud.user) {
    panel.innerHTML = `<p class="eyebrow">AI CHART READER</p><h3>Sign in to analyse a chart</h3><p>Your chart must be saved privately before server-side analysis. The reader never treats uncertain symbols as confirmed.</p><button class="secondary-button" id="chart-reader-sign-in">Sign in</button>`;
    document.getElementById("chart-reader-sign-in").onclick = openAccountModal;
    return;
  }
  if (!project.cloudId) {
    panel.innerHTML = `<p class="eyebrow">AI CHART READER</p><h3>Move this project to cloud first</h3><p>The local chart remains safe. Cloud analysis starts only after you explicitly migrate the project.</p><button class="secondary-button" id="chart-reader-migrate">Move local projects to cloud</button>`;
    document.getElementById("chart-reader-migrate").onclick = migrateLocalProjects;
    return;
  }
  const uploads = await listChartUploads(project.cloudId).catch(() => []);
  panel.innerHTML = `<p class="eyebrow">AI CHART READER</p><h3>Cloud analysis</h3><p>Choose an uploaded image. AI suggestions remain editable and every low-confidence cell must be checked manually.</p>${uploads.length ? `<div class="field"><label>Cloud chart</label><select id="cloud-chart-upload-select">${uploads.map(upload => `<option value="${upload.id}">${local().escapeHtml(upload.original_filename)} · ${upload.status}</option>`).join("")}</select></div><div class="button-row"><button class="secondary-button" id="run-cloud-analysis">Analyse chart</button><button class="secondary-button" id="load-cloud-cells">Review cells</button></div>` : `<p class="empty-state">Upload a chart while signed in, or migrate existing local chart files.</p>`}<div id="cloud-chart-reader-result" aria-live="polite"></div>`;
  document.getElementById("run-cloud-analysis")?.addEventListener("click", runSelectedAnalysis);
  document.getElementById("load-cloud-cells")?.addEventListener("click", loadSelectedCells);
}

async function runSelectedAnalysis() {
  const uploadId = document.getElementById("cloud-chart-upload-select")?.value;
  const result = document.getElementById("cloud-chart-reader-result");
  if (!uploadId || !result) return;
  result.innerHTML = `<p class="loading-state">Reading chart carefully…</p>`;
  try {
    await analyzeChart(uploadId);
    result.innerHTML = `<div class="sync-status"><strong>Draft ready for review</strong><p>No symbol is final until you check it.</p></div>`;
    await loadCells(uploadId);
  } catch (error) {
    result.innerHTML = `<p class="form-error">${local().escapeHtml(friendlyError(error))}</p>`;
  }
}

async function loadSelectedCells() {
  const uploadId = document.getElementById("cloud-chart-upload-select")?.value;
  if (uploadId) await loadCells(uploadId);
}

async function loadCells(uploadId) {
  cloud.activeUploadId = uploadId;
  cloud.activeCells = await listChartCells(uploadId);
  renderCellEditor();
}

function renderCellEditor() {
  const host = document.getElementById("cloud-chart-reader-result");
  if (!host) return;
  if (!cloud.activeCells.length) {
    host.innerHTML = `<p class="empty-state">No cells are available. The analysis may still be processing or may have failed safely.</p>`;
    return;
  }
  const rows = new Map();
  cloud.activeCells.forEach(cell => {
    if (!rows.has(cell.row_number)) rows.set(cell.row_number, []);
    rows.get(cell.row_number).push(cell);
  });
  host.innerHTML = `<div class="chart-cell-editor"><div class="chart-cell-scroll"><table><thead><tr><th>Row</th><th>Col</th><th>Symbol</th><th>Meaning</th><th>Confidence</th><th>Checked</th></tr></thead><tbody>${cloud.activeCells.map(cell => `<tr class="${cell.confidence !== null && cell.confidence < .7 ? "uncertain" : ""}"><td>${cell.row_number}</td><td>${cell.column_number}</td><td><input data-cell-symbol="${cell.id}" value="${local().escapeHtml(cell.symbol)}"></td><td><input data-cell-meaning="${cell.id}" value="${local().escapeHtml(cell.meaning)}"></td><td>${cell.confidence === null ? "?" : `${Math.round(cell.confidence * 100)}%`}</td><td>${cell.is_user_corrected ? "✓" : "Review"}</td></tr>`).join("")}</tbody></table></div><div class="button-row"><button class="primary-button" id="save-cell-corrections">Save corrections</button><button class="secondary-button" id="generate-cloud-pattern">Generate checked pattern</button></div></div>`;
  document.getElementById("save-cell-corrections").onclick = saveCorrections;
  document.getElementById("generate-cloud-pattern").onclick = generateCheckedPattern;
}

async function saveCorrections() {
  const changed = [];
  for (const cell of cloud.activeCells) {
    const symbol = document.querySelector(`[data-cell-symbol="${cell.id}"]`)?.value.trim() || "uncertain";
    const meaning = document.querySelector(`[data-cell-meaning="${cell.id}"]`)?.value.trim() || "uncertain";
    if (symbol !== cell.symbol || meaning !== cell.meaning) changed.push({ ...cell, symbol, meaning });
  }
  if (!changed.length) return local().toast("No cell changes to save.");
  try {
    const saved = await Promise.all(changed.map(updateChartCell));
    const byId = new Map(saved.map(cell => [cell.id, cell]));
    cloud.activeCells = cloud.activeCells.map(cell => byId.get(cell.id) || cell);
    renderCellEditor();
    local().toast("Corrections saved.");
  } catch (error) {
    local().toast(friendlyError(error));
  }
}

async function generateCheckedPattern() {
  const unreviewed = cloud.activeCells.filter(cell => !cell.is_user_corrected && (cell.confidence === null || cell.confidence < .7));
  if (unreviewed.length && !confirm(`${unreviewed.length} low-confidence cell(s) are still unreviewed. Generate a draft that clearly marks them uncertain?`)) return;
  const grouped = new Map();
  cloud.activeCells.forEach(cell => {
    if (!grouped.has(cell.row_number)) grouped.set(cell.row_number, []);
    grouped.get(cell.row_number).push(cell);
  });
  const rows = [...grouped.entries()].sort((a, b) => a[0] - b[0]).map(([row, cells]) => ({
    row,
    cells: cells.sort((a, b) => a.column_number - b.column_number),
    text: cells.sort((a, b) => a.column_number - b.column_number).map(cell => cell.meaning || "uncertain").join(", ")
  }));
  const patternText = rows.map(row => `Row ${row.row}: ${row.text}`).join("\n");
  const project = local().getActiveProject();
  try {
    await saveGeneratedPattern({
      projectId: project.cloudId,
      uploadId: cloud.activeUploadId,
      patternText,
      patternJson: { rows, unreviewedCells: unreviewed.map(cell => cell.id), reviewRequired: unreviewed.length > 0 },
      difficultyLevel: "not assessed"
    });
    local().openModal(`<p class="eyebrow">USER-REVIEWED PATTERN</p><h2>Written pattern draft</h2><p>${unreviewed.length ? `${unreviewed.length} uncertain cell(s) remain clearly flagged.` : "All low-confidence cells were reviewed."}</p><textarea class="final-pattern-output" rows="16">${local().escapeHtml(patternText)}</textarea><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
  } catch (error) {
    local().toast(friendlyError(error));
  }
}

function formatDateTime(value) {
  if (!value) return "Not yet";
  try { return new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }); }
  catch { return "Not yet"; }
}

function storageEstimateText() {
  if (!navigator.storage?.estimate) return "Local estimate unavailable";
  navigator.storage.estimate().then(estimate => {
    const target = document.getElementById("cloud-storage-estimate");
    if (!target) return;
    const used = Math.round((estimate.usage || 0) / 1024 / 1024);
    const quota = Math.round((estimate.quota || 0) / 1024 / 1024);
    target.textContent = quota ? `${used} MB of ${quota} MB local quota` : `${used} MB local`;
  }).catch(() => {});
  return "Checking…";
}

function syncHealthLabel() {
  const meta = syncMeta();
  if (!cloud.configured) return "Not configured";
  if (!cloud.user) return "Sign-in required";
  if (navigator.onLine === false) return "Waiting to sync";
  if (conflicts().some(item => item.status !== "resolved")) return "Needs review";
  if (pendingQueue().length) return "Pending sync";
  return meta.health || "Healthy";
}

function renderSyncHistoryModal() {
  const api = local();
  const rows = readJson(HISTORY_KEY, []);
  api.openModal(`<p class="eyebrow">SYNC HISTORY</p><h2>Recent sync activity</h2>${rows.length ? `<div class="sync-history-list">${rows.map(row => `<article><strong>${api.escapeHtml(row.status || "Sync")}</strong><span>${formatDateTime(row.at)}</span><p>${api.escapeHtml([row.reason, row.message, row.uploaded !== undefined ? `${row.uploaded} uploaded` : "", row.downloaded !== undefined ? `${row.downloaded} downloaded` : "", row.conflicts ? `${row.conflicts} conflict(s)` : ""].filter(Boolean).join(" · "))}</p></article>`).join("")}</div>` : `<p class="empty-state">No cloud sync history yet.</p>`}<div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
}

function renderConflictModal() {
  const api = local();
  const items = conflicts().filter(item => item.status !== "resolved");
  api.openModal(`<p class="eyebrow">SYNC CONFLICTS</p><h2>Compare project changes</h2>${items.length ? `<div class="sync-conflict-list">${items.map(item => `<article class="sync-conflict-card"><h3>${api.escapeHtml(item.projectName || "Project")}</h3><div class="settings-account-summary"><div><span>This device</span><strong>${formatDateTime(item.localUpdatedAt)}</strong></div><div><span>Cloud</span><strong>${formatDateTime(item.cloudUpdatedAt)}</strong></div></div><div class="button-row"><button class="secondary-button" data-conflict-action="merge" data-conflict-id="${item.id}">Merge</button><button class="secondary-button" data-conflict-action="local" data-conflict-id="${item.id}">Keep Local</button><button class="secondary-button" data-conflict-action="cloud" data-conflict-id="${item.id}">Keep Cloud</button><button class="secondary-button" data-conflict-action="compare" data-conflict-id="${item.id}">Compare Changes</button></div></article>`).join("")}</div>` : `<p class="empty-state">No conflicts need review.</p>`}<div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
  document.querySelectorAll("[data-conflict-action]").forEach(button => button.addEventListener("click", () => resolveConflict(button.dataset.conflictId, button.dataset.conflictAction)));
}

function resolveConflict(id, action) {
  const api = local();
  const items = conflicts();
  const item = items.find(entry => entry.id === id);
  if (!item) return;
  if (action === "compare") {
    api.openModal(`<p class="eyebrow">COMPARE CHANGES</p><h2>${api.escapeHtml(item.projectName || "Project")}</h2><div class="sync-compare-grid"><div><strong>This device</strong><pre>${api.escapeHtml(JSON.stringify(item.localPayload, null, 2).slice(0, 5000))}</pre></div><div><strong>Cloud</strong><pre>${api.escapeHtml(JSON.stringify(item.cloudPayload, null, 2).slice(0, 5000))}</pre></div></div><div class="modal-actions"><button class="secondary-button" id="back-to-conflicts">Back</button><button class="primary-button" onclick="closeModal()">Done</button></div>`);
    document.getElementById("back-to-conflicts").onclick = renderConflictModal;
    return;
  }
  const state = api.getState();
  const targetId = item.localPayload?.id || item.cloudPayload?.id;
  const index = (state.projects || []).findIndex(project => String(project.id) === String(targetId));
  if (index >= 0) {
    if (action === "cloud") state.projects[index] = item.cloudPayload;
    else if (action === "merge") state.projects[index] = mergeProject(item.localPayload, item.cloudPayload);
  } else if (action !== "local" && item.cloudPayload) {
    state.projects.push(item.cloudPayload);
  }
  item.status = "resolved";
  item.resolvedAt = new Date().toISOString();
  writeConflicts(items);
  api.replaceState(state);
  queueStateForCloud(`conflict-${action}`);
  scheduleFullSync(`conflict-${action}`, 400);
  api.toast("Conflict choice saved.");
  renderConflictModal();
}

async function refreshDeviceList() {
  const host = document.getElementById("cloud-device-list");
  if (!host || !cloud.user) return;
  try {
    const devices = await listSyncDevices();
    const currentId = deviceProfile().id;
    host.innerHTML = devices.length ? devices.map(device => `<article class="cloud-device-row"><div><strong>${local().escapeHtml(device.name)}</strong><p>${device.id === currentId ? "Current device · " : ""}Last active ${formatDateTime(device.last_active_at)}</p></div><div class="button-row"><button class="secondary-button" data-rename-device="${device.id}">Rename</button>${device.id !== currentId ? `<button class="secondary-button danger-button" data-remove-device="${device.id}">Remove</button>` : ""}</div></article>`).join("") : `<p class="empty-state">No synced devices yet.</p>`;
    host.querySelectorAll("[data-rename-device]").forEach(button => button.addEventListener("click", async () => {
      const current = devices.find(device => device.id === button.dataset.renameDevice);
      const name = prompt("Device name", current?.name || "Yarncha device");
      if (!name) return;
      await renameSyncDevice(button.dataset.renameDevice, name.trim());
      if (button.dataset.renameDevice === currentId) writeJson(DEVICE_KEY, { ...deviceProfile(), name: name.trim() });
      refreshDeviceList();
    }));
    host.querySelectorAll("[data-remove-device]").forEach(button => button.addEventListener("click", async () => {
      if (!confirm("Remove this device from the cloud device list? Local data on that device is not deleted.")) return;
      await removeSyncDevice(button.dataset.removeDevice);
      refreshDeviceList();
    }));
  } catch {
    host.innerHTML = `<p class="empty-state">Device list will appear after the next successful sync.</p>`;
  }
}

function renderSettingsSection(host) {
  if (!host || document.getElementById("cloud-beta-settings")) return;
  const grid = host.querySelector(".settings-page-shell");
  if (!grid) return;
  const anchor = host.querySelector("#cloud-settings-anchor") || grid.lastElementChild;
  const email = cloud.user?.email || "";
  const meta = syncMeta();
  const device = deviceProfile();
  const pendingUploads = pendingQueue().length;
  const openConflicts = conflicts().filter(item => item.status !== "resolved").length;
  const accountTitle = document.createElement("div");
  accountTitle.className = "settings-group-title";
  accountTitle.innerHTML = `<p class="eyebrow">ACCOUNT & SYNC</p><h2>Account & Sync</h2>`;
  const section = document.createElement("section");
  section.id = "cloud-beta-settings";
  section.className = "card mobile-card settings-panel settings-panel-wide";
  section.innerHTML = `<div class="settings-section-heading"><span class="settings-section-icon">${local().uiIcon("storage","ui-icon")}</span><div><p class="eyebrow">LOCAL-FIRST CLOUD SYNC</p><h2>${cloud.user ? "Sync Status" : "Sign in and cloud backup"}</h2><p>${cloud.configured ? (cloud.user ? "Yarncha saves here first, then syncs your projects, counters, stash, charts, settings and tool history to Supabase." : "Sign in with Apple, Google, or email to keep private work across devices.") : "Supabase environment variables have not been configured for this build."}</p></div></div>
    <div class="settings-account-summary sync-status-grid">
      <div><span>Signed in user</span><strong>${cloud.user ? local().escapeHtml(email || "Yarncha user") : "Not signed in"}</strong></div>
      <div><span>Current device</span><strong>${local().escapeHtml(device.name)}</strong></div>
      <div><span>Cloud connected</span><strong id="cloud-sync-status" data-tone="${cloud.lastError ? "error" : ""}">${local().escapeHtml(cloud.lastError || (cloud.user ? "Connected" : cloud.configured ? "Sign-in required" : "Not configured"))}</strong></div>
      <div><span>Last sync time</span><strong>${formatDateTime(meta.lastSyncAt)}</strong></div>
      <div><span>Pending uploads</span><strong>${pendingUploads}</strong></div>
      <div><span>Pending downloads</span><strong>${cloud.pendingDownloads || 0}</strong></div>
      <div><span>Storage usage</span><strong id="cloud-storage-estimate">${storageEstimateText()}</strong></div>
      <div><span>Sync health</span><strong>${local().escapeHtml(syncHealthLabel())}${openConflicts ? ` · ${openConflicts} conflict(s)` : ""}</strong></div>
    </div>
    <div class="settings-divider"></div>
    <div class="settings-form-row settings-form-row-stack">
      <div><strong>Sync controls</strong><p>${cloud.user ? "Sync now, inspect history, resolve conflicts, or make a portable backup. Offline saves stay queued until the internet returns." : "Cloud sync starts after sign-in. Local backup remains available anytime."}</p></div>
      <div class="button-row settings-button-row">
        <button class="${cloud.user ? "secondary-button" : "primary-button"}" id="settings-cloud-account">${cloud.user ? "Account details" : "Sign in / create account"}</button>
        ${cloud.user ? `<button class="primary-button" id="settings-cloud-sync-now">Sync Now</button><button class="secondary-button" id="settings-cloud-history">View Sync History</button><button class="secondary-button" id="settings-cloud-conflicts">Resolve Conflicts</button><button class="secondary-button" id="settings-cloud-export">Export Backup</button><button class="secondary-button" id="settings-cloud-import">Import Backup</button><button class="secondary-button" id="settings-cloud-sign-out">Sign out</button><input id="settings-cloud-backup-file" type="file" accept=".json,application/json" hidden>` : ""}
      </div>
    </div>
    ${cloud.user ? `<div class="settings-divider"></div><div><strong>Signed in devices</strong><div id="cloud-device-list" class="cloud-device-list"><p class="empty-state">Loading devices…</p></div></div>` : ""}
    <div class="privacy-note"><strong>Privacy:</strong> Every synced record belongs to your Supabase user. Charts are sent for analysis only when you press Analyse; ordinary saving never requires an internet connection.</div>`;
  grid.insertBefore(accountTitle, anchor);
  grid.insertBefore(section, anchor);
  document.getElementById("settings-cloud-account").onclick = openAccountModal;
  document.getElementById("settings-cloud-sync-now")?.addEventListener("click", () => runFullSync("manual"));
  document.getElementById("settings-cloud-history")?.addEventListener("click", renderSyncHistoryModal);
  document.getElementById("settings-cloud-conflicts")?.addEventListener("click", renderConflictModal);
  document.getElementById("settings-cloud-export")?.addEventListener("click", () => local().exportBackup?.(null));
  document.getElementById("settings-cloud-import")?.addEventListener("click", () => document.getElementById("settings-cloud-backup-file")?.click());
  document.getElementById("settings-cloud-backup-file")?.addEventListener("change", event => local().importBackup?.(event, "merge"));
  document.getElementById("settings-cloud-sign-out")?.addEventListener("click", async () => {
    await signOut();
    cloud.user = null;
    if (cloud.realtime?.unsubscribe) await cloud.realtime.unsubscribe();
    cloud.realtime = null;
    local().toast("Signed out. Local drafts remain on this device.");
    local().rerenderSettings();
  });
  refreshDeviceList();
  if (!cloud.user) return;
  const dangerTitle = document.createElement("div");
  dangerTitle.className = "settings-group-title settings-danger-title";
  dangerTitle.innerHTML = `<p class="eyebrow">DANGER ZONE</p><h2>Danger Zone</h2>`;
  const danger = document.createElement("section");
  danger.id = "cloud-danger-zone";
  danger.className = "card mobile-card settings-panel settings-panel-wide settings-danger-zone";
  danger.innerHTML = `<div class="settings-section-heading"><span class="settings-section-icon danger-icon">${local().uiIcon("warning","ui-icon")}</span><div><p class="eyebrow">DANGER ZONE</p><h2>Danger Zone</h2><p>Keep permanent account actions separate from everyday sync settings.</p></div></div>
    <div class="danger-zone-copy"><strong>Delete account and cloud data</strong><p>This action cannot be undone.</p><p>Deleting your cloud account removes cloud projects, charts, generated patterns, and private storage. Local browser drafts are not deleted.</p></div>
    <div class="delete-confirmation">
      <label for="settings-delete-confirm">Type <strong>DELETE</strong> or confirm your email address</label>
      <input id="settings-delete-confirm" autocomplete="off" inputmode="email" placeholder="DELETE or ${local().escapeHtml(email)}">
      <button type="button" class="danger-button secondary-button" id="settings-delete-account" disabled>Delete account and cloud data</button>
    </div>`;
  grid.insertBefore(dangerTitle, anchor);
  grid.insertBefore(danger, anchor);
  const confirmInput = document.getElementById("settings-delete-confirm");
  const deleteButton = document.getElementById("settings-delete-account");
  const syncDeleteState = () => {
    const value = confirmInput.value.trim();
    deleteButton.disabled = !(value === "DELETE" || (email && value.toLowerCase() === email.toLowerCase()));
  };
  confirmInput.addEventListener("input", syncDeleteState);
  deleteButton.addEventListener("click", async () => {
    syncDeleteState();
    if (deleteButton.disabled) return;
    if (!confirm("Delete your Yarncha account and all cloud projects, charts and patterns? This cannot be undone. Local browser drafts are not deleted.")) return;
    try {
      await deleteAccountAndData();
      cloud.user = null;
      local().toast("Cloud account deleted. Local drafts remain on this device.");
      local().rerenderSettings();
    } catch (error) {
      local().toast(friendlyError(error));
    }
  });
}

window.YarnchaCloud = {
  openAccountModal,
  renderSettingsSection,
  queueChartUpload,
  queueCoverUpload,
  deleteCloudProject,
  injectChartReader,
  migrateLocalProjects,
  syncNow: runFullSync,
  queueStateForCloud,
  get status() { return { configured: cloud.configured, user: cloud.user, lastError: cloud.lastError, pendingUploads: pendingQueue().length, pendingDownloads: cloud.pendingDownloads, device: deviceProfile(), meta: syncMeta(), conflicts: conflicts() }; }
};

window.addEventListener("yarncha:local-save", scheduleCloudSync);
window.addEventListener("yarncha:project-rendered", injectChartReader);
window.addEventListener("online", () => scheduleFullSync("reconnect", 500));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") scheduleFullSync("resume", 800);
});
setInterval(() => scheduleFullSync("interval", 1000), 3 * 60 * 1000);
initialize().catch(error => {
  cloud.lastError = friendlyError(error);
  console.error("Yarncha cloud initialization failed", error);
});
