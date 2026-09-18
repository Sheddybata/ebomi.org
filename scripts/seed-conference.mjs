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
    phone: '+234 803 000 0001',
    email: 'grace.demo@example.com',
    state: 'Plateau',
    affiliation: 'EBOMITE',
    occupation: 'Ministry / Church Leader',
    needsAccommodation: true,
    needsFeeding: true,
    needsRideHome: false,
    heardAbout: 'Church Announcement / EBOMI Member',
    checkedIn: false,
    checkedInAt: null,
    breakfastAt: null,
    lunchAt: null,
    dinnerAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    registrationId: 'NCDM-2026-DEMO02',
    conferenceSlug: 'national-congress-2026',
    name: 'Samuel Okonkwo',
    phone: '+234 805 000 0002',
    email: 'samuel.demo@example.com',
    state: 'Lagos',
    affiliation: 'PFN',
    occupation: 'Business Owner / Entrepreneur',
    needsAccommodation: false,
    needsFeeding: true,
    needsRideHome: true,
    heardAbout: 'Social Media (Facebook, Instagram, WhatsApp, etc.)',
    checkedIn: true,
    checkedInAt: new Date().toISOString(),
    breakfastAt: new Date().toISOString(),
    lunchAt: null,
    dinnerAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    registrationId: 'NCDM-2026-DEMO03',
    conferenceSlug: 'national-congress-2026',
    name: 'Maryam Bello',
    phone: '+234 807 000 0003',
    email: 'maryam.demo@example.com',
    state: 'Kaduna',
    affiliation: 'Intercessor',
    occupation: 'Corporate Professional',
    needsAccommodation: true,
    needsFeeding: true,
    needsRideHome: false,
    heardAbout: 'Friend or Family member',
    checkedIn: false,
    checkedInAt: null,
    breakfastAt: null,
    lunchAt: null,
    dinnerAt: null,
    createdAt: new Date().toISOString(),
  },
]

await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
await fs.writeFile(DATA_FILE, JSON.stringify(samples, null, 2), 'utf8')
console.log(`Seeded ${samples.length} demo registrations to ${DATA_FILE}`)
