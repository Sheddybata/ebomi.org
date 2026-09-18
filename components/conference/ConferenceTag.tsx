import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'
import type { ConferenceRegistrationRecord } from '@/lib/conference/types'
import ConferenceQrImage from '@/components/conference/ConferenceQrImage'
import { LOGO_PATH } from '@/lib/constants'

export default function ConferenceTag({ registration }: { registration: ConferenceRegistrationRecord }) {
  return (
    <div className="conference-tag w-[320px] h-[480px] border-2 border-navy/20 rounded-2xl overflow-hidden bg-white shadow-md flex flex-col print:shadow-none print:break-inside-avoid text-navy-dark [print-color-adjust:exact]">
      <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white px-4 py-3 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_PATH}
          alt="EBOMI"
          width={56}
          height={56}
          className="w-14 h-14 mx-auto object-contain mb-1"
        />
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">EBOMI</p>
        <p className="text-xs font-bold leading-tight mt-1">{NATIONAL_CONGRESS_2026.title}</p>
        <p className="text-[10px] text-white/80 mt-1">{NATIONAL_CONGRESS_2026.theme}</p>
      </div>

      <div className="flex-1 px-4 py-3 flex flex-col items-center text-center bg-white">
        <p className="text-lg font-bold text-navy-dark leading-tight mb-1">{registration.name}</p>
        <p className="text-xs text-gray-700 mb-1">{registration.state}</p>
        <p className="text-xs font-semibold text-navy mb-4">{registration.affiliation}</p>

        <div className="mb-2">
          <ConferenceQrImage registrationId={registration.registrationId} size={160} />
        </div>

        <p className="text-[11px] font-mono font-bold text-navy-dark tracking-wide">
          {registration.registrationId}
        </p>
        <p className="text-[10px] text-gray-600 mt-2">Scan for check-in &amp; meals</p>
      </div>

      <div className="border-t border-gray-200 px-4 py-2 text-[10px] text-gray-600 text-center bg-white">
        {NATIONAL_CONGRESS_2026.date}
      </div>
    </div>
  )
}
