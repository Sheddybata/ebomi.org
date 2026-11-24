import AdminShell from '@/components/conference/AdminShell'
import SingleTagPrint from '@/components/conference/SingleTagPrint'

export default function AdminSingleTagPage({
  params,
}: {
  params: { registrationId: string }
}) {
  const registrationId = decodeURIComponent(params.registrationId)

  return (
    <AdminShell>
      <SingleTagPrint registrationId={registrationId} />
    </AdminShell>
  )
}
