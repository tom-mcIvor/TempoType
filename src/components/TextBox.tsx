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
  className = "",
  maxHeight = "200px"
}) => {
  const [text, setText] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  
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
      onMetricsChange?.(resetMetrics)
    }
  }, [startTime, calculateMetrics, onTextChange, onMetricsChange])

  // Update metrics every second while typing
  useEffect(() => {
    if (startTime && text.length > 0) {
      intervalRef.current = setInterval(() => {
        const newMetrics = calculateMetrics(text, startTime)
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


  return (
    <div className={`text-box-container ${className}`} style={{ border: '6px solid #3b82f6', borderRadius: '8px' }}>

      {/* Typing Area */}
      <div
        className={`typing-area rounded-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-800/90'
            : 'bg-white/90'
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

    </div>
  )
}

export default TextBox