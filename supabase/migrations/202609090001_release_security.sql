-- Yarncha release security remediation: deletion-dominant sync, bounded version
-- history, relationship-safe analysis updates, and server-enforced AI quotas.

create extension if not exists pgcrypto;

drop policy if exists "own_analysis_update" on public.chart_analyses;
create policy "own_analysis_update" on public.chart_analyses for update to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.chart_uploads u
    where u.id = upload_id and u.project_id = project_id and u.user_id = (select auth.uid())
  )
)
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.chart_uploads u
    where u.id = upload_id and u.project_id = project_id and u.user_id = (select auth.uid())
  )
);

create or replace function public.upsert_yarncha_sync_records(p_records jsonb)
returns setof public.yarncha_sync_records
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  owner_id uuid := auth.uid();
  item jsonb;
begin
  if owner_id is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_records) <> 'array' or jsonb_array_length(p_records) > 1000 then
    raise exception 'Sync batch must be an array of at most 1000 records';
  end if;

  for item in select value from jsonb_array_elements(p_records) loop
    if coalesce(item->>'id', '') !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,193}$'
      or coalesce(item->>'record_type', '') !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$'
      or coalesce(item->>'local_id', '') !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$'
      or coalesce(item->>'device_id', '') !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$'
      or jsonb_typeof(coalesce(item->'payload', '{}'::jsonb)) <> 'object' then
      raise exception 'Invalid sync record';
    end if;

    insert into public.yarncha_sync_records (
      id, user_id, record_type, local_id, payload, created_at, updated_at,
      device_id, sync_version, deleted, last_synced_at
    ) values (
      item->>'id', owner_id, item->>'record_type', item->>'local_id',
      coalesce(item->'payload', '{}'::jsonb),
      coalesce((item->>'created_at')::timestamptz, now()),
      coalesce((item->>'updated_at')::timestamptz, now()),
      item->>'device_id', greatest(2, coalesce((item->>'sync_version')::integer, 2)),
      coalesce((item->>'deleted')::boolean, false), now()
    )
    on conflict (user_id, id) do update set
      record_type = excluded.record_type,
      local_id = excluded.local_id,
      payload = excluded.payload,
      updated_at = excluded.updated_at,
      device_id = excluded.device_id,
      sync_version = excluded.sync_version,
      deleted = excluded.deleted,
      last_synced_at = now()
    where
      (excluded.deleted and not yarncha_sync_records.deleted)
      or (
        excluded.deleted = yarncha_sync_records.deleted
        and excluded.updated_at > yarncha_sync_records.updated_at
      );
  end loop;

  return query
    select r.* from public.yarncha_sync_records r
    where r.user_id = owner_id
      and r.id in (select value->>'id' from jsonb_array_elements(p_records));
end;
$$;

revoke all on function public.upsert_yarncha_sync_records(jsonb) from public;
grant execute on function public.upsert_yarncha_sync_records(jsonb) to authenticated;

alter table public.yarncha_project_versions add column if not exists content_hash text;
update public.yarncha_project_versions
set content_hash = encode(digest(project_data::text, 'sha256'), 'hex')
where content_hash is null;
alter table public.yarncha_project_versions alter column content_hash set not null;

with duplicates as (
  select id, row_number() over (
    partition by user_id, project_local_id, content_hash order by created_at desc, id desc
  ) as position
  from public.yarncha_project_versions
)
delete from public.yarncha_project_versions v
using duplicates d where v.id = d.id and d.position > 1;

create unique index if not exists yarncha_project_versions_content_unique
  on public.yarncha_project_versions(user_id, project_local_id, content_hash);

