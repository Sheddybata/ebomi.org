import AdminShell from '@/components/conference/AdminShell'
import ReportsPanel from '@/components/conference/ReportsPanel'

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy-dark">Registration reports</h2>
        <p className="text-gray-600">
          Download clean PDF reports for zones, states, affiliation, countries, and feeding.
          CSV is still available if you need Excel.
        </p>
      </div>
      <ReportsPanel />
    </AdminShell>
  )
}
