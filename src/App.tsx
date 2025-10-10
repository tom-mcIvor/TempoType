import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './components/SideBarTabComponents/HomePage'
import { AdaptiveTyping } from './components/SideBarTabComponents/AdaptiveTyping'
import StatsPage from './components/SideBarTabComponents/StatsPage'
import AudioLibraryPage from './components/SideBarTabComponents/AudioLibraryPage'
import ResultsPopUp from './components/SideBarTabComponents/ResultsPopUp'

function App() {
  console.log('App rendered')
  const [currentView, setCurrentView] = useState<string>('homePage')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [showResultsPopup, setShowResultsPopup] = useState<boolean>(false)

  // Sample data for the ResultsPopUp
  const sampleMetrics = {
    wpm: 85,
    accuracy: 92,
    charactersTyped: 450,
    wordsTyped: 90,
    timeElapsed: 63, // 1 minute 3 seconds
    errorsCount: 8,
  }

  const sampleUserText = "The quick brown fox jumps over the lazy dog. This is a sample typing test to demonstrate the results popup with various metrics and accuracy calculations."
  const sampleTargetText = "The quick brown fox jumps over the lazy dog. This is a sample typing test to demonstrate the results popup with various metrics and accuracy calculations for testing purposes."

  return (
    <div
      className={`min-h-screen flex flex-row transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        outline: '2px solid rgba(0,0,255,0.06)',
      }}
    >
      {/* Developer Button to trigger ResultsPopUp */}
      <button
        onClick={() => setShowResultsPopup(true)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        title="Show Results Popup (Developer)"
      >
        Dev: Show Results
      </button>

      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <div className={`sidebar-tab-container transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
      }`}>
        {currentView === 'adaptiveTyping' ? (
          <AdaptiveTyping
            audioSrc="/fateoffenella_01_various_64kb.mp3"
            transcription={''}
            targetWPM={148.8}
            isDarkMode={isDarkMode}
          />
        ) : currentView === 'statsPage' ? (
          <StatsPage isDarkMode={isDarkMode} />
        ) : currentView === 'audioLibraryPage' ? (
          <AudioLibraryPage isDarkMode={isDarkMode} />
        ) : (
          <HomePage
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* ResultsPopUp - conditionally rendered */}
      {showResultsPopup && (
        <ResultsPopUp
          isDarkMode={isDarkMode}
          metrics={sampleMetrics}
          userText={sampleUserText}
          targetText={sampleTargetText}
          onClose={() => setShowResultsPopup(false)}
        />
      )}
    </div>
  )
}

export default App
