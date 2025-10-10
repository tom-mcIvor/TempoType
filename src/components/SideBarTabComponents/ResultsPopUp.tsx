import React from 'react'

interface TypingMetrics {
  wpm: number
  accuracy: number
  charactersTyped: number
  wordsTyped: number
  timeElapsed: number
  errorsCount: number
}

interface ResultsPopUpProps {
  isDarkMode?: boolean
  metrics: TypingMetrics
  userText: string
  targetText: string
  onClose: () => void
}

const ResultsPopUp: React.FC<ResultsPopUpProps> = ({
  isDarkMode = false,
  metrics,
  userText,
  targetText,
  onClose,
}) => {
  // Calculate detailed comparison
  const calculateComparison = () => {
    // Normalize text: lowercase and remove punctuation for comparison
    const normalizeWord = (word: string) =>
      word.toLowerCase().replace(/[^\w]/g, '')

    const userWords = userText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
    const targetWords = targetText.trim().split(/\s+/).map(normalizeWord).filter(w => w.length > 0)
    const minLength = Math.min(userWords.length, targetWords.length)

    // Count words that match at the same position
    let correctWordsAtPosition = 0
    for (let i = 0; i < minLength; i++) {
      if (userWords[i] === targetWords[i]) {
        correctWordsAtPosition++
      }
    }

    // Also calculate overall word accuracy (how many user words appear in target)
    let wordsFoundInTarget = 0
    for (const userWord of userWords) {
      if (targetWords.includes(userWord)) {
        wordsFoundInTarget++
      }
    }

    const wordAccuracyPercent = userWords.length > 0
      ? Math.round((wordsFoundInTarget / userWords.length) * 100)
      : 100

    return {
      correctWords: correctWordsAtPosition,
      totalTargetWords: targetWords.length,
      completionPercentage: Math.round((userWords.length / targetWords.length) * 100),
      wordAccuracyPercent,
      wordsFoundInTarget,
    }
  }

  const comparison = calculateComparison()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className={`relative max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/95 border border-gray-700/50'
              : 'bg-white/95 border border-white/20'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Typing Results
            </h1>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Words Per Minute
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {metrics.wpm}
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Accuracy
              </div>
              <div
                className={`text-4xl font-bold ${
                  metrics.accuracy >= 95
                    ? 'text-green-600'
                    : metrics.accuracy >= 85
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {metrics.accuracy}%
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Words Typed
              </div>
              <div className="text-4xl font-bold text-purple-600">
                {metrics.wordsTyped}
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Time Elapsed
              </div>
              <div className="text-4xl font-bold text-orange-600">
                {Math.floor(metrics.timeElapsed / 60)}:
                {(metrics.timeElapsed % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Errors
              </div>
              <div className="text-4xl font-bold text-red-600">
                {metrics.errorsCount}
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Completion
              </div>
              <div className="text-4xl font-bold text-indigo-600">
                {comparison.completionPercentage}%
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div
            className={`rounded-2xl p-6 mb-6 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Comparison
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                >
                  Words in Correct Position:
                </span>
                <span className="font-bold text-green-600">
                  {comparison.correctWords} / {comparison.totalTargetWords}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                >
                  Valid Words Typed:
                </span>
                <span className="font-bold text-blue-600">
                  {comparison.wordsFoundInTarget} / {metrics.wordsTyped} ({comparison.wordAccuracyPercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                >
                  Characters Typed:
                </span>
                <span className="font-bold text-purple-600">
                  {metrics.charactersTyped}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              Close Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPopUp
