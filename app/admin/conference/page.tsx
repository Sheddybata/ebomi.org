import AdminShell from '@/components/conference/AdminShell'
import AdminDashboard from '@/components/conference/AdminDashboard'
import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'

export default function AdminConferencePage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-dark">{NATIONAL_CONGRESS_2026.title}</h2>
        <p className="text-gray-600">{NATIONAL_CONGRESS_2026.theme}</p>
      </div>
      <AdminDashboard />
    </AdminShell>
  )
}