create or replace function public.save_yarncha_project_version(
  p_project_local_id text,
  p_device_id text,
  p_project_data jsonb,
  p_label text,
  p_content_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  owner_id uuid := auth.uid();
  saved public.yarncha_project_versions;
begin
  if owner_id is null then raise exception 'Authentication required'; end if;
  if p_project_local_id !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$'
    or p_device_id !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$'
    or p_content_hash !~ '^[a-f0-9]{64}$'
    or jsonb_typeof(p_project_data) <> 'object' then
    raise exception 'Invalid project version';
  end if;

  insert into public.yarncha_project_versions (
    user_id, project_local_id, device_id, label, project_data, content_hash
  ) values (
    owner_id, p_project_local_id, p_device_id, left(coalesce(p_label, 'Project version'), 200),
    p_project_data, p_content_hash
  )
  on conflict (user_id, project_local_id, content_hash) do nothing
  returning * into saved;

  if saved.id is null then
    select * into saved from public.yarncha_project_versions
    where user_id = owner_id and project_local_id = p_project_local_id and content_hash = p_content_hash;
  end if;

  delete from public.yarncha_project_versions v
  where v.id in (
    select id from public.yarncha_project_versions
    where user_id = owner_id and project_local_id = p_project_local_id
    order by created_at desc, id desc offset 30
  );

  return to_jsonb(saved);
end;
$$;

revoke all on function public.save_yarncha_project_version(text, text, jsonb, text, text) from public;
grant execute on function public.save_yarncha_project_version(text, text, jsonb, text, text) to authenticated;

create table if not exists public.yarncha_ai_request_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null check (feature ~ '^[a-z0-9-]{1,40}$'),
  upload_id uuid references public.chart_uploads(id) on delete cascade,
  project_id uuid references public.knitting_projects(id) on delete cascade,
  idempotency_key text not null check (char_length(idempotency_key) between 8 and 160),
  status text not null check (status in ('processing', 'completed', 'failed', 'timed-out')),
  attempts integer not null default 1 check (attempts between 1 and 10),
  requested_at timestamptz not null default now(),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  response_json jsonb,
  error_message text,
  input_tokens integer check (input_tokens is null or input_tokens >= 0),
  output_tokens integer check (output_tokens is null or output_tokens >= 0),
  estimated_cost_usd numeric(12,6) check (estimated_cost_usd is null or estimated_cost_usd >= 0),
  unique (user_id, feature, idempotency_key)
);

create index if not exists yarncha_ai_ledger_user_requested_idx
  on public.yarncha_ai_request_ledger(user_id, requested_at desc);
create index if not exists yarncha_ai_ledger_global_requested_idx
  on public.yarncha_ai_request_ledger(requested_at desc);
alter table public.yarncha_ai_request_ledger enable row level security;
drop policy if exists "own_ai_ledger_select" on public.yarncha_ai_request_ledger;
create policy "own_ai_ledger_select" on public.yarncha_ai_request_ledger for select to authenticated
using (user_id = (select auth.uid()));
grant select on public.yarncha_ai_request_ledger to authenticated;

