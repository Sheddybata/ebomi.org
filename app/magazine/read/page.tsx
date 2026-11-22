import { ArrowLeft, Download } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo'
import { MAGAZINE_COVER_PATH, MAGAZINE_PDF_PATH } from '@/lib/constants'
import { MAGAZINE_PAGES } from '@/lib/magazinePages'

export const metadata = generateSEOMetadata({
  title: 'Read the E-Magazine',
  description: 'Read the National Revival Congress 2026 EBOMI magazine online.',
  path: '/magazine/read',
  image: MAGAZINE_COVER_PATH,
})

export default function MagazineReadPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#071526] text-white">
      <div className="sticky top-[4.5rem] z-30 border-b border-white/10 bg-[#071526]/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a
            href="/magazine"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Cover
          </a>
          <p className="text-xs sm:text-sm text-white/70">{MAGAZINE_PAGES.length} pages</p>
          <a
            href={MAGAZINE_PDF_PATH}
            download="EBOMI-Magazine.pdf"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light"
          >
            <Download className="w-4 h-4" />
            PDF
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-0 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6 pb-20">
        {MAGAZINE_PAGES.map((page, index) => (
          <figure key={page.src} className="bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.src}
              alt={`Magazine page ${index + 1} of ${MAGAZINE_PAGES.length}`}
              width={page.width}
              height={page.height}
              loading={index < 2 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding={index < 2 ? 'sync' : 'async'}
              className="w-full h-auto"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
