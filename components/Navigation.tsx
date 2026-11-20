'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { LOGO_PATH } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'
import GlobalSearch from './GlobalSearch'

const primaryLinks = [
  { href: '/', key: 'home' as const },
  { href: '/upcoming-programs', key: 'aboutUs' as const },
  { href: '/branches', key: 'branches' as const },
  { href: '/gallery', key: 'gallery' as const },
  { href: '/join-us', key: 'joinUs' as const },
]

const moreLinks = [
  { href: '/library', key: 'library' as const },
  { href: '/store', key: 'store' as const },
  { href: '/download-centre', key: 'resources' as const },
  { href: '/#tour', key: 'visitTemple' as const },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const hash = href.split('#')[1]
      const element = document.getElementById(hash)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
        setMoreOpen(false)
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/95 backdrop-blur-lg shadow-sm border-b border-stone-200/80'
          : 'bg-canvas/80 backdrop-blur-md border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.5rem]">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0">
              <img
                src={LOGO_PATH}
                alt="EBOMI Logo"
                className="w-full h-full object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            <span className="font-display text-xl font-semibold text-ink tracking-tight">
              EBOMI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink/80 hover:text-navy font-medium text-sm transition-colors"
              >
                {t.nav[link.key]}
              </Link>
            ))}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className="inline-flex items-center gap-1 text-ink/80 hover:text-navy font-medium text-sm transition-colors"
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                {t.nav.more}
                <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-3 w-52 rounded-xl border border-stone-200 bg-white py-2 shadow-xl [color-scheme:light]">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="block px-4 py-2.5 text-sm text-ink hover:bg-canvas hover:text-navy"
                    >
                      {t.nav[link.key]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <GlobalSearch />
            <a
              href="/register/national-congress-2026"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-stone-300 text-ink text-sm font-semibold hover:border-navy hover:text-navy transition-colors min-h-[40px]"
            >
              {t.home.registerNow}
            </a>
            <Link
              href="/give"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors min-h-[40px]"
            >
              Give
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-ink hover:text-navy transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <div className="md:hidden pb-5 space-y-1 pt-2 relative z-50 bg-canvas">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3.5 text-ink hover:text-navy hover:bg-stone-200/50 rounded-lg transition-all min-h-[44px] touch-manipulation"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <p className="px-4 pt-3 pb-1 text-xs uppercase tracking-wider text-muted">{t.nav.more}</p>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    if (!link.href.includes('#')) setIsOpen(false)
                  }}
                  className="block px-4 py-3.5 text-ink hover:text-navy hover:bg-stone-200/50 rounded-lg transition-all min-h-[44px] touch-manipulation"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <div className="px-4 pt-3 flex flex-col gap-2">
                <GlobalSearch />
                <a
                  href="/register/national-congress-2026"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-full border border-stone-300 text-ink font-semibold hover:border-navy hover:text-navy transition-colors min-h-[44px]"
                >
                  {t.home.registerNow}
                </a>
                <Link
                  href="/give"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-3 rounded-full bg-navy text-white font-semibold hover:bg-navy-dark transition-colors min-h-[44px]"
                >
                  Give
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
