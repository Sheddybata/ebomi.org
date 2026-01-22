'use client'

import { Heart, Seedling, Building2, Users, Shield, Lock } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

// Giving tiers will be created dynamically using translations

export default function GivePage() {
  const { t } = useLanguage()
  
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.give.title} <span className="text-gold">{t.give.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.give.subtitle}
          </p>
        </div>
      </section>

      {/* Security Badge */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <Shield className="w-6 h-6 text-gold" />
            <span className="font-semibold">{t.give.secureEncrypted}</span>
            <Lock className="w-5 h-5 text-gold" />
            <span className="font-semibold">{t.give.sslProtected}</span>
          </div>
        </div>
      </section>

      {/* Giving Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-dark mb-4">{t.give.waysToGive}</h2>
            <p className="text-gray-600 text-lg">{t.give.choosePartnership}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Tithe */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border-2 border-gray-100">
              <div className="bg-gradient-to-br from-gold to-gold-dark p-8 text-white">
                <Heart className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.give.tithe}</h3>
                <p className="text-white/90">{t.give.titheDescription}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.titheBenefit1}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.titheBenefit2}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.titheBenefit3}</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors">
                  {t.give.giveButton} {t.give.tithe}
                </button>
              </div>
            </div>
            
            {/* Seed */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border-2 border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 text-white">
                <Seedling className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.give.seed}</h3>
                <p className="text-white/90">{t.give.seedDescription}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.seedBenefit1}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.seedBenefit2}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.seedBenefit3}</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors">
                  {t.give.giveButton} {t.give.seed}
                </button>
              </div>
            </div>
            
            {/* Project */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border-2 border-gray-100">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
                <Building2 className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.give.project}</h3>
                <p className="text-white/90">{t.give.projectDescription}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.projectBenefit1}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.projectBenefit2}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold font-bold">✓</span>
                    <span className="text-gray-700">{t.give.projectBenefit3}</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors">
                  {t.give.giveButton} {t.give.project}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-8 md:p-12 border border-gold/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-8 h-8 text-gold" />
                  <h2 className="text-3xl md:text-4xl font-bold">{t.give.partnerTitle}</h2>
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {t.give.partnerDescription}
                </p>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{t.give.partnerBenefit1}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{t.give.partnerBenefit2}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{t.give.partnerBenefit3}</span>
                  </li>
                </ul>
                <button className="px-8 py-4 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-colors">
                  {t.give.becomePartner}
                </button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-64 h-64 bg-gold/10 rounded-full flex items-center justify-center border-2 border-gold/30">
                  <Heart className="w-32 h-32 text-gold/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-navy-dark mb-6">{t.give.paymentMethods}</h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <div className="px-6 py-3 border border-gray-300 rounded-lg">{t.give.bankTransfer}</div>
            <div className="px-6 py-3 border border-gray-300 rounded-lg">{t.give.creditDebitCard}</div>
            <div className="px-6 py-3 border border-gray-300 rounded-lg">{t.give.mobileMoney}</div>
            <div className="px-6 py-3 border border-gray-300 rounded-lg">{t.give.paypal}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

