'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { Language } from '@/lib/translations'
import ReactCountryFlag from 'react-country-flag'

export default function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentLanguage = availableLanguages.find((lang) => lang.code === language)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-md text-white hover:text-white/90 font-medium transition-all rounded-lg hover:bg-white/20 border border-white/20 group shadow-lg min-h-[44px] min-w-[44px] touch-manipulation"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        {currentLanguage?.countryCode ? (
          <ReactCountryFlag
            countryCode={currentLanguage.countryCode}
            svg
            style={{
              width: '1.5em',
              height: '1.5em',
            }}
            title={currentLanguage.name}
          />
        ) : (
          <span className="text-2xl">🌐</span>
        )}
        <span className="hidden sm:inline text-sm font-semibold">{currentLanguage?.name || 'English'}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden z-50">
          <div className="py-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-navy/30 scrollbar-track-transparent">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors min-h-[44px] touch-manipulation ${
                  language === lang.code
                    ? 'bg-navy/20 text-navy font-semibold'
                    : 'text-gray-700 hover:bg-navy/10 hover:text-navy active:bg-navy/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {lang.countryCode ? (
                      <ReactCountryFlag
                        countryCode={lang.countryCode}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                        }}
                        title={lang.name}
                      />
                    ) : (
                      <span className="text-2xl">🌐</span>
                    )}
                    <span>{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <span className="text-gold text-lg">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
