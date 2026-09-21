import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/conference/adminAuth'
import { applyConferenceScan, getConferenceRegistrationById } from '@/lib/conference/db'
import type { ScanAction } from '@/lib/conference/types'
import { isValidMealDate, todayInLagos } from '@/lib/conference/mealDates'

const VALID_ACTIONS: ScanAction[] = ['check_in', 'lunch', 'dinner']

function scanMessage(action: ScanAction, mealDate?: string): string {
  switch (action) {
    case 'check_in':
      return 'Checked-in successfully'
    case 'lunch':
    case 'dinner':
      return mealDate ? `Successful for ${mealDate}` : 'Successful'
  }
}

export async function POST(request: Request) {
  let registrationId = ''

  try {
    await requireAdminAuth()

    const body = await request.json()
    registrationId = typeof body.registrationId === 'string' ? body.registrationId.trim() : ''
    const action = body.action as ScanAction
    const mealDate =
      typeof body.mealDate === 'string' && isValidMealDate(body.mealDate)
        ? body.mealDate
        : todayInLagos()

    if (!registrationId) {
      return NextResponse.json({ error: 'Registration ID is required.' }, { status: 400 })
    }
    if (!VALID_ACTIONS.includes(action)) {
      return NextResponse.json({ error: 'Invalid scan action.' }, { status: 400 })
    }

    const registration = await applyConferenceScan(registrationId, action, mealDate)

    return NextResponse.json({
      success: true,
      action,
      mealDate: action === 'check_in' ? null : mealDate,
      message: scanMessage(action, mealDate),
      registration,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'UNKNOWN'
    const registration = registrationId
      ? await getConferenceRegistrationById(registrationId).catch(() => null)
      : null

    if (message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Registration not found.' }, { status: 404 })
    }
    if (message === 'ALREADY_CHECKED_IN') {
      return NextResponse.json(
        { error: 'Already checked in', registration },
        { status: 409 }
      )
    }
    if (message === 'MEAL_ALREADY_RECORDED') {
      return NextResponse.json(
        { error: 'Meal has been collected. Ticket has been used.', registration },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'Scan failed.' }, { status: 500 })
  }
}
