import React, { useState, useEffect, useCallback, useRef } from 'react'
import { matchWords } from '../utils/wordMatching'

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
  currentAudioId?: string | null
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
  currentAudioId = null,
}) => {
  const [text, setText] = useState(value || '')
  const [startTime, setStartTime] = useState<number | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const textRef = useRef(text)

  // Sync with external value prop ONLY on mount
  // Remove this to prevent re-renders on every keystroke from parent
  // useEffect(() => {
  //   if (value !== undefined) {
  //     setText(value)
  //   }
  // }, [value])

  // focus textarea when autoFocus becomes true
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      // small timeout to ensure element is rendered and visible
      const t = setTimeout(() => textareaRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
    return
  }, [autoFocus])

  // Reset text when a new audio is selected
  useEffect(() => {
    if (currentAudioId) {
      setText('')
      setStartTime(null)
      startTimeRef.current = null
      // Focus the textarea after resetting
      if (textareaRef.current) {
        setTimeout(() => textareaRef.current?.focus(), 0)
      }
    }
  }, [currentAudioId])

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
        // Use word-based accuracy for better measurement
        const typedWords = currentText.trim().split(/\s+/).filter(w => w.length > 0)
        const targetWords = targetText.trim().split(/\s+/).filter(w => w.length > 0)

        const matchResult = matchWords(typedWords, targetWords)
        accuracy = matchResult.accuracy
        errorsCount = matchResult.incorrectWords
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

  // Handle text change - Optimized with debounced parent notification
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)

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
      onMetricsChange?.({
        wpm: 0,
        accuracy: 100,
        charactersTyped: 0,
        wordsTyped: 0,
        timeElapsed: 0,
        errorsCount: 0,
      })
    }
  }

  // Debounced parent notification - only after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onTextChange?.(text)
    }, 500)
    return () => clearTimeout(timer)
  }, [text, onTextChange])

  // Keep textRef in sync with text state
  useEffect(() => {
    textRef.current = text
  }, [text])

  // Debounced metrics calculation - only update after user stops typing
  useEffect(() => {
    if (!startTime || text.length === 0 || stopped) return

    // Debounce: wait 500ms after user stops typing before calculating
    const debounceTimer = setTimeout(() => {
      if (startTimeRef.current) {
        const newMetrics = calculateMetrics(text, startTimeRef.current)
        onMetricsChange?.(newMetrics)
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [text, startTime, calculateMetrics, onMetricsChange, stopped])

  return (
    <div className={className}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '24px', // Larger but not huge
          fontFamily: 'monospace',
          lineHeight: '1.6',
          border: '3px solid #3b82f6',
          borderRadius: '8px',
          minHeight: '240px',
          maxHeight: maxHeight,
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#111827',
          outline: 'none',
          resize: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  )
}

export default TextBox
