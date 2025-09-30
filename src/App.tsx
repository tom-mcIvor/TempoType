import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-gray-800">
          TempoType
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-gray-800">
            Material Tailwind Setup Complete
          </h2>
          
          <div className="mb-6">
            <p className="mb-2 text-gray-700">
              Progress Example:
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(count * 10, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
            
            <button
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
          
          <p className="text-center mt-4 text-sm text-gray-600">
            Material Tailwind is installed and ready! 🎉
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-gray-800">
            Ready for TempoType Development
          </h3>
          <p className="text-gray-700">
            The project is now set up with React, Vite, Tailwind CSS, and Material Tailwind components.
            You can start building the typing interface using the style guide components.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
