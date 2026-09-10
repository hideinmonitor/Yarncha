# Yarncha Private Beta Privacy Notice

Last updated: 2026-09-09

Yarncha is a private-beta yarn craft project tracker. This notice is a product draft and should be reviewed before a broad public launch.

## Data Yarncha stores

- Account email and authentication records through Supabase Auth.
- Projects, counters, notes, settings, calculator history, chart metadata, manually corrected cells, and generated pattern drafts in Supabase.
- Uploaded chart and project-cover files in a private Supabase Storage bucket.
- Local draft copies in the browser's localStorage and IndexedDB.

## Chart analysis

Chart analysis runs only when a signed-in user presses **Analyse selected chart**. The selected chart image is sent from a private, short-lived signed URL to OpenAI, the server-side AI provider currently configured by Yarncha. AI output is not treated as verified: uncertain symbols remain marked uncertain and users must review cells before trusting a written pattern.

Yarncha keeps a server-side request ledger for abuse prevention, idempotency, quota enforcement, troubleshooting, and cost monitoring. It records the account, related chart/project, request state and time, token counts, estimated cost, and the structured result or a bounded error message. The operator must configure and document a retention period before public launch.

## Other network connections

- Supabase provides account authentication, private database sync, realtime sync, file storage, and server functions after cloud features are configured. Local-only use does not require an account.
- DM Sans and Fraunces font files are bundled with Yarncha and do not contact a font provider.
- PDF.js is bundled and loaded only when a document feature is used.
- OCR starts only after the user asks Yarncha to scan a file. The OCR worker/core are then downloaded from jsDelivr and language models from Project Naptha. The selected file is processed in the browser and is not uploaded to those hosts by the OCR workflow.
- Exchange-rate data is requested from Frankfurter only when the user opens or refreshes a currency feature; it is not fetched automatically at app startup.
- A chart image is sent to the configured AI provider only after the user explicitly presses the analysis control.

## Access and sharing

Database and storage policies restrict signed-in users to their own data. Yarncha does not currently provide public project links. Operators with authorized Supabase administration access may access data only for operation, security, support, or deletion.

## Local storage

Local drafts are browser and device specific. Signing out does not remove local drafts. Clearing browser data can remove them; export a backup first.

## Deletion

Settings includes **Delete account and cloud data**. This permanently removes the Supabase Auth account, database records, and known Yarncha storage objects. Local browser drafts remain until the user clears browser storage or deletes them locally.

Storage deletion is processed in bounded batches until every object associated with each owned project folder is gone. Yarncha reports success only after the storage cleanup and account deletion complete.

## Security boundaries

- The Supabase publishable/anon key may be present in browser code and is protected by Row Level Security.
- Supabase service-role and AI provider keys must remain server-side and must never use a `VITE_` prefix.
- HTTPS is required for the hosted beta.
- Imported backup files are schema-validated, size-limited, assigned fresh internal identifiers, and rejected before storage when they contain unsafe values.

## Contact

Private-beta feedback currently uses `feedback@yarncha.app`. Replace this placeholder with an actively monitored address before inviting testers.
