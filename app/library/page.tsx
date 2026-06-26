'use client'

import { BookOpen } from 'lucide-react'
import BookCard from '@/components/BookCard'
import { books } from '@/lib/books'

export default function LibraryPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-gold mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Prophet&apos;s Library</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover transformative teachings and prophetic insights through the books of Prophet Isa El-Buba
          </p>
          <p className="text-gold font-semibold mt-4 text-lg">All books £15</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Life Through These Teachings
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Each book contains powerful insights, biblical principles, and prophetic wisdom to guide you on your journey of faith and purpose.
          </p>
        </div>
      </section>
    </div>
  )
}
