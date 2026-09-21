import AdminShell from '@/components/conference/AdminShell'
import ConferenceScanner from '@/components/conference/ConferenceScanner'

export default function AdminScanPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy-dark">Scan Badges</h2>
        <p className="text-gray-600">
          Select an action. Lunch and dinner are saved for the selected day (defaults to today),
          so Tuesday lunch is separate from Wednesday lunch.
        </p>
      </div>
      <ConferenceScanner />
    </AdminShell>
  )
}
