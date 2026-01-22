'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, FileText, MapPin, BookOpen, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'resource' | 'branch' | 'book' | 'event'
  icon: any
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Search data - in a real app, this would come from an API or database
  const searchableContent: SearchResult[] = [
    // Pages
    {
      id: 'home',
      title: 'Home',
      description: 'Welcome to EBOMI - Evangelical Biblical Outreach Ministries International',
      url: '/',
      type: 'page',
      icon: FileText,
    },
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about EBOMI and our mission to transform lives',
      url: '/upcoming-programs',
      type: 'page',
      icon: FileText,
    },
    {
      id: 'branches',
      title: 'EBOMI Branches',
      description: 'Find EBOMI branches and locations worldwide',
      url: '/branches',
      type: 'page',
      icon: MapPin,
    },
    {
      id: 'library',
      title: 'Prophet\'s Library',
      description: 'Books and teachings by Prophet Isa El-Buba',
      url: '/library',
      type: 'page',
      icon: BookOpen,
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Download sermons, teachings, and resources',
      url: '/download-centre',
      type: 'page',
      icon: FileText,
    },
    {
      id: 'join',
      title: 'Join Us',
      description: 'Join the EBOMI Global Intercessors Army',
      url: '/join-us',
      type: 'page',
      icon: Users,
    },
    // Resources
    {
      id: 'sermon1',
      title: 'He is my everything',
      description: 'A powerful sermon by Prophet Isa El-Buba',
      url: '/download-centre',
      type: 'resource',
      icon: FileText,
    },
    {
      id: 'sermon2',
      title: 'SHINE YOUR LIGHT',
      description: 'An inspiring message about letting your light shine',
      url: '/download-centre',
      type: 'resource',
      icon: FileText,
    },
    {
      id: 'sermon3',
      title: 'TEACHING SOUNDS',
      description: 'A collection of powerful teaching sessions',
      url: '/download-centre',
      type: 'resource',
      icon: FileText,
    },
    // Books
    {
      id: 'book1',
      title: 'Burning mantles',
      description: 'The Call, the Cost, and the Fire of a True Prophet',
      url: '/library',
      type: 'book',
      icon: BookOpen,
    },
    {
      id: 'book2',
      title: 'Anointing for Wealth Creation and Distribution',
      description: 'Transform your financial destiny',
      url: '/library',
      type: 'book',
      icon: BookOpen,
    },
    {
      id: 'book3',
      title: 'The Call to Genuine Love & Revival',
      description: 'Discover the power of genuine love',
      url: '/library',
      type: 'book',
      icon: BookOpen,
    },
    // Events
    {
      id: 'event1',
      title: 'Global Revival Congress 2026',
      description: 'The Rising Remnants - Monday 30th March to Friday 4th April 2026',
      url: '/',
      type: 'event',
      icon: Calendar,
    },
    {
      id: 'event2',
      title: 'Prophetic Monday',
      description: 'Every Monday at 3PM - EBOMI Temple & Towers',
      url: '/',
      type: 'event',
      icon: Calendar,
    },
    {
      id: 'event3',
      title: 'Gathering of Champions',
      description: 'Last Week of Every Month - Monday to Friday at 3PM',
      url: '/',
      type: 'event',
      icon: Calendar,
    },
  ]

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    )
    setResults(filtered.slice(0, 8)) // Limit to 8 results
  }, [query])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 bg-white text-navy hover:bg-white/90 font-light transition-all rounded-lg shadow-lg min-h-[44px] min-w-[44px] touch-manipulation"
        aria-label="Search"
      >
        <Search className="w-4 h-4 text-navy" />
        <span className="hidden sm:inline text-sm font-light text-navy">Search</span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
          <div
            ref={searchRef}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-gray-200 p-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, resources, books, events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
                className="ml-3 p-1 hover:bg-gray-100 rounded"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Start typing to search...</p>
                  <p className="text-xs text-gray-400 mt-2">Press ⌘K to open search anytime</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-sm">No results found for &quot;{query}&quot;</p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result) => {
                    const Icon = result.icon
                    return (
                      <Link
                        key={result.id}
                        href={result.url}
                        onClick={handleResultClick}
                        className="flex items-start space-x-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-navy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {result.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {result.description}
                          </p>
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {result.type}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
