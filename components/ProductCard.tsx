'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/storeProducts'

interface ProductCardProps {
  product: Product
  /** Compact mode for homepage preview (smaller cards) */
  compact?: boolean
  /** Buy Now button text */
  buyNowLabel?: string
}

export default function ProductCard({ product, compact = false, buyNowLabel = 'Buy Now' }: ProductCardProps) {
  const isExternal = product.link.startsWith('http')
  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group hover:shadow-xl hover:border-gold/30 focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-2 ${
        compact ? 'shadow-md' : 'shadow-lg'
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative bg-gradient-to-br from-navy/5 via-navy/[0.03] to-gold/5 overflow-hidden ${
          compact ? 'h-40 sm:h-44' : 'h-52 sm:h-60'
        }`}
      >
        <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={compact ? 120 : 160}
            height={compact ? 120 : 160}
            className="object-contain w-auto h-full rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className={`${compact ? 'p-3 sm:p-4' : 'p-5 sm:p-6'}`}>
        <h3
          className={`font-bold text-navy-dark line-clamp-2 leading-tight ${
            compact ? 'text-sm sm:text-base mb-1' : 'text-lg mb-2'
          }`}
        >
          {product.name}
        </h3>
        <p
          className={`font-bold text-gold mb-3 ${
            compact ? 'text-base sm:text-lg' : 'text-xl'
          }`}
        >
          {product.price}
        </p>

        <Link
          href={product.link}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy-light active:bg-navy-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
          {...linkProps}
        >
          <ShoppingCart className="w-4 h-4 flex-shrink-0" aria-hidden />
          <span>{buyNowLabel}</span>
        </Link>
      </div>
    </div>
  )
}
