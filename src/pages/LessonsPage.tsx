import React from 'react'

const LessonsPage: React.FC = () => {
  return (
    <div className="py-8 pr-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📚 Typing Lessons
          </h1>
          <p className="text-lg text-gray-600">
            Structured learning path to improve your typing skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Beginner Lessons */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Beginner</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn the basics of touch typing with proper finger placement
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Home Row Keys</span>
                <span className="text-green-600">✓ Complete</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Top Row Keys</span>
                <span className="text-blue-600">In Progress</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bottom Row Keys</span>
                <span className="text-gray-400">Locked</span>
              </div>
            </div>
          </div>

          {/* Intermediate Lessons */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Intermediate
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Build speed and accuracy with common words and phrases
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Common Words</span>
                <span className="text-gray-400">Locked</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Punctuation</span>
                <span className="text-gray-400">Locked</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Numbers</span>
                <span className="text-gray-400">Locked</span>
              </div>
            </div>
          </div>

          {/* Advanced Lessons */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Advanced</h3>
            <p className="text-gray-600 text-sm mb-4">
              Master complex texts and achieve professional typing speeds
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Code Typing</span>
                <span className="text-gray-400">Locked</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Speed Tests</span>
                <span className="text-gray-400">Locked</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accuracy Drills</span>
                <span className="text-gray-400">Locked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Coming Soon!</h3>
          <p className="text-blue-700">
            We're working on comprehensive typing lessons. For now, try our
            adaptive audio typing feature!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LessonsPage
