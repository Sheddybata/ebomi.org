'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import { COUNTRY_DIAL_CODES } from '@/lib/conference/dialCodes'

export default function PhoneCountryInput({
  countryIso,
  nationalNumber,
  onCountryChange,
  onNumberChange,
}: {
  countryIso: string
  nationalNumber: string
  onCountryChange: (iso: string) => void
  onNumberChange: (value: string) => void
}) {
  const selected = COUNTRY_DIAL_CODES.find((country) => country.iso === countryIso) ?? COUNTRY_DIAL_CODES[0]
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const countries = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return COUNTRY_DIAL_CODES
    return COUNTRY_DIAL_CODES.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.dial.includes(term) ||
        country.iso.toLowerCase().includes(term)
    )
  }, [query])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    searchRef.current?.focus()

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectCountry = (iso: string) => {
    onCountryChange(iso)
    setOpen(false)
    setQuery('')
    phoneRef.current?.focus()
  }

  return (
    <div ref={rootRef} className="relative text-navy-dark [color-scheme:light]">
      <div className="flex rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-navy focus-within:border-navy min-h-[48px]">
        <button
          type="button"
          aria-label="Select country code"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => {
            setOpen((prev) => !prev)
            setQuery('')
          }}
          className="w-[7.25rem] shrink-0 border-r border-gray-300 bg-gray-50 px-2.5 flex items-center gap-1.5 text-navy-dark"
        >
          <ReactCountryFlag
            countryCode={selected.iso}
            svg
            style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }}
            title={selected.name}
          />
          <span className="text-sm font-semibold leading-none text-navy-dark">{selected.dial}</span>
          <ChevronDown className="ml-auto w-3.5 h-3.5 text-gray-500 shrink-0" />
        </button>
        <input
          ref={phoneRef}
          id="phone"
          type="tel"
          inputMode="tel"
          required
          value={nationalNumber}
          onChange={(e) => onNumberChange(e.target.value)}
          className="flex-1 min-w-0 w-full px-4 py-3 outline-none bg-white text-navy-dark min-h-[48px] placeholder:text-gray-400"
          placeholder="801 234 5678"
          autoComplete="tel-national"
        />
      </div>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full min-w-[18rem] rounded-xl border border-gray-200 bg-white text-navy-dark shadow-xl [color-scheme:light]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full bg-white text-navy-dark placeholder:text-gray-400 outline-none text-sm py-1"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {countries.map((country) => {
              const isSelected = country.iso === selected.iso
              return (
                <li key={country.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectCountry(country.iso)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-navy-dark hover:bg-navy/5 ${
                      isSelected ? 'bg-navy/10 font-semibold' : ''
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={country.iso}
                      svg
                      style={{ width: '1.15rem', height: '1.15rem', flexShrink: 0 }}
                      title={country.name}
                    />
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-gray-600 font-medium shrink-0">{country.dial}</span>
                  </button>
                </li>
              )
            })}
            {countries.length === 0 && (
              <li className="px-3 py-4 text-sm text-gray-500 text-center">No countries match that search.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
