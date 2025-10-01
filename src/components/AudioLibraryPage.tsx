import React from 'react'

interface AudioLibraryPageProps {
  isDarkMode?: boolean
}

const AudioLibraryPage: React.FC<AudioLibraryPageProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div
      className={`py-8 pr-8 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎵 Audio Library
          </h1>
          <p
            className={`text-lg mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Browse and manage your audio content for typing practice
          </p>
        </div>

        {/* Coming Soon Card */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-4">🎧</div>
            <h2
              className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-700'
              }`}
            >
              Audio Library Coming Soon!
            </h2>
            <p
              className={`mb-6 max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We're working on an amazing audio library feature that will allow
              you to:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700/50'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                }`}
              >
                <div className="text-2xl mb-3">📚</div>
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}
                >
                  Browse Content
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}
                >
                  Access a vast library of audiobooks, podcasts, and educational
                  content
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700/50'
                    : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                }`}
              >
                <div className="text-2xl mb-3">📤</div>
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? 'text-green-300' : 'text-green-800'
                  }`}
                >
                  Upload Your Own
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-green-200' : 'text-green-700'
                  }`}
                >
                  Upload your own audio files for personalized typing practice
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700/50'
                    : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
                }`}
              >
                <div className="text-2xl mb-3">🏷️</div>
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-800'
                  }`}
                >
                  Smart Categories
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-purple-200' : 'text-purple-700'
                  }`}
                >
                  Organize content by difficulty, genre, and typing focus areas
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-700/50'
                    : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
                }`}
              >
                <div className="text-2xl mb-3">⭐</div>
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? 'text-orange-300' : 'text-orange-800'
                  }`}
                >
                  Favorites & History
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-orange-200' : 'text-orange-700'
                  }`}
                >
                  Save your favorite content and track your practice history
                </p>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600/50'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                🚀 What's Coming Next
              </h3>
              <div className="text-left space-y-2 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Audio file upload and management
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Automatic transcription for uploaded files
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Content filtering and search functionality
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Integration with popular audiobook platforms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Audio Files Preview */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-6 flex items-center gap-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            <span className="text-2xl">📁</span>
            Available Audio Files
          </h3>
          <div
            className={`rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <div
              className={`text-center transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <div className="text-2xl mb-3">🎵</div>
              <p className="mb-2">No audio files uploaded yet</p>
              <p className="text-sm">
                Upload your first audio file to get started with personalized
                typing practice!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioLibraryPage
