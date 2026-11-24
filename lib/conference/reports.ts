import {
  displayState,
  GEOPOLITICAL_ZONE_ORDER,
  geopoliticalZone,
  type GeopoliticalZone,
} from './normalizeState'
import type { ConferenceRegistrationRecord } from './types'

function personRow(reg: ConferenceRegistrationRecord): string[] {
  return [
    reg.name,
    reg.registrationId,
    reg.affiliation,
    displayState(reg.state),
    reg.country || '',
    reg.ministryClass ? `Class ${reg.ministryClass}` : '',
    reg.needsFeeding ? 'Yes' : 'No',
    reg.checkedIn ? 'Yes' : 'No',
    reg.tagPrintedAt ? 'Yes' : 'No',
  ]
}

const PERSON_HEADER = [
  'Name',
  'ID',
  'Affiliation',
  'State',
  'Country',
  'School of Ministry',
  'Needs Feeding',
  'Arrived',
  'Printed',
]

export function buildZoneReport(registrations: ConferenceRegistrationRecord[]): string[][] {
  const groups = new Map<GeopoliticalZone, ConferenceRegistrationRecord[]>()
  for (const zone of GEOPOLITICAL_ZONE_ORDER) groups.set(zone, [])
  for (const reg of registrations) {
    const zone = geopoliticalZone(reg.state, reg.country)
    groups.get(zone)!.push(reg)
  }

  const rows: string[][] = [['Geopolitical Zone', 'Count'], []]
  for (const zone of GEOPOLITICAL_ZONE_ORDER) {
    const list = groups.get(zone) ?? []
    rows.push([zone, String(list.length)])
  }
  rows.push([])
  rows.push(PERSON_HEADER)

  for (const zone of GEOPOLITICAL_ZONE_ORDER) {
    const list = [...(groups.get(zone) ?? [])].sort((a, b) =>
      displayState(a.state).localeCompare(displayState(b.state)) || a.name.localeCompare(b.name),
    )
    if (list.length === 0) continue
    rows.push([`--- ${zone} ---`, '', '', '', '', '', '', '', ''])
    for (const reg of list) rows.push(personRow(reg))
  }
  return rows
}

export function buildAffiliationReport(registrations: ConferenceRegistrationRecord[]): string[][] {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = reg.affiliation || '—'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const affiliations = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  const rows: string[][] = [['Affiliation', 'Count'], []]
  for (const affiliation of affiliations) {
    rows.push([affiliation, String(groups.get(affiliation)!.length)])
  }
  rows.push([])
  rows.push(PERSON_HEADER)
  for (const affiliation of affiliations) {
    const list = [...groups.get(affiliation)!].sort((a, b) => a.name.localeCompare(b.name))
    rows.push([`--- ${affiliation} ---`, '', '', '', '', '', '', '', ''])
    for (const reg of list) rows.push(personRow(reg))
  }
  return rows
}

export function buildCountryReport(registrations: ConferenceRegistrationRecord[]): string[][] {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = (reg.country || '').trim() || '—'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const countries = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  const rows: string[][] = [['Country', 'Count'], []]
  for (const country of countries) {
    rows.push([country, String(groups.get(country)!.length)])
  }
  rows.push([])
  rows.push(PERSON_HEADER)
  for (const country of countries) {
    const list = [...groups.get(country)!].sort((a, b) => a.name.localeCompare(b.name))
    rows.push([`--- ${country} ---`, '', '', '', '', '', '', '', ''])
    for (const reg of list) rows.push(personRow(reg))
  }
  return rows
}

export function buildFeedingReport(registrations: ConferenceRegistrationRecord[]): string[][] {
  const needs = registrations.filter((reg) => reg.needsFeeding)
  const noNeeds = registrations.filter((reg) => !reg.needsFeeding)

  const lunchCollected = needs.filter((reg) =>
    (reg.meals ?? []).some((meal) => meal.mealType === 'lunch'),
  ).length
  const dinnerCollected = needs.filter((reg) =>
    (reg.meals ?? []).some((meal) => meal.mealType === 'dinner'),
  ).length

  const rows: string[][] = [
    ['Feeding Summary', 'Count'],
    [],
    ['Needs feeding', String(needs.length)],
    ['Does not need feeding', String(noNeeds.length)],
    ['Needs feeding · lunch collected (any day)', String(lunchCollected)],
    ['Needs feeding · dinner collected (any day)', String(dinnerCollected)],
    [],
    [...PERSON_HEADER, 'Lunch scans', 'Dinner scans'],
  ]

  const sorted = [...needs].sort(
    (a, b) =>
      displayState(a.state).localeCompare(displayState(b.state)) || a.name.localeCompare(b.name),
  )
  for (const reg of sorted) {
    const lunch = (reg.meals ?? []).filter((meal) => meal.mealType === 'lunch').length
    const dinner = (reg.meals ?? []).filter((meal) => meal.mealType === 'dinner').length
    rows.push([...personRow(reg), String(lunch), String(dinner)])
  }
  return rows
}

export function buildStateReport(registrations: ConferenceRegistrationRecord[]): string[][] {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = displayState(reg.state)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const states = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  const rows: string[][] = [['State', 'Zone', 'Count'], []]
  for (const state of states) {
    const list = groups.get(state)!
    const zone = geopoliticalZone(list[0].state, list[0].country)
    rows.push([state, zone, String(list.length)])
  }
  rows.push([])
  rows.push(PERSON_HEADER)
  for (const state of states) {
    const list = [...groups.get(state)!].sort((a, b) => a.name.localeCompare(b.name))
    rows.push([`--- ${state} ---`, '', '', '', '', '', '', '', ''])
    for (const reg of list) rows.push(personRow(reg))
  }
  return rows
}
