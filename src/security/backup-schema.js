export const BACKUP_SCHEMA_VERSION = 3;
export const BACKUP_LIMITS = Object.freeze({
  fileBytes: 64 * 1024 * 1024,
  totalAssetBytes: 48 * 1024 * 1024,
  assetBytes: 12 * 1024 * 1024,
  projects: 100,
  assets: 200,
  arrayItems: 2000,
  objectKeys: 240,
  stringLength: 160000,
  depth: 14
});

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const DANGEROUS_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "application/pdf", "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);
const BACKUP_KEYS = new Set(["app", "version", "kind", "exportedAt", "storage", "state", "assets"]);
const STATE_KEYS = new Set([
  "schemaVersion", "activeProjectId", "projects", "librarySections", "inventory", "cart", "marketBudget",
  "budgetSettings", "purchaseHistory", "language", "unitSystem", "appPreferences", "theme",
  "onboardingComplete", "onboardingStep", "aiAccessConfirmed", "account", "yarnMaterials",
  "techniqueKnowledge", "projectIdeas", "ideaFilters", "symbolFavorites", "userTechniqueReferences",
  "userSymbolsOverride", "symbolLearningLibrary", "libraryBookmarks", "libraryEntryNotes",
  "libraryVisualReferences", "librarySuggestedEdits", "libraryRecentlyViewed", "libraryProjectChecklist",
  "libraryPathProgress", "libraryReports", "lastSavedAt"
]);
const PROJECT_KEYS = new Set([
  "id", "name", "title", "type", "craft", "projectKind", "color", "row", "totalRows", "chartRows",
  "started", "startedAt", "createdAt", "updatedAt", "updated_at", "lastSavedAt", "schemaVersion", "notes",
  "subCounters", "repeatRules", "rowReminders", "rowReminderVoice", "activeRowReminder", "markers", "chart",
  "activeChartAssetId", "assistantMessages", "assistantCalculatorInputs", "projectTools", "toolHistory", "buyList",
  "pdfReference", "attachments", "patternPlan", "chatPreference", "readerStatus", "flowMode", "activeTab",
  "readingMode", "chartMode", "chartZoom", "previewLocked", "annotations", "annotationHistory", "annotationRedo", "annotationColor",
  "annotationWidth", "annotationOpacity", "eraserMode", "eraserSize", "selectedAnnotationId", "rowMask",
  "maskLockSize", "maskLockPosition", "coverAsset", "status", "startDate", "finishDate", "patternUrl", "yarn",
  "needles", "needleSize", "hookSize", "gauge", "size", "sizingNotes", "patternSource", "setup", "projectSetup",
  "projectCalculations", "chartAnalysis", "chartReader", "yarnchaAssistant", "fitCheck", "materials", "cloudAssets",
  "cloudId", "language", "castOn", "libraryChecklist", "linkedLibraryEntries", "fibreContent", "yarnWeight",
  "troubleshootingNotes", "sourceIdeaId", "linkedKit"
]);
const ASSET_KEYS = new Set(["name", "type", "lastModified", "data"]);
const NAMED_COLORS = Object.freeze({
  blue: "#577fa8", red: "#b94a48", green: "#55785d", orange: "#c96c23", purple: "#8a7895",
  yellow: "#c4a269", pink: "#c97b8c", black: "#111111", white: "#ffffff"
});

function fail(path, message) {
  throw new Error(`Invalid Yarncha backup at ${path}: ${message}`);
}

function assertAllowedKeys(value, allowed, path) {
  for (const key of Object.keys(value)) {
    if (DANGEROUS_KEYS.has(key)) fail(`${path}.${key}`, "unsafe key");
    if (!allowed.has(key)) fail(`${path}.${key}`, "unknown key");
  }
}

function validIsoDate(value) {
  return typeof value === "string" && /^20\d\d-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value));
}

function decodedBase64Bytes(value) {
  const clean = value.replace(/=+$/, "");
  return Math.floor(clean.length * 3 / 4);
}

