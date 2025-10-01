import React from 'react'
import {
  HomeIcon,
  PlayIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  PlayIcon as PlayIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  CogIcon as CogIconSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  MicrophoneIcon as MicrophoneIconSolid,
} from '@heroicons/react/24/solid'

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navigationItems = [
    {
      id: 'home',
      name: 'Home',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      description: 'Welcome & Overview',
    },
    {
      id: 'demo',
      name: 'Adaptive Typing',
      icon: PlayIcon,
      iconSolid: PlayIconSolid,
      description: 'Practice with AI',
    },
    {
      id: 'lessons',
      name: 'Lessons',
      icon: BookOpenIcon,
      iconSolid: BookOpenIconSolid,
      description: 'Structured Learning',
    },
    {
      id: 'stats',
      name: 'Statistics',
      icon: ChartBarIcon,
      iconSolid: ChartBarIconSolid,
      description: 'Track Progress',
    },
    {
      id: 'audio',
      name: 'Audio Library',
      icon: MicrophoneIcon,
      iconSolid: MicrophoneIconSolid,
      description: 'Browse Content',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: CogIcon,
      iconSolid: CogIconSolid,
      description: 'Preferences',
    },
    {
      id: 'help',
      name: 'Help & Support',
      icon: QuestionMarkCircleIcon,
      iconSolid: QuestionMarkCircleIconSolid,
      description: 'Get Assistance',
    },
  ]

  return (
    <div 
      className="sidebar-container"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(229, 231, 235, 0.5)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 1000,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div 
        style={{
          padding: '24px',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>T</span>
          </div>
          <div>
            <h1 
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}
            >
              TempoType
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              Adaptive Typing Practice
            </p>
          </div>
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
                  color: isActive ? 'white' : '#4b5563',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(243, 244, 246, 0.8)'
                    e.currentTarget.style.color = '#1f2937'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#4b5563'
                  }
                }}
              >
                <Icon 
                  style={{ 
                    width: '20px', 
                    height: '20px',
                    color: isActive ? 'white' : '#6b7280'
                  }} 
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div 
                    style={{ 
                      fontWeight: '500',
                      color: isActive ? 'white' : '#1f2937'
                    }}
                  >
                    {item.name}
                  </div>
                  <div 
                    style={{ 
                      fontSize: '12px',
                      color: isActive ? 'rgba(219, 234, 254, 0.8)' : '#6b7280'
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
                      opacity: 0.8
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div 
        style={{
          padding: '16px',
          borderTop: '1px solid rgba(229, 231, 235, 0.5)'
        }}
      >
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '14px' }}>🎯</span>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                Pro Tip
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>
                Practice daily for best results!
              </div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Consistent practice improves muscle memory and typing speed.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar