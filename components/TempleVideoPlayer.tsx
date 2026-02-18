'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'

interface Video {
  src: string
  title: string
}

interface TempleVideoPlayerProps {
  videos: Video[]
}

export default function TempleVideoPlayer({ videos }: TempleVideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentVideo = videos[currentVideoIndex]

  useEffect(() => {
    setIsLoading(true)
    setIsPlaying(false)
  }, [currentVideoIndex])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    // Auto-play next video if available
    if (currentVideoIndex < videos.length - 1) {
      setTimeout(() => {
        setCurrentVideoIndex(currentVideoIndex + 1)
      }, 1000)
    }
  }

  return (
    <div className="relative w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/30 bg-black group" style={{ transform: 'translateZ(0)' }}>
        <video
          ref={videoRef}
          src={currentVideo.src}
          className="w-full h-full object-contain"
          style={{
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          onLoadedData={() => {
            setIsLoading(false)
          }}
          onLoadedMetadata={() => {
            // Ensure video uses native resolution
            if (videoRef.current) {
              videoRef.current.style.width = '100%'
              videoRef.current.style.height = '100%'
            }
          }}
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
          preload="auto"
          autoPlay={false}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play/Pause Button Overlay */}
        {!isLoading && (
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-all">
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </div>
          </button>
        )}

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Video Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 sm:p-6">
          <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">
            {currentVideo.title}
          </h3>
        </div>
      </div>

      {/* Video Thumbnails/Selector */}
      {videos.length > 1 && (
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`relative flex-1 max-w-[200px] aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                index === currentVideoIndex
                  ? 'border-gold shadow-lg shadow-gold/30 scale-105'
                  : 'border-white/20 hover:border-white/40'
              }`}
              aria-label={`Select ${video.title}`}
            >
              <div className="relative w-full h-full bg-black">
                <video
                  src={video.src}
                  className="w-full h-full object-cover opacity-70"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
                {index === currentVideoIndex && (
                  <div className="absolute inset-0 bg-gold/20 border-2 border-gold"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