function sanitizeValue(value, path = "state", depth = 0, key = "") {
  if (depth > BACKUP_LIMITS.depth) fail(path, "nesting is too deep");
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || Math.abs(value) > 1_000_000_000) fail(path, "number is outside supported bounds");
    return value;
  }
  if (typeof value === "string") {
    if (value.length > BACKUP_LIMITS.stringLength) fail(path, "text is too long");
    if (/(?:^id$|Id$|_id$|Asset$|BlobId$)/.test(key) && value && !SAFE_ID.test(value)) fail(path, "unsafe identifier");
    if (/(?:color|colour|Hex)$/i.test(key) && value) {
      const normalized = NAMED_COLORS[value.toLowerCase()] || value;
      if (!HEX_COLOR.test(normalized)) fail(path, "colour must be a six-digit HEX value");
      return normalized.toLowerCase();
    }
    if (/(?:Url|URL|Link)$/.test(key) && value) {
      let url;
      try { url = new URL(value); } catch { fail(path, "malformed URL"); }
      if (!["https:", "http:"].includes(url.protocol)) fail(path, "unsupported URL protocol");
    }
    if (key === "fileData" && value) fail(path, "legacy embedded asset URLs are not supported");
    if (["createdAt", "updatedAt", "updated_at", "lastSavedAt", "reviewedAt"].includes(key) && value && !validIsoDate(value)) fail(path, "invalid date");
    if (["startDate", "finishDate", "periodStart"].includes(key) && value && !/^20\d\d-\d\d-\d\d$/.test(value)) fail(path, "invalid calendar date");
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length > BACKUP_LIMITS.arrayItems) fail(path, "array is too large");
    return value.map((item, index) => sanitizeValue(item, `${path}[${index}]`, depth + 1));
  }
  if (!value || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) fail(path, "unsupported value type");
  const keys = Object.keys(value);
  if (keys.length > BACKUP_LIMITS.objectKeys) fail(path, "object has too many keys");
  const clean = {};
  for (const childKey of keys) {
    if (DANGEROUS_KEYS.has(childKey)) fail(`${path}.${childKey}`, "unsafe key");
    clean[childKey] = sanitizeValue(value[childKey], `${path}.${childKey}`, depth + 1, childKey);
  }
  return clean;
}

