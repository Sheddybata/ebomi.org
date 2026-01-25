'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let retryCount = 0
    const maxRetries = 10

    // Function to attempt playing audio with different strategies
    const attemptPlay = async () => {
      try {
        // Set volume first
        audio.volume = 0.7

        // Try multiple play strategies
        if ('mediaSession' in navigator) {
          // Try with media session
          await audio.play()
        } else if ('requestAnimationFrame' in window) {
          // Try with animation frame
          await new Promise((resolve, reject) => {
            requestAnimationFrame(async () => {
              try {
                await audio.play()
                resolve(void 0)
              } catch (e) {
                reject(e)
              }
            })
          })
        } else {
          // Standard play attempt
          await audio.play()
        }

        setHasInteracted(true)
        console.log('Background audio started successfully')
      } catch (error) {
        console.log(`Audio autoplay attempt ${retryCount + 1} failed:`, error.message)

        if (retryCount < maxRetries) {
          retryCount++
          // Retry with exponential backoff
          setTimeout(attemptPlay, Math.min(1000 * Math.pow(2, retryCount), 10000))
        } else {
          console.log('Audio autoplay blocked. Will try on user interaction.')
        }
      }
    }

    // Try immediately
    attemptPlay()

    // Also try after a short delay (helps with some browsers)
    setTimeout(attemptPlay, 100)
    setTimeout(attemptPlay, 500)

    // Listen for any user interaction to play audio
    const handleUserInteraction = async () => {
      if (hasInteracted) return

      try {
        await audio.play()
        setHasInteracted(true)
        console.log('Audio started on user interaction')

        // Remove listeners after successful play
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('keydown', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      } catch (error) {
        console.log('Failed to play audio on interaction:', error.message)
      }
    }

    // Add interaction listeners
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }

      // Remove listeners
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [hasInteracted])

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
        muted={false}
        volume={0.7}
      >
        <source src="/background sound/ebomi2.mp3" type="audio/mpeg" />
        <source src="/background sound/ebomi2.mp3" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Fallback play button - hidden but accessible */}
      <button
        onClick={() => {
          const audio = audioRef.current
          if (audio) {
            audio.play().catch(console.error)
            setHasInteracted(true)
          }
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '10px 15px',
          background: '#1e40af',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          display: hasInteracted ? 'none' : 'block'
        }}
        aria-label="Play background music"
      >
        ▶ Play Music
      </button>
    </>
  )
}