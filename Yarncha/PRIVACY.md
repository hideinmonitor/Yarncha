# Yarncha Private Beta Privacy Notice

Last updated: 2026-06-20

Yarncha is a private-beta yarn craft project tracker. This notice is a product draft and should be reviewed before a broad public launch.

## Data Yarncha stores

- Account email and authentication records through Supabase Auth.
- Projects, counters, notes, settings, calculator history, chart metadata, manually corrected cells, and generated pattern drafts in Supabase.
- Uploaded chart and project-cover files in a private Supabase Storage bucket.
- Local draft copies in the browser's localStorage and IndexedDB.

## Chart analysis

Chart analysis runs only when a signed-in user presses **Analyse selected chart**. The selected chart image is sent from a private, short-lived signed URL to the server-side AI provider configured by the Yarncha operator. AI output is not treated as verified: uncertain symbols remain marked uncertain and users must review cells before trusting a written pattern.

## Access and sharing

Database and storage policies restrict signed-in users to their own data. Yarncha does not currently provide public project links. Operators with authorized Supabase administration access may access data only for operation, security, support, or deletion.

## Local storage

Local drafts are browser and device specific. Signing out does not remove local drafts. Clearing browser data can remove them; export a backup first.

## Deletion

Settings includes **Delete account and cloud data**. This permanently removes the Supabase Auth account, database records, and known Yarncha storage objects. Local browser drafts remain until the user clears browser storage or deletes them locally.

## Security boundaries

- The Supabase publishable/anon key may be present in browser code and is protected by Row Level Security.
- Supabase service-role and AI provider keys must remain server-side and must never use a `VITE_` prefix.
- HTTPS is required for the hosted beta.

## Contact

Private-beta feedback currently uses `feedback@yarncha.app`. Replace this placeholder with an actively monitored address before inviting testers.

