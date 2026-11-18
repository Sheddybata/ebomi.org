import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EBOMI Store | Lapel Pin, Apparel & Accessories',
  description: 'Shop EBOMI merchandise — lapel pins, t-shirts, face caps, and wristbands. Wear and carry the ministry with you.',
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
