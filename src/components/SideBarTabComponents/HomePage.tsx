import React from 'react'
import TextBox from '../TextBox'

interface HomePageProps {
  onNavigateToDemo: () => void
  isDarkMode?: boolean
}

const HomePage: React.FC<HomePageProps> = ({
  onNavigateToDemo,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`HomePage sidebar-tab-content homepage-content transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      }`}
    >
      <div className="center-content">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-4 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-2xl mb-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/90 border border-gray-700/50'
                : 'bg-white/80 border border-white/20'
            }`}
          >
        
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TempoType
            </h1>
          </div>
          
        </div>

        {/* Main Feature Card */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div
              className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
              }`}
            >
              
            </div>
            <div
              className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50'
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
              }`}
            >
              
            </div>
            <div
              className={`p-6 rounded-2xl text-center border hover:shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700/50'
                  : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
              }`}
            >
              
            </div>
          </div>

          <div className="text-center">
          </div>
        </div>

        {/* Practice Text Box */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <div className="text-center mb-6">
          </div>
          
          <TextBox
            placeholder="Start typing" 
            isDarkMode={isDarkMode}
            showMetrics={true}
            className="max-w-4xl mx-auto"
          />
          
          <div className="text-center mt-6">
          </div>
        </div>

        {/* How It Works */}
        <div
          className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/90 border border-gray-700/50'
              : 'bg-white/80 border border-white/20'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/50'
                    : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
                }`}
              >
                <div>
                </div>
              </div>
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-700/50'
                    : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
                }`}
              >
                <div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-700/50'
                    : 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200'
                }`}
              >
                <div>
                </div>
              </div>
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-700/50'
                    : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                }`}
              >
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
