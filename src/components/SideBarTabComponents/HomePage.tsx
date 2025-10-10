import React, { useState } from 'react'
import TextBox from '../TextBox'
import CarouselWrapper from './carousel/CardCarousel'
import { audio120Wpm } from '../../data/audio120Wpm'
import { audio20Wpm } from '../../data/audio20Wpm'
import { audio40Wpm } from '../../data/audio40Wpm'
import { audio50Wpm } from '../../data/audio50Wpm'
import audioService from '../../services/api/audioService'

interface TypingMetrics {
  wpm: number
  accuracy: number
  charactersTyped: number
  wordsTyped: number
  timeElapsed: number
  errorsCount: number
}

interface HomePageProps {
  isDarkMode?: boolean
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode = false }) => {
  const [metrics, setMetrics] = useState<TypingMetrics>({
    wpm: 0,
    accuracy: 100,
    charactersTyped: 0,
    wordsTyped: 0,
    timeElapsed: 0,
    errorsCount: 0,
  })
  const [showTextBox, setShowTextBox] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [userTypedText, setUserTypedText] = useState('')
  const [currentTargetText, setCurrentTargetText] = useState('')
  const [audioStopped, setAudioStopped] = useState(false)
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null)

  const handleAudioEnded = () => {
    setAudioStopped(true)
    setShowResults(true)
  }

  const handleAudioStart = (audioId: string) => {
    setCurrentAudioId(audioId)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setUserTypedText('')
    setAudioStopped(false)
    setMetrics({
      wpm: 0,
      accuracy: 100,
      charactersTyped: 0,
      wordsTyped: 0,
      timeElapsed: 0,
      errorsCount: 0,
    })
  }

  const handleTextChange = (text: string) => {
    setUserTypedText(text)
  }

  const handleCardClick = async (audioSrc: string) => {
    setShowTextBox(true)
    try {
      const transcription = await audioService.getTranscription(audioSrc)
      setCurrentTargetText(transcription)
    } catch (error) {
      console.error('Failed to load transcription:', error)
      setCurrentTargetText('Transcription not available for this audio file.')
    }
  }

  return (
    <>
      <div
        className={`HomePage sidebar-tab-content homepage-content transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          minHeight: '100vh',
          width: '100%',
          background: isDarkMode
            ? 'linear-gradient(to bottom right, #111827, #1f2937, #111827)'
            : 'linear-gradient(to bottom right, #eff6ff, #f3e8ff, #fdf2f8)',
        }}
      >
      {/* Title at the top */}
      <div className="text-center mb-12">
        <div
          className={`inline-flex items-center gap-4 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-2xl mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TempoType
          </h1>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>

      <div className="mb-12">
        <div className="four-grid mx-auto">
          {/* Slot 1: existing carousel */}
          <div className="w-full">
            <h3
              className={`mb-4 text-xl font-semibold w-full ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
              style={{ textAlign: 'center' }}
            >
              Advanced (120 wpm)
            </h3>
            <div
              style={{ minHeight: '220px' }}
              className="w-full carousel-slot"
            >
              <CarouselWrapper
                items={audio120Wpm.map((c) => ({
                  id: c.id,
                  title: c.title,
                  description: c.description,
                  image: undefined,
                  audioSrc: c.audioSrc,
                  duration: c.duration,
                }))}
                isDarkMode={isDarkMode}
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                onItemClick={(_id, audioSrc) => audioSrc && handleCardClick(audioSrc)}
                onAudioEnded={handleAudioEnded}
                currentAudioId={currentAudioId}
                onAudioStart={handleAudioStart}
              />
            </div>
          </div>

          {/* Slot 2 */}
          <div className="w-full">
            <h3
              className={`mb-4 text-xl font-semibold w-full ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
              style={{ textAlign: 'center' }}
            >
              Beginner (20 wpm)
            </h3>
            <div
              style={{ minHeight: '220px' }}
              className="w-full carousel-slot"
            >
              <CarouselWrapper
                items={audio20Wpm.map((c) => ({
                  id: c.id,
                  title: c.title,
                  description: c.description,
                  image: undefined,
                  audioSrc: c.audioSrc,
                  duration: c.duration,
                }))}
                isDarkMode={isDarkMode}
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                onItemClick={(_id, audioSrc) => audioSrc && handleCardClick(audioSrc)}
                onAudioEnded={handleAudioEnded}
                currentAudioId={currentAudioId}
                onAudioStart={handleAudioStart}
              />
            </div>
          </div>

          {/* Slot 3 */}
          <div className="w-full">
            <h3
              className={`mb-4 text-xl font-semibold w-full ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
              style={{ textAlign: 'center' }}
            >
              Intermediate (40 wpm)
            </h3>
            <div
              style={{ minHeight: '220px' }}
              className="w-full carousel-slot"
            >
              <CarouselWrapper
                items={audio40Wpm.map((c) => ({
                  id: c.id,
                  title: c.title,
                  description: c.description,
                  image: undefined,
                  audioSrc: c.audioSrc,
                  duration: c.duration,
                }))}
                isDarkMode={isDarkMode}
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                onItemClick={(_id, audioSrc) => audioSrc && handleCardClick(audioSrc)}
                onAudioEnded={handleAudioEnded}
                currentAudioId={currentAudioId}
                onAudioStart={handleAudioStart}
              />
            </div>
          </div>

          {/* Slot 4 */}
          <div className="w-full">
            <h3
              className={`mb-4 text-xl font-semibold w-full ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
              style={{ textAlign: 'center' }}
            >
              Advanced/intermediate (50 wpm)
            </h3>
            <div
              style={{ minHeight: '220px' }}
              className="w-full carousel-slot"
            >
              <CarouselWrapper
                items={audio50Wpm.map((c) => ({
                  id: c.id,
                  title: c.title,
                  description: c.description,
                  image: undefined,
                  audioSrc: c.audioSrc,
                  duration: c.duration,
                }))}
                isDarkMode={isDarkMode}
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                onItemClick={(_id, audioSrc) => audioSrc && handleCardClick(audioSrc)}
                onAudioEnded={handleAudioEnded}
                currentAudioId={currentAudioId}
                onAudioStart={handleAudioStart}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Centered main content */}
      <div
        className="flex-1 flex flex-col"
        style={{ marginTop: '4rem', alignItems: 'center' }}
      >
        {/* Results Display - Inline above TextBox */}
        {showResults && (
          <div
            className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 transition-colors duration-300 relative ${
              isDarkMode
                ? 'bg-gray-800/95 border border-gray-700/50'
                : 'bg-white/95 border border-white/20'
            }`}
            style={{ width: '60vw', maxWidth: '1200px' }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseResults}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 z-10 ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Typing Results
              </h1>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Words Per Minute
                </div>
                <div className="text-4xl font-bold text-blue-600">
                  {metrics.wpm}
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Accuracy
                </div>
                <div
                  className={`text-4xl font-bold ${
                    metrics.accuracy >= 95
                      ? 'text-green-600'
                      : metrics.accuracy >= 85
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {metrics.accuracy}%
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Words Typed
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  {metrics.wordsTyped}
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Time Elapsed
                </div>
                <div className="text-4xl font-bold text-orange-600">
                  {Math.floor(metrics.timeElapsed / 60)}:
                  {(metrics.timeElapsed % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Errors
                </div>
                <div className="text-4xl font-bold text-red-600">
                  {metrics.errorsCount}
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Completion
                </div>
                <div className="text-4xl font-bold text-indigo-600">
                  {(() => {
                    const normalizeWord = (word: string) =>
                      word.toLowerCase().replace(/[^\w]/g, '')
                    const userWords = userTypedText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                    const targetWords = currentTargetText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                    return Math.round((userWords.length / targetWords.length) * 100)
                  })()}%
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div
              className={`rounded-2xl p-6 mb-6 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                Comparison
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  >
                    Words in Correct Position:
                  </span>
                  <span className="font-bold text-green-600">
                    {(() => {
                      const normalizeWord = (word: string) =>
                        word.toLowerCase().replace(/[^\w]/g, '')
                      const userWords = userTypedText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                      const targetWords = currentTargetText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                      const minLength = Math.min(userWords.length, targetWords.length)
                      let correctWordsAtPosition = 0
                      for (let i = 0; i < minLength; i++) {
                        if (userWords[i] === targetWords[i]) {
                          correctWordsAtPosition++
                        }
                      }
                      return `${correctWordsAtPosition} / ${targetWords.length}`
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  >
                    Valid Words Typed:
                  </span>
                  <span className="font-bold text-blue-600">
                    {(() => {
                      const normalizeWord = (word: string) =>
                        word.toLowerCase().replace(/[^\w]/g, '')
                      const userWords = userTypedText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                      const targetWords = currentTargetText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
                      let wordsFoundInTarget = 0
                      for (const userWord of userWords) {
                        if (targetWords.includes(userWord)) {
                          wordsFoundInTarget++
                        }
                      }
                      const wordAccuracyPercent = userWords.length > 0
                        ? Math.round((wordsFoundInTarget / userWords.length) * 100)
                        : 100
                      return `${wordsFoundInTarget} / ${metrics.wordsTyped} (${wordAccuracyPercent}%)`
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  >
                    Characters Typed:
                  </span>
                  <span className="font-bold text-purple-600">
                    {metrics.charactersTyped}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleCloseResults}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Close Results
              </button>
            </div>
          </div>
        )}

        {/* Practice Text Box - hidden until a card is clicked */}
        {showTextBox && (
          <div
            className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
            style={{ width: '60vw', maxWidth: '1200px' }}
          >
            <TextBox
              placeholder="Start typing what you hear"
              targetText={currentTargetText}
              isDarkMode={isDarkMode}
              autoFocus={true}
              onMetricsChange={setMetrics}
              onTextChange={handleTextChange}
              value={userTypedText}
              stopped={audioStopped}
              className="w-full"
            />
          </div>
        )}

        {/* Metrics Display - Outside TextBox (centered to match TextBox width) */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-colors duration-300 text-center ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
          style={{ width: '60vw', margin: '0 auto', maxWidth: '1200px' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {metrics.wpm}
              </div>
              <div
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                WPM
              </div>
            </div>

            <div className="metric-item text-center">
              <div
                className={`text-2xl font-bold mb-1 ${
                  metrics.accuracy >= 95
                    ? 'text-green-600'
                    : metrics.accuracy >= 85
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {metrics.accuracy}%
              </div>
              <div
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Accuracy
              </div>
            </div>

            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {metrics.charactersTyped}
              </div>
              <div
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Characters
              </div>
            </div>

            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {Math.floor(metrics.timeElapsed / 60)}:
                {(metrics.timeElapsed % 60).toString().padStart(2, '0')}
              </div>
              <div
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Time
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default HomePage
