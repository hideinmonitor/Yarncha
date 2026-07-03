-- Yarncha private beta: auth-owned projects, chart review, and local-first sync.
-- Run with `supabase db push` or paste into the Supabase SQL editor once.

create extension if not exists pgcrypto;

do $$ begin
  create type public.yarncha_craft_type as enum ('knitting', 'crochet');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.chart_upload_status as enum ('uploaded', 'processing', 'completed', 'failed');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knitting_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text not null,
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '',
  language text not null default 'en',
  craft_type public.yarncha_craft_type not null default 'knitting',
  project_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, local_id)
);

create table if not exists public.chart_uploads (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.knitting_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text not null,
  storage_path text not null,
  original_filename text not null,
  mime_type text,
  status public.chart_upload_status not null default 'uploaded',
  detected_rows integer check (detected_rows is null or detected_rows > 0),
  detected_columns integer check (detected_columns is null or detected_columns > 0),
  legend_json jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.chart_cells (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.chart_uploads(id) on delete cascade,
  row_number integer not null check (row_number > 0),
  column_number integer not null check (column_number > 0),
  symbol text not null default 'uncertain',
  meaning text not null default 'uncertain',
  confidence numeric(5,4) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  is_user_corrected boolean not null default false,
  created_at timestamptz not null default now(),
  unique (upload_id, row_number, column_number)
);

create table if not exists public.generated_patterns (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.knitting_projects(id) on delete cascade,
  upload_id uuid not null references public.chart_uploads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  pattern_text text not null,
  pattern_json jsonb not null default '{}'::jsonb,
  difficulty_level text not null default 'not assessed',
  created_at timestamptz not null default now()
);

create table if not exists public.chart_analyses (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.chart_uploads(id) on delete cascade,
  project_id uuid not null references public.knitting_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  model_name text,
  status public.chart_upload_status not null default 'processing',
  confidence_label text not null default 'low',
  warnings jsonb not null default '[]'::jsonb,
  raw_result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_results (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.knitting_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text,
  tool_name text not null,
  craft_type text not null default 'shared',
  inputs jsonb not null default '{}'::jsonb,
  outputs jsonb not null default '{}'::jsonb,
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, local_id)
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.yarncha_sync_records (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  record_type text not null,
  local_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  sync_version integer not null default 1,
  deleted boolean not null default false,
  last_synced_at timestamptz,
  primary key (user_id, id)
);

create table if not exists public.yarncha_sync_devices (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Yarncha device',
  user_agent text not null default '',
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.yarncha_project_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_local_id text not null,
  device_id text not null,
  label text not null default 'Project version',
  project_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.yarncha_sync_conflicts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  record_id text not null,
  record_type text not null,
  local_payload jsonb not null default '{}'::jsonb,
  cloud_payload jsonb not null default '{}'::jsonb,
  local_updated_at timestamptz,
  cloud_updated_at timestamptz,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists knitting_projects_user_id_idx on public.knitting_projects(user_id);
create index if not exists chart_uploads_user_id_idx on public.chart_uploads(user_id);
create index if not exists chart_uploads_project_id_idx on public.chart_uploads(project_id);
create index if not exists chart_cells_upload_id_idx on public.chart_cells(upload_id);
create index if not exists generated_patterns_user_id_idx on public.generated_patterns(user_id);
create index if not exists chart_analyses_user_id_idx on public.chart_analyses(user_id);
create index if not exists tool_results_user_id_idx on public.tool_results(user_id);
create index if not exists yarncha_sync_records_user_updated_idx on public.yarncha_sync_records(user_id, updated_at);
create index if not exists yarncha_sync_records_user_type_idx on public.yarncha_sync_records(user_id, record_type);
create index if not exists yarncha_sync_devices_user_active_idx on public.yarncha_sync_devices(user_id, last_active_at desc);
create index if not exists yarncha_project_versions_user_project_idx on public.yarncha_project_versions(user_id, project_local_id, created_at desc);
create index if not exists yarncha_sync_conflicts_user_status_idx on public.yarncha_sync_conflicts(user_id, status, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists projects_set_updated_at on public.knitting_projects;
create trigger projects_set_updated_at before update on public.knitting_projects
for each row execute function public.set_updated_at();
drop trigger if exists settings_set_updated_at on public.user_settings;
create trigger settings_set_updated_at before update on public.user_settings
for each row execute function public.set_updated_at();
drop trigger if exists yarncha_sync_records_set_updated_at on public.yarncha_sync_records;
create trigger yarncha_sync_records_set_updated_at before update on public.yarncha_sync_records
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, email, display_name)
select id, email, coalesce(raw_user_meta_data ->> 'display_name', '') from auth.users
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.knitting_projects enable row level security;
alter table public.chart_uploads enable row level security;
alter table public.chart_cells enable row level security;
alter table public.generated_patterns enable row level security;
alter table public.chart_analyses enable row level security;
alter table public.tool_results enable row level security;
alter table public.user_settings enable row level security;
alter table public.yarncha_sync_records enable row level security;
alter table public.yarncha_sync_devices enable row level security;
alter table public.yarncha_project_versions enable row level security;
alter table public.yarncha_sync_conflicts enable row level security;

-- Direct ownership policies.
do $$
declare table_name text;
begin
  foreach table_name in array array['knitting_projects','chart_uploads','generated_patterns','chart_analyses','tool_results'] loop
    execute format('drop policy if exists "own_select" on public.%I', table_name);
    execute format('drop policy if exists "own_insert" on public.%I', table_name);
    execute format('drop policy if exists "own_update" on public.%I', table_name);
    execute format('drop policy if exists "own_delete" on public.%I', table_name);
    execute format('create policy "own_select" on public.%I for select to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_insert" on public.%I for insert to authenticated with check ((select auth.uid()) is not null and (select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_update" on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_delete" on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name);
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array['yarncha_sync_records','yarncha_sync_devices','yarncha_project_versions','yarncha_sync_conflicts'] loop
    execute format('drop policy if exists "own_select" on public.%I', table_name);
    execute format('drop policy if exists "own_insert" on public.%I', table_name);
    execute format('drop policy if exists "own_update" on public.%I', table_name);
    execute format('drop policy if exists "own_delete" on public.%I', table_name);
    execute format('create policy "own_select" on public.%I for select to authenticated using ((select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_insert" on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_update" on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name);
    execute format('create policy "own_delete" on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name);
  end loop;
end $$;

-- Relationship checks prevent a user from attaching owned rows to another user's
-- project or upload even if they somehow learn its UUID.
drop policy if exists "own_insert" on public.chart_uploads;
drop policy if exists "own_update" on public.chart_uploads;
create policy "own_insert_with_project" on public.chart_uploads for insert to authenticated
with check (user_id = (select auth.uid()) and exists (
  select 1 from public.knitting_projects p where p.id = project_id and p.user_id = (select auth.uid())
));
create policy "own_update_with_project" on public.chart_uploads for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and exists (
  select 1 from public.knitting_projects p where p.id = project_id and p.user_id = (select auth.uid())
));

drop policy if exists "own_insert" on public.generated_patterns;
drop policy if exists "own_update" on public.generated_patterns;
create policy "own_insert_with_upload" on public.generated_patterns for insert to authenticated
with check (user_id = (select auth.uid()) and exists (
  select 1 from public.chart_uploads u where u.id = upload_id and u.project_id = project_id and u.user_id = (select auth.uid())
));
create policy "own_update_with_upload" on public.generated_patterns for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and exists (
  select 1 from public.chart_uploads u where u.id = upload_id and u.project_id = project_id and u.user_id = (select auth.uid())
));

drop policy if exists "own_insert" on public.chart_analyses;
drop policy if exists "own_update" on public.chart_analyses;
create policy "own_analysis_insert" on public.chart_analyses for insert to authenticated
with check (user_id = (select auth.uid()) and exists (
  select 1 from public.chart_uploads u where u.id = upload_id and u.project_id = project_id and u.user_id = (select auth.uid())
));
create policy "own_analysis_update" on public.chart_analyses for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "own_insert" on public.tool_results;
drop policy if exists "own_update" on public.tool_results;
create policy "own_tool_result_insert" on public.tool_results for insert to authenticated
with check (user_id = (select auth.uid()) and (project_id is null or exists (
  select 1 from public.knitting_projects p where p.id = project_id and p.user_id = (select auth.uid())
)));
create policy "own_tool_result_update" on public.tool_results for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and (project_id is null or exists (
  select 1 from public.knitting_projects p where p.id = project_id and p.user_id = (select auth.uid())
)));

drop policy if exists "own_profile_select" on public.profiles;
drop policy if exists "own_profile_insert" on public.profiles;
drop policy if exists "own_profile_update" on public.profiles;
drop policy if exists "own_profile_delete" on public.profiles;
create policy "own_profile_select" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "own_profile_insert" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "own_profile_update" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "own_profile_delete" on public.profiles for delete to authenticated using ((select auth.uid()) = id);

drop policy if exists "own_settings_select" on public.user_settings;
drop policy if exists "own_settings_insert" on public.user_settings;
drop policy if exists "own_settings_update" on public.user_settings;
drop policy if exists "own_settings_delete" on public.user_settings;
create policy "own_settings_select" on public.user_settings for select to authenticated using ((select auth.uid()) = user_id);
create policy "own_settings_insert" on public.user_settings for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own_settings_update" on public.user_settings for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own_settings_delete" on public.user_settings for delete to authenticated using ((select auth.uid()) = user_id);

-- chart_cells intentionally checks ownership through chart_uploads.user_id.
drop policy if exists "chart_cells_select_through_upload" on public.chart_cells;
drop policy if exists "chart_cells_insert_through_upload" on public.chart_cells;
drop policy if exists "chart_cells_update_through_upload" on public.chart_cells;
drop policy if exists "chart_cells_delete_through_upload" on public.chart_cells;
create policy "chart_cells_select_through_upload" on public.chart_cells for select to authenticated
using (exists (select 1 from public.chart_uploads u where u.id = upload_id and u.user_id = (select auth.uid())));
create policy "chart_cells_insert_through_upload" on public.chart_cells for insert to authenticated
with check (exists (select 1 from public.chart_uploads u where u.id = upload_id and u.user_id = (select auth.uid())));
create policy "chart_cells_update_through_upload" on public.chart_cells for update to authenticated
using (exists (select 1 from public.chart_uploads u where u.id = upload_id and u.user_id = (select auth.uid())))
with check (exists (select 1 from public.chart_uploads u where u.id = upload_id and u.user_id = (select auth.uid())));
create policy "chart_cells_delete_through_upload" on public.chart_cells for delete to authenticated
using (exists (select 1 from public.chart_uploads u where u.id = upload_id and u.user_id = (select auth.uid())));

-- Private chart storage. Object names must begin with the authenticated user id.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('knitting-charts', 'knitting-charts', false, 83886080, array['image/png','image/jpeg','image/webp','image/heic','application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "chart_objects_select_own" on storage.objects;
drop policy if exists "chart_objects_insert_own" on storage.objects;
drop policy if exists "chart_objects_update_own" on storage.objects;
drop policy if exists "chart_objects_delete_own" on storage.objects;
create policy "chart_objects_select_own" on storage.objects for select to authenticated
using (bucket_id = 'knitting-charts' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "chart_objects_insert_own" on storage.objects for insert to authenticated
with check (bucket_id = 'knitting-charts' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "chart_objects_update_own" on storage.objects for update to authenticated
using (bucket_id = 'knitting-charts' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'knitting-charts' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "chart_objects_delete_own" on storage.objects for delete to authenticated
using (bucket_id = 'knitting-charts' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Compatibility names requested by the beta brief. They are security-invoker views,
-- so the canonical base-table RLS policies still apply and data is not duplicated.
create or replace view public.users with (security_invoker = true) as
select id, email, display_name, created_at, updated_at from public.profiles;
create or replace view public.projects with (security_invoker = true) as
select * from public.knitting_projects;
create or replace view public.charts with (security_invoker = true) as
select * from public.chart_uploads;

grant select, insert, update, delete on public.profiles, public.knitting_projects, public.chart_uploads,
  public.chart_cells, public.generated_patterns, public.chart_analyses, public.tool_results, public.user_settings,
  public.yarncha_sync_records, public.yarncha_sync_devices, public.yarncha_project_versions, public.yarncha_sync_conflicts to authenticated;
grant select on public.users, public.projects, public.charts to authenticated;
