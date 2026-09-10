import assert from "node:assert/strict";
import {
  SYNC_RESULT,
  applyProjectRecords,
  createProjectTombstone,
  createSyncRecord,
  describeSyncResult,
  resolveServerRecord,
  supersedeQueuedRecord
} from "../src/cloud/sync-protocol.js";
import { readFile } from "node:fs/promises";

const older = "2026-09-09T01:00:00.000Z";
const newer = "2026-09-09T02:00:00.000Z";
const liveA = createSyncRecord({ type: "project", localId: "p1", payload: { id: "p1", name: "A" }, deviceId: "device-a", updatedAt: older });
const tombstoneA = createProjectTombstone("p1", "device-a", newer);
const staleB = createSyncRecord({ type: "project", localId: "p1", payload: { id: "p1", name: "stale B" }, deviceId: "device-b", updatedAt: older });

const queue = supersedeQueuedRecord([liveA], tombstoneA);
assert.deepEqual(queue, [tombstoneA], "a tombstone supersedes the queued live project");
assert.deepEqual(supersedeQueuedRecord(queue, staleB), [tombstoneA], "a queued tombstone cannot be replaced by a live update");
assert.equal(resolveServerRecord(liveA, tombstoneA).deleted, true, "deletion wins against a live server row");
assert.equal(resolveServerRecord(tombstoneA, staleB).deleted, true, "a stale device update cannot resurrect a deletion");

const deviceB = applyProjectRecords([], [liveA]);
assert.equal(deviceB.projects[0].name, "A", "create on A appears on B");
const deletedOnB = applyProjectRecords(deviceB.projects, [tombstoneA]);
assert.equal(deletedOnB.projects.length, 0, "delete on A removes the project on B");
const reconnectWithStaleUpdate = applyProjectRecords(deletedOnB.projects, [staleB], deletedOnB.tombstones);
assert.equal(reconnectWithStaleUpdate.projects.length, 0, "offline delete followed by a stale B update stays deleted");
const afterReload = applyProjectRecords([], [staleB], ["p1"]);
assert.equal(afterReload.projects.length, 0, "remembered tombstones survive the reload model");

assert.match(describeSyncResult({ status: SYNC_RESULT.SYNCED }).statusText, /Synced to cloud/);
assert.match(describeSyncResult({ status: SYNC_RESULT.QUEUED_OFFLINE }).statusText, /sync queued/);
assert.match(describeSyncResult({ status: SYNC_RESULT.ALREADY_RUNNING }).statusText, /in progress/);
assert.match(describeSyncResult({ status: SYNC_RESULT.FAILED }).statusText, /sync failed/);
assert.doesNotMatch(describeSyncResult({ status: SYNC_RESULT.LOCAL_ONLY }).statusText, /cloud/i);

const bootstrap = await readFile(new URL("../src/cloud/bootstrap.js", import.meta.url), "utf8");
assert.match(bootstrap, /TOMBSTONE_KEY[\s\S]*localStorage/, "tombstones are durable across reloads");
assert.match(bootstrap, /await upsertSyncRecords\(queue\)[\s\S]*writeQueue\(\[\]\)/, "pending operations clear only after server acknowledgement");
assert.match(bootstrap, /catch \(error\)[\s\S]*SYNC_RESULT\.FAILED[\s\S]*pendingQueue\(\)\.length/, "failed deletion/sync work remains queued for retry");
assert.match(bootstrap, /window\.addEventListener\("online"[\s\S]*scheduleFullSync\("reconnect"/, "offline work retries on reconnect");

console.log("Sync and tombstone protocol contract passed.");
