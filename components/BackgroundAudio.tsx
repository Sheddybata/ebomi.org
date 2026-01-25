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
            className="animate-modal-fade-in"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px 32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textAlign: 'center',
              border: '2px solid #fee2e2',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#dc2626',
                marginBottom: '16px',
                letterSpacing: '-0.5px',
              }}
            >
              Enable Background Music
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '32px',
                lineHeight: '1.7',
                maxWidth: '400px',
                margin: '0 auto 32px',
              }}
            >
              Enhance your browsing experience with background music. The music will play continuously while you explore EBOMI.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={handleAllow}
                style={{
                  padding: '14px 36px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                  minWidth: '140px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#b91c1c'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 12px -1px rgba(220, 38, 38, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                }}
              >
                Allow
              </button>
              <button
                onClick={handleDeny}
                style={{
                  padding: '14px 36px',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '140px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  e.currentTarget.style.borderColor = '#d1d5db'
                  e.currentTarget.style.color = '#374151'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.color = '#6b7280'
                }}
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}