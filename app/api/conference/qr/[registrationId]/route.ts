import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function GET(
  _request: Request,
  { params }: { params: { registrationId: string } }
) {
  try {
    const registrationId = decodeURIComponent(params.registrationId)

    if (!registrationId || registrationId.length < 6) {
      return NextResponse.json({ error: 'Invalid registration ID.' }, { status: 400 })
    }

    const pngBuffer = await QRCode.toBuffer(registrationId, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 320,
      color: {
        dark: '#B91C1C',
        light: '#FFFFFF',
      },
    })

    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Unable to generate QR code.' }, { status: 500 })
  }
}
