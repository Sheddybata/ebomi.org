import { NextResponse } from 'next/server'
import { saveConferenceRegistration } from '@/lib/conference/db'
import { validateRegistrationBody } from '@/lib/conference/validateRegistration'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = validateRegistrationBody(body)

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const { registrationId } = await saveConferenceRegistration(data)

    return NextResponse.json({
      success: true,
      registrationId,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'UNKNOWN_ERROR'

    if (message === 'DUPLICATE_REGISTRATION') {
      return NextResponse.json(
        { error: 'This email is already registered for this conference.' },
        { status: 409 }
      )
    }

    if (message === 'DATABASE_NOT_CONFIGURED') {
      return NextResponse.json(
        {
          error:
            'Registration storage is not configured yet. Please contact EBOMI to complete your registration.',
        },
        { status: 503 }
      )
    }

    console.error('Conference registration error:', err)
    return NextResponse.json(
      { error: 'Unable to complete registration. Please try again.' },
      { status: 500 }
    )
  }
}
