import Image from 'next/image'
import { BookOpen, Download, Wifi } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo'
import { MAGAZINE_COVER_PATH, MAGAZINE_PDF_PATH } from '@/lib/constants'

export const metadata = generateSEOMetadata({
  title: 'National Revival Congress 2026 E-Magazine',
  description:
    'Theme: Dominion Mandate — Reclaiming the Mountains of Influence. Read or download the EBOMI magazine.',
  path: '/magazine',
  image: MAGAZINE_COVER_PATH,
})

export default function MagazinePage() {
  return (
    <div className="relative pt-20 min-h-screen overflow-hidden bg-[#071526] text-white">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={MAGAZINE_COVER_PATH}
          alt=""
          fill
          priority
          className="object-cover scale-110 blur-3xl opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071526]/80 via-[#071526]/55 to-[#071526]" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-12 pb-24">
        <p className="text-center text-gold font-semibold uppercase tracking-[0.28em] text-xs mb-2">
          E-Magazine
        </p>
        <h1 className="sr-only">National Revival Congress 2026 E-Magazine</h1>

        <a
          href={MAGAZINE_PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-fit mx-auto group"
          aria-label="Read the EBOMI magazine online"
        >
          <Image
            src={MAGAZINE_COVER_PATH}
            alt="National Revival Congress 2026 magazine cover — Prophet Isa El-Buba and Pastor Mrs. Choice El-Buba"
            width={1414}
            height={2000}
            priority
            className="h-auto w-auto max-h-[min(58vh,32rem)] max-w-[min(100%,20.5rem)] rounded-md shadow-[0_28px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/25 group-hover:ring-gold/60 transition-all duration-300"
          />
        </a>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={MAGAZINE_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Read online
          </a>
          <a
            href={MAGAZINE_PDF_PATH}
            download="EBOMI-Magazine.pdf"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-white/35 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download
          </a>
        </div>

        <p className="mt-5 text-sm text-white/70 flex items-center justify-center gap-2">
          <Wifi className="w-4 h-4 text-gold shrink-0" />
          About 65 MB — Wi-Fi recommended
        </p>
      </div>
    </div>
  )
}
