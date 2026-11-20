'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import { COUNTRY_DIAL_CODES } from '@/lib/conference/dialCodes'

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string
  onChange: (countryName: string) => void
}) {
  const selected =
    COUNTRY_DIAL_CODES.find((country) => country.name === value) ?? COUNTRY_DIAL_CODES[0]
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const countries = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return COUNTRY_DIAL_CODES
    return COUNTRY_DIAL_CODES.filter(
      (country) =>
        country.name.toLowerCase().includes(term) || country.iso.toLowerCase().includes(term)
    )
  }, [query])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    const id = window.setTimeout(() => searchRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.clearTimeout(id)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative text-navy-dark [color-scheme:light]">
      <input type="hidden" name="country" value={selected.name} required />
      <button
        type="button"
        id="country"
        aria-label="Select country"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          setOpen((prev) => !prev)
          setQuery('')
        }}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-navy-dark min-h-[48px] flex items-center gap-2 text-left focus:ring-2 focus:ring-navy focus:border-navy outline-none"
      >
        <ReactCountryFlag
          countryCode={selected.iso}
          svg
          style={{ width: '1.2rem', height: '1.2rem', flexShrink: 0 }}
          title={selected.name}
        />
        <span className="flex-1 truncate">{selected.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-gray-200 bg-white text-navy-dark shadow-xl [color-scheme:light]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="w-full bg-white text-navy-dark placeholder:text-gray-400 outline-none text-sm py-1"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {countries.map((country) => {
              const isSelected = country.name === selected.name
              return (
                <li key={country.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(country.name)
                      setOpen(false)
                      setQuery('')
                    }}
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
                  </button>
                </li>
              )
            })}
            {countries.length === 0 && (
              <li className="px-3 py-4 text-sm text-gray-500 text-center">
                No countries match that search.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
