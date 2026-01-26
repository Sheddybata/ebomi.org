import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const revalidate = 3600

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const PER_PAGE = 60

// Priority images to display first (without extension, will match .jpg or .jpeg)
const PRIORITY_IMAGES = [
  '539941790_18321801799236031_2337748703710837782_n',
  '556576434_18325731610236031_8769879926594880317_n',
  '552850990_18325176568236031_1772751944448391517_n',
  '564737513_18328751986236031_8477093846044758162_n',
  '610818916_18340034536236031_8471420104452403057_n',
  '610916409_18339930718236031_618149441102828895_n',
  '610430927_18339822757236031_2261421005544232634_n',
  '610620248_18339596416236031_3012611853062590013_n',
  '587814380_18338423005236031_6052373277300865247_n',
  '587413309_18338422876236031_6124069070624583673_n',
  '601227685_18338422906236031_6950274659978069982_n',
  '587815693_18338212573236031_6411827060651998645_n',
  '575694883_18336999904236031_5899803810057423780_n',
  '586436339_18335549506236031_1040560438165107354_n',
  '584345645_18335433409236031_8392011934521030632_n',
]

function getBaseFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return filename.slice(0, -ext.length)
}

function getAllGalleryImages(): string[] {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery')
  if (!fs.existsSync(galleryDir)) return []

  const files = fs.readdirSync(galleryDir)
  const imageFiles = files.filter((file) => ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()))
  
  // Separate priority and regular images
  const priorityImages: string[] = []
  const regularImages: string[] = []
  
  imageFiles.forEach((file) => {
    const baseName = getBaseFilename(file)
    if (PRIORITY_IMAGES.includes(baseName)) {
      priorityImages.push(file)
    } else {
      regularImages.push(file)
    }
  })
  
  // Sort priority images by their order in PRIORITY_IMAGES array
  priorityImages.sort((a, b) => {
    const aBase = getBaseFilename(a)
    const bBase = getBaseFilename(b)
    const aIndex = PRIORITY_IMAGES.indexOf(aBase)
    const bIndex = PRIORITY_IMAGES.indexOf(bBase)
    return aIndex - bIndex
  })
  
  // Sort regular images alphabetically
  regularImages.sort((a, b) => a.localeCompare(b))
  
  // Combine: priority first, then regular
  const allImages = [...priorityImages, ...regularImages]
  
  return allImages.map((file) => `/gallery/${file}`)
}

export default function GalleryPage({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const allImages = getAllGalleryImages()
  const total = allImages.length

  const page = Math.max(1, Number(searchParams?.page || 1) || 1)
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
  const safePage = Math.min(page, totalPages)

  const start = (safePage - 1) * PER_PAGE
  const end = start + PER_PAGE
  const images = allImages.slice(start, end)

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">Gallery</h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl">
              Pictures from our services, outreaches, and special programs.
            </p>
            <div className="mt-4 text-white/80 text-sm sm:text-base">
              Showing {total === 0 ? 0 : start + 1}-{Math.min(end, total)} of {total}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {total === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center text-gray-700">
              No images found in <code className="font-semibold">public/gallery</code>.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1">
                {images.map((src, idx) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${start + idx + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      quality={85}
                      priority={safePage === 1 && idx < 8}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <Link
                    href={`/gallery?page=${Math.max(1, safePage - 1)}`}
                    aria-disabled={safePage === 1}
                    className={`px-5 py-3 rounded-lg font-semibold border transition-colors min-h-[44px] ${
                      safePage === 1
                        ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-500 border-gray-200'
                        : 'bg-white text-navy-dark border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </Link>

                  <div className="text-gray-700 font-semibold">
                    Page {safePage} of {totalPages}
                  </div>

                  <Link
                    href={`/gallery?page=${Math.min(totalPages, safePage + 1)}`}
                    aria-disabled={safePage === totalPages}
                    className={`px-5 py-3 rounded-lg font-semibold border transition-colors min-h-[44px] ${
                      safePage === totalPages
                        ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-500 border-gray-200'
                        : 'bg-white text-navy-dark border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

