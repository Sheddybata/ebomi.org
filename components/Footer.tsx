'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { LOGO_PATH } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'

const socialLinks = [
  { icon: Youtube, href: 'https://www.youtube.com/c/ProphetIsaElBuba', label: 'YouTube', color: 'hover:text-red-400' },
  { icon: Facebook, href: 'https://web.facebook.com/officialisaelbuba', label: 'Facebook', color: 'hover:text-blue-400' },
  { icon: Instagram, href: 'https://www.instagram.com/isaelbuba', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: Twitter, href: 'https://x.com/isaelbuba', label: 'X (Twitter)', color: 'hover:text-white' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src={LOGO_PATH}
                  alt="EBOMI Logo"
                  className="w-full h-full object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-gold">EBOMI</h3>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">{t.footer.about}</p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/upcoming-programs" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.branches}
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.store}
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.joinUs}
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-white/70 hover:text-gold transition-colors text-sm">
                  {t.nav.library}
                </Link>
              </li>
              <li>
                <Link href="/give" className="text-white/70 hover:text-gold transition-colors text-sm">
                  Give
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t.footer.headquarters}</h4>
            <div className="flex items-start space-x-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
              <span>EBOMI Temple & Suites, No1 Kashim Ibrahim Street, Jos, Plateau State of Nigeria</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t.footer.contactUs}</h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:ebomiglobal@gmail.com"
                className="flex items-center space-x-2 text-white/70 text-sm hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>ebomiglobal@gmail.com</span>
              </a>
              <a
                href="tel:08082538837"
                className="flex items-center space-x-2 text-white/70 text-sm hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>08082538837</span>
              </a>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/80 ${social.color} hover:bg-white/15 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-white/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Evangelical Biblical Outreach Ministries International.{' '}
            {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
