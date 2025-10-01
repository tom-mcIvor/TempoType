import React from 'react'
import {
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

interface StatsPageProps {
  isDarkMode?: boolean
}

const StatsPage: React.FC<StatsPageProps> = ({ isDarkMode = false }) => {
  return (
    <div
      className={`StatsPage sidebar-tab-content stats-content transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="center-content">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📊 Your Statistics
          </h1>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div
            className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}
            >
              <ChartBarIcon
                className="h-6 w-6 text-blue-600"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">85</div>
            <div
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Average WPM
            </div>
          </div>

          <div
            className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
              }`}
            >
              <CheckCircleIcon
                className="h-6 w-6 text-green-600"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
            <div
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Accuracy
            </div>
          </div>

          <div
            className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}
            >
              <ClockIcon
                className="h-6 w-6 text-purple-600"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">2.5h</div>
            <div
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Practice Time
            </div>
          </div>

          <div
            className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                isDarkMode ? 'bg-orange-900/50' : 'bg-orange-100'
              }`}
            >
              <TrophyIcon
                className="h-6 w-6 text-orange-600"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
            <div
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Achievements
            </div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div
          className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            Progress Over Time
          </h3>
          <div
            className={`h-64 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50'
                : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div
          className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <h3
            className={`text-xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            Recent Sessions
          </h3>
          <div className="space-y-4">
            <div
              className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <div>
                <div
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  Adaptive Audio Typing
                </div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Chapter I - Fate of Phinella
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">89 WPM</div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  96% accuracy
                </div>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <div>
                <div
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  Practice Session
                </div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Common words drill
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">92 WPM</div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  98% accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage
