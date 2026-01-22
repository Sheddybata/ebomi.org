'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, languageNames, languageFlags, languageCountryCodes } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
  availableLanguages: { code: Language; name: string; flag: string; countryCode: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('ebomi-language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as Language
      if (translations[browserLang]) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebomi-language', lang)
      // Update HTML lang attribute
      document.documentElement.lang = lang
    }
  }

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Order: Nigerian languages first, then English, then others
  const languageOrder: Language[] = ['ha', 'yo', 'ig', 'ff', 'en', 'fr', 'es', 'pt', 'ar', 'zh', 'he', 'de', 'hi', 'ko']
  
  const availableLanguages = languageOrder.map((code) => ({
    code,
    name: languageNames[code],
    flag: languageFlags[code],
    countryCode: languageCountryCodes[code],
  }))

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  }

  // Always provide the context, even before mounting (prevents hydration errors)
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
