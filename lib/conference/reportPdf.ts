import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { NATIONAL_CONGRESS_2026 } from './config'
import {
  displayState,
  GEOPOLITICAL_ZONE_ORDER,
  geopoliticalZone,
  type GeopoliticalZone,
} from './normalizeState'
import type { ConferenceRegistrationRecord } from './types'

export type PdfReportKind = 'zones' | 'states' | 'affiliation' | 'countries' | 'feeding'

interface PdfReportSection {
  title: string
  rows: string[][]
}

interface PdfReportModel {
  title: string
  filename: string
  summaryHeaders: string[]
  summaryRows: string[][]
  detailHeaders: string[]
  sections: PdfReportSection[]
}

const DETAIL_HEADERS = ['Name', 'ID', 'Affiliation', 'State', 'Country', 'Class', 'Feeding', 'Arrived']

function personCells(reg: ConferenceRegistrationRecord): string[] {
  return [
    reg.name,
    reg.registrationId,
    reg.affiliation,
    displayState(reg.state),
    reg.country || '—',
    reg.ministryClass ? `Class ${reg.ministryClass}` : '—',
    reg.needsFeeding ? 'Yes' : 'No',
    reg.checkedIn ? 'Yes' : 'No',
  ]
}

function sortPeople(list: ConferenceRegistrationRecord[]) {
  return [...list].sort(
    (a, b) =>
      displayState(a.state).localeCompare(displayState(b.state)) ||
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  )
}

function buildZoneModel(registrations: ConferenceRegistrationRecord[]): PdfReportModel {
  const groups = new Map<GeopoliticalZone, ConferenceRegistrationRecord[]>()
  for (const zone of GEOPOLITICAL_ZONE_ORDER) groups.set(zone, [])
  for (const reg of registrations) {
    groups.get(geopoliticalZone(reg.state, reg.country))!.push(reg)
  }

  return {
    title: 'Geopolitical Zones Report',
    filename: 'ebomi-zones-report.pdf',
    summaryHeaders: ['Zone', 'Count'],
    summaryRows: GEOPOLITICAL_ZONE_ORDER.map((zone) => [
      zone,
      String((groups.get(zone) ?? []).length),
    ]),
    detailHeaders: DETAIL_HEADERS,
    sections: GEOPOLITICAL_ZONE_ORDER.filter((zone) => (groups.get(zone) ?? []).length > 0).map(
      (zone) => ({
        title: `${zone} (${(groups.get(zone) ?? []).length})`,
        rows: sortPeople(groups.get(zone) ?? []).map(personCells),
      }),
    ),
  }
}

function buildStateModel(registrations: ConferenceRegistrationRecord[]): PdfReportModel {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = displayState(reg.state)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const states = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  return {
    title: 'States Report',
    filename: 'ebomi-states-report.pdf',
    summaryHeaders: ['State', 'Zone', 'Count'],
    summaryRows: states.map((state) => {
      const list = groups.get(state)!
      return [state, geopoliticalZone(list[0].state, list[0].country), String(list.length)]
    }),
    detailHeaders: DETAIL_HEADERS,
    sections: states.map((state) => ({
      title: `${state} (${groups.get(state)!.length})`,
      rows: [...groups.get(state)!]
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
        .map(personCells),
    })),
  }
}

function buildAffiliationModel(registrations: ConferenceRegistrationRecord[]): PdfReportModel {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = reg.affiliation || '—'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const affiliations = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  return {
    title: 'Affiliation Report',
    filename: 'ebomi-affiliation-report.pdf',
    summaryHeaders: ['Affiliation', 'Count'],
    summaryRows: affiliations.map((affiliation) => [
      affiliation,
      String(groups.get(affiliation)!.length),
    ]),
    detailHeaders: DETAIL_HEADERS,
    sections: affiliations.map((affiliation) => ({
      title: `${affiliation} (${groups.get(affiliation)!.length})`,
      rows: [...groups.get(affiliation)!]
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
        .map(personCells),
    })),
  }
}

function buildCountryModel(registrations: ConferenceRegistrationRecord[]): PdfReportModel {
  const groups = new Map<string, ConferenceRegistrationRecord[]>()
  for (const reg of registrations) {
    const key = (reg.country || '').trim() || '—'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(reg)
  }
  const countries = [...groups.keys()].sort((a, b) => a.localeCompare(b))

  return {
    title: 'Countries Report',
    filename: 'ebomi-countries-report.pdf',
    summaryHeaders: ['Country', 'Count'],
    summaryRows: countries.map((country) => [country, String(groups.get(country)!.length)]),
    detailHeaders: DETAIL_HEADERS,
    sections: countries.map((country) => ({
      title: `${country} (${groups.get(country)!.length})`,
      rows: [...groups.get(country)!]
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
        .map(personCells),
    })),
  }
}

