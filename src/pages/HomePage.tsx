import React from 'react'

interface HomePageProps {
  onNavigateToDemo: () => void
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDemo }) => {
  return (
    <div className="py-8 pr-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-2xl mb-6 border border-white/20">
            <div className="text-5xl">⚡</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TempoType
            </h1>
          </div>
          <p className="text-xl text-gray-700 font-medium">
            The future of adaptive typing practice
          </p>
        </div>

        {/* Main Feature Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎧 Adaptive Audio Typing
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Revolutionary typing practice that adapts to your speed! Our
              AI-powered system automatically adjusts audio playback speed based
              on how fast you type, creating the perfect personalized learning
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-blue-800 mb-2">Adaptive Speed</h3>
              <p className="text-sm text-blue-700">
                Audio automatically matches your typing pace for optimal
                learning
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-green-800 mb-2">
                Real-time Analytics
              </h3>
              <p className="text-sm text-green-700">
                Live WPM, accuracy tracking, and performance insights
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-3">🎧</div>
              <h3 className="font-bold text-purple-800 mb-2">Smart Audio</h3>
              <p className="text-sm text-purple-700">
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
            <p className="text-sm text-gray-600 mt-3">
              No signup required • Works in any browser • Free to use
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center gap-3">
            <span className="text-3xl">⚙️</span>
            How It Works
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Start Audio & Begin Typing
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Press play and start typing along with the audio narration
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">
                    Real-time Speed Analysis
                  </h4>
                  <p className="text-green-700 text-sm">
                    Our AI calculates your typing speed and accuracy in
                    real-time
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-1">
                    Automatic Speed Adjustment
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Audio playback speed automatically adjusts to match your
                    pace
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-1">
                    Personalized Learning
                  </h4>
                  <p className="text-orange-700 text-sm">
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