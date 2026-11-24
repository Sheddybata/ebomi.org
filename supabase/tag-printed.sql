-- Run in the Supabase SQL editor so admin can track printed ID cards.

alter table conference_registrations
  add column if not exists tag_printed_at timestamptz;
