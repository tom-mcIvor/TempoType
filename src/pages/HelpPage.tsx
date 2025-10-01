import React from 'react'

const HelpPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ❓ Help & Support
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get help and learn how to use TempoType effectively
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold min-w-[1.5rem] text-center">1</div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Navigate to Adaptive Typing</h3>
                    <p className="text-blue-700 text-sm">Click on "Adaptive Typing" in the sidebar to start your first session</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold min-w-[1.5rem] text-center">2</div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Start Audio Playback</h3>
                    <p className="text-green-700 text-sm">Press the play button to begin audio narration</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-bold min-w-[1.5rem] text-center">3</div>
                  <div>
                    <h3 className="font-semibold text-purple-800 mb-1">Type Along</h3>
                    <p className="text-purple-700 text-sm">Start typing in the text area as you hear the audio</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold min-w-[1.5rem] text-center">4</div>
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-1">Watch Speed Adapt</h3>
                    <p className="text-orange-700 text-sm">The audio will automatically adjust to match your typing speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">How does the adaptive speed feature work?</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your typing speed in real-time and automatically adjusts the audio playback speed to match your pace. 
                If you're typing fast, the audio speeds up. If you slow down, the audio slows down too, ensuring you never fall behind or get overwhelmed.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">What audio formats are supported?</h3>
              <p className="text-gray-600 text-sm">
                Currently, we support MP3, WAV, and M4A audio formats. We're working on adding support for more formats including FLAC and OGG.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Can I upload my own audio files?</h3>
              <p className="text-gray-600 text-sm">
                Yes! The audio library feature (coming soon) will allow you to upload your own audio files for personalized typing practice. 
                We'll automatically transcribe them for you.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">How accurate is the WPM calculation?</h3>
              <p className="text-gray-600 text-sm">
                Our WPM calculation follows industry standards (5 characters = 1 word) and updates in real-time as you type. 
                We also track accuracy and provide detailed statistics to help you improve.
              </p>
            </div>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">✨</span>
            Tips & Tricks
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Focus on Accuracy First</h3>
                  <p className="text-gray-600 text-sm">Speed will naturally improve as you build muscle memory. Prioritize accuracy over speed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Practice Regularly</h3>
                  <p className="text-gray-600 text-sm">Short, consistent practice sessions are more effective than long, infrequent ones.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">👀</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Don't Look at the Keyboard</h3>
                  <p className="text-gray-600 text-sm">Keep your eyes on the screen to develop proper touch typing habits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧘</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Stay Relaxed</h3>
                  <p className="text-gray-600 text-sm">Keep your hands and shoulders relaxed to avoid fatigue and improve accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">📞</span>
            Need More Help?
          </h2>
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Comprehensive Documentation Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're working on detailed documentation, video tutorials, and a comprehensive help center to support your typing journey.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <p className="text-gray-700 mb-2">
                <strong>Coming Soon:</strong>
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Video tutorials and walkthroughs</p>
                <p>• Advanced typing techniques guide</p>
                <p>• Troubleshooting and FAQ database</p>
                <p>• Community forum and support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage