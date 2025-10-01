import React from 'react'

interface AudioLibraryPageProps {
  isDarkMode?: boolean
}

const AudioLibraryPage: React.FC<AudioLibraryPageProps> = ({
  isDarkMode = false,
}) => {
  return (
    <div
      className={`AudioLibraryPage py-8 pr-8 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎵 Audio Library
          </h1>
        </div>

      </div>
    </div>
  )
}

export default AudioLibraryPage
