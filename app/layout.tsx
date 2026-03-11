import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import BackgroundAudio from '@/components/BackgroundAudio'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'
import { LOGO_PATH } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <BackgroundAudio />
      </body>
    </html>
  )
}

