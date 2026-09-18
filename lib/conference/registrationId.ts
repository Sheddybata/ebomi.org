const PREFIX = 'NCDM-2026'

export function generateRegistrationId(): string {
  const segment = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${PREFIX}-${segment}`
}
