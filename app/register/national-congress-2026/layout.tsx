import type { Metadata } from 'next'
import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'

export const metadata: Metadata = {
  title: `Register | ${NATIONAL_CONGRESS_2026.title}`,
  description: `Register for ${NATIONAL_CONGRESS_2026.title} — ${NATIONAL_CONGRESS_2026.theme}`,
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
