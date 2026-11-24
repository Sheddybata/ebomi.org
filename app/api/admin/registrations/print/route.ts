import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/conference/adminAuth'
import { markConferenceTagsPrinted } from '@/lib/conference/db'

export async function POST(request: Request) {
  try {
    await requireAdminAuth()
    const body = await request.json()
    const ids = Array.isArray(body.registrationIds)
      ? body.registrationIds.filter((id: unknown): id is string => typeof id === 'string')
      : typeof body.registrationId === 'string'
        ? [body.registrationId]
        : []

    const result = await markConferenceTagsPrinted(ids)
    return NextResponse.json({ success: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'UNKNOWN'
    if (message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (message === 'NO_IDS') {
      return NextResponse.json({ error: 'No registration IDs provided.' }, { status: 400 })
    }
    if (message === 'DATABASE_NOT_CONFIGURED') {
      return NextResponse.json({ error: 'Database not configured.' }, { status: 503 })
    }
    if (message === 'PRINTED_COLUMN_MISSING') {
      return NextResponse.json(
        {
          error:
            'Printed tracking is not set up yet. Run supabase/tag-printed.sql in Supabase, then try again.',
        },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Failed to mark tags as printed.' }, { status: 500 })
  }
}
