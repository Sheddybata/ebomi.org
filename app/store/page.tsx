'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import ProductCard from '@/components/ProductCard'
import { storeProducts } from '@/lib/storeProducts'
import BackToTop from '@/components/BackToTop'

export default function StorePage() {
  const { t } = useLanguage()

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">{t.home.storeTitle}</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {t.home.storeSubtitle}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {storeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                buyNowLabel={t.home.buyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Wear Your Faith, Carry the Anointing
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Every purchase supports the ministry and helps spread the Gospel. Orders are fulfilled through our secure Selar store.
          </p>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
