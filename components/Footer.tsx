'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'


const socialLinks = [
  { icon: Youtube, href: 'https://www.youtube.com/c/ProphetIsaElBuba', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Facebook, href: 'https://web.facebook.com/officialisaelbuba', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Instagram, href: 'https://www.instagram.com/isaelbuba', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Twitter, href: 'https://x.com/isaelbuba', label: 'X (Twitter)', color: 'hover:text-gray-400' },
]

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/ebomilogo.png"
                  alt="EBOMI Logo"
                  className="w-full h-full object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
              <h3 className="text-xl font-bold text-gold">EBOMI</h3>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.footer.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/upcoming-programs" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  {t.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  {t.nav.branches}
                </Link>
              </li>
              <li>
                <Link href="/give" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  {t.nav.joinUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.headquarters}</h4>
            <div className="flex items-start space-x-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
              <span>
                EBOMI Temple & Suites, No1 Kashim Ibrahim Street, Jos, Plateau State of Nigeria
              </span>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contactUs}</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:ebomiglobal@gmail.com" className="flex items-center space-x-2 text-gray-300 text-sm hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" />
                <span>ebomiglobal@gmail.com</span>
              </a>
              <a href="tel:08082538837" className="flex items-center space-x-2 text-gray-300 text-sm hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" />
                <span>08082538837</span>
              </a>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-full bg-navy-light flex items-center justify-center text-gray-300 ${social.color} hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Evangelical Biblical Outreach Ministries International. {t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  )
}

