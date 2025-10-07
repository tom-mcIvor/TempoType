import React, { useState, useEffect } from 'react'
import TextBox from '../TextBox'
import CarouselWrapper from '../carousel/CarouselWrapper'
import { audio120Wpm } from '../../data/audio120Wpm'

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

  // Files read from the server-side audio-source-files directory (dev/demo)
  type SourceFile = { filename: string; url: string }
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/audio/source-files')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return
        setSourceFiles(Array.isArray(data.files) ? data.files : [])
      })
      .catch(() => {
        if (!mounted) return
        setSourceFiles([])
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
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
            <div className="mb-4 text-left">
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                Advanced (120 wpm)
              </h3>
            </div>
            <div
              style={{ aspectRatio: '1 / 1', minHeight: '220px' }}
              className="w-full h-full carousel-slot"
            >
              <div className="w-full h-full">
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
                  onItemClick={() => setShowTextBox(true)}
                />
              </div>
            </div>
          </div>

          {/* Slot 2 */}
          <div>
            <div className="mb-4 text-left">
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                Beginner (20 wpm)
              </h3>
            </div>
            <div
              style={{ aspectRatio: '1 / 1', minHeight: '220px' }}
              className={`backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex items-center justify-center transition-colors duration-300 carousel-slot ${
                isDarkMode
                  ? 'bg-gray-800/90 border border-gray-700/50'
                  : 'bg-white/80 border border-white/20'
              }`}
            >
              <div className="w-full h-full">
                <CarouselWrapper
                  items={sourceFiles.map((f: SourceFile) => ({
                    id: f.filename,
                    title: f.filename,
                    description: undefined,
                    image: undefined,
                    audioSrc: f.url,
                    duration: 'Unknown',
                  }))}
                  isDarkMode={isDarkMode}
                  autoPlay={false}
                  navButtonsAlwaysVisible={true}
                  onItemClick={() => setShowTextBox(true)}
                />
              </div>
            </div>
          </div>

          {/* Slot 3 */}
          <div>
            <div className="mb-4 text-left">
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                Intermediate (40 wpm)
              </h3>
            </div>
            <div
              style={{ aspectRatio: '1 / 1', minHeight: '220px' }}
              className={`backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex items-center justify-center transition-colors duration-300 carousel-slot ${
                isDarkMode
                  ? 'bg-gray-800/90 border border-gray-700/50'
                  : 'bg-white/80 border border-white/20'
              }`}
            >
              <div className="w-full h-full">
                <CarouselWrapper
                  items={sourceFiles.map((f: SourceFile) => ({
                    id: f.filename,
                    title: f.filename,
                    description: undefined,
                    image: undefined,
                    audioSrc: f.url,
                    duration: 'Unknown',
                  }))}
                  isDarkMode={isDarkMode}
                  autoPlay={false}
                  navButtonsAlwaysVisible={true}
                  onItemClick={() => setShowTextBox(true)}
                />
              </div>
            </div>
          </div>

          {/* Slot 4 */}
          <div>
            <div className="mb-4 text-left">
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                Advanced/intermediate (50 wpm)
              </h3>
            </div>
            <div
              style={{ aspectRatio: '1 / 1', minHeight: '220px' }}
              className={`backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex items-center justify-center transition-colors duration-300 carousel-slot ${
                isDarkMode
                  ? 'bg-gray-800/90 border border-gray-700/50'
                  : 'bg-white/80 border border-white/20'
              }`}
            >
              <div className="w-full h-full">
                <CarouselWrapper
                  items={sourceFiles.map((f: SourceFile) => ({
                    id: f.filename,
                    title: f.filename,
                    description: undefined,
                    image: undefined,
                    audioSrc: f.url,
                    duration: 'Unknown',
                  }))}
                  isDarkMode={isDarkMode}
                  autoPlay={false}
                  navButtonsAlwaysVisible={true}
                  onItemClick={() => setShowTextBox(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered main content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Practice Text Box - hidden until a card is clicked */}
        {showTextBox && (
          <div
            className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 transition-colors duration-300 max-w-4xl mx-auto ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
            style={{ width: '60vw', margin: '0 auto', maxWidth: '1200px' }}
          >
            <TextBox
              placeholder="Start typing what you hear"
              targetText="The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for typing practice."
              isDarkMode={isDarkMode}
              autoFocus={true}
              onMetricsChange={setMetrics}
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
  )
}

export default HomePage
