'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock, ChevronLeft, ChevronRight, MapPin, Play, Radio, Users, Globe, Handshake, Building2, Music, Pointer, Facebook, Youtube, ExternalLink, BookOpen } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import dynamic from 'next/dynamic'
import CountdownTimer from '@/components/CountdownTimer'
import BackToTop from '@/components/BackToTop'
import PullToRefresh from '@/components/PullToRefresh'
import ImageSkeleton from '@/components/ImageSkeleton'
import HorizontalScroll from '@/components/HorizontalScroll'
import GalleryPreview from '@/components/GalleryPreview'
import TempleVideoPlayer from '@/components/TempleVideoPlayer'

// Lazy load heavy components
const GiveButton = dynamic(() => import('@/components/GiveButton'), {
  ssr: false,
})

// Helper function to render biography with bold headings
function renderBiographyWithBoldHeadings(text: string, language: string = 'en') {
  // Only apply bold formatting if text contains English headings
  // For other languages, return text as-is to preserve formatting
  const hasEnglishHeadings = text.includes('The Encounter: From Islam to the Cross') || 
                            text.includes('Ministry Philosophy & Global Impact')
  
  if (!hasEnglishHeadings) {
    // For languages without English headings, return plain text
    return text
  }

  const headings = [
    'The Encounter: From Islam to the Cross',
    'Ministry Philosophy & Global Impact',
    'The Global Mission:',
    'Spiritual Awakening:',
    'National Reform:',
    'A Catalyst for National Transformation',
    'Authorship & Global Media',
    'Family & Legacy',
  ]

  // Escape special regex characters and create pattern
  const escapedHeadings = headings.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escapedHeadings.join('|')})`, 'g')
  
  const parts: (string | JSX.Element)[] = []
  let lastIndex = 0
  let match
  let keyCounter = 0

  // Find all matches
  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add bold heading
    parts.push(
      <strong key={`bold-${keyCounter++}`} className="font-bold text-navy-dark">
        {match[0]}
      </strong>
    )
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function Home() {
  const { t, language } = useLanguage()
  
  // Determine if current language is RTL
  const isRTL = language === 'ar' || language === 'he'
  
  // Get biography text - this will update when language changes
  const biographyText = t.home.prophetBiography1
  const upcomingScrollRef = useRef<HTMLDivElement>(null)
  const pastScrollRef = useRef<HTMLDivElement>(null)
  const recentProgramsRef = useRef<HTMLDivElement>(null)
  const [upcomingScrollLeft, setUpcomingScrollLeft] = useState(0)
  const [pastScrollLeft, setPastScrollLeft] = useState(0)
  const propheticMondaysRef = useRef<HTMLDivElement>(null)
  const [propheticScrollLeft, setPropheticScrollLeft] = useState(0)
  const [recentProgramsScrollLeft, setRecentProgramsScrollLeft] = useState(0)
  
  // Hero Slideshow State
  const [currentSlide, setCurrentSlide] = useState(3) // Start from image 4 (index 3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const heroImages = [
    '/hero slideshow/1.jpg',
    '/hero slideshow/2.jpg',
    '/hero slideshow/3.jpg',
    '/hero slideshow/4.jpg',
    '/hero slideshow/5.jpg',
    '/hero slideshow/6.jpg',
    '/hero slideshow/7.jpg',
    '/hero slideshow/8.jpg',
    '/hero slideshow/9.jpg',
    '/hero slideshow/10.jpg',
    '/hero slideshow/11.jpg',
    '/hero slideshow/12.jpg',
    '/hero slideshow/13.jpg',
    '/hero slideshow/pastorjerry.jpg',
    '/hero slideshow/hebew.jpg',
    '/hero slideshow/new.jpg',
    '/hero slideshow/ne.jpg',
  ]

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      }
    }, 2500) // Change slide every 2.5 seconds (faster)

    return () => clearInterval(interval)
  }, [isTransitioning, heroImages.length])

  // Update scroll indicators on resize
  useEffect(() => {
    const updateScrollIndicators = () => {
      if (propheticMondaysRef.current) {
        setPropheticScrollLeft(propheticMondaysRef.current.scrollLeft)
      }
      if (recentProgramsRef.current) {
        setRecentProgramsScrollLeft(recentProgramsRef.current.scrollLeft)
      }
    }

    window.addEventListener('resize', updateScrollIndicators)
    return () => window.removeEventListener('resize', updateScrollIndicators)
  }, [])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroImages.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)
  }

  // Swipe gesture handlers
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Global Revival Congress 2026 - Single featured event
  const featuredEvent = {
    title: 'Global Revival Congress (2026)',
    theme: 'The Rising Remnants',
    date: 'Monday 30th March to Friday 4th April 2026',
    location: 'EBOMI Temple and Towers. No1 Kashim Ibrahim Street, Jos, Plateau State Nigeria.',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdWZQZOk0eQBukdeQ2o0m4SoLZk0htj8nvVMt9iezWD7EaDbQ/viewform',
    image: '/upcoming program/globalcongress.jpg',
    startDate: new Date('2026-03-30T08:00:00'), // March 30, 2026 at 8 AM
  }

  // Recent Programs Images
  const recentProgramsImages = [
    '/recent programs/recent.jpg', // First image
    '/recent programs/exodusnight.jpg',
    '/recent programs/takingover.jpg',
    '/recent programs/fireonthealter.jpg',
    '/recent programs/prayerrally.jpg',
    '/recent programs/timewithjesus.jpg',
    '/recent programs/gatheringofchampions.jpg',
    '/recent programs/h.jpg',
    '/recent programs/7.jpg',
    '/recent programs/6.jpg',
    // Rest of the images
    '/recent programs/1.jpg',
    '/recent programs/2.jpg',
    '/recent programs/3.jpg',
    '/recent programs/4.jpg',
    '/recent programs/5.jpg',
    '/recent programs/8.jpg',
    '/recent programs/9.jpg',
    '/recent programs/10.jpg',
    '/recent programs/11.jpg',
    '/recent programs/13.jpg',
    '/recent programs/a.jpg',
    '/recent programs/b.jpg',
    '/recent programs/carolservice.jpg',
    '/recent programs/d.jpg',
    '/recent programs/ers.jpg',
    '/recent programs/gf.jpg',
    '/recent programs/j.jpg',
    '/recent programs/nb.jpg',
    '/recent programs/pastorsappreciation.jpg',
    '/recent programs/q.jpg',
    '/recent programs/rd.jpg',
    '/recent programs/rdf.jpg',
    '/recent programs/s.jpg',
    '/recent programs/t7r.jpg',
    '/recent programs/yobepropheticvisitation.jpeg',
  ]

  const pastEvents = [
    {
      id: 1,
      title: 'Annual Convention 2024',
      date: '2024-02-10',
      description: 'A week of powerful teachings and miracles.',
      image: '/events/convention.jpg',
    },
    {
      id: 2,
      title: 'Healing & Deliverance Service',
      date: '2024-01-28',
      description: 'Testimonies of healing and breakthrough.',
      image: '/events/healing-past.jpg',
    },
    {
      id: 3,
      title: 'Women\'s Conference',
      date: '2024-01-15',
      description: 'A gathering for women to be empowered and equipped.',
      image: '/events/women.jpg',
    },
    {
      id: 4,
      title: 'Men\'s Breakfast & Prayer',
      date: '2024-01-05',
      description: 'Monthly gathering for men to fellowship and pray.',
      image: '/events/men.jpg',
    },
  ]

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right', setScrollLeft: (val: number) => void) => {
    if (ref.current) {
      const scrollAmount = 400
      const newScrollLeft = direction === 'left' 
        ? ref.current.scrollLeft - scrollAmount 
        : ref.current.scrollLeft + scrollAmount
      ref.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
      setScrollLeft(newScrollLeft)
    }
  }

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, setScrollLeft: (val: number) => void) => {
    if (ref.current) {
      setScrollLeft(ref.current.scrollLeft)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const day = date.getDate()
    return { month, day }
  }

  const handleRefresh = async () => {
    // Refresh page data
    window.location.reload()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="pt-20">
      {/* Hero Section with Slideshow */}
      <section 
        className="relative h-[50vh] min-h-[300px] sm:h-[80vh] sm:min-h-[550px] md:h-[90vh] md:min-h-[600px] overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-110'
              }`}
            >
              <Image
                src={image}
                alt={`Hero slide ${index + 1}`}
                fill
                className="object-cover opacity-90"
                priority={index <= 3}
                sizes="100vw"
                loading={index <= 3 ? "eager" : "lazy"}
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy/50 via-navy/40 to-navy/50"></div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 active:bg-white/40 transition-all duration-300 group touch-manipulation min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 active:bg-white/40 transition-all duration-300 group touch-manipulation min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Language Switcher - Top Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
          <LanguageSwitcher />
        </div>

        {/* Slide Indicators / Progress Bar */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-0.5 items-center">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-0.5 rounded-full transition-all duration-300 touch-manipulation min-h-[16px] min-w-[16px] flex items-center justify-center ${
                index === currentSlide
                  ? 'w-2 bg-white'
                  : 'w-0.5 bg-white/40 hover:bg-white/60 active:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-2">
                  <span className="text-white">{t.home.welcomeHome}</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed px-4 sm:px-2">
                  {t.home.welcomeMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - Global Revival Congress 2026 */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-navy-dark via-navy to-navy-light overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-3 sm:mb-4 border border-white/20">
              <span className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">{t.home.upcomingEvent}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">Global Revival Congress</h2>
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-base sm:text-lg md:text-xl font-semibold">2026</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative group order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-white space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Theme */}
              <div>
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg mb-3 sm:mb-4 border border-white/20">
                  <span className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">{t.home.theme}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{featuredEvent.theme}</h3>
              </div>

              {/* Date */}
              <div className="flex items-start space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1">{t.home.date}</div>
                  <div className="text-white text-base sm:text-lg md:text-xl font-medium break-words">{featuredEvent.date}</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3 sm:space-x-4 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1">{t.home.location}</div>
                  <div className="text-white text-sm sm:text-base md:text-lg break-words">{featuredEvent.location}</div>
                </div>
              </div>

              {/* Countdown Timer */}
              <CountdownTimer targetDate={featuredEvent.startDate} />

              {/* Register Button */}
              <a
                href={featuredEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block group touch-manipulation"
              >
                <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/30 p-[2px] group-hover:border-white/50 group-active:border-white/60 group-hover:shadow-lg group-hover:shadow-white/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 rounded-xl px-6 sm:px-8 py-4 sm:py-5 text-center backdrop-blur-sm min-h-[56px] flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <span className="text-white font-bold text-base sm:text-lg md:text-xl group-hover:tracking-wide transition-all">{t.home.registerNow}</span>
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Decorative Elements */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 sm:pt-4">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-white/70 text-xs sm:text-sm ml-1">{t.home.limitedSeats}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prophetic Mondays Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy-dark mb-2 px-2">{t.home.propheticMondays}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{t.home.swipeToView}</p>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="relative">
            <HorizontalScroll
              scrollRef={propheticMondaysRef}
              onScroll={(scrollLeft) => {
                setPropheticScrollLeft(scrollLeft)
              }}
              pauseOnHover={false}
              pauseOnTouch={false}
              autoScroll={false}
            >
              <div className="flex-shrink-0 w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] group snap-start rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src="/prophetic mondays/1.jpg"
                  alt="Prophetic Monday 1"
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="flex-shrink-0 w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] group snap-start rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src="/prophetic mondays/2.jpg"
                  alt="Prophetic Monday 2"
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="flex-shrink-0 w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] group snap-start rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src="/prophetic mondays/3.jpg"
                  alt="Prophetic Monday 3"
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </HorizontalScroll>
            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => {
                const maxScroll = propheticMondaysRef.current
                  ? propheticMondaysRef.current.scrollWidth - propheticMondaysRef.current.clientWidth
                  : 1
                const scrollProgress = maxScroll > 0
                  ? (propheticScrollLeft / maxScroll) * 2
                  : 0
                const isActive = Math.abs(scrollProgress - index) < 0.5
                return (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-navy' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EBOMI.tv Streaming Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-red-600 to-blue-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <a
            href="https://ebomi.tv"
            target="_blank"
            rel="noopener noreferrer"
            className="block group touch-manipulation"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-white/20 hover:bg-white/15 active:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left w-full md:w-auto">
                  <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <Radio className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider">Live Streaming</div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">{t.home.ebomiTv}</h2>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {t.home.ebomiTvDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                      <span className="text-white font-semibold text-sm sm:text-base">{t.home.liveNow}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm">
                      <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                      <span className="text-white font-semibold text-sm sm:text-base">{t.home.onDemand}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-white font-bold text-base sm:text-lg group-hover:translate-x-2 transition-transform min-h-[44px]">
                    <span>{t.common.watchNow}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  </div>
                </div>

                {/* Right Visual Element - Image */}
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
                  <div className="relative w-72 h-72 sm:w-64 sm:h-64 md:w-64 md:h-64 lg:w-80 lg:h-80 group/image">
                    {/* Animated Glow Effect */}
                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 rounded-2xl opacity-30 blur-xl animate-pulse group-hover/image:opacity-50 transition-opacity duration-500"></div>
                    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-blue-400/20 to-red-400/20 rounded-2xl blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Image Container with Hover Effects */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl group-hover/image:border-white/50 transition-all duration-500 group-hover/image:scale-105 group-hover/image:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                      {/* Shine Overlay Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 z-10"></div>
                      
                      {/* Image */}
                      <Image
                        src="/ebomitvsection.png"
                        alt="EBOMI.TV Streaming Platform"
                        fill
                        className="object-contain rounded-2xl group-hover/image:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 288px, (max-width: 768px) 256px, 256px, 320px"
                        priority
                      />
                      
                      {/* Overlay Gradient for Better Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-20">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow backdrop-blur-sm">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 fill-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Recent Programs Section - Horizontal Scrollable Gallery */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark px-2">Recent Programs</h2>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="relative">
            <HorizontalScroll
              scrollRef={recentProgramsRef}
              onScroll={(scrollLeft) => {
                setRecentProgramsScrollLeft(scrollLeft)
              }}
              autoScroll={true}
              scrollSpeed={0.5}
              pauseOnHover={true}
              pauseOnTouch={true}
            >
              {recentProgramsImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] group snap-start rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={`Program ${index + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ease-out"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </HorizontalScroll>
            {/* Scroll Indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: Math.min(10, Math.ceil(recentProgramsImages.length / 3)) }).map((_, index) => {
                const maxScroll = recentProgramsRef.current
                  ? recentProgramsRef.current.scrollWidth - recentProgramsRef.current.clientWidth
                  : 1
                const scrollProgress = maxScroll > 0
                  ? (recentProgramsScrollLeft / maxScroll) * (Math.min(10, Math.ceil(recentProgramsImages.length / 3)) - 1)
                  : 0
                const isActive = Math.abs(scrollProgress - index) < 0.5
                return (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 bg-navy' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Note */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-dark mb-4 sm:mb-6 px-2">{t.home.welcomeHome}</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
              {t.home.welcomeMessage}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Left Side - About Us Text */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
                  {t.home.weAreGodsArmy}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {t.home.ebomiDescription}
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-semibold text-navy-dark mb-2 sm:mb-3">{t.home.ebomiAimsTo}</p>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">•</span>
                    <span>{t.home.ebomiAim1}</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">•</span>
                    <span>{t.home.ebomiAim2}</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">•</span>
                    <span>{t.home.ebomiAim3}</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">•</span>
                    <span>{t.home.ebomiAim4}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - First Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group bg-gray-100 flex items-center justify-center min-h-[250px] sm:min-h-[300px] order-1 lg:order-2">
              <Image
                src="/aboutus.jpg"
                alt="EBOMI Ministry"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700 object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* EBOMI Anthem */}
          <div className="bg-gradient-to-br from-navy via-navy-light to-navy-dark rounded-2xl p-6 sm:p-8 md:p-12 text-white mb-12 sm:mb-16 md:mb-20 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t.home.ebomiAnthem}</h3>
              </div>
              
              <div className="text-base sm:text-lg md:text-xl leading-relaxed space-y-3 sm:space-y-4 px-2">
                {t.home.anthemText.map((line, index) => (
                  <p key={index} className={index === t.home.anthemText.length - 1 ? 'mt-4 sm:mt-6 font-bold text-white text-lg sm:text-xl md:text-2xl' : index === 0 ? 'font-semibold' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            {/* Intercessors */}
            <div className="relative rounded-xl p-4 sm:p-6 md:p-8 text-center overflow-hidden group hover:shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px]">
              <Image
                src="/intercessors.jpg"
                alt="Intercessors"
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/60 rounded-xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 border-2 border-white/30">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">60k+</div>
                <div className="text-white font-semibold text-xs sm:text-sm md:text-base">{t.home.intercessors}</div>
              </div>
            </div>

            {/* Nations */}
            <div className="relative rounded-xl p-4 sm:p-6 md:p-8 text-center overflow-hidden group hover:shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px]">
              <Image
                src="/nations.jpg"
                alt="Nations"
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/60 rounded-xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 border-2 border-white/30">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">85+</div>
                <div className="text-white font-semibold text-xs sm:text-sm md:text-base">{t.home.nations}</div>
              </div>
            </div>

            {/* Partners */}
            <div className="relative rounded-xl p-4 sm:p-6 md:p-8 text-center overflow-hidden group hover:shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px]">
              <Image
                src="/partners.jpg"
                alt="Partners"
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/60 rounded-xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 border-2 border-white/30">
                  <Handshake className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">500+</div>
                <div className="text-white font-semibold text-xs sm:text-sm md:text-base">PARTNERS</div>
              </div>
            </div>

            {/* Branches */}
            <div className="relative rounded-xl p-4 sm:p-6 md:p-8 text-center overflow-hidden group hover:shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px]">
              <Image
                src="/branches.jpg"
                alt="Branches"
                fill
                className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/60 rounded-xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 border-2 border-white/30">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">100+</div>
                <div className="text-white font-semibold text-xs sm:text-sm md:text-base">{t.home.branches}</div>
              </div>
            </div>
          </div>

          {/* Join the Army Section */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-gradient-to-br from-navy/5 to-navy/10 rounded-2xl p-6 sm:p-8 md:p-12">
            {/* Right Side - Image (appears first on mobile) */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-xl group order-1 md:order-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/aboutus1.jpg"
                  alt="Join the Army of the Lord"
                  fill
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Left Side - Content (appears second on mobile) */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
                  {t.home.joinTheArmy}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                  {t.home.joinTheArmyDescription}
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                  {t.home.joinTheArmySecondParagraph}
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{t.home.joinTheArmyBenefit1}</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{t.home.joinTheArmyBenefit2}</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{t.home.joinTheArmyBenefit3}</span>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-gold font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{t.home.joinTheArmyBenefit4}</span>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="/branches"
                    className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
                  >
                    <span>{t.home.findBranchNearYou}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimony Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/testimony.jpg"
            alt="Testimonies"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Strong Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>
        </div>

        {/* Content with Glassmorphism */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-white/20 shadow-2xl">
            <div className="text-center max-w-4xl mx-auto">
              {/* Heading */}
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t.home.shareTestimony}
              </h2>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {t.home.testimonyDescription}
              </p>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {/* Inspire Others Card */}
                <div className="group relative bg-gradient-to-br from-gold/20 via-gold/10 to-transparent backdrop-blur-md rounded-2xl p-8 border border-gold/30 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xl mb-3">{t.home.inspireOthers}</h3>
                    <p className="text-white/90 leading-relaxed">{t.home.inspireDescription}</p>
                  </div>
                </div>

                {/* Glorify God Card */}
                <div className="group relative bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xl mb-3">{t.home.glorifyGod}</h3>
                    <p className="text-white/90 leading-relaxed">{t.home.glorifyDescription}</p>
                  </div>
                </div>

                {/* Build Faith Card */}
                <div className="group relative bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-transparent backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xl mb-3">{t.home.buildFaith}</h3>
                    <p className="text-white/90 leading-relaxed">{t.home.buildFaithDescription}</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScuZ0Kvi4NaukWv-a6HzaIMfaZwX2D6KPTwyRacarqVeSLBiA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/15 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 text-lg md:text-xl"
              >
                <Pointer className="w-6 h-6" />
                <span>{t.home.shareTestimony}</span>
                <ArrowRight className="w-6 h-6" />
              </a>

              {/* Additional Text */}
              <p className="text-white/70 text-sm mt-6">
                Your testimony will be reviewed and may be featured on our platform to bless others
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us in Worship - Service Times Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-3 sm:mb-4 px-2">
              Join Us in Worship
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">Service Times</p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Prophetic Monday */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-gold transition-all duration-300 hover:shadow-2xl group flex flex-col sm:col-span-2 lg:col-span-1">
              {/* Image Section */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src="/propheticmonday.jpg"
                  alt="Prophetic Monday"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-4 sm:p-6">
                {/* Header */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-dark mb-3 sm:mb-4">Prophetic Monday</h3>
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                    <span className="font-semibold text-gray-700 text-sm sm:text-base">Every Monday: 3PM</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">EBOMI TEMPLE & TOWERS</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Streaming Links */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-semibold uppercase tracking-wide">Watch on:</p>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <a
                      href="https://ebomi.tv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-semibold text-sm sm:text-base touch-manipulation min-h-[44px]"
                    >
                      <Radio className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>EBOMI.TV</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </a>
                    <a
                      href="https://web.facebook.com/officialisaelbuba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1565C0] active:bg-[#0D47A1] transition-colors font-semibold text-sm sm:text-base touch-manipulation min-h-[44px]"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </a>
                    <a
                      href="https://www.youtube.com/@EBOMIGlobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors font-semibold text-sm sm:text-base touch-manipulation min-h-[44px]"
                    >
                      <Youtube className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gathering of Champions */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-gold transition-all duration-300 hover:shadow-2xl group flex flex-col">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/gatheringofchampions.jpg"
                  alt="Gathering of Champions"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Gathering of Champions</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-gold" />
                    <span className="font-semibold text-gray-700">{t.home.lastWeekOfMonth}</span>
                  </div>
                  <p className="text-gray-600 mb-3 ml-7">3PM Monday to Friday</p>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span className="text-gray-700">EBOMI TEMPLE & TOWERS</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Streaming Links */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4 font-semibold uppercase tracking-wide">{t.home.watchOn}</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://ebomi.tv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <Radio className="w-5 h-5" />
                      <span>EBOMI.TV</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://web.facebook.com/officialisaelbuba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.youtube.com/@EBOMIGlobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      <Youtube className="w-5 h-5" />
                      <span>YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* In His Presence */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-gold transition-all duration-300 hover:shadow-2xl group flex flex-col">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/InHispresence.jpg"
                  alt="In His Presence"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">In His Presence</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-5 h-5 text-gold" />
                    <span className="font-semibold text-gray-700">{t.home.everyday}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Join us every day for an intimate time of worship and prayer in God's presence.
                  </p>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Streaming Links */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4 font-semibold uppercase tracking-wide">{t.home.watchOn}</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://ebomi.tv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <Radio className="w-5 h-5" />
                      <span>EBOMI.TV</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://web.facebook.com/officialisaelbuba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-semibold"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.youtube.com/@EBOMIGlobal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      <Youtube className="w-5 h-5" />
                      <span>YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Prophet Section */}
      <section key={`prophet-section-${language}`} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center ${isRTL ? 'md:grid-flow-col-dense' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Image Section */}
            <div className={`relative w-full ${isRTL ? 'order-2 md:order-2' : 'order-2 md:order-1'} md:sticky md:top-24`}>
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
                {/* Background gradient to prevent white space */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-navy/5 to-gold/5"></div>
                <Image
                  src="/abouttheprophet.png"
                  alt="Prophet Isa El-Buba"
                  fill
                  className="object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-700 relative z-10"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw"
                  priority
                />
                {/* Decorative border effect */}
                <div className="absolute inset-0 border-4 border-gold/20 rounded-2xl pointer-events-none z-20"></div>
                {/* Decorative overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none z-30"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className={`space-y-5 md:space-y-6 ${isRTL ? 'order-1 md:order-1' : 'order-1 md:order-2'} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-4 md:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.home.meetTheProphet}
                </h2>
                <div className={`${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'} w-16 sm:w-20 h-1 bg-gold mb-6 md:mb-8`}></div>
              </div>

              <div 
                key={`biography-${language}`}
                className={`text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line break-words hyphens-auto ${isRTL ? 'text-right' : 'text-left'}`} 
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {renderBiographyWithBoldHeadings(biographyText, language)}
              </div>

              {/* Learn More Button */}
              <div className="pt-2 md:pt-4">
                <a
                  href="https://isaelbuba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors text-sm sm:text-base"
                >
                  <span>{t.common.learnMore}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section - EBOMI Temple and Towers */}
      <section id="tour" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-navy-dark via-navy to-navy-light overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-3 sm:mb-4 border border-white/20">
              <span className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm">Virtual Tour</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
              Visit EBOMI Temple and Towers
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2">
              Take a virtual journey through our sacred spaces and facilities
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gold mx-auto mt-4 sm:mt-6"></div>
          </div>

          {/* Video Player Container - Full Responsive */}
          <div className="relative w-full mb-6 sm:mb-8 md:mb-10">
            <TempleVideoPlayer
              videos={[
                {
                  src: '/Explore temple/dronetemple.mp4',
                  title: 'Drone Tour of EBOMI Temple and Towers'
                },
                {
                  src: '/Explore temple/exploretemple.mp4',
                  title: 'Explore EBOMI Temple and Towers'
                }
              ]}
            />
          </div>

          {/* Call to Action Button */}
          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=EBOMI+Temple+and+Towers+No1+Kashim+Ibrahim+Street+Jos+Plateau+State+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/15 hover:border-white/50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 text-base sm:text-lg md:text-xl group touch-manipulation min-h-[56px]"
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Visit EBOMI Temple and Towers</span>
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Additional Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
            {/* Location Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-2">Location</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    No1 Kashim Ibrahim Street, Jos, Plateau State Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-2">Facilities</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    Temple, Towers, and modern facilities for worship and ministry
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-2">Virtual Experience</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    Explore our sacred spaces from anywhere in the world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EBOMI Arms Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-3 sm:mb-4 px-2">
              {t.home.ourMinistries}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              {t.home.ourMinistriesDescription}
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gold mx-auto mt-4 sm:mt-6"></div>
          </div>

          {/* Arms Grid */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Tanjuriel Corporations */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative h-48 sm:h-56 md:h-64 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/arms/tanjuriel.png"
                    alt="Tanjuriel Corporations"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-dark mb-2 sm:mb-3">Tanjuriel Corporations</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Forward-driven organization focused on innovative solutions, strategic development, and impactful collaborations across sectors.
                </p>
                <a
                  href="https://tanjurielgroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* IBBN */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative h-48 sm:h-56 md:h-64 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/arms/ibbn.png"
                    alt="Initiative for Better and Brighter Nigeria"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-dark mb-2 sm:mb-3">Initiative for Better and Brighter Nigeria (IBBN)</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  A national transformation movement dedicated to rebuilding Nigeria through civic engagement, leadership development, and strategic nation-building.
                </p>
                <a
                  href="https://ibbnigeria.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* DISEF */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative h-48 sm:h-56 md:h-64 bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/arms/DISEF.png"
                    alt="Dr. Isa El-buba Foundation"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-dark mb-2 sm:mb-3">Dr. Isa El-buba Foundation (DISEF)</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Committed to transforming lives through empowerment, education, and compassionate humanitarian outreach across Nigeria.
                </p>
                <a
                  href="https://isaelbubafoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Group of Schools */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group sm:col-span-2">
              <div className="relative h-48 sm:h-56 md:h-64 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/arms/school.png"
                    alt="EBOMI Group of Schools"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-dark mb-2 sm:mb-3">Group of Schools</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Excellence in education through our network of schools, nurturing the next generation with quality learning and character development.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="https://www.instagram.com/p/DEiMpExIdmj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors group/link touch-manipulation min-h-[44px]"
                  >
                    <span className="text-navy-dark font-medium text-sm sm:text-base">Tanjuriel Elite Stars Model Academy</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover/link:text-navy-dark flex-shrink-0" />
                  </a>
                  <a
                    href="https://web.facebook.com/ebomiinternationalschool/?_rdc=1&_rdr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors group/link touch-manipulation min-h-[44px]"
                  >
                    <span className="text-navy-dark font-medium text-sm sm:text-base">EBOMI High School</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover/link:text-navy-dark flex-shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <GalleryPreview limit={15} />

      {/* Prophet's Books Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-4 sm:mb-6 px-2">
              {t.home.prophetsLibrary}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 px-2">
              {t.home.transformYourLife}
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Book 1: Burning Mantles */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
              <a
                href="https://drisaelbuba.selar.com/1pml035a77"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-2 sm:p-3 md:p-4 flex items-center justify-center">
                    <Image
                      src="/books/burningmantles.jpeg"
                      alt="Burning mantles: The Call, the Cost, and the Fire of a True Prophet"
                      width={150}
                      height={220}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-navy-dark mb-2 line-clamp-2 leading-tight">
                    Burning mantles: The Call, the Cost, and the Fire of a True Prophet
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Now</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </a>
            </div>

            {/* Book 2: Wealth Creation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
              <a
                href="https://drisaelbuba.selar.com/26h34nj3j4"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-2 sm:p-3 md:p-4 flex items-center justify-center">
                    <Image
                      src="/books/wealthcreation.jpeg"
                      alt="Anointing for Wealth Creation and Distribution"
                      width={150}
                      height={220}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-navy-dark mb-2 line-clamp-2 leading-tight">
                    Anointing for Wealth Creation and Distribution
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Now</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </a>
            </div>

            {/* Book 3: The Call to Genuine Love & Revival */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
              <a
                href="https://drisaelbuba.selar.com/74ax21711o"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-2 sm:p-3 md:p-4 flex items-center justify-center">
                    <Image
                      src="/books/thecalltogenuineloverevival.jpeg"
                      alt="The Call to Genuine Love & Revival"
                      width={150}
                      height={220}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-navy-dark mb-2 line-clamp-2 leading-tight">
                    The Call to Genuine Love & Revival
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Now</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </a>
            </div>

            {/* Book 4: Following the Leader's Spirit */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
              <a
                href="https://drisaelbuba.selar.com/3371u14zjp"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-2 sm:p-3 md:p-4 flex items-center justify-center">
                    <Image
                      src="/books/followingtheleaderspirit.jpeg"
                      alt="Following the Leader's Spirit"
                      width={150}
                      height={220}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-navy-dark mb-2 line-clamp-2 leading-tight">
                    Following the Leader's Spirit
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Now</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </a>
            </div>

            {/* Book 5: Sustaining Generational Fire */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
              <a
                href="https://drisaelbuba.selar.com/84464178c6"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-navy/5 to-navy/10 overflow-hidden">
                  <div className="relative w-full h-full p-2 sm:p-3 md:p-4 flex items-center justify-center">
                    <Image
                      src="/books/sustaininggenerationalfire.jpeg"
                      alt="Sustaining Generational Fire"
                      width={150}
                      height={220}
                      className="object-contain w-auto h-full rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-navy-dark mb-2 line-clamp-2 leading-tight">
                    Sustaining Generational Fire
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Now</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* View All Books Link */}
          <div className="text-center">
            <Link
              href="/library"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-all duration-300 transform hover:scale-105 shadow-lg touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              <span>{t.home.viewAllBooks}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
    </PullToRefresh>
  )
}
