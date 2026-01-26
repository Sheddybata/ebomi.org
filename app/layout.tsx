import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import BackgroundAudio from '@/components/BackgroundAudio'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: 'Home',
    description: 'EBOMI (Evangelical Biblical Outreach Ministries International) - A radical, prophetic, and authoritative ministry committed to spreading the Gospel and transforming lives globally. Also known as abomi, ebomi.org.',
  }),
  icons: {
    icon: [
      { url: '/ebomilogo.png', sizes: 'any' },
      { url: '/ebomilogo.png', sizes: '16x16', type: 'image/png' },
      { url: '/ebomilogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/ebomilogo.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/ebomilogo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/ebomilogo.png' },
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

