-- BSquare Global Website & Admin CMS Schema (Run in Supabase SQL Editor)
-- Uses a unified key-value JSONB store + dedicated tables so no existing tables or policies conflict.

create table if not exists public.bsquare_cms_store (
  key text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.bsquare_cms_store enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'bsquare_cms_store' and policyname = 'Public read access'
  ) then
    create policy "Public read access" on public.bsquare_cms_store for select using (true);
  end if;
end $$;
