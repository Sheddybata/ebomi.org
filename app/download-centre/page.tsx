'use client'

import { Download, FileText, Music, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

type ResourceType = 'all' | 'pdf' | 'mp3'
type Category = 'all' | 'sermons' | 'teachings' | 'music' | 'books'

interface Resource {
  id: number
  title: string
  type: 'pdf' | 'mp3'
  category: Category
  size: string
  date: string
  description: string
  link: string
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'He is my everything',
    type: 'mp3',
    category: 'sermons',
    size: 'Audio',
    date: '2024-09-13',
    description: 'A powerful sermon by Prophet Isa El-Buba on finding everything we need in God.',
    link: 'https://drive.google.com/file/d/1U1b4YRR0rnk_4MNfkU0TKSiijm6Uu1Xn/view',
  },
  {
    id: 2,
    title: 'SHINE YOUR LIGHT',
    type: 'mp3',
    category: 'sermons',
    size: 'Audio',
    date: '2024-09-13',
    description: 'An inspiring message about letting your light shine and impacting the world around you.',
    link: 'https://drive.google.com/file/d/1v4dzEUGox5futvO8atLBkboCfF3ankiH/view',
  },
  {
    id: 3,
    title: 'TEACHING SOUNDS',
    type: 'mp3',
    category: 'teachings',
    size: 'Multiple Files',
    date: '2024-09-13',
    description: 'A collection of powerful teaching sessions by Prophet Isa El-Buba covering various topics.',
    link: 'https://drive.google.com/drive/folders/1Viz_Ts15w5MFC_D7Nl0hGdTZ_-lSHQSs',
  },
]

export default function DownloadCentrePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all')
  const [categoryFilter, setCategoryFilter] = useState<Category>('all')

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || resource.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.download.title}</h1>
          <p className="text-xl text-gray-300">{t.download.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.download.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-600 w-5 h-5" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as ResourceType)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="all">{t.download.allTypes}</option>
                <option value="pdf">PDF</option>
                <option value="mp3">MP3</option>
              </select>
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">{t.download.allCategories}</option>
              <option value="sermons">{t.download.sermons}</option>
              <option value="teachings">{t.download.teachings}</option>
              <option value="music">{t.download.music}</option>
              <option value="books">{t.download.books}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t.download.noResourcesFound}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      resource.type === 'pdf' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {resource.type === 'pdf' ? (
                        <FileText className="w-6 h-6" />
                      ) : (
                        <Music className="w-6 h-6" />
                      )}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {resource.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-dark mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{resource.size}</span>
                    <span>{new Date(resource.date).toLocaleDateString()}</span>
                  </div>

                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t.download.accessResource}</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

