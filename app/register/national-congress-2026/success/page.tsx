import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'

export default function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const registrationId = searchParams.id

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-navy-dark mb-3">Registration Successful</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for registering for the {NATIONAL_CONGRESS_2026.title}. We look forward to
            welcoming you.
          </p>

          {registrationId && (
            <div className="rounded-xl bg-navy/5 border border-navy/10 px-4 py-5 mb-6">
              <p className="text-sm text-gray-600 mb-1">Your Registration ID</p>
              <p className="text-2xl font-bold text-navy-dark tracking-wide">{registrationId}</p>
              <p className="text-xs text-gray-500 mt-2">
                Save this ID — it will be used for your conference tag and check-in.
              </p>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors min-h-[48px]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
