import {
  getSupabase,
  currentUser,
  signUpWithEmail,
  signInWithEmail,
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
  deleteAccountAndData
} from "./supabase-client.ts";

const cloud = {
  configured: false,
  user: null,
  syncing: false,
  lastError: "",
  syncTimer: null,
  activeUploadId: null,
  activeCells: []
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
    local().rerenderSettings();
  });
  if (cloud.user) {
    await restoreCloudSettings().catch(() => {});
    await restoreCloudProjects().catch(error => { cloud.lastError = friendlyError(error); });
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
    api.openModal(`<p class="eyebrow">YARNCHA ACCOUNT</p><h2>${api.escapeHtml(cloud.user.email || "Signed in")}</h2><div class="sync-status"><strong id="cloud-sync-status">Cloud sync ready</strong><p>Local drafts stay on this device. Your owned cloud projects are protected by account-level database policies.</p></div><div class="modal-actions"><button class="secondary-button" id="cloud-migrate-now">Move my local projects to cloud</button><button class="secondary-button" id="cloud-refresh-now">Refresh from cloud</button><button class="danger-button" id="cloud-sign-out">Sign out</button></div>`);
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
  api.openModal(`<p class="eyebrow">PRIVATE BETA</p><h2>Sign in to Yarncha</h2><p class="muted-copy">Use email and password. Google and Apple sign-in are intentionally deferred.</p><div class="form-grid"><div class="field full"><label>Email</label><input id="cloud-email" type="email" autocomplete="email" inputmode="email"></div><div class="field full"><label>Password</label><input id="cloud-password" type="password" autocomplete="current-password" minlength="8"></div></div><p class="form-error" id="cloud-auth-error" role="alert"></p><div class="modal-actions"><button class="secondary-button" id="cloud-sign-up">Create account</button><button class="primary-button" id="cloud-sign-in">Sign in</button></div><div class="privacy-note">Yarncha stores your email with Supabase Auth. Chart files and projects are private to your account. AI chart analysis sends the selected chart to the configured server-side model only after you press Analyse.</div>`);
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

async function restoreCloudProjects() {
  if (!cloud.user) return;
  const api = local();
  const rows = await listProjects();
  const current = api.getState();
  const byLocalId = new Map((current.projects || []).map(project => [String(project.id), project]));
  for (const row of rows) {
    const incoming = { ...(row.project_data || {}), id: row.local_id, name: row.title, notes: row.description, cloudId: row.id };
    const existing = byLocalId.get(row.local_id);
    if (!existing || new Date(row.updated_at) > new Date(existing.updatedAt || 0)) byLocalId.set(row.local_id, incoming);
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
  api.replaceState(current);
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
  Object.assign(state, remote);
  api.replaceState(state);
}

function scheduleCloudSync() {
  if (!cloud.user || cloud.syncing) return;
  clearTimeout(cloud.syncTimer);
  cloud.syncTimer = setTimeout(async () => {
    try {
      setCloudStatus("Saving locally + cloud…");
      const state = local().getState();
      await Promise.all((state.projects || []).map(project => syncProject(project, false)));
      await saveUserSettings(settingsPayload(state));
      setCloudStatus("✓ Saved locally + cloud", "success");
    } catch (error) {
      cloud.lastError = friendlyError(error);
      setCloudStatus("Saved locally · Cloud retry needed", "error");
    }
  }, 1000);
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
  const host = document.querySelector("#project-detail .manual-chart-tools");
  if (!host || document.getElementById("cloud-chart-reader")) return;
  const project = local().getActiveProject();
  if (!project) return;
  const panel = document.createElement("section");
  panel.id = "cloud-chart-reader";
  panel.className = "card cloud-chart-reader";
  if (!cloud.configured) {
    panel.innerHTML = `<p class="eyebrow">AI CHART READER · PRIVATE BETA</p><h3>Backend setup required</h3><p>The review-first chart reader is prepared, but this deployment is not connected to Supabase yet. OG Mode remains available offline.</p>`;
    host.append(panel);
    return;
  }
  if (!cloud.user) {
    panel.innerHTML = `<p class="eyebrow">AI CHART READER · PRIVATE BETA</p><h3>Sign in to analyse a chart</h3><p>Your chart must be saved privately before server-side analysis. The reader never treats uncertain symbols as confirmed.</p><button class="secondary-button" id="chart-reader-sign-in">Sign in</button>`;
    host.append(panel);
    document.getElementById("chart-reader-sign-in").onclick = openAccountModal;
    return;
  }
  if (!project.cloudId) {
    panel.innerHTML = `<p class="eyebrow">AI CHART READER · PRIVATE BETA</p><h3>Move this project to cloud first</h3><p>The local chart remains safe. Cloud analysis starts only after you explicitly migrate the project.</p><button class="secondary-button" id="chart-reader-migrate">Move local projects to cloud</button>`;
    host.append(panel);
    document.getElementById("chart-reader-migrate").onclick = migrateLocalProjects;
    return;
  }
  const uploads = await listChartUploads(project.cloudId).catch(() => []);
  panel.innerHTML = `<p class="eyebrow">AI CHART READER · PRIVATE BETA</p><h3>AI reads → you review → final pattern</h3><p>Choose an uploaded image. AI suggestions remain editable and every low-confidence cell must be checked manually.</p>${uploads.length ? `<div class="field"><label>Cloud chart</label><select id="cloud-chart-upload-select">${uploads.map(upload => `<option value="${upload.id}">${local().escapeHtml(upload.original_filename)} · ${upload.status}</option>`).join("")}</select></div><div class="button-row"><button class="secondary-button" id="run-cloud-analysis">Analyse selected chart</button><button class="secondary-button" id="load-cloud-cells">Review cells</button></div>` : `<p class="empty-state">Upload a chart while signed in, or migrate existing local chart files.</p>`}<div id="cloud-chart-reader-result" aria-live="polite"></div>`;
  host.append(panel);
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

function renderSettingsSection(host) {
  if (!host || document.getElementById("cloud-beta-settings")) return;
  const grid = host.querySelector(".settings-page-shell");
  if (!grid) return;
  const section = document.createElement("section");
  section.id = "cloud-beta-settings";
  section.className = "card mobile-card settings-panel";
  section.innerHTML = `<div class="settings-section-heading"><span class="settings-section-icon">${local().uiIcon("storage","ui-icon")}</span><div><p class="eyebrow">PRIVATE BETA CLOUD</p><h2>${cloud.user ? "Cloud account and sync" : "Sign in and cloud backup"}</h2><p>${cloud.configured ? (cloud.user ? `Signed in as <strong>${local().escapeHtml(cloud.user.email || "Yarncha user")}</strong>. Local drafts remain available offline.` : "Create an email account to keep private projects across devices.") : "Supabase environment variables have not been configured for this build."}</p></div></div><div class="storage-status-panel"><span>Local save <strong>Enabled</strong></span><span>Cloud <strong>${cloud.user ? "Connected" : cloud.configured ? "Sign-in required" : "Not configured"}</strong></span><span id="cloud-sync-status">${cloud.lastError || (cloud.user ? "Ready" : "Local-only")}</span></div><div class="button-row"><button class="primary-button" id="settings-cloud-account">${cloud.user ? "Account & sync" : "Sign in / create account"}</button>${cloud.user ? `<button class="secondary-button" id="settings-cloud-migrate">Move my local projects to cloud</button><button class="danger-button" id="settings-delete-account">Delete account and cloud data</button>` : ""}<a class="secondary-button button-link" href="mailto:feedback@yarncha.app?subject=Yarncha%20private%20beta%20feedback">Send beta feedback</a></div><div class="privacy-note"><strong>Privacy:</strong> Projects, charts and generated patterns are private to your account. Charts are sent to the configured server-side AI provider only when you press Analyse. AI output is a draft: unclear symbols remain uncertain and require your review.</div>`;
  grid.insertBefore(section,grid.lastElementChild);
  document.getElementById("settings-cloud-account").onclick = openAccountModal;
  document.getElementById("settings-cloud-migrate")?.addEventListener("click", migrateLocalProjects);
  document.getElementById("settings-delete-account")?.addEventListener("click", async () => {
    if (!confirm("Delete your Yarncha account and all cloud projects, charts and patterns? This cannot be undone. Local browser drafts are not deleted.")) return;
    if (prompt('Type DELETE to confirm permanent cloud deletion.') !== "DELETE") return;
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
  get status() { return { configured: cloud.configured, user: cloud.user, lastError: cloud.lastError }; }
};

window.addEventListener("yarncha:local-save", scheduleCloudSync);
window.addEventListener("yarncha:project-rendered", injectChartReader);
initialize().catch(error => {
  cloud.lastError = friendlyError(error);
  console.error("Yarncha cloud initialization failed", error);
});
