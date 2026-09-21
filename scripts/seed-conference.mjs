import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '..', 'data', 'conference-registrations.json')

const samples = [
  {
    registrationId: 'NCDM-2026-DEMO01',
    conferenceSlug: 'national-congress-2026',
    name: 'Grace Emmanuel',
    phone: '+2348030000001',
    email: 'grace.demo@example.com',
    state: 'Plateau',
    residentialAddress: 'No. 12 Ahmadu Bello Way, Jos',
    churchDenomination: 'Assemblies of God',
    affiliation: 'EBOMITE',
    occupation: 'Ministry / Church Leader',
    needsAccommodation: true,
    needsFeeding: true,
    heardAbout: 'Church Announcement / EBOMI Member',
    checkedIn: false,
    checkedInAt: null,
    meals: [],
    createdAt: new Date().toISOString(),
  },
  {
    registrationId: 'NCDM-2026-DEMO02',
    conferenceSlug: 'national-congress-2026',
    name: 'Samuel Okonkwo',
    phone: '+2348050000002',
    email: 'samuel.demo@example.com',
    state: 'Lagos',
    residentialAddress: '14 Adeola Odeku Street, Victoria Island',
    churchDenomination: 'Redeemed Christian Church of God',
    affiliation: 'PFN',
    occupation: 'Business Owner / Entrepreneur',
    needsAccommodation: false,
    needsFeeding: true,
    heardAbout: 'Social Media (Facebook, Instagram, WhatsApp, etc.)',
    checkedIn: true,
    checkedInAt: new Date().toISOString(),
    meals: [
      {
        mealType: 'lunch',
        mealDate: '2026-11-23',
        scannedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    registrationId: 'NCDM-2026-DEMO03',
    conferenceSlug: 'national-congress-2026',
    name: 'Maryam Bello',
    phone: '+2348070000003',
    email: '',
    state: 'Kaduna',
    residentialAddress: '8 Independence Way, Kaduna',
    churchDenomination: 'ECWA',
    affiliation: 'Intercessor',
    occupation: 'Corporate Professional',
    needsAccommodation: true,
    needsFeeding: true,
    heardAbout: 'Friend or Family member',
    checkedIn: false,
    checkedInAt: null,
    meals: [],
    createdAt: new Date().toISOString(),
  },
]

await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
await fs.writeFile(DATA_FILE, JSON.stringify(samples, null, 2), 'utf8')
console.log(`Seeded ${samples.length} demo registrations to ${DATA_FILE}`)
