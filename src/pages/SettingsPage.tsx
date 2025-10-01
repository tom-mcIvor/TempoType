import React from 'react'

const SettingsPage: React.FC = () => {
  return (
    <div className="py-8 pr-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Customize your typing experience and preferences
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🔧</div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Settings Panel Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're building a comprehensive settings panel that will give you full control over your typing experience:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold text-blue-800 mb-2">Theme & Appearance</h3>
                <p className="text-sm text-blue-700">
                  Choose from light, dark, and custom themes. Adjust colors and fonts to your preference.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-green-800 mb-2">Typing Goals</h3>
                <p className="text-sm text-green-700">
                  Set WPM targets, accuracy goals, and daily practice time objectives.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                <div className="text-3xl mb-3">🔊</div>
                <h3 className="font-bold text-purple-800 mb-2">Audio Settings</h3>
                <p className="text-sm text-purple-700">
                  Configure playback speed ranges, audio quality, and voice preferences.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                <div className="text-3xl mb-3">⌨️</div>
                <h3 className="font-bold text-orange-800 mb-2">Keyboard Layout</h3>
                <p className="text-sm text-orange-700">
                  Support for QWERTY, Dvorak, Colemak, and custom keyboard layouts.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-red-800 mb-2">Analytics & Privacy</h3>
                <p className="text-sm text-red-700">
                  Control data collection, export your progress, and manage privacy settings.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200">
                <div className="text-3xl mb-3">🔔</div>
                <h3 className="font-bold text-indigo-800 mb-2">Notifications</h3>
                <p className="text-sm text-indigo-700">
                  Set up practice reminders, achievement notifications, and progress alerts.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🚀 Planned Settings Features
              </h3>
              <div className="text-left space-y-2 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Customizable typing interface and colors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced audio speed and quality controls</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Personalized difficulty and challenge settings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Data export and backup functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Accessibility options and keyboard shortcuts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Settings Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            Quick Settings (Preview)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Theme</h4>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg cursor-pointer"></div>
                <div className="w-8 h-8 bg-gray-800 border-2 border-gray-300 rounded-lg cursor-pointer"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-blue-300 rounded-lg cursor-pointer"></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Audio Speed Range</h4>
              <div className="text-sm text-gray-600">
                <p>Min: 0.25x | Max: 2.0x</p>
                <p className="text-xs mt-1">Customizable in full version</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage