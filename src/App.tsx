import { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './components/SideBarTabComponents/HomePage'
import { AdaptiveTyping } from './components/SideBarTabComponents/AdaptiveTyping'
import StatsPage from './components/SideBarTabComponents/StatsPage'
import AudioLibraryPage from './components/SideBarTabComponents/AudioLibraryPage'

function App() {
  console.log('App rendered')
  const [currentView, setCurrentView] = useState<string>('homePage')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

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
    </div>
  )
}

export default App
