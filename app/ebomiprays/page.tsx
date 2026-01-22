'use client'

import { Heart, Send, MessageCircle, Calendar } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

interface Testimony {
  id: number
  name: string
  date: string
  message: string
  category: string
}

const testimonies: Testimony[] = [
  {
    id: 1,
    name: 'Anonymous',
    date: '2024-03-10',
    message: 'I received healing from a chronic illness after the prayer session. God is faithful!',
    category: 'Healing',
  },
  {
    id: 2,
    name: 'Anonymous',
    date: '2024-03-08',
    message: 'My business breakthrough came after I started declaring the prayer focus. Thank you EBOMI!',
    category: 'Breakthrough',
  },
  {
    id: 3,
    name: 'Anonymous',
    date: '2024-03-05',
    message: 'The prophetic word spoken over my life came to pass. I got the job I was believing for!',
    category: 'Prophetic',
  },
  {
    id: 4,
    name: 'Anonymous',
    date: '2024-03-01',
    message: 'My family was restored after years of separation. God is a miracle worker!',
    category: 'Restoration',
  },
]

export default function EbomipraysPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    category: 'general',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', request: '', category: 'general' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-gold mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">{t.ebomiprays.title}</h1>
          </div>
          <p className="text-xl text-gray-300">{t.ebomiprays.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Prayer Request Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-navy-dark mb-6 flex items-center space-x-2">
                <MessageCircle className="w-8 h-8 text-gold" />
                <span>{t.ebomiprays.submitPrayerRequest}</span>
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {t.ebomiprays.thankYou}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-dark mb-2">
                    {t.ebomiprays.nameOptional}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder={t.ebomiprays.nameOptional}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-dark mb-2">
                    {t.ebomiprays.emailOptional}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder={t.ebomiprays.emailOptional}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy-dark mb-2">
                    {t.ebomiprays.phoneOptional}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder={t.ebomiprays.phoneOptional}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-navy-dark mb-2">
                    {t.ebomiprays.category}
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="general">{t.ebomiprays.general}</option>
                    <option value="healing">{t.ebomiprays.healing}</option>
                    <option value="breakthrough">{t.ebomiprays.breakthrough}</option>
                    <option value="family">{t.ebomiprays.family}</option>
                    <option value="finances">{t.ebomiprays.finances}</option>
                    <option value="career">{t.ebomiprays.career}</option>
                    <option value="spiritual">{t.ebomiprays.spiritual}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="request" className="block text-sm font-semibold text-navy-dark mb-2">
                    {t.ebomiprays.prayerRequest} <span className="text-red-500">{t.ebomiprays.required}</span>
                  </label>
                  <textarea
                    id="request"
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder={t.ebomiprays.prayerRequest}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>{t.ebomiprays.submitButton}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Testimonies Feed */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-navy-dark mb-6 flex items-center space-x-2">
                <Heart className="w-8 h-8 text-gold" />
                <span>{t.ebomiprays.testimonies}</span>
              </h2>

              <div className="space-y-6">
                {testimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-6 border-l-4 border-gold"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
                        {testimony.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(testimony.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2">{testimony.message}</p>
                    <p className="text-sm text-gray-500">— {testimony.name}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-navy-light/10 rounded-xl border border-navy-light/20">
                <h3 className="text-lg font-semibold text-navy-dark mb-2">{t.ebomiprays.shareTestimony}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t.ebomiprays.shareTestimonyDescription}
                </p>
                <button className="px-6 py-2 bg-gold text-navy-dark font-semibold rounded-lg hover:bg-gold-light transition-colors">
                  {t.ebomiprays.shareTestimonyButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