function newSafeId(prefix, index) {
  const random = globalThis.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${index}-${random}`.slice(0, 80);
}

function remapReferences(value, maps) {
  if (typeof value === "string") return maps.assets.get(value) || maps.projects.get(value) || value;
  if (Array.isArray(value)) return value.map(item => remapReferences(item, maps));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, remapReferences(child, maps)]));
}

export function assertBackupFileSize(size) {
  if (!Number.isFinite(size) || size <= 0 || size > BACKUP_LIMITS.fileBytes) {
    throw new Error(`Yarncha backups must be between 1 byte and ${BACKUP_LIMITS.fileBytes} bytes.`);
  }
}

export function validateBackupDocument(raw, byteLength = 1) {
  assertBackupFileSize(byteLength);
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || Object.getPrototypeOf(raw) !== Object.prototype) fail("backup", "expected an object");
  assertAllowedKeys(raw, BACKUP_KEYS, "backup");
  if (raw.app !== "Yarncha") fail("backup.app", "wrong application");
  if (![2, BACKUP_SCHEMA_VERSION].includes(raw.version)) fail("backup.version", "unsupported version");
  if (!["project", "full"].includes(raw.kind)) fail("backup.kind", "unsupported backup kind");
  if (!validIsoDate(raw.exportedAt)) fail("backup.exportedAt", "invalid date");
  if (raw.storage !== "local-first") fail("backup.storage", "unsupported storage format");
  if (!raw.state || typeof raw.state !== "object" || Array.isArray(raw.state)) fail("backup.state", "expected an object");
  assertAllowedKeys(raw.state, STATE_KEYS, "backup.state");
  if (!Array.isArray(raw.state.projects) || raw.state.projects.length > BACKUP_LIMITS.projects) fail("backup.state.projects", "invalid project list");
  if (!Array.isArray(raw.state.librarySections)) fail("backup.state.librarySections", "missing library sections");

  const cleanState = sanitizeValue(raw.state, "backup.state");
  cleanState.projects.forEach((project, index) => {
    if (!project || typeof project !== "object" || Array.isArray(project)) fail(`backup.state.projects[${index}]`, "expected an object");
    assertAllowedKeys(project, PROJECT_KEYS, `backup.state.projects[${index}]`);
    if (!SAFE_ID.test(String(project.id || ""))) fail(`backup.state.projects[${index}].id`, "unsafe or missing identifier");
    if (typeof project.name !== "string" || !project.name.trim() || project.name.length > 120) fail(`backup.state.projects[${index}].name`, "invalid name");
    if (project.color && !HEX_COLOR.test(project.color)) fail(`backup.state.projects[${index}].color`, "invalid colour");
  });

  if (!raw.assets || typeof raw.assets !== "object" || Array.isArray(raw.assets)) fail("backup.assets", "expected an object");
  const assetEntries = Object.entries(raw.assets);
  if (assetEntries.length > BACKUP_LIMITS.assets) fail("backup.assets", "too many assets");
  let totalAssetBytes = 0;
  const cleanAssets = {};
  for (const [id, asset] of assetEntries) {
    if (!SAFE_ID.test(id)) fail(`backup.assets.${id}`, "unsafe identifier");
    if (!asset || typeof asset !== "object" || Array.isArray(asset)) fail(`backup.assets.${id}`, "expected an object");
    assertAllowedKeys(asset, ASSET_KEYS, `backup.assets.${id}`);
    if (typeof asset.name !== "string" || !asset.name || asset.name.length > 180 || [...asset.name].some(character => character === "/" || character === "\\" || character.charCodeAt(0) < 32)) fail(`backup.assets.${id}.name`, "unsafe filename");
    if (!ALLOWED_MIME_TYPES.has(asset.type)) fail(`backup.assets.${id}.type`, "unsupported MIME type");
    if (!Number.isFinite(asset.lastModified) || asset.lastModified < 0 || asset.lastModified > 4_102_444_800_000) fail(`backup.assets.${id}.lastModified`, "invalid timestamp");
    if (typeof asset.data !== "string") fail(`backup.assets.${id}.data`, "missing data URL");
    const match = asset.data.match(/^data:([^;,]+);base64,((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)$/);
    if (!match || match[1] !== asset.type || !ALLOWED_MIME_TYPES.has(match[1])) fail(`backup.assets.${id}.data`, "malformed or unsafe data URL");
    const bytes = decodedBase64Bytes(match[2]);
    if (bytes > BACKUP_LIMITS.assetBytes) fail(`backup.assets.${id}.data`, "asset is too large");
    totalAssetBytes += bytes;
    if (totalAssetBytes > BACKUP_LIMITS.totalAssetBytes) fail("backup.assets", "combined assets are too large");
    cleanAssets[id] = { name: asset.name, type: asset.type, lastModified: asset.lastModified, data: asset.data };
  }

  const maps = { projects: new Map(), assets: new Map() };
  cleanState.projects.forEach((project, index) => maps.projects.set(project.id, newSafeId("project", index)));
  assetEntries.forEach(([id], index) => maps.assets.set(id, newSafeId("asset", index)));
  const remappedState = remapReferences(cleanState, maps);
  const remappedAssets = Object.fromEntries(Object.entries(cleanAssets).map(([id, asset]) => [maps.assets.get(id), asset]));
  return {
    app: "Yarncha",
    version: BACKUP_SCHEMA_VERSION,
    kind: raw.kind,
    exportedAt: raw.exportedAt,
    storage: "local-first",
    state: remappedState,
    assets: remappedAssets
  };
}

globalThis.YarnchaBackupSecurity = Object.freeze({ BACKUP_SCHEMA_VERSION, BACKUP_LIMITS, assertBackupFileSize, validateBackupDocument });
