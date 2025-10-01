import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './components/HomePage'
import AdaptiveTyping from './components/AdaptiveTyping'
import StatsPage from './components/StatsPage'
import AudioLibraryPage from './components/AudioLibraryPage'

function App() {
  const [currentView, setCurrentView] = useState<string>('home')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const renderCurrentView = () => {
    const transcription = `Chapter I of the Fate of Phinella
This is a Librevox recording.
All Librevox recordings are in the public domain.
For more information or to volunteer, please visit Librevox.org, recording by Patty Cunningham.
The Fate of Phinella
Chapter I by Helen Mathers
Phinella
Dina Yamind, love Gregory, as we twassat at Dine.
How we change the rings fray our fingers, and I can show thee Dine.
Her hair gloves and shoes were tan-color, and closely allied to tan-two was the tawny
true tiger-tint of her hazel eyes.
After the rest, she was entirely white, saved for her dark lashes and brows.
The faint tint of rose in her small cheeks, and a deeper red in her lips that were parted
just then in a spasm of silent, delighted mirth.
She stood on the top steps of the prospect hotel harrogate, waiting for the coach to come
round, and looking across the hotel gardens to the picturesque stray beyond, upon which
a unique game of cricket was just then going forward to the intense diversion of all beholders.`

    switch (currentView) {
      case 'demo':
        return (
          <AdaptiveTyping
            audioSrc="/fateoffenella_01_various_64kb.mp3"
            transcription={transcription}
            targetWPM={148.8}
            isDarkMode={isDarkMode}
          />
        )
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
