import React from 'react'

interface HomePageProps {
  onNavigateToDemo: () => void
  isDarkMode?: boolean
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDemo, isDarkMode = false }) => {
  return (
    <div className={`py-8 pr-8 transition-colors duration-300 ${
      isDarkMode ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-4 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-2xl mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}>
            <div className="text-5xl">⚡</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TempoType
            </h1>
          </div>
          <p className={`text-xl font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The future of adaptive typing practice
          </p>
        </div>

        {/* Main Feature Card */}
        <div className={`backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90 border border-gray-700/50'
            : 'bg-white/80 border border-white/20'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎧 Adaptive Audio Typing
            </h2>
            <p className={`text-lg mb-6 max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Revolutionary typing practice that adapts to your speed! Our
              AI-powered system automatically adjusts audio playback speed based
              on how fast you type, creating the perfect personalized learning
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50'
                : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
            }`}>
              <div className="text-2xl mb-3">🎯</div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Adaptive Speed</h3>
              <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Audio automatically matches your typing pace for optimal
                learning
              </p>
            </div>
            <div className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50'
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="text-2xl mb-3">📊</div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                Real-time Analytics
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                Live WPM, accuracy tracking, and performance insights
              </p>
            </div>
            <div className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50'
                : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
            }`}>
              <div className="text-2xl mb-3">🎧</div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Smart Audio</h3>
              <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                Crystal clear speech at any speed from 0.25x to 2.0x
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={onNavigateToDemo}
            >
              🚀 Try Adaptive Typing Now
            </button>
            <p className={`text-sm mt-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No signup required • Works in any browser • Free to use
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90 border border-gray-700/50'
            : 'bg-white/80 border border-white/20'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="text-2xl">⚙️</span>
            How It Works
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/50'
                  : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
              }`}>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  1
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    Start Audio & Begin Typing
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                    Press play and start typing along with the audio narration
                  </p>
                </div>
              </div>
              <div className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-700/50'
                  : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
              }`}>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  2
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                    Real-time Speed Analysis
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                    Our AI calculates your typing speed and accuracy in
                    real-time
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-700/50'
                  : 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200'
              }`}>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  3
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                    Automatic Speed Adjustment
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                    Audio playback speed automatically adjusts to match your
                    pace
                  </p>
                </div>
              </div>
              <div className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-700/50'
                  : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
              }`}>
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  4
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                    Personalized Learning
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                    Practice at your optimal speed and gradually improve over
                    time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage