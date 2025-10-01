import React, { useRef, useState, useCallback } from 'react'
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'

interface AdaptiveTypingProps {
  audioSrc: string
  transcription: string
  onTypingSpeedChange?: (wpm: number) => void
  targetWPM?: number
  isDarkMode?: boolean
}

interface TypingStats {
  wordsTyped: number
  startTime: number
  lastUpdateTime: number
  currentWPM: number
}

export const AdaptiveTyping: React.FC<AdaptiveTypingProps> = ({
  audioSrc,
  transcription,
  onTypingSpeedChange,
  targetWPM = 148.8,
  isDarkMode = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [typingStats, setTypingStats] = useState<TypingStats>({
    wordsTyped: 0,
    startTime: Date.now(),
    lastUpdateTime: Date.now(),
    currentWPM: 0,
  })

  const calculateTypingSpeed = useCallback(
    (text: string, startTime: number): number => {
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0)
      const timeElapsed = (Date.now() - startTime) / 60000
      if (timeElapsed < 0.1) return 0
      return words.length / timeElapsed
    },
    []
  )

  const adjustAudioSpeed = useCallback(
    (userWPM: number) => {
      if (!audioRef.current) return
      const speedRatio = userWPM / targetWPM
      let newRate = Math.max(0.25, Math.min(2.0, speedRatio))
      const currentRate = audioRef.current.playbackRate
      const rateDifference = Math.abs(newRate - currentRate)

      if (rateDifference > 0.1) {
        const adjustmentStep = rateDifference > 0.3 ? 0.1 : 0.05
        newRate =
          newRate > currentRate
            ? Math.min(newRate, currentRate + adjustmentStep)
            : Math.max(newRate, currentRate - adjustmentStep)
        audioRef.current.playbackRate = newRate
        setPlaybackRate(newRate)
      }
    },
    [targetWPM]
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value
      setTypedText(newText)
      const currentWPM = calculateTypingSpeed(newText, typingStats.startTime)
      const newStats = {
        ...typingStats,
        wordsTyped: newText
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
        lastUpdateTime: Date.now(),
        currentWPM,
      }
      setTypingStats(newStats)
      if (newStats.wordsTyped > 5) {
        adjustAudioSpeed(currentWPM)
      }
      onTypingSpeedChange?.(currentWPM)
    },
    [typingStats, calculateTypingSpeed, adjustAudioSpeed, onTypingSpeedChange]
  )

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      setTypingStats({
        wordsTyped: 0,
        startTime: Date.now(),
        lastUpdateTime: Date.now(),
        currentWPM: 0,
      })
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const calculateAccuracy = (): number => {
    if (!typedText.trim()) return 100
    const typedWords = typedText.trim().toLowerCase().split(/\s+/)
    const targetWords = transcription.trim().toLowerCase().split(/\s+/)
    let correct = 0
    const minLength = Math.min(typedWords.length, targetWords.length)
    for (let i = 0; i < minLength; i++) {
      if (typedWords[i] === targetWords[i]) {
        correct++
      }
    }
    return minLength > 0 ? Math.round((correct / minLength) * 100) : 100
  }

  return (
    <div
      className={`AdaptiveTyping w-full max-w-4xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="w-full text-center">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <div className="text-base" style={{ fontSize: '16px' }}>
              🎧
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adaptive Audio Typing
            </h1>
          </div>
          <p
            className={`text-lg mb-1 font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Revolutionary typing practice that adapts to your speed!
          </p>
          <p
            className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            The audio automatically adjusts its playback speed based on how fast
            you type
          </p>
        </div>

        {/* Current Speed Indicator */}
        <div
          className={`backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.round(typingStats.currentWPM)}
              </div>
              <div
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Your Current WPM
              </div>
              <div
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {typingStats.currentWPM === 0
                  ? 'Start typing!'
                  : typingStats.currentWPM < 60
                  ? 'Getting started'
                  : typingStats.currentWPM < 100
                  ? 'Good pace'
                  : typingStats.currentWPM < 140
                  ? 'Excellent!'
                  : 'Amazing!'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">149</div>
              <div
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Original Audio WPM
              </div>
              <div
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Target speed
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl mb-1">
                {typingStats.currentWPM < 60 ? (
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>🐢</span>
                ) : typingStats.currentWPM < 100 ? (
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>🚶</span>
                ) : typingStats.currentWPM < 140 ? (
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>🏃</span>
                ) : typingStats.currentWPM < 180 ? (
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>🚀</span>
                ) : (
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>⚡</span>
                )}
              </div>
              <div
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Speed Level
              </div>
              <div
                className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {typingStats.currentWPM < 60
                  ? 'Beginner'
                  : typingStats.currentWPM < 100
                  ? 'Intermediate'
                  : typingStats.currentWPM < 140
                  ? 'Advanced'
                  : typingStats.currentWPM < 180
                  ? 'Expert'
                  : 'Master'}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        <div
          className={`bg-gradient-to-br ${
            isDarkMode ? 'from-gray-800 to-gray-900' : 'from-white to-blue-50'
          } rounded-xl shadow-lg border-0 overflow-hidden mb-6`}
        >
          <div className="p-4">
            <div className="audio-controls mb-4">
              <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="hidden"
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={isPlaying ? handlePause : handlePlay}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
                  >
                    {isPlaying ? (
                      <PauseIcon
                        className="h-4 w-4"
                        style={{ width: '24px', height: '24px' }}
                      />
                    ) : (
                      <PlayIcon
                        className="h-4 w-4"
                        style={{ width: '24px', height: '24px' }}
                      />
                    )}
                    <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
                  </button>

                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-md px-3 py-1 shadow-sm">
                    <ClockIcon
                      className="h-4 w-4 text-blue-600"
                      style={{ width: '24px', height: '24px' }}
                    />
                    <span className="font-medium text-gray-700 text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <SpeakerWaveIcon
                    className="h-4 w-4 text-purple-600"
                    style={{ width: '24px', height: '24px' }}
                  />
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-3 py-1 rounded-md text-sm">
                    {playbackRate.toFixed(2)}x Speed
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">
                    Audio Progress
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="stats-panel mb-4">
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-100 rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ChartBarIcon
                      className="h-4 w-4 text-blue-600"
                      style={{ width: '24px', height: '24px' }}
                    />
                    <h3 className="text-sm font-bold text-gray-800">
                      Live Performance Stats
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {Math.round(typingStats.currentWPM)}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Words Per Minute
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {typingStats.currentWPM < 60
                          ? '🐢 Beginner'
                          : typingStats.currentWPM < 100
                          ? '🚶 Intermediate'
                          : typingStats.currentWPM < 140
                          ? '🏃 Advanced'
                          : '🚀 Expert'}
                      </div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {calculateAccuracy()}%
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Accuracy
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {calculateAccuracy() >= 95
                          ? '🎯 Excellent'
                          : calculateAccuracy() >= 85
                          ? '👍 Good'
                          : calculateAccuracy() >= 75
                          ? '📈 Improving'
                          : '💪 Keep Going'}
                      </div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {typingStats.wordsTyped}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Words Typed
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {typingStats.wordsTyped < 10
                          ? '🌱 Getting Started'
                          : typingStats.wordsTyped < 50
                          ? '📝 Making Progress'
                          : typingStats.wordsTyped < 100
                          ? '🔥 On Fire'
                          : '🏆 Champion'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="typing-area text-left">
              <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
                Type What You Hear
              </h3>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2 text-left">
                  <div className="bg-blue-500 rounded-full p-1 mt-1">
                    <svg
                      className="h-3 w-3 text-white"
                      style={{ width: '12px', height: '12px' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800 mb-1 text-sm">
                      Reference Text:
                    </div>
                    <div className="text-blue-700 text-xs leading-relaxed">
                      {transcription.split(' ').slice(0, 25).join(' ')}...
                    </div>
                  </div>
                </div>
              </div>

              <textarea
                value={typedText}
                onChange={handleTextChange}
                placeholder="🎧 Press play and start typing what you hear..."
                className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none text-sm leading-relaxed transition-all duration-200 bg-white/80 backdrop-blur-sm"
                disabled={!isPlaying}
              />

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 mt-3">
                <div className="flex items-start gap-2">
                  <div className="bg-amber-500 rounded-full p-1 mt-1">
                    <svg
                      className="h-3 w-3 text-white"
                      style={{ width: '12px', height: '12px' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-amber-800 mb-1 text-sm">
                      💡 Smart Adaptation Active
                    </div>
                    <div className="text-amber-700 text-xs">
                      The audio speed automatically adjusts to match your typing
                      pace. Type faster to speed up the audio, or slower to give
                      yourself more time!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div
          className={`mt-6 backdrop-blur-sm rounded-xl shadow-lg p-4 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h2
            className={`text-lg font-bold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            <span className="text-xl">🎯</span>
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div
              className={`rounded-lg p-3 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100'
              }`}
            >
              <h3
                className={`font-semibold mb-2 flex items-center gap-1 text-sm ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-800'
                }`}
              >
                <span className="text-sm">🎯</span>
                Adaptive Speed Technology
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-700'
                }`}
              >
                Our advanced algorithm monitors your typing speed in real-time
                and automatically adjusts the audio playback rate. Type slower
                and the audio slows down. Type faster and it speeds up to match
                your pace!
              </p>
            </div>
            <div
              className={`rounded-lg p-3 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-green-900/30 to-green-800/30'
                  : 'bg-gradient-to-br from-green-50 to-green-100'
              }`}
            >
              <h3
                className={`font-semibold mb-2 flex items-center gap-1 text-sm ${
                  isDarkMode ? 'text-green-300' : 'text-green-800'
                }`}
              >
                <span className="text-sm">📊</span>
                Real-time Analytics
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-green-200' : 'text-green-700'
                }`}
              >
                Watch your words per minute, accuracy percentage, and word count
                update instantly as you type. Get immediate feedback on your
                performance and track your improvement over time.
              </p>
            </div>
            <div
              className={`rounded-lg p-3 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30'
                  : 'bg-gradient-to-br from-purple-50 to-purple-100'
              }`}
            >
              <h3
                className={`font-semibold mb-2 flex items-center gap-1 text-sm ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-800'
                }`}
              >
                <span className="text-sm">🎧</span>
                Smart Audio Processing
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-purple-200' : 'text-purple-700'
                }`}
              >
                Uses cutting-edge Web Audio API technology to smoothly adjust
                playback speed without changing pitch. The speech remains
                natural and clear at any speed from 0.25x to 2.0x.
              </p>
            </div>
            <div
              className={`rounded-lg p-3 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30'
                  : 'bg-gradient-to-br from-orange-50 to-orange-100'
              }`}
            >
              <h3
                className={`font-semibold mb-2 flex items-center gap-1 text-sm ${
                  isDarkMode ? 'text-orange-300' : 'text-orange-800'
                }`}
              >
                <span className="text-sm">🎓</span>
                Perfect for All Levels
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-orange-200' : 'text-orange-700'
                }`}
              >
                Whether you're a beginner learning to type or an expert looking
                to improve, the system adapts to your skill level. Start slow
                and gradually build up speed at your own comfortable pace.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div
          className={`mt-4 border rounded-xl p-4 shadow-md transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-amber-700/50'
              : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
          }`}
        >
          <h3
            className={`font-semibold mb-3 flex items-center gap-2 text-sm ${
              isDarkMode ? 'text-amber-300' : 'text-amber-800'
            }`}
          >
            <span className="text-base" style={{ fontSize: '16px' }}>
              💡
            </span>
            Pro Tips for Best Results
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <ul
              className={`space-y-1 ${
                isDarkMode ? 'text-amber-200' : 'text-amber-700'
              }`}
            >
              <li className="flex items-start gap-2 text-xs">
                <span className="text-green-600 font-bold">✓</span>
                Start typing immediately when you press play for accurate speed
                detection
              </li>
              <li className="flex items-start gap-2 text-xs">
                <span className="text-green-600 font-bold">✓</span>
                Type at least 5 words before the system begins speed adjustments
              </li>
            </ul>
            <ul
              className={`space-y-1 ${
                isDarkMode ? 'text-amber-200' : 'text-amber-700'
              }`}
            >
              <li className="flex items-start gap-2 text-xs">
                <span className="text-green-600 font-bold">✓</span>
                Focus on accuracy first - speed will naturally improve over time
              </li>
              <li className="flex items-start gap-2 text-xs">
                <span className="text-green-600 font-bold">✓</span>
                Audio adjusts gradually to prevent jarring speed changes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveTyping
