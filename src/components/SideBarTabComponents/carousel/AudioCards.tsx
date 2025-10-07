import React, { useRef, useState, useEffect } from 'react'

interface Card {
  id: string
  title: string
  description?: string
  icon?: string
  color?: string
  audioSrc?: string
  duration?: string
}

interface CardCarouselProps {
  cards: Card[]
  isDarkMode?: boolean
  onCardClick?: () => void
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  isDarkMode = false,
  onCardClick,
}) => {
  const card = cards && cards.length > 0 ? cards[0] : null
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const countdownRef = useRef<number | null>(null)

  // cleanup on unmount to avoid leaking intervals and stop any playing audio
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current as number)
        countdownRef.current = null
      }
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.src = ''
        } catch (err) {
          // best-effort cleanup failure — not critical for runtime
          // keep a debug log to satisfy linters and aid troubleshooting

          console.debug('audio cleanup error', err)
        }
      }
    }
  }, [])

  // keep audio element in sync when the card's audioSrc changes
  useEffect(() => {
    if (!audioRef.current) return
    if (!card?.audioSrc) {
      // if card has no audio, ensure element is cleared
      audioRef.current.src = ''
      return
    }
    // Only change src if it's different (avoid interrupting playback)
    try {
      const absoluteSrc = new URL(card.audioSrc, window.location.href).href
      if (audioRef.current.src !== absoluteSrc) {
        audioRef.current.src = card.audioSrc
        // load the new source so play() works reliably
        audioRef.current.load()
      }
    } catch {
      // fall back to assigning directly if URL construction fails
      if (audioRef.current.src !== card.audioSrc) {
        audioRef.current.src = card.audioSrc
        audioRef.current.load()
      }
    }
  }, [card?.audioSrc])

  if (!card) return null

  const togglePlay = () => {
    // Notify parent that the card was clicked (shows the textbox)
    onCardClick?.()

    // If a countdown is already running, cancel it (toggle)
    if (countdown !== null) {
      if (countdownRef.current) {
        clearInterval(countdownRef.current as number)
        countdownRef.current = null
      }
      setCountdown(null)
      return
    }

    if (!audioRef.current) return

    if (audioRef.current.paused) {
      // start a 3..1 countdown before playing
      setCountdown(3)
      countdownRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null
          if (prev <= 1) {
            // time to play
            if (countdownRef.current) {
              clearInterval(countdownRef.current as number)
              countdownRef.current = null
            }
            setCountdown(null)

            // Ensure the audio element is ready; attempt to unmute and play.
            try {
              const audio = audioRef.current!
              console.log('Attempting to play audio:', card.audioSrc)
              console.log('Audio element src:', audio.src)
              console.log('Audio element readyState:', audio.readyState)
              console.log('Audio element networkState:', audio.networkState)

              audio.muted = false
              audio.volume = 1
              audio.currentTime = 0

              audio
                .play()
                .then(() => {
                  console.log('Audio playing successfully!')
                  setIsPlaying(true)
                })
                .catch((err) => {
                  console.error('Audio play failed:', err)
                  console.log('Error name:', err.name)
                  console.log('Error message:', err.message)
                  alert('Audio failed to play: ' + err.name + ' - ' + err.message)
                })
            } catch (err) {
              console.error('Audio play error:', err)
              alert('Audio error: ' + (err as Error).message)
            }

            return null
          }
          return prev - 1
        })
      }, 1000)
    } else {
      // if playing, pause and clear any countdown
      audioRef.current.pause()
      setIsPlaying(false)
      if (countdownRef.current) {
        clearInterval(countdownRef.current as number)
        countdownRef.current = null
      }
      setCountdown(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      togglePlay()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div
        role="button"
        tabIndex={0}
        onClick={togglePlay}
        onKeyDown={handleKeyDown}
        aria-pressed={isPlaying}
        className={`group card-hover flex items-center gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 ease-out ${
          isDarkMode
            ? 'border-2 border-gray-600 text-gray-100 hover:border-gray-500'
            : 'border-2 border-gray-300 text-gray-900 hover:border-gray-400'
        }`}
        style={{
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : '#faf9f6',
          boxShadow: isDarkMode
            ? '0 4px 20px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
          backdropFilter: isDarkMode ? 'blur(6px)' : undefined,
          borderRadius: '16px',
        }}
      >
        {/* Left icon circle */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(249,115,182,0.95) 0%, rgba(236,72,153,0.6) 40%, rgba(99,102,241,0.12) 100%)',
            }}
          >
            <div className="w-6 h-6 rounded-full bg-pink-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-center gap-4">
            <div className="min-w-0 card-content">
              <div
                className={`text-base font-semibold truncate ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                {card.title}
              </div>
              {card.description && (
                <div
                  className={`mt-1 text-sm truncate ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  style={{ maxWidth: '28rem', width: '100%' }}
                >
                  {card.description}
                </div>
              )}

              {/* Centered duration under the description */}
              {card.duration && (
                <div
                  className={`mt-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  style={{ textAlign: 'center' }}
                >
                  {card.duration}
                </div>
              )}
            </div>
          </div>

          {/* Footer row */}
          <div className="mt-4 flex items-center justify-between">
            <div
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden
            >
              {/* show pause (stop) icon when playing, otherwise play icon */}
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1 h-1 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  style={{
                    transform: 'scale(0.25)',
                    transformOrigin: 'center',
                  }}
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1 h-1 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  style={{
                    transform: 'scale(0.25)',
                    transformOrigin: 'center',
                  }}
                >
                  <path d="M5 3v18l15-9L5 3z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Countdown overlay (shows while counting down) */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-black/60 text-white font-bold text-4xl w-20 h-20 flex items-center justify-center">
              {countdown}
            </div>
          </div>
        )}

        {/* Hidden audio element controlled by the card click */}
        {card.audioSrc && (
          <audio
            ref={audioRef}
            src={card.audioSrc}
            preload="auto"
            // keep the element present but offscreen; some browsers handle play()
            // better when the element exists in layout rather than display:none
            style={{ position: 'absolute', left: -9999, width: 0, height: 0 }}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  )
}

export default CardCarousel