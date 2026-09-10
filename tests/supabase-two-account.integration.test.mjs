import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@supabase/supabase-js";

const enabled = process.env.YARNCHA_SUPABASE_INTEGRATION === "1";
const required = [
  "YARNCHA_SUPABASE_URL", "YARNCHA_SUPABASE_ANON_KEY",
  "YARNCHA_TEST_A_EMAIL", "YARNCHA_TEST_A_PASSWORD",
  "YARNCHA_TEST_B_EMAIL", "YARNCHA_TEST_B_PASSWORD"
];
const missing = required.filter(name => !process.env[name]);

test("two-account RLS and storage isolation", { skip: !enabled || missing.length ? `set YARNCHA_SUPABASE_INTEGRATION=1 and isolated test credentials (${missing.join(", ") || "gate disabled"})` : false }, async t => {
  const url = process.env.YARNCHA_SUPABASE_URL;
  const key = process.env.YARNCHA_SUPABASE_ANON_KEY;
  const makeClient = () => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const accountA = makeClient(), accountB = makeClient();
  const { data: authA, error: authAError } = await accountA.auth.signInWithPassword({ email: process.env.YARNCHA_TEST_A_EMAIL, password: process.env.YARNCHA_TEST_A_PASSWORD });
  const { data: authB, error: authBError } = await accountB.auth.signInWithPassword({ email: process.env.YARNCHA_TEST_B_EMAIL, password: process.env.YARNCHA_TEST_B_PASSWORD });
  assert.ifError(authAError); assert.ifError(authBError);
  const suffix = `${Date.now()}-${crypto.randomUUID()}`;

  async function project(client, userId, owner) {
    const { data, error } = await client.from("knitting_projects").insert({ user_id: userId, local_id: `rls-${owner}-${suffix}`, title: `RLS ${owner}`, craft_type: "knitting", project_data: {} }).select().single();
    assert.ifError(error); return data;
  }
  const projectA = await project(accountA, authA.user.id, "a");
  const projectB = await project(accountB, authB.user.id, "b");
  const pathB = `${authB.user.id}/${projectB.id}/chart/rls-${suffix}.png`;
  t.after(async () => {
    await accountB.storage.from("knitting-charts").remove([pathB]);
    await accountA.from("knitting_projects").delete().eq("id", projectA.id);
    await accountB.from("knitting_projects").delete().eq("id", projectB.id);
    await accountA.auth.signOut(); await accountB.auth.signOut();
  });

  const { error: storageUploadError } = await accountB.storage.from("knitting-charts").upload(pathB, new Blob([new Uint8Array([137, 80, 78, 71])], { type: "image/png" }));
  assert.ifError(storageUploadError);
  const { data: uploadB, error: uploadBError } = await accountB.from("chart_uploads").insert({ project_id: projectB.id, user_id: authB.user.id, image_url: pathB, storage_path: pathB, original_filename: "rls.png", mime_type: "image/png" }).select().single();
  assert.ifError(uploadBError);
  const { data: uploadA, error: uploadAError } = await accountA.from("chart_uploads").insert({ project_id: projectA.id, user_id: authA.user.id, image_url: "test", storage_path: "test", original_filename: "rls.png", mime_type: "image/png" }).select().single();
  assert.ifError(uploadAError);
  const { data: analysisA, error: analysisAError } = await accountA.from("chart_analyses").insert({ upload_id: uploadA.id, project_id: projectA.id, user_id: authA.user.id, status: "processing" }).select().single();
  assert.ifError(analysisAError);

  const { data: selectedB, error: selectError } = await accountA.from("knitting_projects").select("id").eq("id", projectB.id);
  assert.ifError(selectError); assert.deepEqual(selectedB, [], "A cannot select B's project");
  const { data: updatedB, error: updateError } = await accountA.from("knitting_projects").update({ title: "cross-tenant" }).eq("id", projectB.id).select("id");
  assert.ifError(updateError); assert.deepEqual(updatedB, [], "A cannot update B's project");
  const { data: deletedB, error: deleteError } = await accountA.from("knitting_projects").delete().eq("id", projectB.id).select("id");
  assert.ifError(deleteError); assert.deepEqual(deletedB, [], "A cannot delete B's project");

  const { error: crossInsertError } = await accountA.from("chart_uploads").insert({ project_id: projectB.id, user_id: authA.user.id, image_url: "x", storage_path: "x", original_filename: "x.png", mime_type: "image/png" });
  assert.ok(crossInsertError, "A cannot insert a chart against B's project");
  const { error: crossCellError } = await accountA.from("chart_cells").insert({ upload_id: uploadB.id, row_number: 1, column_number: 1, symbol: "x", meaning: "x" });
  assert.ok(crossCellError, "A cannot insert a cell against B's upload");
  const { error: crossLinkError } = await accountA.from("chart_analyses").update({ upload_id: uploadB.id, project_id: projectB.id }).eq("id", analysisA.id).select("id");
  assert.ok(crossLinkError, "A cannot cross-link its analysis row to B's upload/project");
  const { error: storageReadError } = await accountA.storage.from("knitting-charts").download(pathB);
  assert.ok(storageReadError, "A cannot download B's private storage object");
});
