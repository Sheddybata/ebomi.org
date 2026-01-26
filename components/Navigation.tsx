'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import GlobalSearch from './GlobalSearch'

const navLinks = [
  { href: '/', key: 'home' as const },
  { href: '/upcoming-programs', key: 'aboutUs' as const },
  { href: '/branches', key: 'branches' as const },
  { href: '/gallery', key: 'gallery' as const },
  { href: '/library', key: 'library' as const },
  { href: '/download-centre', key: 'resources' as const },
  { href: '/join-us', key: 'joinUs' as const },
  { href: '/#tour', key: 'visitTemple' as const },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scroll for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const hash = href.split('#')[1]
      const element = document.getElementById(hash)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-navy/40 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-navy/30 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <img
                src="/ebomilogo.png"
                alt="EBOMI Logo"
                className="w-full h-full object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            <span className="text-xl font-bold text-white transition-colors">
              EBOMI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-white hover:text-white/80 font-medium transition-colors relative group"
              >
                {t.nav[link.key]}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <GlobalSearch />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-white hover:text-white/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Menu */}
            <div className="md:hidden pb-4 space-y-1 pt-2 relative z-50 animate-in slide-in-from-top-2 duration-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    if (!link.href.includes('#')) {
                      setIsOpen(false)
                    }
                  }}
                  className="block px-4 py-3.5 text-white hover:text-white/90 hover:bg-white/10 rounded-lg transition-all min-h-[44px] touch-manipulation active:bg-white/20"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              {/* Close button at bottom */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 px-4 py-3.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px] touch-manipulation flex items-center justify-between"
              >
                <span>Close Menu</span>
                <X size={20} className="flex-shrink-0" />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

