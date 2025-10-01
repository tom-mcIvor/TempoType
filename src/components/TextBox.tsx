import React, { useState, useEffect, useCallback, useRef } from 'react'

interface TypingMetrics {
  wpm: number
  accuracy: number
  charactersTyped: number
  wordsTyped: number
  timeElapsed: number
  errorsCount: number
}

interface TextBoxProps {
  placeholder?: string
  targetText?: string
  onMetricsChange?: (metrics: TypingMetrics) => void
  onTextChange?: (text: string) => void
  isDarkMode?: boolean
  disabled?: boolean
  showMetrics?: boolean
  className?: string
  maxHeight?: string
}

const TextBox: React.FC<TextBoxProps> = ({
  placeholder = "Start typing here to practice...",
  targetText = "",
  onMetricsChange,
  onTextChange,
  isDarkMode = false,
  disabled = false,
  showMetrics = true,
  className = "",
  maxHeight = "200px"
}) => {
  const [text, setText] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [metrics, setMetrics] = useState<TypingMetrics>({
    wpm: 0,
    accuracy: 100,
    charactersTyped: 0,
    wordsTyped: 0,
    timeElapsed: 0,
    errorsCount: 0
  })
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const intervalRef = useRef<number | null>(null)

  // Calculate typing metrics
  const calculateMetrics = useCallback((currentText: string, startTimestamp: number): TypingMetrics => {
    const now = Date.now()
    const timeElapsed = (now - startTimestamp) / 1000 // in seconds
    const timeElapsedMinutes = timeElapsed / 60
    
    const charactersTyped = currentText.length
    const wordsTyped = currentText.trim().split(/\s+/).filter(word => word.length > 0).length
    
    // Calculate WPM (Words Per Minute)
    const wpm = timeElapsedMinutes > 0 ? Math.round(wordsTyped / timeElapsedMinutes) : 0
    
    // Calculate accuracy if target text is provided
    let accuracy = 100
    let errorsCount = 0
    
    if (targetText && currentText.length > 0) {
      let correctChars = 0
      
      for (let i = 0; i < currentText.length; i++) {
        if (i < targetText.length && currentText[i] === targetText[i]) {
          correctChars++
        } else {
          errorsCount++
        }
      }
      
      accuracy = currentText.length > 0 ? Math.round((correctChars / currentText.length) * 100) : 100
    }
    
    return {
      wpm,
      accuracy,
      charactersTyped,
      wordsTyped,
      timeElapsed: Math.round(timeElapsed),
      errorsCount
    }
  }, [targetText])

  // Handle text change
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    onTextChange?.(newText)
    
    // Start timer on first character
    if (!startTime && newText.length === 1) {
      setStartTime(Date.now())
    }
    
    // Calculate metrics if typing has started
    if (startTime && newText.length > 0) {
      const newMetrics = calculateMetrics(newText, startTime)
      setMetrics(newMetrics)
      onMetricsChange?.(newMetrics)
    }
    
    // Reset if text is cleared
    if (newText.length === 0) {
      setStartTime(null)
      const resetMetrics = {
        wpm: 0,
        accuracy: 100,
        charactersTyped: 0,
        wordsTyped: 0,
        timeElapsed: 0,
        errorsCount: 0
      }
      setMetrics(resetMetrics)
      onMetricsChange?.(resetMetrics)
    }
  }, [startTime, calculateMetrics, onTextChange, onMetricsChange])

  // Update metrics every second while typing
  useEffect(() => {
    if (startTime && text.length > 0) {
      intervalRef.current = setInterval(() => {
        const newMetrics = calculateMetrics(text, startTime)
        setMetrics(newMetrics)
        onMetricsChange?.(newMetrics)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startTime, text, calculateMetrics, onMetricsChange])

  // Get character-by-character feedback for target text
  const getCharacterFeedback = () => {
    if (!targetText || !text) return null
    
    return targetText.split('').map((char, index) => {
      let className = 'inline-block'
      
      if (index < text.length) {
        if (text[index] === char) {
          className += ' text-green-600 bg-green-100'
        } else {
          className += ' text-red-600 bg-red-100'
        }
      } else {
        className += isDarkMode ? ' text-gray-400' : ' text-gray-500'
      }
      
      return (
        <span key={index} className={className}>
          {char === ' ' ? '·' : char}
        </span>
      )
    })
  }

  return (
    <div className={`text-box-container border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg ${className}`}>
      {/* Target Text Display */}
      {targetText && (
        <div
          className={`target-text p-4 rounded-lg mb-4 font-mono text-sm leading-relaxed transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/50 border border-gray-700/50'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 font-semibold">📝 Target Text:</span>
          </div>
          <div className="whitespace-pre-wrap">
            {getCharacterFeedback()}
          </div>
        </div>
      )}

      {/* Typing Area */}
      <div
        className={`typing-area rounded-lg border-2 transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90 border-gray-700/50 focus-within:border-blue-500'
            : 'bg-white/90 border-gray-200 focus-within:border-blue-400'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
          }`}
          style={{ 
            minHeight: '120px',
            maxHeight: maxHeight
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {/* Metrics Display */}
      {showMetrics && (
        <div
          className={`metrics-display mt-4 p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800/50 border border-gray-700/50'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {metrics.wpm}
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                WPM
              </div>
            </div>
            
            <div className="metric-item text-center">
              <div className={`text-2xl font-bold mb-1 ${
                metrics.accuracy >= 95 ? 'text-green-600' : 
                metrics.accuracy >= 85 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {metrics.accuracy}%
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Accuracy
              </div>
            </div>
            
            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {metrics.charactersTyped}
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Characters
              </div>
            </div>
            
            <div className="metric-item text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {Math.floor(metrics.timeElapsed / 60)}:{(metrics.timeElapsed % 60).toString().padStart(2, '0')}
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Time
              </div>
            </div>
          </div>
          
          {/* Performance Indicator */}
          <div className="mt-3 text-center">
          </div>
        </div>
      )}
    </div>
  )
}

export default TextBox