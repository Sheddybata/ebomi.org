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
    // Prevent event bubbling but DON'T prevent default - we need the user gesture
    if (e) {
      e.stopPropagation()
      // Don't prevent default - we need the native event for audio unlock
    }

    const audio = audioRef.current
    if (!audio) {
      console.error('Audio ref not available')
      alert('Audio player not initialized. Please refresh the page.')
      return
    }

    setIsLoading(true)
    console.log('Starting audio playback...')
    console.log('Audio current src:', audio.src)
    console.log('Audio ready state:', audio.readyState)
    console.log('Audio network state:', audio.networkState)

    try {
      // Strategy 1: Unlock audio context IMMEDIATELY (must be in user gesture)
      if (typeof window !== 'undefined') {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext
          if (AudioContext) {
            const audioContext = new AudioContext()
            console.log('AudioContext state:', audioContext.state)
            if (audioContext.state === 'suspended') {
              const resumeResult = await audioContext.resume()
              console.log('AudioContext resumed:', resumeResult)
            }
          }
        } catch (ctxError: any) {
          console.log('AudioContext unlock attempt:', ctxError.message)
        }
      }

      // Strategy 2: Ensure audio source is set and loaded
      const audioPath = encodeURI('/background sound/ebomi2.mp3')
      
      // Always set src to ensure it's correct
      if (!audio.src || !audio.src.includes('ebomi2')) {
        console.log('Setting audio src to:', audioPath)
        audio.src = audioPath
      }

      // Set volume and attributes BEFORE loading
      audio.volume = 0.7
      audio.muted = false
      
      // If not loaded, wait for it
      if (audio.readyState < 2) {
        console.log('Audio not ready, loading...')
        audio.load()
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Audio loading timeout after 15 seconds'))
          }, 15000)
          
          const cleanup = () => {
            clearTimeout(timeout)
            audio.removeEventListener('canplaythrough', onCanPlay)
            audio.removeEventListener('canplay', onCanPlay)
            audio.removeEventListener('error', onError)
            audio.removeEventListener('loadeddata', onCanPlay)
          }
          
          const onCanPlay = () => {
            console.log('Audio can play - ready state:', audio.readyState)
            cleanup()
            resolve(void 0)
          }
          
          const onError = (err: Event) => {
            cleanup()
            const error = err as ErrorEvent
            console.error('Audio load error event:', error)
            if (audio.error) {
              console.error('Audio error object:', {
                code: audio.error.code,
                message: audio.error.message
              })
            }
            reject(new Error(`Audio load error: ${error.message || audio.error?.message || 'Unknown error'}`))
          }
          
          // Try multiple events
          audio.addEventListener('canplaythrough', onCanPlay, { once: true })
          audio.addEventListener('canplay', onCanPlay, { once: true })
          audio.addEventListener('loadeddata', onCanPlay, { once: true })
          audio.addEventListener('error', onError, { once: true })
        })
      }

      console.log('Attempting to play audio...')
      console.log('Audio ready state before play:', audio.readyState)
      
      // Strategy 3: Play immediately (must be in user gesture context)
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        await playPromise
        console.log('Audio play promise resolved successfully')
      }

      // Verify it's actually playing
      if (audio.paused) {
        throw new Error('Audio element is still paused after play() call')
      }

      // Success
      setIsPlaying(true)
      setIsLoading(false)
      setShowPermissionModal(false)
      localStorage.setItem('ebomi-audio-permission', 'allowed')
      console.log('Background audio started successfully - user allowed')
      console.log('Audio playing:', !audio.paused)
      console.log('Audio current time:', audio.currentTime)
      
    } catch (error: any) {
      setIsLoading(false)
      console.error('Failed to play audio:', error)
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Audio paused:', audio.paused)
      console.error('Audio ready state:', audio.readyState)
      console.error('Audio network state:', audio.networkState)
      
      if (audio.error) {
        console.error('Audio error details:', {
          code: audio.error.code,
          message: audio.error.message
        })
      }
      
      // Provide more specific error messages
      let errorMessage = 'Unable to play audio. '
      
      if (error.message?.includes('timeout')) {
        errorMessage += 'The audio file is taking too long to load. Please check your internet connection and try again.'
      } else if (error.message?.includes('load error') || audio.error?.code === 4) {
        errorMessage += 'The audio file could not be loaded. The file may be missing or corrupted. Please contact support.'
      } else if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
        errorMessage += 'Your browser is blocking audio playback. Please check your browser settings and allow audio for this site.'
      } else if (error.name === 'AbortError') {
        errorMessage += 'Audio playback was interrupted. Please try again.'
      } else {
        errorMessage += `Error: ${error.message || error.name || 'Unknown error'}. Please try refreshing the page.`
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
        style={{ 
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: '1px',
          height: '1px',
          zIndex: -1
        }}
        muted={false}
        playsInline
        autoPlay={false}
        onError={(e) => {
          console.error('Audio element error:', e)
          const audio = e.currentTarget
          if (audio.error) {
            console.error('Audio error code:', audio.error.code)
            console.error('Audio error message:', audio.error.message)
            console.error('Audio network state:', audio.networkState)
            console.error('Audio ready state:', audio.readyState)
          }
        }}
        onLoadedData={() => {
          console.log('Audio loaded successfully')
          console.log('Audio duration:', audioRef.current?.duration)
        }}
        onCanPlay={() => {
          console.log('Audio can play - ready state:', audioRef.current?.readyState)
        }}
        onLoadStart={() => {
          console.log('Audio load started')
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
                onClick={(e) => {
                  if (!isLoading) {
                    handleAllow(e)
                  }
                }}
                onTouchEnd={(e) => {
                  if (isLoading) {
                    return
                  }
                  e.stopPropagation()
                  e.currentTarget.style.backgroundColor = '#dc2626'
                  // Use touchEnd for better mobile compatibility
                  handleAllow(e)
                }}
                onTouchStart={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#b91c1c'
                  }
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