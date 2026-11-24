import AdminShell from '@/components/conference/AdminShell'
import ArrivalSheet from '@/components/conference/ArrivalSheet'

export default function AdminArrivalSheetPage() {
  return (
    <AdminShell>
      <div className="mb-6 print:mb-4">
        <h2 className="text-2xl font-bold text-navy-dark print:text-black">Arrival sheet</h2>
        <p className="text-gray-600 print:text-black print:text-sm">
          Name, affiliation, state, ID, and School of Ministry. Tick Arrived to check them in —
          same record as badge scan.
        </p>
      </div>
      <ArrivalSheet />
    </AdminShell>
  )
}
