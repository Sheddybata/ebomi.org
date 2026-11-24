'use client'

import { useCallback, useEffect, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { downloadCsv } from '@/lib/conference/csv'
import {
  buildAffiliationReport,
  buildCountryReport,
  buildFeedingReport,
  buildStateReport,
  buildZoneReport,
} from '@/lib/conference/reports'
import {
  downloadConferenceReportPdf,
  type PdfReportKind,
} from '@/lib/conference/reportPdf'
import type { ConferenceRegistrationRecord, ConferenceStats } from '@/lib/conference/types'

const exports: {
  id: PdfReportKind
  title: string
  description: string
  csvFilename: string
  buildCsv: (registrations: ConferenceRegistrationRecord[]) => string[][]
}[] = [
  {
    id: 'zones',
    title: 'Geopolitical zones',
    description: 'North Central through South West, FCT, international, and other.',
    csvFilename: 'ebomi-zones-report.csv',
    buildCsv: buildZoneReport,
  },
  {
    id: 'states',
    title: 'States',
    description: 'Grouped official state names with zone labels.',
    csvFilename: 'ebomi-states-report.csv',
    buildCsv: buildStateReport,
  },
  {
    id: 'affiliation',
    title: 'Affiliation',
    description: 'Counts and people list by affiliation.',
    csvFilename: 'ebomi-affiliation-report.csv',
    buildCsv: buildAffiliationReport,
  },
  {
    id: 'countries',
    title: 'Countries',
    description: 'Counts and people list by country.',
    csvFilename: 'ebomi-countries-report.csv',
    buildCsv: buildCountryReport,
  },
  {
    id: 'feeding',
    title: 'Feeding',
    description: 'Who requested feeding, plus lunch/dinner scan counts.',
    csvFilename: 'ebomi-feeding-report.csv',
    buildCsv: buildFeedingReport,
  },
]

export default function ReportsPanel() {
  const [registrations, setRegistrations] = useState<ConferenceRegistrationRecord[]>([])
  const [stats, setStats] = useState<ConferenceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/registrations')
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to load data.')
        return
      }
      setRegistrations(data.registrations)
      setStats(data.stats)
    } catch {
      setError('Network error while loading registrations.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handlePdf = async (kind: PdfReportKind) => {
    setBusyId(kind)
    try {
      // Let the button show busy state before the sync PDF work starts.
      await new Promise((resolve) => setTimeout(resolve, 30))
      downloadConferenceReportPdf(kind, registrations)
    } finally {
      setBusyId(null)
    }
  }

  if (loading) return <p className="text-gray-600">Loading reports...</p>
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Registered" value={stats?.total ?? 0} />
        <Stat label="Need feeding" value={stats?.needsFeeding ?? 0} />
        <Stat label="Checked in" value={stats?.checkedIn ?? 0} />
        <Stat label="Tags printed" value={stats?.tagsPrinted ?? 0} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {exports.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy-dark">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handlePdf(item.id)}
                disabled={busyId === item.id}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-light disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                {busyId === item.id ? 'Preparing PDF...' : 'Download PDF'}
              </button>
              <button
                type="button"
                onClick={() => downloadCsv(item.csvFilename, item.buildCsv(registrations))}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-navy-dark font-semibold text-sm hover:bg-gray-50"
              >
                CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      {stats ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <SummaryPanel title="Zones snapshot">
            {stats.byZone.map(({ zone, count }) => (
              <Row key={zone} label={zone} value={count} />
            ))}
          </SummaryPanel>
          <SummaryPanel title="Countries snapshot">
            {stats.byCountry.map(({ country, count }) => (
              <Row key={country} label={country} value={count} />
            ))}
          </SummaryPanel>
        </div>
      ) : null}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-navy-dark mt-1">{value}</p>
    </div>
  )
}

function SummaryPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-navy-dark">{title}</h2>
      </div>
      <div className="p-3 max-h-72 overflow-y-auto space-y-1">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-sm">
      <span className="font-medium text-navy-dark">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  )
}
