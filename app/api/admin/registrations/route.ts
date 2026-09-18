import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/conference/adminAuth'
import { listConferenceRegistrations } from '@/lib/conference/db'
import { buildConferenceStats } from '@/lib/conference/stats'
import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'

export async function GET() {
  try {
    await requireAdminAuth()
    const registrations = await listConferenceRegistrations(NATIONAL_CONGRESS_2026.slug)
    const stats = buildConferenceStats(registrations)
    return NextResponse.json({ registrations, stats })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'UNKNOWN'
    if (message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (message === 'DATABASE_NOT_CONFIGURED') {
      return NextResponse.json({ error: 'Database not configured.' }, { status: 503 })
    }
    return NextResponse.json({ error: 'Failed to load registrations.' }, { status: 500 })
  }
}
