'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ImageSkeleton from '@/components/ImageSkeleton'

type GalleryApiResponse = {
  images: string[]
  total: number
}

export default function GalleryPreview({ limit = 8 }: { limit?: number }) {
  const [images, setImages] = useState<string[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const placeholders = useMemo(() => Array.from({ length: limit }), [limit])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const res = await fetch(`/api/gallery?limit=${limit}`, { cache: 'force-cache' })
        if (!res.ok) throw new Error(`Failed to load gallery images: ${res.status}`)
        const data = (await res.json()) as GalleryApiResponse
        if (cancelled) return
        setImages(data.images || [])
        setTotal(data.total || 0)
      } catch {
        if (cancelled) return
        setImages([])
        setTotal(0)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [limit])

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-2">
              Gallery
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Moments from our services and gatherings
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-light active:bg-navy-dark transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base flex-shrink-0"
          >
            View all{total > 0 ? ` (${total})` : ''}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 sm:gap-0">
          {loading &&
            placeholders.map((_, idx) => (
              <ImageSkeleton key={idx} aspectRatio="aspect-square" />
            ))}

          {!loading &&
            images.map((src, idx) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  quality={85}
                  priority={idx < 6}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

