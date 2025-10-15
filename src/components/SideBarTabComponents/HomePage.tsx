import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TextBox from '../TextBox'
import CarouselWrapper from './carousel/CardCarousel'
import { audio120Wpm } from '../../data/audio120Wpm'
import { audio20Wpm } from '../../data/audio20Wpm'
import { audio40Wpm } from '../../data/audio40Wpm'
import { audio50Wpm } from '../../data/audio50Wpm'
import audioService from '../../services/api/audioService'
import ResultsPopUp from './ResultsPopUp'

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
  const [showResultsPopup, setShowResultsPopup] = useState(false)
  const [userTypedText, setUserTypedText] = useState('')
  const [currentTargetText, setCurrentTargetText] = useState('')
  const [audioStopped, setAudioStopped] = useState(false)
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null)

  const handleAudioEnded = () => {
    setAudioStopped(true)
    setShowResultsPopup(true)
  }

  const handleAudioStart = (audioId: string) => {
    setCurrentAudioId(audioId)
  }

  const handleCloseResults = () => {
    setShowResultsPopup(false)
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

  // Function to get current audio details
  const getCurrentAudioDetails = () => {
    if (!currentAudioId) return null
    
    // Search through all audio arrays to find the current audio
    const allAudios = [...audio120Wpm, ...audio20Wpm, ...audio40Wpm, ...audio50Wpm]
    return allAudios.find(audio => audio.id === currentAudioId) || null
  }

  return (
    <>
      <div
        className={`HomePage sidebar-tab-content homepage-content transition-colors duration-300 relative ${
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
            <h1
              className={`text-5xl font-bold ${
                isDarkMode
                  ? 'text-white'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
              }`}
            >
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
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.5px',
                }}
              >
                Advanced (120 wpm)
              </Typography>
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
                  onItemClick={(_id, audioSrc) =>
                    audioSrc && handleCardClick(audioSrc)
                  }
                  onAudioEnded={handleAudioEnded}
                  currentAudioId={currentAudioId}
                  onAudioStart={handleAudioStart}
                />
              </div>
            </div>

            {/* Slot 2 */}
            <div className="w-full">
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.5px',
                }}
              >
                Beginner (20 wpm)
              </Typography>
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
                  onItemClick={(_id, audioSrc) =>
                    audioSrc && handleCardClick(audioSrc)
                  }
                  onAudioEnded={handleAudioEnded}
                  currentAudioId={currentAudioId}
                  onAudioStart={handleAudioStart}
                />
              </div>
            </div>

            {/* Slot 3 */}
            <div className="w-full">
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.5px',
                }}
              >
                Intermediate (40 wpm)
              </Typography>
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
                  onItemClick={(_id, audioSrc) =>
                    audioSrc && handleCardClick(audioSrc)
                  }
                  onAudioEnded={handleAudioEnded}
                  currentAudioId={currentAudioId}
                  onAudioStart={handleAudioStart}
                />
              </div>
            </div>

            {/* Slot 4 */}
            <div className="w-full">
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.5px',
                }}
              >
                Advanced/intermediate (50 wpm)
              </Typography>
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
                  onItemClick={(_id, audioSrc) =>
                    audioSrc && handleCardClick(audioSrc)
                  }
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
                currentAudioId={currentAudioId}
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
                <div
                  className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  WPM
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {metrics.wpm}
                </div>
              </div>

              <div className="metric-item text-center">
                <div
                  className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Accuracy
                </div>
                <div
                  className={`text-2xl font-bold ${
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

              <div className="metric-item text-center">
                <div
                  className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Characters
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.charactersTyped}
                </div>
              </div>

              <div className="metric-item text-center">
                <div
                  className={`text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Time
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.floor(metrics.timeElapsed / 60)}:
                  {(metrics.timeElapsed % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Developer Button to trigger ResultsPopUp */}
          <button
            onClick={() => setShowResultsPopup(true)}
            className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            title="Show Results Popup (Developer)"
          >
            Dev: Show Results
          </button>

          {/* ResultsPopUp - conditionally rendered for both dev button and audio end */}
          {showResultsPopup && (
            <ResultsPopUp
              isDarkMode={isDarkMode}
              metrics={metrics}
              userText={userTypedText}
              targetText={currentTargetText}
              audioDetails={getCurrentAudioDetails()}
              onClose={handleCloseResults}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
