import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/conference/adminAuth'
import AdminNav from '@/components/conference/AdminNav'

export default async function AdminShell({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/conference/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-navy-dark [color-scheme:light] print:min-h-0 print:bg-white">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-none print:mx-0 print:px-0 print:py-0">
        {children}
      </main>
    </div>
  )
}
