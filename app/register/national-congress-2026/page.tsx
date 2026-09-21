import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import RegistrationForm from '@/components/conference/RegistrationForm'
import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'

export default function NationalCongressRegisterPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="grid md:grid-cols-[180px_1fr] gap-6 items-start">
            <div className="relative w-full max-w-[180px] mx-auto md:mx-0 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-black/10">
              <Image
                src={NATIONAL_CONGRESS_2026.image}
                alt={NATIONAL_CONGRESS_2026.title}
                fill
                className="object-contain"
                sizes="180px"
                priority
                unoptimized
              />
            </div>

            <div>
              <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-2">
                Conference Registration
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-snug">
                {NATIONAL_CONGRESS_2026.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-4 leading-snug">
                Theme: {NATIONAL_CONGRESS_2026.theme}
              </p>
              <div className="space-y-2 text-white/80 text-sm sm:text-base">
                <p className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
                  {NATIONAL_CONGRESS_2026.date}
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  {NATIONAL_CONGRESS_2026.venue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl font-bold text-navy-dark mb-2">Registration Form</h2>
            <p className="text-gray-600 mb-8">
              Please fill out all required fields to secure your seat at the summit.
            </p>
            <RegistrationForm />
          </div>
        </div>
      </section>
    </div>
  )
}
