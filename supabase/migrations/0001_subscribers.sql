-- ────────────────────────────────────────────────────────────────
--  Mibbles — newsletter / waitlist subscribers
--  Run this in the Supabase SQL editor (or `supabase db push` if
--  you're using the Supabase CLI) after creating your project.
-- ────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  source        text not null default 'unknown',  -- waitlist | footer | exit-intent | post:<slug> | ...
  subscribed_at timestamptz not null default now(),
  unsubscribed  boolean not null default false,
  unsubscribed_at timestamptz,
  meta          jsonb default '{}'::jsonb,        -- room for future fields (UTM, etc.)
  constraint subscribers_email_unique unique (email)
);

create index if not exists subscribers_source_idx on public.subscribers (source);
create index if not exists subscribers_subscribed_at_idx on public.subscribers (subscribed_at desc);

-- Row-level security: lock the table down. Only the service role
-- (used by the Next.js API) can read or write.
alter table public.subscribers enable row level security;

-- Drop any old policies before recreating (idempotent re-runs)
drop policy if exists "service_role_full_access" on public.subscribers;

create policy "service_role_full_access"
  on public.subscribers
  for all
  to service_role
  using (true)
  with check (true);

-- The anon role explicitly has no policies → no public read/write.
-- Browser code should never touch this table directly.
