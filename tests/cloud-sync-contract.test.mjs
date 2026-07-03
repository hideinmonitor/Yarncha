import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const cloud = await readFile(new URL("../src/cloud/bootstrap.js", import.meta.url), "utf8");
const client = await readFile(new URL("../src/cloud/supabase-client.ts", import.meta.url), "utf8");
const migration = await readFile(new URL("../supabase/migrations/202606200001_private_beta.sql", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

for (const key of ["QUEUE_KEY", "META_KEY", "HISTORY_KEY", "CONFLICT_KEY", "DEVICE_KEY"]) {
  assert.match(cloud, new RegExp(key), `${key} backs local-first sync metadata`);
}

for (const recordType of ["project", "settings", "yarn-stash", "buy-list", "library", "symbols", "project-ideas", "tool-result"]) {
  assert.match(cloud, new RegExp(recordType), `${recordType} is included in cloud sync records`);
}

assert.match(cloud, /window\.addEventListener\("yarncha:local-save", scheduleCloudSync\)/, "local saves queue cloud sync without blocking local persistence");
assert.match(cloud, /window\.addEventListener\("online", \(\) => scheduleFullSync\("reconnect"/, "sync resumes when internet reconnects");
assert.match(cloud, /document\.addEventListener\("visibilitychange"/, "sync resumes when the app becomes visible");
assert.match(cloud, /setInterval\(\(\) => scheduleFullSync\("interval"/, "sync runs quietly on an interval");
assert.match(cloud, /subscribeToSyncRecords/, "Supabase Realtime changes trigger sync");

for (const label of ["Signed in user", "Current device", "Cloud connected", "Last sync time", "Pending uploads", "Pending downloads", "Storage usage", "Sync health"]) {
  assert.match(cloud, new RegExp(label), `Settings Sync Status shows ${label}`);
}
for (const button of ["Sync Now", "View Sync History", "Export Backup", "Import Backup", "Resolve Conflicts"]) {
  assert.match(cloud, new RegExp(button), `Settings exposes ${button}`);
}

assert.match(cloud, /Continue with Apple/, "Apple sign-in is available");
assert.match(cloud, /Continue with Google/, "Google sign-in is available");
assert.match(client, /signInWithProvider\(provider: "apple" \| "google"\)/, "Supabase OAuth provider helper exists");

for (const table of ["yarncha_sync_records", "yarncha_sync_devices", "yarncha_project_versions", "yarncha_sync_conflicts"]) {
  assert.match(migration, new RegExp(`create table if not exists public\\.${table}`), `${table} table exists`);
  assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`), `${table} has RLS enabled`);
}

assert.match(migration, /primary key \(user_id, id\)/, "sync records and devices are user-owned");
assert.match(migration, /record_type text not null/, "sync records keep a typed payload");
assert.match(migration, /sync_version integer not null default 1/, "sync metadata includes sync_version");
assert.match(migration, /deleted boolean not null default false/, "sync metadata includes deleted tombstones");
assert.match(migration, /last_synced_at timestamptz/, "sync metadata includes last_synced_at");

for (const localApi of ["exportBackup", "importBackup", "mergeLibrarySections"]) {
  assert.match(app, new RegExp(localApi), `YarnchaLocal exposes ${localApi} to cloud sync`);
}

console.log("Cloud sync contract passed.");
