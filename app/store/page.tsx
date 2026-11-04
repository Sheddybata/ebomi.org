'use client'

import { useLanguage } from '@/lib/LanguageContext'
import ProductCard from '@/components/ProductCard'
import { storeProducts } from '@/lib/storeProducts'
import BackToTop from '@/components/BackToTop'

export default function StorePage() {
  const { t } = useLanguage()

  return (
    <div className="pt-20 min-h-screen bg-canvas">
      <section className="py-14 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy font-semibold uppercase tracking-wider text-sm mb-3">Store</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-4">{t.home.storeTitle}</h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed">{t.home.storeSubtitle}</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {storeProducts.map((product) => (
              <ProductCard key={product.id} product={product} buyNowLabel={t.home.buyNow} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Wear Your Faith, Carry the Anointing
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Every purchase supports the ministry and helps spread the Gospel. Orders are fulfilled through our secure Selar store.
          </p>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
