-- Run this in the Supabase SQL editor for conference registration
-- Table is only accessed from the Next.js server using the service role key.

create table if not exists conference_registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  conference_slug text not null,
  name text not null,
  phone text not null,
  email text not null,
  state text not null,
  affiliation text not null,
  occupation text not null,
  needs_accommodation boolean not null default false,
  needs_feeding boolean not null default false,
  needs_ride_home boolean not null default false,
  heard_about text not null,
  checked_in boolean not null default false,
  checked_in_at timestamptz,
  breakfast_at timestamptz,
  lunch_at timestamptz,
  dinner_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_conference_registrations_slug
  on conference_registrations (conference_slug);

create index if not exists idx_conference_registrations_state
  on conference_registrations (state);

create index if not exists idx_conference_registrations_email
  on conference_registrations (conference_slug, email);

create unique index if not exists idx_conference_registrations_unique_email
  on conference_registrations (conference_slug, email);

-- Block public access. The service role key used by the server bypasses RLS.
alter table conference_registrations enable row level security;
