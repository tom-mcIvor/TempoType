import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import AdaptiveTypingDemo from './pages/AdaptiveTypingDemo'
import LessonsPage from './pages/LessonsPage'
import StatsPage from './pages/StatsPage'
import AudioLibraryPage from './pages/AudioLibraryPage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'

function App() {
  const [currentView, setCurrentView] = useState<string>('home')

  const renderCurrentView = () => {
    switch (currentView) {
      case 'demo':
        return <AdaptiveTypingDemo />
      case 'lessons':
        return <LessonsPage />
      case 'stats':
        return <StatsPage />
      case 'audio':
        return <AudioLibraryPage />
      case 'settings':
        return <SettingsPage />
      case 'help':
        return <HelpPage />
      default:
        return <HomePage onNavigateToDemo={() => setCurrentView('demo')} />
    }
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>
      <div>{renderCurrentView()}</div>
    </React.Fragment>
  )
}

export default App
