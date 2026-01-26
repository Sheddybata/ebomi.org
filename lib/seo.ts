import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebomi.org'
const siteName = 'EBOMI - Evangelical Biblical Outreach Ministries International'
const defaultDescription = 'Radical, Prophetic, and Authoritative Ministry - Transforming lives through the Word of God'

export function generateSEOMetadata({
  title,
  description = defaultDescription,
  path = '',
  image = '/ebomilogo.png',
  type = 'website',
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: string
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    keywords: [
      'EBOMI',
      'ebomi',
      'abomi',
      'EBOMI.org',
      'ebomi.org',
      'abomi.org',
      'Evangelical Biblical Outreach Ministries International',
      'Prophet Isa El-Buba',
      'Isa El-Buba',
      'Prophet Isa El Buba',
      'Christian Ministry',
      'Prayer',
      'Intercession',
      'Nigeria',
      'Global Ministry',
      'Church',
      'Bible',
      'Worship',
      'Sermons',
      'Teachings',
      'Prophetic Ministry',
      'Revival',
      'Global Revival Congress',
      'EBOMI Temple',
      'EBOMI Towers',
      'Jos Nigeria',
      'Plateau State',
      'Christian Church Nigeria',
      'Ministry Nigeria',
      'Prophetic Monday',
      'Gathering of Champions',
      'EBOMI TV',
      'ebomi.tv',
      'Prayer Army',
      'Intercessors',
    ],
    authors: [{ name: 'EBOMI' }],
    creator: 'EBOMI',
    publisher: 'EBOMI',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type as any,
      locale: 'en_US',
      url,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${siteUrl}${image}`],
      creator: '@EBOMIGlobal',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStructuredData({
  type = 'Organization',
  name = siteName,
  description = defaultDescription,
  url = siteUrl,
  logo = `${siteUrl}/ebomilogo.png`,
  address = {
    streetAddress: 'No1 Kashim Ibrahim Street',
    addressLocality: 'Jos',
    addressRegion: 'Plateau State',
    addressCountry: 'NG',
  },
  contactPoint = {
    telephone: '+234-808-253-8837',
    contactType: 'Customer Service',
    email: 'ebomiglobal@gmail.com',
  },
  sameAs = [
    'https://www.youtube.com/@EBOMIGlobal',
    'https://www.youtube.com/c/ProphetIsaElBuba',
    'https://web.facebook.com/officialisaelbuba',
    'https://www.instagram.com/isaelbuba',
    'https://x.com/isaelbuba',
    'https://ebomi.tv',
    'https://isaelbuba.com',
  ],
}: {
  type?: string
  name?: string
  description?: string
  url?: string
  logo?: string
  address?: any
  contactPoint?: any
  sameAs?: string[]
} = {}) {
  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      description,
      url,
      logo,
      alternateName: ['EBOMI', 'ebomi', 'abomi', 'Evangelical Biblical Outreach Ministries International'],
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint,
      },
      sameAs,
      foundingDate: '1990',
      founder: {
        '@type': 'Person',
        name: 'Prophet Isa El-Buba',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Global',
      },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
  }
}
