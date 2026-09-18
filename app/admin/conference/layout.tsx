import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conference Admin | EBOMI',
  robots: { index: false, follow: false },
}

export default function AdminConferenceLayout({ children }: { children: React.ReactNode }) {
  return children
}
