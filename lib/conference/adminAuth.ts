import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'ebomi_conference_admin'
const SESSION_MAX_AGE = 60 * 60 * 12 // 12 hours

function getAdminSecret() {
  return (
    process.env.CONFERENCE_ADMIN_SECRET ||
    process.env.CONFERENCE_ADMIN_PASSWORD ||
    'ebomi-dev-admin-secret'
  )
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getAdminSecret()).update(payload).digest('hex')
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.CONFERENCE_ADMIN_PASSWORD || 'ebomi2026'
  return password === expected
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000
  const payload = `admin:${expiresAt}`
  const token = `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function clearAdminSession() {
  cookies().delete(COOKIE_NAME)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return false

  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return false

  try {
    const payload = Buffer.from(encoded, 'base64url').toString('utf8')
    if (sign(payload) !== signature) return false

    const [, expiresAtRaw] = payload.split(':')
    const expiresAt = Number(expiresAtRaw)
    if (!expiresAt || Date.now() > expiresAt) return false

    return payload.startsWith('admin:')
  } catch {
    return false
  }
}

export async function requireAdminAuth() {
  const ok = await isAdminAuthenticated()
  if (!ok) {
    throw new Error('UNAUTHORIZED')
  }
}
