import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import AdaptiveTypingDemo from './pages/AdaptiveTypingDemo'
import StatsPage from './pages/StatsPage'
import AudioLibraryPage from './pages/AudioLibraryPage'

function App() {
  const [currentView, setCurrentView] = useState<string>('home')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'demo':
        return <AdaptiveTypingDemo isDarkMode={isDarkMode} />
      case 'stats':
        return <StatsPage isDarkMode={isDarkMode} />
      case 'audio':
        return <AudioLibraryPage isDarkMode={isDarkMode} />
      default:
        return <HomePage onNavigateToDemo={() => setCurrentView('demo')} isDarkMode={isDarkMode} />
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <div
        style={{
          marginLeft: '321px', // 320px sidebar width + 1px border
          minHeight: '100vh'
        }}
      >
        {renderCurrentView()}
      </div>
    </div>
  )
}

export default App
