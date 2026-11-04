'use client'

import BookCard from '@/components/BookCard'
import { books } from '@/lib/books'

export default function LibraryPage() {
  return (
    <div className="pt-20 min-h-screen bg-canvas">
      <section className="py-14 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-navy font-semibold uppercase tracking-wider text-sm mb-3">Library</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-4">
            Prophet&apos;s Library
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed">
            Discover transformative teachings and prophetic insights through the books of Prophet Isa El-Buba
          </p>
          <p className="text-navy font-semibold mt-4">All books £15</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Transform Your Life Through These Teachings
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Each book contains powerful insights, biblical principles, and prophetic wisdom to guide you on your journey of faith and purpose.
          </p>
        </div>
      </section>
    </div>
  )
}
