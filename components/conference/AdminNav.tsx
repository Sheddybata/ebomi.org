'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, QrCode, Tags, LogOut } from 'lucide-react'

const links = [
  { href: '/admin/conference', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/conference/scan', label: 'Scan', icon: QrCode },
  { href: '/admin/conference/tags', label: 'Print Tags', icon: Tags },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/conference/login')
    router.refresh()
  }

  return (
    <div className="bg-navy text-white border-b border-white/10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-gold text-xs font-semibold uppercase tracking-wider">EBOMI Admin</p>
          <h1 className="text-lg sm:text-xl font-bold">Conference Operations</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  active ? 'bg-white text-navy-dark' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
