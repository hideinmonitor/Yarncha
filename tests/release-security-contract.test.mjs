import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const loader = await readFile(new URL("../src/document-tools-loader.js", import.meta.url), "utf8");
const cloud = await readFile(new URL("../src/cloud/bootstrap.js", import.meta.url), "utf8");
const client = await readFile(new URL("../src/cloud/supabase-client.ts", import.meta.url), "utf8");
const migration = await readFile(new URL("../supabase/migrations/202609090001_release_security.sql", import.meta.url), "utf8");
const edge = await readFile(new URL("../supabase/functions/analyze-chart/index.ts", import.meta.url), "utf8");
const deletion = await readFile(new URL("../supabase/functions/delete-account/index.ts", import.meta.url), "utf8");
const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const privacy = await readFile(new URL("../PRIVACY.md", import.meta.url), "utf8");

assert.match(migration, /own_analysis_update[\s\S]*exists \([\s\S]*chart_uploads[\s\S]*u\.project_id = project_id[\s\S]*u\.user_id = \(select auth\.uid\(\)\)[\s\S]*with check/s, "analysis UPDATE checks the owned upload/project relationship");
assert.match(migration, /upsert_yarncha_sync_records[\s\S]*excluded\.deleted and not yarncha_sync_records\.deleted[\s\S]*excluded\.updated_at > yarncha_sync_records\.updated_at/s, "server sync upsert is deletion-dominant and timestamp ordered");
assert.match(client, /rpc\("upsert_yarncha_sync_records"/, "clients cannot bypass the conditional sync RPC with an unconditional upsert");

assert.match(migration, /yarncha_project_versions_content_unique/, "project snapshots deduplicate on a content hash");
assert.match(migration, /order by created_at desc, id desc offset 30/, "only 30 versions are retained per project");
assert.match(client, /crypto\.subtle\.digest\("SHA-256"/, "meaningful project content is hashed before versioning");
assert.match(cloud, /pushedProjectIds[\s\S]*saveProjectVersion[\s\S]*version-warning/, "only pushed projects are snapshotted and failures are surfaced");

assert.match(migration, /create table if not exists public\.yarncha_ai_request_ledger/, "AI usage has a durable ledger");
assert.match(migration, /unique \(user_id, feature, idempotency_key\)/, "AI idempotency is database-enforced");
assert.match(migration, /pg_advisory_xact_lock[\s\S]*interval '1 minute'[\s\S]*date_trunc\('day'/s, "AI reservation serializes concurrent checks and enforces short/daily limits");
assert.match(migration, /p_global_daily_limit[\s\S]*scope', 'global-day'/s, "AI usage has a global circuit breaker");
assert.match(edge, /Idempotency-Key[\s\S]*reserve_chart_analysis/, "the Edge Function requires a stable idempotency identity before model work");
assert.match(edge, /AI_REQUEST_TIMEOUT_MS[\s\S]*AbortController/s, "upstream analysis has a configurable bounded timeout");
assert.match(edge, /p_status: failure\.code === "timeout" \? "timed-out" : "failed"/, "timeout state is finalized durably");
assert.match(edge, /rate-limited[\s\S]*429[\s\S]*quota-exhausted[\s\S]*429/s, "rate and quota failures return explicit HTTP 429 responses");
assert.match(edge, /\.eq\("user_id", userData\.user\.id\)/, "the requested chart is explicitly constrained to the authenticated owner");
assert.doesNotMatch(client, /OPENAI_API_KEY/, "the browser client contains no OpenAI secret handling");

assert.match(deletion, /while \(true\)[\s\S]*limit: batchSize, offset: 0[\s\S]*remove\(paths\)/s, "account deletion paginates storage until each folder is empty");
assert.match(deletion, /if \(!removed\?\.length\) throw/, "account deletion cannot silently loop without progress");

assert.match(main, /@fontsource\/dm-sans\/latin-400\.css/, "the original UI font is self-hosted in the application bundle");
assert.match(main, /@fontsource\/fraunces\/latin-700\.css/, "the original brand font is self-hosted in the application bundle");
assert.match(loader, /documentToolsPromise[\s\S]*import\("\.\/document-tools\.js"\)/, "document tools are lazy and single-flight");
assert.match(app, /saveStateSoon\(500\)[\s\S]*addEventListener\("blur",flushPendingSave\)/, "heavy notes saves are debounced and flushed on blur");
assert.match(app, /async function ensureSafeToLeave[\s\S]*saveDebounceTimer[\s\S]*await saveState\(\)/, "pending notes flush before navigation");
assert.match(app, /beforeunload[\s\S]*localStorage\.setItem\(STORAGE_KEY,JSON\.stringify\(state\)\)/, "pending notes receive a synchronous page-exit fallback");

const headers = Object.fromEntries(vercel.headers[0].headers.map(header => [header.key, header.value]));
assert.match(headers["Content-Security-Policy"], /default-src 'self'/);
assert.match(headers["Content-Security-Policy"], /script-src 'self'/);
assert.doesNotMatch(headers["Content-Security-Policy"], /script-src[^;]*'unsafe-inline'/, "inline JavaScript is not permitted");
for (const directive of ["object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'", "form-action 'self'", "worker-src", "connect-src", "font-src 'self'"]) assert.ok(headers["Content-Security-Policy"].includes(directive), `CSP includes ${directive}`);
assert.equal(headers["X-Frame-Options"], "DENY");
assert.equal(headers["X-Content-Type-Options"], "nosniff");
assert.ok(headers["Referrer-Policy"]);
assert.ok(headers["Permissions-Policy"]);
assert.match(app, /replaceAll\('onclick="closeModal\(\)"','data-close-modal'\)/, "legacy modal close markup is converted to event listeners before DOM insertion");
const inlineHandlers = [...app.matchAll(/onclick="([^"]+)"/g)].map(match => match[1]);
assert.ok(inlineHandlers.length > 0 && inlineHandlers.every(value => value === "closeModal()"), "no source template depends on arbitrary inline JavaScript");

for (const processor of ["Supabase", "OpenAI", "jsDelivr", "Project Naptha", "Frankfurter"]) assert.match(privacy, new RegExp(processor, "i"), `privacy notice names ${processor}`);
assert.match(privacy, /not fetched automatically at app startup/, "exchange-rate disclosure matches user-triggered fetching");
assert.doesNotMatch(app.slice(app.lastIndexOf("applyLanguage();")), /refreshFxRates\(\);/, "startup does not fetch exchange rates automatically");

console.log("Release security, RLS, AI, retention, privacy, and performance contracts passed.");
