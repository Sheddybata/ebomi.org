-- Run this in the Supabase SQL editor so participant cards can show School of Ministry class.

alter table conference_registrations
  add column if not exists ministry_class smallint;

alter table conference_registrations
  drop constraint if exists conference_registrations_ministry_class_check;

alter table conference_registrations
  add constraint conference_registrations_ministry_class_check
  check (ministry_class is null or (ministry_class >= 1 and ministry_class <= 8));
