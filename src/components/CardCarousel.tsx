import React, { useRef, useState } from 'react'

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
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  isDarkMode = false,
}) => {
  const card = cards && cards.length > 0 ? cards[0] : null
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!card) return null

  const togglePlay = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
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
        className={`group flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-shadow duration-200 ${
          isDarkMode
            ? 'shadow-md hover:shadow-xl bg-gray-900'
            : 'bg-white shadow-sm hover:shadow-md'
        }`}
        style={{
          border: isDarkMode
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(0,0,0,0.08)',
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
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
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
                >
                  {card.description}
                </div>
              )}
            </div>

            {/* Duration */}
            {card.duration && (
              <div
                className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } whitespace-nowrap`}
              >
                {card.duration}
              </div>
            )}
          </div>

          {/* Footer row */}
          <div className="mt-4 flex items-center justify-between">
            <div
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Related link
            </div>
            <div
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden
            >
              {/* play icon (smaller) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-1 h-1 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M5 3v18l15-9L5 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hidden audio element controlled by the card click */}
        {card.audioSrc && (
          <audio
            ref={audioRef}
            src={card.audioSrc}
            preload="none"
            style={{ display: 'none' }}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  )
}

export default CardCarousel
