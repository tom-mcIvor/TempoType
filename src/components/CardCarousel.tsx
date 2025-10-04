import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Card {
  id: string
  title: string
  description: string
  icon: string
  color: string
  audioSrc?: string
  duration?: string
  difficulty?: string
}

// Sample audio cards data
export const sampleAudioCards: Card[] = [
  {
    id: 'fenella-01',
    title: 'Chapter 1: The Mystery Begins',
    description: 'Start your journey with the opening chapter of The Fate of Fenella',
    icon: '📖',
    color: 'blue',
    audioSrc: '/fateoffenella_01_various_64kb.mp3',
    duration: '15 min',
    difficulty: 'Beginner'
  },
  {
    id: 'fenella-02',
    title: 'Chapter 2: The Plot Thickens',
    description: 'Continue the story with more complex vocabulary and pacing',
    icon: '🎭',
    color: 'purple',
    audioSrc: '/audio-source-files/fateoffenella_02_various_64kb.mp3',
    duration: '18 min',
    difficulty: 'Intermediate'
  },
  {
    id: 'fenella-03',
    title: 'Chapter 3: Rising Action',
    description: 'Challenge yourself with faster narration and dramatic scenes',
    icon: '⚡',
    color: 'orange',
    audioSrc: '/audio-source-files/fateoffenella_03_various_64kb.mp3',
    duration: '22 min',
    difficulty: 'Advanced'
  },
  {
    id: 'fenella-05',
    title: 'Chapter 5: The Revelation',
    description: 'Test your skills with complex dialogue and multiple speakers',
    icon: '🔍',
    color: 'green',
    audioSrc: '/audio-source-files/fateoffenella_05_various_64kb.mp3',
    duration: '20 min',
    difficulty: 'Expert'
  },
  {
    id: 'fenella-10',
    title: 'Chapter 10: Climactic Moments',
    description: 'Experience intense scenes with rapid speech and emotional content',
    icon: '🎪',
    color: 'red',
    audioSrc: '/audio-source-files/fateoffenella_10_various_64kb.mp3',
    duration: '25 min',
    difficulty: 'Expert'
  }
]

interface CardCarouselProps {
  cards: Card[]
  isDarkMode?: boolean
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  isDarkMode = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1)
  }

  const nextSlide = () => {
    setCurrentIndex(currentIndex === cards.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card) => (
            <div key={card.id} className="w-full flex-shrink-0">
              <div className="mx-4">
                <div
                  className={`relative rounded-xl overflow-hidden ${
                    isDarkMode
                      ? 'bg-gray-800/90 border border-gray-700/50'
                      : 'bg-white/90 border border-gray-200/50'
                  } shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="p-8">
                    <div className="h-40 flex items-center justify-center">
                      <h3
                        className={`text-2xl font-bold text-center ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - Fixed sizing and positioning */}
      <button
        type="button"
        className={`absolute top-1/2 -translate-y-1/2 left-2 z-30 flex items-center justify-center w-12 h-12 rounded-full ${
          isDarkMode
            ? 'bg-gray-800/80 hover:bg-gray-700/90 text-gray-200 border border-gray-600/50'
            : 'bg-white/80 hover:bg-white/95 text-gray-700 border border-gray-300/50'
        } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={prevSlide}
      >
        <ChevronLeftIcon className="w-6 h-6" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className={`absolute top-1/2 -translate-y-1/2 right-2 z-30 flex items-center justify-center w-12 h-12 rounded-full ${
          isDarkMode
            ? 'bg-gray-800/80 hover:bg-gray-700/90 text-gray-200 border border-gray-600/50'
            : 'bg-white/80 hover:bg-white/95 text-gray-700 border border-gray-300/50'
        } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={nextSlide}
      >
        <ChevronRightIcon className="w-6 h-6" />
        <span className="sr-only">Next</span>
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`transition-all duration-200 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                : isDarkMode
                ? 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default CardCarousel