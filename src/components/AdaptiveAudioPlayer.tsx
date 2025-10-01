import React, { useRef, useState, useCallback } from 'react'
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'

interface AdaptiveAudioPlayerProps {
  audioSrc: string
  transcription: string
  onTypingSpeedChange?: (wpm: number) => void
  targetWPM?: number
}

interface TypingStats {
  wordsTyped: number
  startTime: number
  lastUpdateTime: number
  currentWPM: number
}

export const AdaptiveAudioPlayer: React.FC<AdaptiveAudioPlayerProps> = ({
  audioSrc,
  transcription,
  onTypingSpeedChange,
  targetWPM = 148.8,
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
      const words = text.trim().split(/\s+/).filter((word) => word.length > 0)
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
        wordsTyped: newText.trim().split(/\s+/).filter((word) => word.length > 0).length,
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
    <div className="adaptive-audio-player">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border-0 overflow-hidden">
        <div className="p-8">
          <div className="audio-controls mb-8">
            <audio
              ref={audioRef}
              src={audioSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="hidden"
            />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6" />
                  ) : (
                    <PlayIcon className="h-6 w-6" />
                  )}
                  <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
                </button>

                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <ClockIcon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SpeakerWaveIcon className="h-6 w-6 text-purple-600" />
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg">
                  {playbackRate.toFixed(2)}x Speed
                </div>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Audio Progress</span>
                <span className="text-sm text-gray-500">
                  {Math.round(duration > 0 ? (currentTime / duration) * 100 : 0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="stats-panel mb-8">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-100 rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800">Live Performance Stats</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {Math.round(typingStats.currentWPM)}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Words Per Minute</div>
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
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {calculateAccuracy()}%
                    </div>
                    <div className="text-sm font-medium text-gray-600">Accuracy</div>
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
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {typingStats.wordsTyped}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Words Typed</div>
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

          <div className="typing-area">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Type What You Hear</h3>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 rounded-full p-2 mt-1">
                  <svg
                    className="h-4 w-4 text-white"
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
                  <div className="font-semibold text-blue-800 mb-1">Reference Text:</div>
                  <div className="text-blue-700 text-sm leading-relaxed">
                    {transcription.split(' ').slice(0, 25).join(' ')}...
                  </div>
                </div>
              </div>
            </div>

            <textarea
              value={typedText}
              onChange={handleTextChange}
              placeholder="🎧 Press play and start typing what you hear..."
              className="w-full min-h-[180px] p-6 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 resize-none text-lg leading-relaxed transition-all duration-200 bg-white/80 backdrop-blur-sm"
              disabled={!isPlaying}
            />

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 rounded-full p-2 mt-1">
                  <svg
                    className="h-4 w-4 text-white"
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
                  <div className="font-semibold text-amber-800 mb-1">💡 Smart Adaptation Active</div>
                  <div className="text-amber-700 text-sm">
                    The audio speed automatically adjusts to match your typing pace. Type faster to
                    speed up the audio, or slower to give yourself more time!
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

export default AdaptiveAudioPlayer
