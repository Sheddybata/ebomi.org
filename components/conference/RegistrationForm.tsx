'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AFFILIATION_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  NATIONAL_CONGRESS_2026,
  OCCUPATION_OPTIONS,
  YES_NO_OPTIONS,
} from '@/lib/conference/config'
import { COUNTRY_DIAL_CODES } from '@/lib/conference/dialCodes'
import PhoneCountryInput from '@/components/conference/PhoneCountryInput'

function yesNoToBoolean(value: string): boolean | null {
  if (value === 'Yes') return true
  if (value === 'No') return false
  return null
}

export default function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    countryIso: 'NG',
    nationalNumber: '',
    email: '',
    state: '',
    residentialAddress: '',
    churchDenomination: '',
    affiliation: '',
    occupation: '',
    needsAccommodation: '',
    needsFeeding: '',
    heardAbout: '',
  })

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const needsAccommodation = yesNoToBoolean(form.needsAccommodation)
    const needsFeeding = yesNoToBoolean(form.needsFeeding)
    const countryDial =
      COUNTRY_DIAL_CODES.find((country) => country.iso === form.countryIso)?.dial ?? '+234'

    try {
      const response = await fetch('/api/conference/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conferenceSlug: NATIONAL_CONGRESS_2026.slug,
          name: form.name,
          countryDial,
          nationalNumber: form.nationalNumber,
          email: form.email,
          state: form.state,
          residentialAddress: form.residentialAddress,
          churchDenomination: form.churchDenomination,
          affiliation: form.affiliation,
          occupation: form.occupation,
          needsAccommodation,
          needsFeeding,
          heardAbout: form.heardAbout,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Registration failed. Please try again.')
        return
      }

      router.push(
        `${NATIONAL_CONGRESS_2026.registerPath}/success?id=${encodeURIComponent(result.registrationId)}`
      )
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-colors bg-white text-navy-dark min-h-[48px]'
  const labelClass = 'block text-sm font-semibold text-navy-dark mb-2'
  const fieldsetClass = 'space-y-3'
  const optionClass =
    'flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-navy/40 cursor-pointer transition-colors has-[:checked]:border-navy has-[:checked]:bg-navy/5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-navy">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={inputClass}
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-navy">*</span>
          </label>
          <PhoneCountryInput
            countryIso={form.countryIso}
            nationalNumber={form.nationalNumber}
            onCountryChange={(iso) => updateField('countryIso', iso)}
            onNumberChange={(value) => updateField('nationalNumber', value)}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={inputClass}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="state" className={labelClass}>
            State / Region <span className="text-navy">*</span>
          </label>
          <input
            id="state"
            type="text"
            required
            value={form.state}
            onChange={(e) => updateField('state', e.target.value)}
            className={inputClass}
            placeholder="Your state or region"
            autoComplete="address-level1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="residentialAddress" className={labelClass}>
          Residential Address <span className="text-navy">*</span>
        </label>
        <textarea
          id="residentialAddress"
          required
          rows={3}
          value={form.residentialAddress}
          onChange={(e) => updateField('residentialAddress', e.target.value)}
          className={`${inputClass} min-h-[96px] resize-y`}
          placeholder="Street, city, and any landmark"
          autoComplete="street-address"
        />
      </div>

      <div>
        <label htmlFor="churchDenomination" className={labelClass}>
          Church / Denomination you attend <span className="text-navy">*</span>
        </label>
        <input
          id="churchDenomination"
          type="text"
          required
          value={form.churchDenomination}
          onChange={(e) => updateField('churchDenomination', e.target.value)}
          className={inputClass}
          placeholder="e.g. Assemblies of God, Catholic, Redeemed, etc."
        />
      </div>

      <fieldset className={fieldsetClass}>
        <legend className={`${labelClass} mb-3`}>
          Affiliation <span className="text-navy">*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {AFFILIATION_OPTIONS.map((option) => (
            <label key={option} className={optionClass}>
              <input
                type="radio"
                name="affiliation"
                value={option}
                required
                checked={form.affiliation === option}
                onChange={(e) => updateField('affiliation', e.target.value)}
                className="mt-1 accent-navy"
              />
              <span className="text-sm text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={`${labelClass} mb-3`}>
          Primary Occupation / Industry <span className="text-navy">*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {OCCUPATION_OPTIONS.map((option) => (
            <label key={option} className={optionClass}>
              <input
                type="radio"
                name="occupation"
                value={option}
                required
                checked={form.occupation === option}
                onChange={(e) => updateField('occupation', e.target.value)}
                className="mt-1 accent-navy"
              />
              <span className="text-sm text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <YesNoField
        label="Will you require accommodation?"
        name="needsAccommodation"
        value={form.needsAccommodation}
        onChange={(value) => updateField('needsAccommodation', value)}
        optionClass={optionClass}
        labelClass={labelClass}
      />

      <YesNoField
        label="Will you require feeding during the conference?"
        name="needsFeeding"
        value={form.needsFeeding}
        onChange={(value) => updateField('needsFeeding', value)}
        optionClass={optionClass}
        labelClass={labelClass}
      />

      <fieldset className={fieldsetClass}>
        <legend className={`${labelClass} mb-3`}>
          How did you hear about this Summit? <span className="text-navy">*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {HEARD_ABOUT_OPTIONS.map((option) => (
            <label key={option} className={optionClass}>
              <input
                type="radio"
                name="heardAbout"
                value={option}
                required
                checked={form.heardAbout === option}
                onChange={(e) => updateField('heardAbout', e.target.value)}
                className="mt-1 accent-navy"
              />
              <span className="text-sm text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg min-h-[52px]"
      >
        {isSubmitting ? 'Submitting...' : 'Complete Registration'}
      </button>
    </form>
  )
}

function YesNoField({
  label,
  name,
  value,
  onChange,
  optionClass,
  labelClass,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  optionClass: string
  labelClass: string
}) {
  return (
    <fieldset className="space-y-3">
      <legend className={`${labelClass} mb-3`}>
        {label} <span className="text-navy">*</span>
      </legend>
      <div className="flex flex-wrap gap-3">
        {YES_NO_OPTIONS.map((option) => (
          <label key={option} className={`${optionClass} min-w-[120px] flex-1 sm:flex-none`}>
            <input
              type="radio"
              name={name}
              value={option}
              required
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="accent-navy"
            />
            <span className="text-sm font-medium text-gray-800">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
