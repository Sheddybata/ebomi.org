'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { getMerchOrderWhatsAppLink, type Product } from '@/lib/storeProducts'

interface ProductCardProps {
  product: Product
  /** Compact mode for homepage preview (smaller cards) */
  compact?: boolean
  /** Buy Now button text */
  buyNowLabel?: string
}

export default function ProductCard({ product, compact = false, buyNowLabel = 'Buy Now' }: ProductCardProps) {
  const gallery = product.images?.length ? product.images : [product.image]
  const [imageIndex, setImageIndex] = useState(0)
  const currentImage = gallery[imageIndex] ?? product.image

  const orderLink = product.link.startsWith('http')
    ? product.link
    : getMerchOrderWhatsAppLink(product.name)
  const isExternal = orderLink.startsWith('http')
  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group hover:shadow-xl hover:border-gold/30 focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-2 ${
        compact ? 'shadow-md' : 'shadow-lg'
      }`}
    >
      <div
        className={`relative bg-white overflow-hidden ${
          compact ? 'h-40 sm:h-44' : 'h-52 sm:h-60'
        }`}
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {gallery.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setImageIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === imageIndex ? 'w-5 bg-navy' : 'w-1.5 bg-navy/30'
                }`}
                aria-label={`View ${product.name} photo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

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
          href={orderLink}
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
