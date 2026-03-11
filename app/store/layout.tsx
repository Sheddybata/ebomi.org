import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EBOMI Store | Crest, Apparel, Accessories & Anointing Oil',
  description: 'Shop EBOMI merchandise — crest, t-shirts, face caps, wristbands, and anointing oil. Wear and carry the ministry with you.',
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
