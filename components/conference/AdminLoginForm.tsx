'use client'

import { Lock } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminInputClass } from '@/lib/conference/formStyles'

export default function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Login failed.')
        return
      }

      router.push('/admin/conference')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-navy-dark mb-2">
          Admin Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${adminInputClass} pl-11`}
            placeholder="Enter admin password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-light disabled:opacity-60 transition-colors min-h-[48px]"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
