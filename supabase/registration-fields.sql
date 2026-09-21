-- Run this in the Supabase SQL editor after the original conference_registrations table exists.

alter table conference_registrations
  alter column email drop not null;

alter table conference_registrations
  alter column email set default '';

alter table conference_registrations
  add column if not exists residential_address text not null default '';

alter table conference_registrations
  add column if not exists church_denomination text not null default '';

drop index if exists idx_conference_registrations_unique_email;

create unique index if not exists idx_conference_registrations_unique_phone
  on conference_registrations (conference_slug, phone);

create unique index if not exists idx_conference_registrations_unique_email
  on conference_registrations (conference_slug, email)
  where email is not null and email <> '';
