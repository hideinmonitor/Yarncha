# Yarncha Private Beta Release Guide

## What is implemented

- Supabase email/password authentication.
- Strict user-owned projects and chart records using Row Level Security.
- Private `knitting-charts` storage with user-id path policies.
- Explicit **Move my local projects to cloud** migration; local drafts remain.
- Debounced cloud autosave for projects, tool history, and settings after sign-in.
- Cloud asset restore into IndexedDB on another browser/device.
- Review-first chart pipeline: upload, analyse, edit cells, save corrections, generate and store a checked pattern draft.
- Account/cloud-data deletion, privacy notice, backup/export, feedback link, loading/error states.

## 1. Install and build

```bash
npm install
npm run build
```

The production output is `dist/`. The existing local-only Python preview remains useful for the core app, but Supabase TypeScript modules and production environment variables require the Vite command:

```bash
npm run dev
```

## 2. Create and configure Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/202606200001_private_beta.sql` with the CLI or SQL editor.
3. In Authentication, enable Email and decide whether email confirmation is required.
4. Set Site URL and Redirect URLs to the eventual Vercel production and preview URLs.
5. Deploy the functions:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy analyze-chart
supabase functions deploy delete-account
supabase secrets set OPENAI_API_KEY=YOUR_SERVER_KEY
supabase secrets set OPENAI_VISION_MODEL=gpt-5.4-mini
```

Do not put `OPENAI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in `.env`, Vite variables, browser code, or Vercel frontend variables. Supabase provides its own function runtime secrets; account deletion uses the runtime service-role key.

## 3. Configure Vercel

Create these Vercel variables for Production, Preview, and Development:

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

Then deploy:

```bash
vercel login
vercel link
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
vercel deploy --prod
```

Vercel provides HTTPS automatically for its deployment URL. Confirm the final URL is also listed in Supabase Auth redirect settings.

## 4. Private-beta smoke test

- [ ] Production URL loads over HTTPS with no blocking console error.
- [ ] Manifest, service worker, favicon, 192/512 icons, and Add to Home Screen work.
- [ ] New email signup and confirmation work.
- [ ] Signed-in user can create and reopen a project.
- [ ] Local project migration keeps the local copy and creates one cloud copy.
- [ ] Row, notes, annotations, row mask, cover and chart survive refresh/browser restart.
- [ ] A second test account cannot select, update, delete, or download the first account's data.
- [ ] Chart image upload creates `chart_uploads`; PDF remains manual-only for AI analysis.
- [ ] Analysis marks unclear cells uncertain; corrections persist.
- [ ] Generated pattern is saved only after review.
- [ ] Offline app shell and local draft work; cloud status reports retry rather than losing edits.
- [ ] Exported project JSON still downloads and imports.
- [ ] Account deletion removes Auth, database, and storage data while explaining that local drafts remain.
- [ ] iPhone Safari: 390/430 px, safe areas, upload, auth, save/reopen, install.
- [ ] Android Chrome: upload, auth, save/reopen, install.
- [ ] Desktop: Chrome/Safari responsive layout and keyboard operation.

## 5. Manual security verification

Use two beta accounts and the Supabase SQL/API tools. Attempt cross-user reads and writes against every table and an object path owned by the other account. Every attempt must return no rows or an authorization error. Do not launch from table existence alone.

## Known release blockers

- This workspace has no Supabase project credentials or authenticated Vercel session, so the migration, Edge Functions, production environment variables, and public URL cannot be applied from here yet.
- Dependency installation/build could not be executed in this sandbox because its bundled Node runtime does not include npm and socket binding is restricted.
- AI chart transcription needs evaluation with licensed, representative knitting/crochet charts before its confidence labels can be considered calibrated.
- PDF pages are stored and viewable but the AI Edge Function intentionally accepts images only in this first beta.
- `feedback@yarncha.app` is a placeholder until a monitored beta-feedback address is chosen.

