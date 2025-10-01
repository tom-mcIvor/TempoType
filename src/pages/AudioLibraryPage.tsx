import React from 'react'

const AudioLibraryPage: React.FC = () => {
  return (
    <div className="py-8 pr-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎵 Audio Library
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Browse and manage your audio content for typing practice
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🎧</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Audio Library Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're working on an amazing audio library feature that will allow you to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold text-blue-800 mb-2">Browse Content</h3>
                <p className="text-sm text-blue-700">
                  Access a vast library of audiobooks, podcasts, and educational content
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="text-3xl mb-3">📤</div>
                <h3 className="font-bold text-green-800 mb-2">Upload Your Own</h3>
                <p className="text-sm text-green-700">
                  Upload your own audio files for personalized typing practice
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                <div className="text-3xl mb-3">🏷️</div>
                <h3 className="font-bold text-purple-800 mb-2">Smart Categories</h3>
                <p className="text-sm text-purple-700">
                  Organize content by difficulty, genre, and typing focus areas
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold text-orange-800 mb-2">Favorites & History</h3>
                <p className="text-sm text-orange-700">
                  Save your favorite content and track your practice history
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🚀 What's Coming Next
              </h3>
              <div className="text-left space-y-2 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Audio file upload and management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Automatic transcription for uploaded files</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Content filtering and search functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Integration with popular audiobook platforms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Audio Files Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-2xl">📁</span>
            Available Audio Files
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-3">🎵</div>
              <p className="mb-2">No audio files uploaded yet</p>
              <p className="text-sm">Upload your first audio file to get started with personalized typing practice!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioLibraryPage