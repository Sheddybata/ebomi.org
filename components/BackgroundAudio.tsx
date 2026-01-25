'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Attempt to play the audio
      const playAudio = async () => {
        try {
          await audio.play()
        } catch (error) {
          // Handle browsers that block autoplay (like Chrome)
          console.log('Audio autoplay blocked by browser. User interaction required.')
        }
      }

      playAudio()
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    >
      <source src="/background sound/ebomi2.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}