-- Run this in the Supabase SQL editor if conference_registrations already exists.
-- Adds per-day lunch / dinner scans for 23-27 November.

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

delete from conference_meal_scans where meal_type = 'breakfast';

alter table conference_meal_scans drop constraint if exists conference_meal_scans_meal_type_check;
alter table conference_meal_scans
  add constraint conference_meal_scans_meal_type_check
  check (meal_type in ('lunch', 'dinner'));

insert into conference_meal_scans (registration_id, meal_type, meal_date, scanned_at)
select registration_id, 'lunch', (lunch_at at time zone 'Africa/Lagos')::date, lunch_at
from conference_registrations
where lunch_at is not null
on conflict (registration_id, meal_type, meal_date) do nothing;

insert into conference_meal_scans (registration_id, meal_type, meal_date, scanned_at)
select registration_id, 'dinner', (dinner_at at time zone 'Africa/Lagos')::date, dinner_at
from conference_registrations
where dinner_at is not null
on conflict (registration_id, meal_type, meal_date) do nothing;
