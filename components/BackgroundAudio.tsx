'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleAllow = async (e?: React.MouseEvent | React.TouchEvent) => {
    // Prevent event bubbling
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const audio = audioRef.current
    if (!audio) {
      console.error('Audio ref not available')
      alert('Audio player not initialized. Please refresh the page.')
      return
    }

    setIsLoading(true)

    try {
      // Strategy 1: Unlock audio context (for mobile browsers)
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext
          const audioContext = new AudioContext()
          if (audioContext.state === 'suspended') {
            await audioContext.resume()
          }
        } catch (ctxError) {
          console.log('AudioContext unlock attempt:', ctxError)
        }
      }

      // Strategy 2: Ensure audio is loaded
      // Use URL-encoded path to handle spaces properly
      const audioPath = encodeURI('/background sound/ebomi2.mp3')
      
      if (audio.src !== audioPath || audio.readyState < 2) {
        audio.src = audioPath
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Audio loading timeout after 10 seconds'))
          }, 10000)
          
          const cleanup = () => {
            clearTimeout(timeout)
            audio.removeEventListener('canplay', onCanPlay)
            audio.removeEventListener('error', onError)
            audio.removeEventListener('loadeddata', onCanPlay)
          }
          
          const onCanPlay = () => {
            cleanup()
            resolve(void 0)
          }
          
          const onError = (err: Event) => {
            cleanup()
            const error = err as ErrorEvent
            reject(new Error(`Audio load error: ${error.message || 'Unknown error'}`))
          }
          
          audio.addEventListener('canplay', onCanPlay, { once: true })
          audio.addEventListener('loadeddata', onCanPlay, { once: true })
          audio.addEventListener('error', onError, { once: true })
          
          audio.load()
        })
      }

      // Strategy 3: Set volume and attributes
      audio.volume = 0.7
      audio.muted = false
      
      // Strategy 4: Try playing with multiple approaches
      let playSuccess = false
      let lastError: any = null

      // Try 1: Direct play
      try {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          playSuccess = true
        } else {
          playSuccess = true
        }
      } catch (err: any) {
        lastError = err
        console.log('Direct play failed, trying alternative:', err.message)
        
        // Try 2: Wait a bit and retry
        await new Promise(resolve => setTimeout(resolve, 100))
        try {
          await audio.play()
          playSuccess = true
        } catch (err2: any) {
          lastError = err2
          console.log('Retry play failed:', err2.message)
        }
      }

      if (!playSuccess) {
        throw lastError || new Error('Unable to play audio after multiple attempts')
      }

      // Success
      setIsPlaying(true)
      setIsLoading(false)
      setShowPermissionModal(false)
      localStorage.setItem('ebomi-audio-permission', 'allowed')
      console.log('Background audio started - user allowed')
    } catch (error: any) {
      setIsLoading(false)
      console.error('Failed to play audio:', error)
      
      // Provide more specific error messages
      let errorMessage = 'Unable to play audio. '
      
      if (error.message?.includes('timeout')) {
        errorMessage += 'The audio file is taking too long to load. Please check your internet connection.'
      } else if (error.message?.includes('load error')) {
        errorMessage += 'The audio file could not be loaded. Please refresh the page.'
      } else if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
        errorMessage += 'Your browser or device is blocking audio playback. Please check your device settings and ensure it\'s not on silent mode.'
      } else {
        errorMessage += 'Please ensure your device is not on silent mode, check your browser settings, and try again.'
      }
      
      alert(errorMessage)
    }
  }

  const handleDeny = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setShowPermissionModal(false)
    localStorage.setItem('ebomi-audio-permission', 'denied')
  }

  // Initialize audio element on mount
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Set audio path using URL encoding for spaces
      const audioPath = encodeURI('/background sound/ebomi2.mp3')
      if (!audio.src || audio.src !== audioPath) {
        audio.src = audioPath
      }
      
      // Set default attributes
      audio.volume = 0.7
      audio.muted = false
      
      // Log audio state for debugging
      audio.addEventListener('loadstart', () => {
        console.log('Audio loading started')
      })
      
      audio.addEventListener('canplay', () => {
        console.log('Audio can play')
      })
      
      audio.addEventListener('error', (e) => {
        const error = e as ErrorEvent
        console.error('Audio error:', error.message || 'Unknown audio error')
        if (audio.error) {
          console.error('Audio error details:', {
            code: audio.error.code,
            message: audio.error.message
          })
        }
      })
    }
  }, [])

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
        playsInline
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('Audio element error:', e)
          const audio = e.currentTarget
          if (audio.error) {
            console.error('Audio error code:', audio.error.code)
            console.error('Audio error message:', audio.error.message)
          }
        }}
        onLoadedData={() => {
          console.log('Audio loaded successfully')
        }}
      >
        <source src="/background%20sound/ebomi2.mp3" type="audio/mpeg" />
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
              handleDeny(e)
            }
          }}
          onTouchStart={(e) => {
            // Close on backdrop touch
            if (e.target === e.currentTarget) {
              handleDeny(e)
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
              position: 'relative',
              zIndex: 10001,
              touchAction: 'manipulation',
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
                onClick={(e) => !isLoading && handleAllow(e)}
                onTouchStart={(e) => {
                  if (isLoading) {
                    e.preventDefault()
                    return
                  }
                  e.preventDefault()
                  e.stopPropagation()
                  e.currentTarget.style.backgroundColor = '#b91c1c'
                  handleAllow(e)
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                }}
                disabled={isLoading}
                style={{
                  padding: '14px 36px',
                  backgroundColor: isLoading ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isLoading ? 'none' : '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                  minWidth: '140px',
                  minHeight: '48px',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 1,
                  opacity: isLoading ? 0.7 : 1,
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
                {isLoading ? 'Loading...' : 'Allow'}
              </button>
              <button
                onClick={(e) => handleDeny(e)}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  handleDeny(e)
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
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
                  minHeight: '48px',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 1,
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