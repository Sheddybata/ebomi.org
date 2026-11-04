import type { Metadata } from 'next'
import { Fraunces, Noto_Sans_Arabic, Noto_Sans_Hebrew, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import BackgroundAudio from '@/components/BackgroundAudio'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'
import { LOGO_PATH } from '@/lib/constants'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  weight: ['400', '600', '700'],
  variable: '--font-hebrew',
  display: 'swap',
})

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: 'Home',
    description: 'EBOMI (Evangelical Biblical Outreach Ministries International) - A radical, prophetic, and authoritative ministry committed to spreading the Gospel and transforming lives globally. Also known as abomi, ebomi.org.',
  }),
  icons: {
    icon: [
      { url: LOGO_PATH, sizes: 'any' },
      { url: LOGO_PATH, sizes: '16x16', type: 'image/png' },
      { url: LOGO_PATH, sizes: '32x32', type: 'image/png' },
      { url: LOGO_PATH, sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: LOGO_PATH, sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: LOGO_PATH },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'NG-PL',
    'geo.placename': 'Jos, Plateau State, Nigeria',
    'geo.position': '9.8965;8.8583',
    'ICBM': '9.8965, 8.8583',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData()

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${sourceSans.variable} ${notoArabic.variable} ${notoHebrew.variable} font-sans`}
      >
        <Providers>
          {children}
        </Providers>
        <BackgroundAudio />
      </body>
    </html>
  )
}

