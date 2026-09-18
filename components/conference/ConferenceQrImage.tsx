'use client'

import { useState } from 'react'

export default function ConferenceQrImage({
  registrationId,
  size = 180,
}: {
  registrationId: string
  size?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const qrUrl = `/api/conference/qr/${encodeURIComponent(registrationId)}`

  return (
    <div
      className="relative flex items-center justify-center bg-white border border-gray-200 rounded-lg"
      style={{ width: size, height: size }}
    >
      {!loaded && !failed && (
        <p className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 px-2 text-center">
          Loading QR...
        </p>
      )}
      {failed ? (
        <p className="absolute inset-0 flex items-center justify-center text-xs text-red-600 px-2 text-center">
          QR failed to load. Refresh the page.
        </p>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={qrUrl}
          alt={`QR code for ${registrationId}`}
          width={size}
          height={size}
          className={`object-contain transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
