-- Run this in the Supabase SQL editor for conference registration
-- Table is only accessed from the Next.js server using the service role key.

create table if not exists conference_registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  conference_slug text not null,
  name text not null,
  phone text not null,
  email text not null default '',
  state text not null,
  residential_address text not null default '',
  church_denomination text not null default '',
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

create unique index if not exists idx_conference_registrations_unique_phone
  on conference_registrations (conference_slug, phone);

create unique index if not exists idx_conference_registrations_unique_email
  on conference_registrations (conference_slug, email)
  where email <> '';

-- Block public access. The service role key used by the server bypasses RLS.
alter table conference_registrations enable row level security;

create table if not exists conference_meal_scans (
  id uuid primary key default gen_random_uuid(),
  registration_id text not null references conference_registrations (registration_id) on delete cascade,
  meal_type text not null check (meal_type in ('lunch', 'dinner')),
  meal_date date not null,
  scanned_at timestamptz not null default now(),
  unique (registration_id, meal_type, meal_date)
);

create index if not exists idx_conference_meal_scans_date
  on conference_meal_scans (meal_date);

alter table conference_meal_scans enable row level security;
