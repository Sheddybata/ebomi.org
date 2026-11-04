'use client'

import { useState } from 'react'
import { Heart, Sprout, Building2, Users, Shield, Lock } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import GiveModal from '@/components/GiveModal'

export default function GivePage() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="pt-20 min-h-screen bg-canvas">
      <section className="py-14 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy font-semibold uppercase tracking-wider text-sm mb-3">Give</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-4">
            {t.give.title} <span className="text-navy">{t.give.titleHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed">{t.give.subtitle}</p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              {t.give.secureEncrypted}
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold" />
              {t.give.sslProtected}
            </span>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">{t.give.waysToGive}</h2>
            <p className="text-muted text-lg">{t.give.choosePartnership}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GiveTier
              icon={Heart}
              title={t.give.tithe}
              description={t.give.titheDescription}
              benefits={[t.give.titheBenefit1, t.give.titheBenefit2, t.give.titheBenefit3]}
              buttonLabel={`${t.give.giveButton} ${t.give.tithe}`}
              onGive={() => setIsModalOpen(true)}
            />
            <GiveTier
              icon={Sprout}
              title={t.give.seed}
              description={t.give.seedDescription}
              benefits={[t.give.seedBenefit1, t.give.seedBenefit2, t.give.seedBenefit3]}
              buttonLabel={`${t.give.giveButton} ${t.give.seed}`}
              onGive={() => setIsModalOpen(true)}
            />
            <GiveTier
              icon={Building2}
              title={t.give.project}
              description={t.give.projectDescription}
              benefits={[t.give.projectBenefit1, t.give.projectBenefit2, t.give.projectBenefit3]}
              buttonLabel={`${t.give.giveButton} ${t.give.project}`}
              onGive={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-canvas border border-stone-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-navy" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-ink">{t.give.partnerTitle}</h2>
                </div>
                <p className="text-muted text-lg mb-5 leading-relaxed">{t.give.partnerDescription}</p>
                <ul className="space-y-2 text-ink/80 mb-6">
                  <li>{t.give.partnerBenefit1}</li>
                  <li>{t.give.partnerBenefit2}</li>
                  <li>{t.give.partnerBenefit3}</li>
                </ul>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-navy text-white font-semibold hover:bg-navy-dark transition-colors min-h-[44px]"
                >
                  {t.give.becomePartner}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-ink mb-6">{t.give.paymentMethods}</h3>
          <div className="flex flex-wrap justify-center gap-3 text-muted">
            {[t.give.bankTransfer, t.give.creditDebitCard, t.give.mobileMoney, t.give.paypal].map(
              (method) => (
                <div key={method} className="px-5 py-2.5 rounded-full border border-stone-300 bg-white">
                  {method}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <GiveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

function GiveTier({
  icon: Icon,
  title,
  description,
  benefits,
  buttonLabel,
  onGive,
}: {
  icon: typeof Heart
  title: string
  description: string
  benefits: string[]
  buttonLabel: string
  onGive: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col">
      <div className="p-6 sm:p-8">
        <div className="w-12 h-12 rounded-full bg-canvas border border-stone-200 flex items-center justify-center mb-5">
          <Icon className="w-6 h-6 text-navy" />
        </div>
        <h3 className="text-2xl font-bold text-ink mb-2">{title}</h3>
        <p className="text-muted leading-relaxed mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-ink/80">
              <span className="text-gold font-bold">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onGive}
          className="w-full py-3 rounded-full bg-navy text-white font-semibold hover:bg-navy-dark transition-colors min-h-[44px]"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
