-- Reconcile deployments that did not apply the private-beta device table.
-- Safe to run after 202606200001_private_beta.sql.

create table if not exists public.yarncha_sync_devices (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Yarncha device',
  user_agent text not null default '',
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists yarncha_sync_devices_user_active_idx
  on public.yarncha_sync_devices(user_id, last_active_at desc);

alter table public.yarncha_sync_devices enable row level security;

drop policy if exists "own_select" on public.yarncha_sync_devices;
drop policy if exists "own_insert" on public.yarncha_sync_devices;
drop policy if exists "own_update" on public.yarncha_sync_devices;
drop policy if exists "own_delete" on public.yarncha_sync_devices;

create policy "own_select" on public.yarncha_sync_devices
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "own_insert" on public.yarncha_sync_devices
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "own_update" on public.yarncha_sync_devices
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own_delete" on public.yarncha_sync_devices
  for delete to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.yarncha_sync_devices to authenticated;

-- PostgREST normally reloads automatically after DDL. This notification makes
-- the new relation visible promptly when the migration is run through SQL.
notify pgrst, 'reload schema';
