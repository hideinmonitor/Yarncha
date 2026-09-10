export const SYNC_VERSION = 2;
export const SYNC_RESULT = Object.freeze({
  SYNCED: "synced",
  QUEUED_OFFLINE: "queued-offline",
  ALREADY_RUNNING: "already-running",
  LOCAL_ONLY: "local-only",
  FAILED: "failed"
});

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$/;

export function assertSyncLocalId(value) {
  const id = String(value || "");
  if (!SAFE_ID.test(id)) throw new Error("Unsafe sync record identifier.");
  return id;
}

export function stableRecordId(type, localId) {
  return `${assertSyncLocalId(type)}:${assertSyncLocalId(localId)}`;
}

export function createSyncRecord({ type, localId, payload, deviceId, updatedAt, createdAt, deleted = false }) {
  const safeLocalId = assertSyncLocalId(localId);
  const timestamp = new Date(updatedAt || Date.now()).toISOString();
  return {
    id: stableRecordId(type, safeLocalId),
    record_type: assertSyncLocalId(type),
    local_id: safeLocalId,
    payload: deleted ? { id: safeLocalId, deletedAt: timestamp } : structuredClone(payload ?? null),
    created_at: new Date(createdAt || timestamp).toISOString(),
    updated_at: timestamp,
    device_id: assertSyncLocalId(deviceId),
    sync_version: SYNC_VERSION,
    deleted: Boolean(deleted)
  };
}

export function createProjectTombstone(localId, deviceId, timestamp = new Date().toISOString()) {
  return createSyncRecord({ type: "project", localId, payload: null, deviceId, updatedAt: timestamp, createdAt: timestamp, deleted: true });
}

export function supersedeQueuedRecord(queue = [], incoming) {
  const records = queue.filter(record => {
    if (record.id === incoming.id) return false;
    if (incoming.deleted && record.record_type === "tool-result" && String(record.local_id).startsWith(`${incoming.local_id}:`)) return false;
    return true;
  });
  const existingTombstone = queue.find(record => record.id === incoming.id && record.deleted);
  if (existingTombstone && !incoming.deleted) return [...records, existingTombstone];
  return [...records, incoming];
}

export function resolveServerRecord(existing, incoming) {
  if (!existing) return incoming;
  if (existing.deleted && !incoming.deleted) return existing;
  if (incoming.deleted && !existing.deleted) return incoming;
  const existingTime = Date.parse(existing.updated_at) || 0;
  const incomingTime = Date.parse(incoming.updated_at) || 0;
  if (incomingTime > existingTime) return incoming;
  if (incomingTime < existingTime) return existing;
  return incoming.deleted ? incoming : existing;
}

export function applyProjectRecords(projects = [], records = [], rememberedTombstones = []) {
  const projectMap = new Map(projects.map(project => [String(project.id), structuredClone(project)]));
  const tombstones = new Set(rememberedTombstones.map(String));
  for (const record of records) {
    if (record.record_type !== "project") continue;
    const id = String(record.local_id);
    if (record.deleted) {
      tombstones.add(id);
      projectMap.delete(id);
    } else if (!tombstones.has(id)) {
      projectMap.set(id, structuredClone(record.payload || {}));
    }
  }
  return { projects: [...projectMap.values()], tombstones: [...tombstones] };
}

export function describeSyncResult(result = {}, context = "Project") {
  switch (result.status) {
    case SYNC_RESULT.SYNCED:
      return { statusText: "Saved locally · Synced to cloud", toast: `✓ ${context} saved · ✓ Synced to cloud`, tone: "success" };
    case SYNC_RESULT.QUEUED_OFFLINE:
      return { statusText: "Saved locally · Cloud sync queued", toast: `✓ ${context} saved locally · Cloud sync queued`, tone: "pending" };
    case SYNC_RESULT.ALREADY_RUNNING:
      return { statusText: "Saved locally · Cloud sync in progress", toast: `✓ ${context} saved locally · Cloud sync in progress`, tone: "pending" };
    case SYNC_RESULT.FAILED:
      return { statusText: "Saved locally · Cloud sync failed", toast: `✓ ${context} saved locally · Cloud sync failed`, tone: "error" };
    default:
      return { statusText: "Saved on this device", toast: `✓ ${context} saved`, tone: "saved" };
  }
}

globalThis.YarnchaSyncProtocol = Object.freeze({
  SYNC_VERSION,
  SYNC_RESULT,
  createSyncRecord,
  createProjectTombstone,
  supersedeQueuedRecord,
  resolveServerRecord,
  applyProjectRecords,
  describeSyncResult
});
