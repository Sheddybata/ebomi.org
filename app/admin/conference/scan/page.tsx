import AdminShell from '@/components/conference/AdminShell'
import ConferenceScanner from '@/components/conference/ConferenceScanner'

export default function AdminScanPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-navy-dark">Scan Badges</h2>
        <p className="text-gray-600">
          Select an action, then scan a participant&apos;s QR code or enter their Registration ID.
        </p>
      </div>
      <ConferenceScanner />
    </AdminShell>
  )
}
