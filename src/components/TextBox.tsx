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
  autoFocus?: boolean
  value?: string
  stopped?: boolean
}

const TextBox: React.FC<TextBoxProps> = ({
  placeholder = 'Start typing here to practice...',
  targetText = '',
  onMetricsChange,
  onTextChange,
  isDarkMode = false,
  disabled = false,
  className = '',
  maxHeight = '400px',
  autoFocus = false,
  value,
  stopped = false,
}) => {
  const [text, setText] = useState(value || '')
  const [startTime, setStartTime] = useState<number | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setText(value)
    }
  }, [value])

  // focus textarea when autoFocus becomes true
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      // small timeout to ensure element is rendered and visible
      const t = setTimeout(() => textareaRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
    return
  }, [autoFocus])

  // Calculate typing metrics
  const calculateMetrics = useCallback(
    (currentText: string, startTimestamp: number): TypingMetrics => {
      const now = Date.now()
      const timeElapsed = (now - startTimestamp) / 1000 // in seconds
      const timeElapsedMinutes = timeElapsed / 60

      const charactersTyped = currentText.length
      const wordsTyped = currentText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length

      // Calculate WPM (Words Per Minute)
      const wpm =
        timeElapsedMinutes > 0 ? Math.round(wordsTyped / timeElapsedMinutes) : 0

      // Calculate word-level accuracy if target text is provided
      let accuracy = 100
      let errorsCount = 0

      if (targetText && currentText.length > 0) {
        // Normalize words: lowercase and remove punctuation
        const normalizeWord = (word: string) =>
          word.toLowerCase().replace(/[^\w]/g, '')

        const userWords = currentText
          .trim()
          .split(/\s+/)
          .map(normalizeWord)
          .filter((w) => w.length > 0)

        const targetWords = targetText
          .trim()
          .split(/\s+/)
          .map(normalizeWord)
          .filter((w) => w.length > 0)

        // Count words that appear in the target text
        let correctWords = 0
        for (const userWord of userWords) {
          if (targetWords.includes(userWord)) {
            correctWords++
          }
        }

        // Calculate errors as words NOT found in target
        errorsCount = userWords.length - correctWords

        // Calculate word-level accuracy
        accuracy =
          userWords.length > 0
            ? Math.round((correctWords / userWords.length) * 100)
            : 100
      }

      return {
        wpm,
        accuracy,
        charactersTyped,
        wordsTyped,
        timeElapsed: Math.round(timeElapsed),
        errorsCount,
      }
    },
    [targetText]
  )

  // Handle text change
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value
      setText(newText)
      onTextChange?.(newText)

      // Start timer on first character
      if (!startTimeRef.current && newText.length === 1) {
        const now = Date.now()
        setStartTime(now)
        startTimeRef.current = now
      }

      // Reset if text is cleared
      if (newText.length === 0) {
        setStartTime(null)
        startTimeRef.current = null
        const resetMetrics = {
          wpm: 0,
          accuracy: 100,
          charactersTyped: 0,
          wordsTyped: 0,
          timeElapsed: 0,
          errorsCount: 0,
        }
        onMetricsChange?.(resetMetrics)
      }
    },
    [onTextChange, onMetricsChange]
  )

  // Update metrics every 500ms while typing (reduced frequency)
  useEffect(() => {
    if (startTime && text.length > 0 && !stopped) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const newMetrics = calculateMetrics(text, startTimeRef.current)
          onMetricsChange?.(newMetrics)
        }
      }, 500)
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
  }, [startTime, text, calculateMetrics, onMetricsChange, stopped])

  return (
    <div
      className={className}
      style={{ border: '6px solid #3b82f6', borderRadius: '8px' }}
    >
      <div
        className={`typing-area rounded-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed transition-colors duration-300 ${
            isDarkMode
              ? 'text-gray-100 placeholder-gray-400'
              : 'text-gray-900 placeholder-gray-500'
          }`}
          style={{
            border: 'none',
            outline: 'none',
            minHeight: '240px',
            maxHeight: maxHeight,
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
