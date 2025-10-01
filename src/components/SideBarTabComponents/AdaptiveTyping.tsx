import React, { useRef, useState, useCallback } from 'react'
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import TextBox from '../TextBox'

interface AdaptiveTypingProps {
  audioSrc: string
  transcription: string
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
      className={`AdaptiveTyping sidebar-tab-content adaptive-typing-content transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="center-content">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TempoType
          </h1>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adaptive Audio Typing
            </h2>
          </div>
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
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {Math.round(typingStats.currentWPM)}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Words Per Minute
                      </div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {calculateAccuracy()}%
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Accuracy
                      </div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {typingStats.wordsTyped}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        Words Typed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="typing-area text-left">
              <TextBox
                placeholder={
                  isPlaying
                    ? '🎧 Type what you hear from the audio...'
                    : '🎧 Press play and start typing what you hear...'
                }
                targetText={transcription}
                onTextChange={(text) => {
                  setTypedText(text)
                }}
                onMetricsChange={(metrics) => {
                  // Update typing stats with metrics from TextBox
                  setTypingStats({
                    wordsTyped: metrics.wordsTyped,
                    startTime: typingStats.startTime,
                    lastUpdateTime: Date.now(),
                    currentWPM: metrics.wpm,
                  })
                  // Adjust audio speed based on typing metrics
                  if (metrics.wordsTyped > 5) {
                    adjustAudioSpeed(metrics.wpm)
                  }
                }}
                isDarkMode={isDarkMode}
                disabled={!isPlaying}
                className="mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveTyping
