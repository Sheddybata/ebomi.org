'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { NIGERIAN_STATES } from '@/lib/conference/config'

export default function NigerianStateSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (state: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const states = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return NIGERIAN_STATES
    return NIGERIAN_STATES.filter((state) => state.toLowerCase().includes(term))
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
      <input type="hidden" name="state" value={value} />
      <button
        type="button"
        id="state"
        aria-label="Select state"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          setOpen((prev) => !prev)
          setQuery('')
        }}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-navy-dark min-h-[48px] flex items-center gap-2 text-left focus:ring-2 focus:ring-navy focus:border-navy outline-none"
      >
        <span className={`flex-1 truncate ${value ? '' : 'text-gray-400'}`}>
          {value || 'Select a state'}
        </span>
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
              placeholder="Search state"
              className="w-full bg-white text-navy-dark placeholder:text-gray-400 outline-none text-sm py-1"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {states.map((state) => {
              const isSelected = state === value
              return (
                <li key={state}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(state)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={`w-full px-3 py-2.5 text-left text-sm text-navy-dark hover:bg-navy/5 ${
                      isSelected ? 'bg-navy/10 font-semibold' : ''
                    }`}
                  >
                    {state}
                  </button>
                </li>
              )
            })}
            {states.length === 0 && (
              <li className="px-3 py-4 text-sm text-gray-500 text-center">
                No states match that search.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
