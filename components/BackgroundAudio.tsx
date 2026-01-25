'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Check if user has already given permission
    const audioPermission = localStorage.getItem('ebomi-audio-permission')
    
    if (audioPermission === 'allowed') {
      // User previously allowed, try to play immediately
      const audio = audioRef.current
      if (audio) {
        audio.volume = 0.7
        audio.play()
          .then(() => {
            setIsPlaying(true)
            console.log('Background audio started (previously allowed)')
          })
          .catch((error) => {
            console.log('Failed to autoplay (even with permission):', error)
            // If it still fails, show the modal
            setShowPermissionModal(true)
          })
      }
    } else if (audioPermission === 'denied') {
      // User previously denied, don't show modal
      return
    } else {
      // First visit - show permission modal
      setShowPermissionModal(true)
    }
  }, [])

  const handleAllow = async () => {
    const audio = audioRef.current
    if (audio) {
      try {
        audio.volume = 0.7
        await audio.play()
        setIsPlaying(true)
        setShowPermissionModal(false)
        localStorage.setItem('ebomi-audio-permission', 'allowed')
        console.log('Background audio started - user allowed')
      } catch (error) {
        console.error('Failed to play audio:', error)
        alert('Unable to play audio. Please check your browser settings.')
      }
    }
  }

  const handleDeny = () => {
    setShowPermissionModal(false)
    localStorage.setItem('ebomi-audio-permission', 'denied')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
        muted={false}
      >
        <source src="/background sound/ebomi2.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Permission Modal */}
      {showPermissionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
          onClick={(e) => {
            // Close on backdrop click
            if (e.target === e.currentTarget) {
              handleDeny()
            }
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '450px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}
            >
              🎵
            </div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '12px',
              }}
            >
              Enable Background Music?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#4b5563',
                marginBottom: '24px',
                lineHeight: '1.6',
              }}
            >
              Would you like to enable background music to enhance your experience on EBOMI? The music will play continuously while you browse.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={handleAllow}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#1e40af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e3a8a'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e40af'
                }}
              >
                ✓ Allow
              </button>
              <button
                onClick={handleDeny}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#d1d5db'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                }}
              >
                ✗ Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}