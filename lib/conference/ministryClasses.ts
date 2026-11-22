export const MINISTRY_CLASS_COUNT = 8
export const MINISTRY_CLASSES = [1, 2, 3, 4, 5, 6, 7, 8] as const

export type MinistryClass = (typeof MINISTRY_CLASSES)[number]

export function parseMinistryClass(value: unknown): MinistryClass | null {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isInteger(number) || number < 1 || number > MINISTRY_CLASS_COUNT) return null
  return number as MinistryClass
}

export function formatMinistryClass(ministryClass: number | null | undefined): string {
  const parsed = parseMinistryClass(ministryClass)
  if (!parsed) return ''
  return `School of ministry: Class ${parsed}`
}

export function nextMinistryClass(existingClasses: Array<number | null | undefined>): MinistryClass {
  const counts = Array.from({ length: MINISTRY_CLASS_COUNT }, () => 0)
  for (const value of existingClasses) {
    const parsed = parseMinistryClass(value)
    if (parsed) counts[parsed - 1] += 1
  }

  const lowest = Math.min(...counts)
  const candidates = counts
    .map((count, index) => (count === lowest ? ((index + 1) as MinistryClass) : null))
    .filter((value): value is MinistryClass => value !== null)

  return candidates[Math.floor(Math.random() * candidates.length)] ?? 1
}

export function assignMissingMinistryClasses<T extends { ministryClass?: number | null }>(
  records: T[]
): { records: T[]; updates: { index: number; ministryClass: MinistryClass }[] } {
  const counts = Array.from({ length: MINISTRY_CLASS_COUNT }, () => 0)
  for (const record of records) {
    const parsed = parseMinistryClass(record.ministryClass)
    if (parsed) counts[parsed - 1] += 1
  }

  const missingIndexes = records
    .map((record, index) => (parseMinistryClass(record.ministryClass) ? -1 : index))
    .filter((index) => index >= 0)

  for (let i = missingIndexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[missingIndexes[i], missingIndexes[j]] = [missingIndexes[j], missingIndexes[i]]
  }

  const updates: { index: number; ministryClass: MinistryClass }[] = []
  const nextRecords = [...records]

  for (const index of missingIndexes) {
    const lowest = Math.min(...counts)
    const candidates = counts
      .map((count, classIndex) => (count === lowest ? ((classIndex + 1) as MinistryClass) : null))
      .filter((value): value is MinistryClass => value !== null)
    const ministryClass = candidates[Math.floor(Math.random() * candidates.length)] ?? 1
    counts[ministryClass - 1] += 1
    nextRecords[index] = { ...nextRecords[index], ministryClass }
    updates.push({ index, ministryClass })
  }

  return { records: nextRecords, updates }
}