create or replace function public.reserve_chart_analysis(
  p_upload_id uuid,
  p_idempotency_key text,
  p_feature text default 'chart-analysis',
  p_short_limit integer default 5,
  p_daily_limit integer default 30,
  p_global_daily_limit integer default 1000,
  p_stale_after_seconds integer default 120
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  owner_id uuid := auth.uid();
  existing public.yarncha_ai_request_ledger;
  upload_row public.chart_uploads;
  ledger_id uuid;
  short_limit integer := greatest(1, least(coalesce(p_short_limit, 5), 100));
  daily_limit integer := greatest(1, least(coalesce(p_daily_limit, 30), 10000));
  global_limit integer := greatest(1, least(coalesce(p_global_daily_limit, 1000), 1000000));
  stale_seconds integer := greatest(30, least(coalesce(p_stale_after_seconds, 120), 3600));
begin
  if owner_id is null then raise exception 'Authentication required'; end if;
  if p_feature !~ '^[a-z0-9-]{1,40}$' or char_length(p_idempotency_key) not between 8 and 160 then
    raise exception 'Invalid request identity';
  end if;

  select u.* into upload_row from public.chart_uploads u
  join public.knitting_projects p on p.id = u.project_id
  where u.id = p_upload_id and u.user_id = owner_id and p.user_id = owner_id;
  if upload_row.id is null then raise exception 'Chart upload was not found'; end if;

  perform pg_advisory_xact_lock(hashtextextended(owner_id::text || ':' || p_feature, 0));
  perform pg_advisory_xact_lock(7392911);

  select * into existing from public.yarncha_ai_request_ledger
  where user_id = owner_id and feature = p_feature and idempotency_key = p_idempotency_key
  for update;

  if existing.id is not null then
    if existing.status = 'completed' then
      return jsonb_build_object('status', 'reused', 'ledgerId', existing.id, 'response', existing.response_json);
    end if;
    if existing.status = 'processing' and existing.started_at > now() - make_interval(secs => stale_seconds) then
      return jsonb_build_object('status', 'in-progress', 'ledgerId', existing.id);
    end if;
    if existing.attempts >= 3 then
      return jsonb_build_object('status', 'retry-exhausted', 'ledgerId', existing.id);
    end if;
    update public.yarncha_ai_request_ledger set
      status = 'processing', attempts = attempts + 1, started_at = now(), completed_at = null,
      error_message = null
    where id = existing.id;
    return jsonb_build_object('status', 'reserved', 'ledgerId', existing.id, 'retry', true);
  end if;

  if (select count(*) from public.yarncha_ai_request_ledger
      where user_id = owner_id and feature = p_feature and requested_at > now() - interval '1 minute') >= short_limit then
    return jsonb_build_object('status', 'rate-limited', 'retryAfterSeconds', 60);
  end if;
  if (select count(*) from public.yarncha_ai_request_ledger
      where user_id = owner_id and feature = p_feature and requested_at >= date_trunc('day', now())) >= daily_limit then
    return jsonb_build_object('status', 'quota-exhausted', 'scope', 'user-day');
  end if;
  if (select count(*) from public.yarncha_ai_request_ledger
      where feature = p_feature and requested_at >= date_trunc('day', now())) >= global_limit then
    return jsonb_build_object('status', 'quota-exhausted', 'scope', 'global-day');
  end if;

  insert into public.yarncha_ai_request_ledger (
    user_id, feature, upload_id, project_id, idempotency_key, status
  ) values (
    owner_id, p_feature, upload_row.id, upload_row.project_id, p_idempotency_key, 'processing'
  ) returning id into ledger_id;

  return jsonb_build_object('status', 'reserved', 'ledgerId', ledger_id, 'retry', false);
end;
$$;

create or replace function public.finalize_chart_analysis(
  p_ledger_id uuid,
  p_status text,
  p_response jsonb default null,
  p_error_message text default null,
  p_input_tokens integer default null,
  p_output_tokens integer default null,
  p_estimated_cost_usd numeric default null
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  owner_id uuid := auth.uid();
begin
  if owner_id is null then raise exception 'Authentication required'; end if;
  if p_status not in ('completed', 'failed', 'timed-out') then raise exception 'Invalid final status'; end if;
  update public.yarncha_ai_request_ledger set
    status = p_status,
    response_json = case when p_status = 'completed' then coalesce(p_response, '{}'::jsonb) else null end,
    error_message = case when p_status = 'completed' then null else left(coalesce(p_error_message, 'Request failed'), 1000) end,
    input_tokens = greatest(0, p_input_tokens),
    output_tokens = greatest(0, p_output_tokens),
    estimated_cost_usd = greatest(0, p_estimated_cost_usd),
    completed_at = now()
  where id = p_ledger_id and user_id = owner_id;
  return found;
end;
$$;

revoke all on function public.reserve_chart_analysis(uuid, text, text, integer, integer, integer, integer) from public;
revoke all on function public.finalize_chart_analysis(uuid, text, jsonb, text, integer, integer, numeric) from public;
grant execute on function public.reserve_chart_analysis(uuid, text, text, integer, integer, integer, integer) to authenticated;
grant execute on function public.finalize_chart_analysis(uuid, text, jsonb, text, integer, integer, numeric) to authenticated;
