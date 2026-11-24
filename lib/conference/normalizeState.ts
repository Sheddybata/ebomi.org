import { NIGERIAN_STATES } from './config'

export type GeopoliticalZone =
  | 'North Central'
  | 'North East'
  | 'North West'
  | 'South East'
  | 'South South'
  | 'South West'
  | 'FCT'
  | 'International'
  | 'Other'

const ZONE_BY_STATE: Record<(typeof NIGERIAN_STATES)[number], GeopoliticalZone> = {
  Abia: 'South East',
  Adamawa: 'North East',
  'Akwa Ibom': 'South South',
  Anambra: 'South East',
  Bauchi: 'North East',
  Bayelsa: 'South South',
  Benue: 'North Central',
  Borno: 'North East',
  'Cross River': 'South South',
  Delta: 'South South',
  Ebonyi: 'South East',
  Edo: 'South South',
  Ekiti: 'South West',
  Enugu: 'South East',
  'FCT - Abuja': 'FCT',
  Gombe: 'North East',
  Imo: 'South East',
  Jigawa: 'North West',
  Kaduna: 'North West',
  Kano: 'North West',
  Katsina: 'North West',
  Kebbi: 'North West',
  Kogi: 'North Central',
  Kwara: 'North Central',
  Lagos: 'South West',
  Nasarawa: 'North Central',
  Niger: 'North Central',
  Ogun: 'South West',
  Ondo: 'South West',
  Osun: 'South West',
  Oyo: 'South West',
  Plateau: 'North Central',
  Rivers: 'South South',
  Sokoto: 'North West',
  Taraba: 'North East',
  Yobe: 'North East',
  Zamfara: 'North West',
}

const ALIASES: Record<string, (typeof NIGERIAN_STATES)[number]> = {
  abia: 'Abia',
  adamawa: 'Adamawa',
  akwaibom: 'Akwa Ibom',
  anambra: 'Anambra',
  bauchi: 'Bauchi',
  bayelsa: 'Bayelsa',
  benue: 'Benue',
  borno: 'Borno',
  crossriver: 'Cross River',
  delta: 'Delta',
  ebonyi: 'Ebonyi',
  ebony: 'Ebonyi',
  edo: 'Edo',
  benincity: 'Edo',
  ekiti: 'Ekiti',
  enugu: 'Enugu',
  fct: 'FCT - Abuja',
  fctabuja: 'FCT - Abuja',
  abuja: 'FCT - Abuja',
  abujafct: 'FCT - Abuja',
  federalcapitalterritory: 'FCT - Abuja',
  abujafederalcapitalterritory: 'FCT - Abuja',
  gombe: 'Gombe',
  imo: 'Imo',
  emo: 'Imo',
  jigawa: 'Jigawa',
  kaduna: 'Kaduna',
  kano: 'Kano',
  katsina: 'Katsina',
  kastina: 'Katsina',
  kebbi: 'Kebbi',
  kogi: 'Kogi',
  kwara: 'Kwara',
  lagos: 'Lagos',
  nasarawa: 'Nasarawa',
  nassarawa: 'Nasarawa',
  nawarawa: 'Nasarawa',
  niger: 'Niger',
  ogun: 'Ogun',
  ondo: 'Ondo',
  osun: 'Osun',
  oyo: 'Oyo',
  plateau: 'Plateau',
  plateu: 'Plateau',
  jos: 'Plateau',
  josplateau: 'Plateau',
  plateaujos: 'Plateau',
  jossouth: 'Plateau',
  rivers: 'Rivers',
  sokoto: 'Sokoto',
  taraba: 'Taraba',
  jalingo: 'Taraba',
  yobe: 'Yobe',
  zamfara: 'Zamfara',
}

function compact(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, '')
}

export function normalizeNigerianState(raw: string): string | null {
  const original = (raw || '').trim()
  if (!original) return null
  if (compact(original) === 'nigeria') return null

  const cleaned = original
    .toLowerCase()
    .replace(/federal capital territory/g, 'fct')
    .replace(/local government|l\.?g\.?a\.?/g, ' ')
    .replace(/\bstate\b/g, ' ')
    .replace(
      /south[\s-]*south|south[\s-]*east|south[\s-]*west|north[\s-]*east|north[\s-]*west|north[\s-]*central|middle[\s-]*belt/g,
      ' ',
    )
    .replace(
      /southeast|southwest|northeast|northwest|northcentral|middlebelt|southsouth/g,
      ' ',
    )
    .replace(/\bislam\b/g, ' ')
    .replace(/[^a-z]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleaned || cleaned === 'nigeria') return null

  const key = cleaned.replace(/ /g, '')
  if (ALIASES[key]) return ALIASES[key]

  for (const st of NIGERIAN_STATES) {
    if (compact(st) === key) return st
  }

  for (const st of NIGERIAN_STATES) {
    const stKey = compact(st)
    if (stKey === 'niger') continue
    if (key.includes(stKey) && stKey.length >= 4) return st
  }

  const first = cleaned.split(' ')[0]
  if (first && ALIASES[first] && first !== 'niger') return ALIASES[first]

  return null
}

/** Official state name when recognizable; otherwise the trimmed original. */
export function displayState(raw: string): string {
  return normalizeNigerianState(raw) ?? ((raw || '').trim() || '—')
}

export function geopoliticalZone(state: string, country?: string): GeopoliticalZone {
  const normalized = normalizeNigerianState(state)
  if (normalized) return ZONE_BY_STATE[normalized as keyof typeof ZONE_BY_STATE]

  const countryName = (country || '').trim().toLowerCase()
  if (countryName && countryName !== 'nigeria') return 'International'
  if (compact(state) && compact(state) !== 'nigeria') {
    // Cameroon regions etc. without Nigeria country field
    if (/littoral|bamenda|northwest|cameroon/i.test(state)) return 'International'
  }
  return 'Other'
}

export const GEOPOLITICAL_ZONE_ORDER: GeopoliticalZone[] = [
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
  'FCT',
  'International',
  'Other',
]
