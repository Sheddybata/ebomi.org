import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

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

function getGalleryDir() {
  return path.join(process.cwd(), 'public', 'gallery')
}

function getBaseFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return filename.slice(0, -ext.length)
}

function listGalleryImages(): string[] {
  const galleryDir = getGalleryDir()
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

export async function GET(req: Request) {
  const url = new URL(req.url)
  const limitParam = url.searchParams.get('limit')
  const limit = limitParam ? Math.max(1, Math.min(200, Number(limitParam))) : null

  const images = listGalleryImages()
  const sliced = limit ? images.slice(0, limit) : images

  return NextResponse.json(
    { images: sliced, total: images.length },
    {
      headers: {
        // Cache for 1 hour, allow stale while revalidating
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    }
  )
}

