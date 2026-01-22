'use client'

import Image from 'next/image'
import { BookOpen, ExternalLink } from 'lucide-react'

interface Book {
  id: number
  title: string
  cover: string
  link: string
}

const books: Book[] = [
  {
    id: 1,
    title: 'Burning mantles: The Call, the Cost, and the Fire of a True Prophet',
    cover: '/books/burningmantles.jpeg',
    link: 'https://drisaelbuba.selar.com/1pml035a77',
  },
  {
    id: 2,
    title: 'Anointing for Wealth Creation and Distribution',
    cover: '/books/wealthcreation.jpeg',
    link: 'https://drisaelbuba.selar.com/26h34nj3j4',
  },
  {
    id: 3,
    title: 'The Call to Genuine Love & Revival',
    cover: '/books/thecalltogenuineloverevival.jpeg',
    link: 'https://drisaelbuba.selar.com/74ax21711o',
  },
  {
    id: 4,
    title: 'Following the Leader\'s Spirit',
    cover: '/books/followingtheleaderspirit.jpeg',
    link: 'https://drisaelbuba.selar.com/3371u14zjp',
  },
  {
    id: 5,
    title: 'Sustaining Generational Fire',
    cover: '/books/sustaininggenerationalfire.jpeg',
    link: 'https://drisaelbuba.selar.com/84464178c6',
  },
]

export default function LibraryPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-gold mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Prophet's Library</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover transformative teachings and prophetic insights through the books of Prophet Isa El-Buba
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Book Cover */}
                <div className="relative h-80 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-6 flex items-center justify-center">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={200}
                      height={300}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-dark mb-4 leading-tight line-clamp-3">
                    {book.title}
                  </h3>
                  
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <span>Read Book</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Life Through These Teachings
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Each book contains powerful insights, biblical principles, and prophetic wisdom to guide you on your journey of faith and purpose.
          </p>
        </div>
      </section>
    </div>
  )
}