function buildFeedingModel(registrations: ConferenceRegistrationRecord[]): PdfReportModel {
  const needs = registrations.filter((reg) => reg.needsFeeding)
  const noNeeds = registrations.filter((reg) => !reg.needsFeeding)
  const lunchCollected = needs.filter((reg) =>
    (reg.meals ?? []).some((meal) => meal.mealType === 'lunch'),
  ).length
  const dinnerCollected = needs.filter((reg) =>
    (reg.meals ?? []).some((meal) => meal.mealType === 'dinner'),
  ).length

  return {
    title: 'Feeding Report',
    filename: 'ebomi-feeding-report.pdf',
    summaryHeaders: ['Item', 'Count'],
    summaryRows: [
      ['Needs feeding', String(needs.length)],
      ['Does not need feeding', String(noNeeds.length)],
      ['Needs feeding · lunch collected', String(lunchCollected)],
      ['Needs feeding · dinner collected', String(dinnerCollected)],
    ],
    detailHeaders: [...DETAIL_HEADERS, 'Lunch', 'Dinner'],
    sections: [
      {
        title: `People who need feeding (${needs.length})`,
        rows: sortPeople(needs).map((reg) => {
          const lunch = (reg.meals ?? []).filter((meal) => meal.mealType === 'lunch').length
          const dinner = (reg.meals ?? []).filter((meal) => meal.mealType === 'dinner').length
          return [...personCells(reg), String(lunch), String(dinner)]
        }),
      },
    ],
  }
}

function getModel(
  kind: PdfReportKind,
  registrations: ConferenceRegistrationRecord[],
): PdfReportModel {
  switch (kind) {
    case 'zones':
      return buildZoneModel(registrations)
    case 'states':
      return buildStateModel(registrations)
    case 'affiliation':
      return buildAffiliationModel(registrations)
    case 'countries':
      return buildCountryModel(registrations)
    case 'feeding':
      return buildFeedingModel(registrations)
  }
}

function formatGeneratedAt() {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())
}

export function downloadConferenceReportPdf(
  kind: PdfReportKind,
  registrations: ConferenceRegistrationRecord[],
) {
  const model = getModel(kind, registrations)
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 12

  const drawHeader = () => {
    doc.setFillColor(185, 28, 28)
    doc.rect(0, 0, pageWidth, 22, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('EBOMI', marginX, 9)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(NATIONAL_CONGRESS_2026.title, marginX, 16)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(model.title, pageWidth - marginX, 9, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(`Generated ${formatGeneratedAt()}`, pageWidth - marginX, 16, { align: 'right' })
  }

  const drawFooter = () => {
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setDrawColor(220, 220, 220)
      doc.line(marginX, pageHeight - 10, pageWidth - marginX, pageHeight - 10)
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text('Evangelical Biblical Outreach Ministries International', marginX, pageHeight - 5)
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - marginX, pageHeight - 5, { align: 'right' })
    }
  }

  drawHeader()

  doc.setTextColor(28, 25, 23)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Summary', marginX, 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(87, 83, 78)
  doc.text(`${registrations.length} total registrations`, marginX, 36)

  autoTable(doc, {
    startY: 40,
    head: [model.summaryHeaders],
    body: model.summaryRows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [28, 25, 23],
      lineColor: [229, 231, 235],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [28, 25, 23],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: marginX, right: marginX, top: 28, bottom: 14 },
  })

  let cursorY = ((doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 40) + 10

  for (const section of model.sections) {
    if (cursorY > pageHeight - 40) {
      doc.addPage()
      drawHeader()
      cursorY = 30
    }

    doc.setTextColor(185, 28, 28)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(section.title, marginX, cursorY)
    cursorY += 3

    autoTable(doc, {
      startY: cursorY,
      head: [model.detailHeaders],
      body: section.rows,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 7.2,
        cellPadding: 1.8,
        textColor: [28, 25, 23],
        lineColor: [229, 231, 235],
        lineWidth: 0.15,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [28, 25, 23],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [252, 252, 253],
      },
      columnStyles: {
        0: { cellWidth: 42 },
        1: { cellWidth: 28, fontSize: 6.5 },
        2: { cellWidth: 32 },
        3: { cellWidth: 28 },
        4: { cellWidth: 28 },
        5: { cellWidth: 18 },
        6: { cellWidth: 16 },
        7: { cellWidth: 16 },
      },
      margin: { left: marginX, right: marginX, top: 28, bottom: 14 },
    })

    cursorY = ((doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? cursorY) + 8
  }

  drawFooter()
  doc.save(model.filename)
}
