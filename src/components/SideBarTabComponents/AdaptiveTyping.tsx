import React, { useRef, useState, useCallback } from 'react'
import {
  PlayIcon,
  PauseIcon,
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
  // Adaptive audio WPM = original target WPM scaled by current playback rate
  const adaptiveAudioWPM = Math.round(targetWPM * playbackRate)
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

  const handleTextChange = useCallback((text: string) => {
    setTypedText(text)
  }, [])

  const handleMetricsChange = useCallback((metrics: any) => {
    setTypingStats(prev => ({
      wordsTyped: metrics.wordsTyped,
      startTime: prev.startTime,
      lastUpdateTime: Date.now(),
      currentWPM: metrics.wpm,
    }))
    // Adjust audio speed based on typing metrics
    if (metrics.wordsTyped > 5) {
      adjustAudioSpeed(metrics.wpm)
    }
  }, [adjustAudioSpeed])

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
              Adaptive Audio Typing
          </h1>
        </div>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
          </div>
        </div>

        {/* Play Audio Button - Positioned just below title */}
        <div className="flex justify-center mb-6">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-base"
          >
            {isPlaying ? (
              <PauseIcon
                className="h-5 w-5"
                style={{ width: '24px', height: '24px' }}
              />
            ) : (
              <PlayIcon
                className="h-5 w-5"
                style={{ width: '24px', height: '24px' }}
              />
            )}
            <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
          </button>
        </div>

        {/* TextBox Component */}
        <div className="typing-area text-left mb-6">
          <TextBox
            placeholder={
              isPlaying
                ? '🎧 Type what you hear from the audio...'
                : '🎧 Press play and start typing what you hear...'
            }
            targetText={transcription}
            onTextChange={handleTextChange}
            onMetricsChange={handleMetricsChange}
            isDarkMode={isDarkMode}
            disabled={!isPlaying}
            className="mb-4"
          />
        </div>

        {/* Comprehensive Stats Table */}
        <div
          className={`backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h3 className={`text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            Adaptive Typing Performance
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <th className={`text-left py-3 px-4 font-semibold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Metric
                  </th>
                  <th className={`text-center py-3 px-4 font-semibold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                } hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Your Typing Speed
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {Math.round(typingStats.currentWPM)}
                    </span>
                    <span className={`ml-2 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>WPM</span>
                  </td>
                </tr>
                <tr className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                } hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Audio Speed
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-green-600">
                      {Math.round(targetWPM * playbackRate)}
                    </span>
                    <span className={`ml-2 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>WPM</span>
                  </td>
                </tr>
                <tr className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                } hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Accuracy
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-purple-600">
                      {calculateAccuracy()}
                    </span>
                    <span className={`ml-1 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>%</span>
                  </td>
                </tr>
                <tr className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                } hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Words Typed
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-orange-600">
                      {typingStats.wordsTyped}
                    </span>
                  </td>
                </tr>
                <tr className={`border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                } hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Playback Rate
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-pink-600">
                      {playbackRate.toFixed(2)}
                    </span>
                    <span className={`ml-1 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>x</span>
                  </td>
                </tr>
                <tr className={`hover:${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'} transition-colors`}>
                  <td className={`py-4 px-4 font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Audio Progress
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-3xl font-bold text-indigo-600">
                      {Math.round(duration > 0 ? (currentTime / duration) * 100 : 0)}
                    </span>
                    <span className={`ml-1 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Audio Player Section - Moved below TextBox */}
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
                  <div className={`flex items-center gap-2 backdrop-blur-sm rounded-md px-3 py-1 shadow-sm ${
                    isDarkMode ? 'bg-gray-700/80' : 'bg-white/80'
                  }`}>
                    <span className={`font-medium text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-3 py-1 rounded-md text-sm">
                    {playbackRate.toFixed(2)}x Speed ({Math.round(targetWPM * playbackRate)} WPM)
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Audio Progress
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
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
              <div className={`border rounded-xl overflow-hidden ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 border-gray-600'
                  : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-100'
              }`}>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`text-center backdrop-blur-sm rounded-lg p-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'
                    }`}>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {Math.round(typingStats.currentWPM)}
                      </div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Words Per Minute
                      </div>
                    </div>
                    <div className={`text-center backdrop-blur-sm rounded-lg p-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'
                    }`}>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {calculateAccuracy()}%
                      </div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Accuracy
                      </div>
                    </div>
                    <div className={`text-center backdrop-blur-sm rounded-lg p-3 shadow-sm ${
                      isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'
                    }`}>
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {typingStats.wordsTyped}
                      </div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Words Typed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveTyping

