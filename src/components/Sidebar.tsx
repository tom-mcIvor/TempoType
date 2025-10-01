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
    <div className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TempoType
            </h1>
            <p className="text-xs text-gray-500">Adaptive Typing Practice</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = currentView === item.id
          const Icon = isActive ? item.iconSolid : item.icon

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
              <div className="flex-1 text-left">
                <div className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </div>
                <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎯</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">Pro Tip</div>
              <div className="text-xs text-gray-600">Practice daily for best results!</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Consistent practice improves muscle memory and typing speed.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar