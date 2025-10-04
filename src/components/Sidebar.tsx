import React from 'react'
import {
  HomeIcon,
  PlayIcon,
  ChartBarIcon,
  MicrophoneIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  PlayIcon as PlayIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  MicrophoneIcon as MicrophoneIconSolid,
} from '@heroicons/react/24/solid'

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  isDarkMode,
  onToggleDarkMode,
}) => {
  console.log('Sidebar rendered, isDarkMode=', isDarkMode)
  const navigationItems = [
    {
      id: 'homePage',
      name: 'Home',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      description: 'Welcome & Overview',
    },
    {
      id: 'adaptiveTyping',
      name: 'Adaptive Typing',
      icon: PlayIcon,
      iconSolid: PlayIconSolid,
      description: 'Practice with AI',
    },
    {
      id: 'statsPage',
      name: 'Statistics',
      icon: ChartBarIcon,
      iconSolid: ChartBarIconSolid,
      description: 'Track Progress',
    },
    {
      id: 'audioLibraryPage',
      name: 'Audio Library',
      icon: MicrophoneIcon,
      iconSolid: MicrophoneIconSolid,
      description: 'Browse Content',
    },
  ]

  return (
    <div
      className="Sidebar sidebar-container"
      style={{
        width: '320px',
        minHeight: '100vh',
        backgroundColor: isDarkMode
          ? 'rgba(17, 24, 39, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: isDarkMode
          ? '1px solid rgba(75, 85, 99, 0.5)'
          : '1px solid rgba(229, 231, 235, 0.5)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'all 0.3s ease',
        outline: '2px solid rgba(255, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px',
          borderBottom: isDarkMode
            ? '1px solid rgba(75, 85, 99, 0.5)'
            : '1px solid rgba(229, 231, 235, 0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
            >
              T
            </span>
          </div>
          <div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
              }}
            >
              TempoType
            </h1>
            <p
              style={{
                fontSize: '12px',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                margin: 0,
              }}
            >
              Adaptive Typing Practice
            </p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SunIcon
            style={{
              width: '16px',
              height: '16px',
              color: isDarkMode ? '#6b7280' : '#f59e0b',
            }}
          />
          <button
            onClick={onToggleDarkMode}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: isDarkMode ? '#3b82f6' : '#d1d5db',
              position: 'relative',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '2px',
                left: isDarkMode ? '22px' : '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </button>
          <MoonIcon
            style={{
              width: '16px',
              height: '16px',
              color: isDarkMode ? '#3b82f6' : '#6b7280',
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navigationItems.map((item) => {
            const isActive = currentView === item.id
            const Icon = isActive ? item.iconSolid : item.icon

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive
                    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
                    : 'transparent',
                  color: isActive
                    ? 'white'
                    : isDarkMode
                    ? '#d1d5db'
                    : '#4b5563',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? 'rgba(55, 65, 81, 0.8)'
                      : 'rgba(243, 244, 246, 0.8)'
                    e.currentTarget.style.color = isDarkMode
                      ? '#f3f4f6'
                      : '#1f2937'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = isDarkMode
                      ? '#d1d5db'
                      : '#4b5563'
                  }
                }}
              >
                <Icon
                  style={{
                    width: '20px',
                    height: '20px',
                    color: isActive
                      ? 'white'
                      : isDarkMode
                      ? '#9ca3af'
                      : '#6b7280',
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{
                      fontWeight: '500',
                      color: isActive
                        ? 'white'
                        : isDarkMode
                        ? 'white'
                        : '#1f2937',
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: isActive
                        ? 'rgba(219, 234, 254, 0.8)'
                        : isDarkMode
                        ? '#9ca3af'
                        : '#6b7280',
                    }}
                  >
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      opacity: 0.8,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
