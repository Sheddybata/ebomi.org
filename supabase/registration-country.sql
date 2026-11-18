-- Run this in the Supabase SQL editor so registrations can store country.

alter table conference_registrations
  add column if not exists country text not null default '';
