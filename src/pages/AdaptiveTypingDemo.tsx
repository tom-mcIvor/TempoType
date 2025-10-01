import React, { useState } from 'react'
import AdaptiveAudioPlayer from '../components/AdaptiveAudioPlayer'

interface AdaptiveTypingDemoProps {
  isDarkMode?: boolean
}

const AdaptiveTypingDemo: React.FC<AdaptiveTypingDemoProps> = ({ isDarkMode = false }) => {
  const [currentWPM, setCurrentWPM] = useState(0)

  // Our transcribed text from the audio file
  const transcription = `Chapter I of the Fate of Phinella
This is a Librevox recording.
All Librevox recordings are in the public domain.
For more information or to volunteer, please visit Librevox.org, recording by Patty Cunningham.
The Fate of Phinella
Chapter I by Helen Mathers
Phinella
Dina Yamind, love Gregory, as we twassat at Dine.
How we change the rings fray our fingers, and I can show thee Dine.
Her hair gloves and shoes were tan-color, and closely allied to tan-two was the tawny
true tiger-tint of her hazel eyes.
After the rest, she was entirely white, saved for her dark lashes and brows.
The faint tint of rose in her small cheeks, and a deeper red in her lips that were parted
just then in a spasm of silent, delighted mirth.
She stood on the top steps of the prospect hotel harrogate, waiting for the coach to come
round, and looking across the hotel gardens to the picturesque stray beyond, upon which
a unique game of cricket was just then going forward to the intense diversion of all beholders.`

  const handleTypingSpeedChange = (wpm: number) => {
    setCurrentWPM(wpm)
  }

  return (
    <div className={`py-8 pr-8 transition-colors duration-300 ${
      isDarkMode ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}>
            <div className="text-3xl">🎧</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adaptive Audio Typing
            </h1>
          </div>
          <p className={`text-xl mb-2 font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Revolutionary typing practice that adapts to your speed!
          </p>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The audio automatically adjusts its playback speed based on how fast you type
          </p>
        </div>

        {/* Current Speed Indicator */}
        <div className={`backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90 border border-gray-700/50'
            : 'bg-white/80 border border-white/20'
        }`}>
          <div className="flex items-center justify-center space-x-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {Math.round(currentWPM)}
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Your Current WPM</div>
              <div className={`text-xs mt-1 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {currentWPM === 0 ? 'Start typing!' :
                 currentWPM < 60 ? 'Getting started' :
                 currentWPM < 100 ? 'Good pace' :
                 currentWPM < 140 ? 'Excellent!' : 'Amazing!'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">149</div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Original Audio WPM</div>
              <div className={`text-xs mt-1 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Target speed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-1">
                {currentWPM < 60 ? '🐢' :
                 currentWPM < 100 ? '🚶' :
                 currentWPM < 140 ? '🏃' :
                 currentWPM < 180 ? '🚀' : '⚡'}
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Speed Level</div>
              <div className={`text-xs mt-1 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {currentWPM < 60 ? 'Beginner' :
                 currentWPM < 100 ? 'Intermediate' :
                 currentWPM < 140 ? 'Advanced' :
                 currentWPM < 180 ? 'Expert' : 'Master'}
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Audio Player */}
        <AdaptiveAudioPlayer
          audioSrc="/fateoffenella_01_various_64kb.mp3"
          transcription={transcription}
          onTypingSpeedChange={handleTypingSpeedChange}
          targetWPM={148.8}
        />

        {/* Instructions */}
        <div className={`mt-8 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90 border border-gray-700/50'
            : 'bg-white/80 border border-white/20'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="text-3xl">🎯</span>
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30'
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                <span className="text-xl">🎯</span>
                Adaptive Speed Technology
              </h3>
              <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Our advanced algorithm monitors your typing speed in real-time and automatically
                adjusts the audio playback rate. Type slower and the audio slows down. Type faster
                and it speeds up to match your pace!
              </p>
            </div>
            <div className={`rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-green-900/30 to-green-800/30'
                : 'bg-gradient-to-br from-green-50 to-green-100'
            }`}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-green-300' : 'text-green-800'
              }`}>
                <span className="text-xl">📊</span>
                Real-time Analytics
              </h3>
              <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                Watch your words per minute, accuracy percentage, and word count update
                instantly as you type. Get immediate feedback on your performance and
                track your improvement over time.
              </p>
            </div>
            <div className={`rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30'
                : 'bg-gradient-to-br from-purple-50 to-purple-100'
            }`}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-purple-300' : 'text-purple-800'
              }`}>
                <span className="text-xl">🎧</span>
                Smart Audio Processing
              </h3>
              <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                Uses cutting-edge Web Audio API technology to smoothly adjust playback
                speed without changing pitch. The speech remains natural and clear at
                any speed from 0.25x to 2.0x.
              </p>
            </div>
            <div className={`rounded-xl p-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30'
                : 'bg-gradient-to-br from-orange-50 to-orange-100'
            }`}>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-orange-300' : 'text-orange-800'
              }`}>
                <span className="text-xl">🎓</span>
                Perfect for All Levels
              </h3>
              <p className={`${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                Whether you're a beginner learning to type or an expert looking to improve,
                the system adapts to your skill level. Start slow and gradually build up
                speed at your own comfortable pace.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className={`mt-6 border rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-amber-700/50'
            : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
        }`}>
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${
            isDarkMode ? 'text-amber-300' : 'text-amber-800'
          }`}>
            <span className="text-2xl">💡</span>
            Pro Tips for Best Results
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className={`space-y-2 ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Start typing immediately when you press play for accurate speed detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Type at least 5 words before the system begins speed adjustments
              </li>
            </ul>
            <ul className={`space-y-2 ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Focus on accuracy first - speed will naturally improve over time
              </li>
              <li className="flex items-start gap-2">
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

export default AdaptiveTypingDemo