import React from 'react'

interface TypingMetrics {
  wpm: number
  accuracy: number
  charactersTyped: number
  wordsTyped: number
  timeElapsed: number
  errorsCount: number
}

interface AudioDetails {
  id: string
  title: string
  description: string
  icon: string
  color: string
  audioSrc: string
  duration: string
  difficulty: string
}

interface ResultsPopUpProps {
  isDarkMode?: boolean
  metrics: TypingMetrics
  userText: string
  targetText: string
  audioDetails?: AudioDetails | null
  onClose: () => void
}

const ResultsPopUp: React.FC<ResultsPopUpProps> = ({
  isDarkMode = false,
  metrics,
  userText,
  targetText,
  audioDetails,
  onClose,
}) => {
  // Calculate detailed comparison
  const calculateComparison = () => {
    // Normalize text: lowercase and remove punctuation for comparison
    const normalizeWord = (word: string) =>
      word.toLowerCase().replace(/[^\w]/g, '')

    const userWords = userText
      .trim()
      .split(/\s+/)
      .map(normalizeWord)
      .filter((w) => w.length > 0)
    const targetWords = targetText
      .trim()
      .split(/\s+/)
      .map(normalizeWord)
      .filter((w) => w.length > 0)
    const minLength = Math.min(userWords.length, targetWords.length)

    // Count words that match at the same position and identify wrong words
    let correctWordsAtPosition = 0
    const wrongWords: Array<{
      typed: string
      expected: string
      position: number
    }> = []

    for (let i = 0; i < minLength; i++) {
      if (userWords[i] === targetWords[i]) {
        correctWordsAtPosition++
      } else {
        wrongWords.push({
          typed: userWords[i] || '(missing)',
          expected: targetWords[i],
          position: i + 1,
        })
      }
    }

    // Add missing words at the end if target is longer
    for (let i = minLength; i < targetWords.length; i++) {
      wrongWords.push({
        typed: '(missing)',
        expected: targetWords[i],
        position: i + 1,
      })
    }

    // Also calculate overall word accuracy (how many user words appear in target)
    let wordsFoundInTarget = 0
    for (const userWord of userWords) {
      if (targetWords.includes(userWord)) {
        wordsFoundInTarget++
      }
    }

    const wordAccuracyPercent =
      userWords.length > 0
        ? Math.round((wordsFoundInTarget / userWords.length) * 100)
        : 100

    return {
      correctWords: correctWordsAtPosition,
      totalTargetWords: targetWords.length,
      completionPercentage: Math.round(
        (userWords.length / targetWords.length) * 100
      ),
      wordAccuracyPercent,
      wordsFoundInTarget,
      wrongWords,
    }
  }

  const comparison = calculateComparison()

  return (
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className={`results-popup-overlay ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`backdrop-blur-sm rounded-2xl shadow-2xl p-6 transition-colors duration-300 max-h-[80vh] overflow-y-auto ${
            isDarkMode
              ? 'bg-gray-800/95 border border-gray-700/50'
              : 'bg-white/95 border border-white/20'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`close-button ${
              isDarkMode ? 'text-white' : 'text-gray-800'
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
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Typing Results
            </h1>
            {audioDetails && (
              <div
                className={`mt-3 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{audioDetails.icon}</span>
                  <span className="font-medium">{audioDetails.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {audioDetails.difficulty} - {audioDetails.duration}
                  </span>
                </div>
                <div className="mt-1 text-xs opacity-75">
                  {audioDetails.description}
                </div>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div
                className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Words Per Minute
              </div>
              <div className="text-2xl font-bold text-blue-600">
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
                className={`text-2xl font-bold ${
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
              <div className="text-2xl font-bold text-purple-600">
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
              <div className="text-2xl font-bold text-orange-600">
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
              <div className="text-2xl font-bold text-red-600">
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
              <div className="text-2xl font-bold text-indigo-600">
                {comparison.completionPercentage}%
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div
            className={`rounded-xl p-4 mb-4 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <h3
              className={`text-base font-semibold mb-3 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Comparison
            </h3>
            <div className="space-y-1 text-sm">
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
                  {comparison.wordsFoundInTarget} / {metrics.wordsTyped} (
                  {comparison.wordAccuracyPercent}%)
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

          {/* Wrong Words Section */}
          {comparison.wrongWords.length > 0 && (
            <div
              className={`rounded-xl p-4 mb-4 ${
                isDarkMode
                  ? 'bg-red-900/20 border border-red-800/30'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h3
                className={`text-base font-semibold mb-3 ${
                  isDarkMode ? 'text-red-300' : 'text-red-800'
                }`}
              >
                Wrong Words ({comparison.wrongWords.length})
              </h3>
              <div className="max-h-32 overflow-y-auto">
                <div className="space-y-2 text-sm">
                  {comparison.wrongWords.map((error, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        #{error.position}
                      </span>
                      <div className="flex-1 mx-3">
                        <span
                          className={`font-medium ${
                            isDarkMode ? 'text-red-300' : 'text-red-700'
                          }`}
                        >
                          {error.typed}
                        </span>
                        <span
                          className={`mx-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          →
                        </span>
                        <span
                          className={`font-medium ${
                            isDarkMode ? 'text-green-300' : 'text-green-700'
                          }`}
                        >
                          {error.expected}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm"
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
