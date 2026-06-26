'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { LOGO_PATH } from '@/lib/constants'
import { getBookOrderWhatsAppLink } from '@/lib/books'
import type { Book } from '@/lib/books'

interface BookCardProps {
  book: Book
  compact?: boolean
  orderLabel?: string
  readOnlineLabel?: string
}

export default function BookCard({
  book,
  compact = false,
  orderLabel = 'Order',
  readOnlineLabel = 'Read Online',
}: BookCardProps) {
  const orderLink = getBookOrderWhatsAppLink(book.title)
  const [coverSrc, setCoverSrc] = useState(book.cover)

  const cardContent = (
    <>
      <div
        className={
          compact
            ? 'relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden'
            : 'relative h-72 sm:h-80 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden'
        }
      >
        <div
          className={`relative w-full h-full flex items-center justify-center ${
            compact ? 'p-2 sm:p-3 md:p-4' : 'p-4 sm:p-6'
          }`}
        >
          <Image
            src={coverSrc}
            alt={book.title}
            width={compact ? 150 : 200}
            height={compact ? 220 : 300}
            className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
            onError={() => setCoverSrc(LOGO_PATH)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!compact && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-navy/80 text-white text-xs font-bold rounded-md">
            #{String(book.number).padStart(2, '0')}
          </div>
        )}
        {book.readOnline && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-gold text-navy-dark text-xs font-bold rounded-md">
            {readOnlineLabel}
          </div>
        )}
      </div>

      <div className={compact ? 'p-3 sm:p-4' : 'p-5 sm:p-6'}>
        {!compact && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-navy/10 text-navy-dark text-xs font-semibold rounded-full">
              {book.category}
            </span>
            <span className="text-xs text-gray-500">{book.pages} pages</span>
          </div>
        )}

        <h3
          className={`font-bold text-navy-dark leading-tight ${
            compact ? 'text-xs sm:text-sm mb-2 line-clamp-2' : 'text-lg sm:text-xl mb-3'
          }`}
        >
          {book.title}
        </h3>

        {!compact && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{book.description}</p>
        )}

        <div className={`flex items-center ${compact ? 'justify-between' : 'justify-between gap-3'}`}>
          {!compact && <span className="text-lg font-bold text-navy-dark">{book.price}</span>}
          {compact ? (
            <>
              <span className="text-xs text-gray-500">{orderLabel}</span>
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
            </>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gold text-navy-dark font-bold rounded-lg group-hover:bg-gold-light transition-colors">
              {orderLabel}
              <MessageCircle className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </>
  )

  return (
    <a
      href={orderLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
      aria-label={`Order ${book.title} via WhatsApp`}
    >
      {cardContent}
    </a>
  )
}
