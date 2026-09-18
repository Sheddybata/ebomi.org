import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/conference/adminAuth'
import AdminLoginForm from '@/components/conference/AdminLoginForm'

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin/conference')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 text-navy-dark [color-scheme:light]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">EBOMI Admin</p>
        <h1 className="text-2xl font-bold text-navy-dark mb-2">Conference Login</h1>
        <p className="text-gray-600 text-sm mb-8">
          Sign in to manage registrations, scan badges, and print tags.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  )
}
