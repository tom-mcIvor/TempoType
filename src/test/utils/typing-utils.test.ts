import { describe, it, expect } from '@jest/globals'

// Utility functions for typing calculations
export const calculateWPM = (charactersTyped: number, timeInMinutes: number): number => {
  if (timeInMinutes === 0) return 0
  return Math.round((charactersTyped / 5) / timeInMinutes)
}

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100
  return Math.round((correctChars / totalChars) * 100)
}

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

describe('Typing Utilities', () => {
  describe('calculateWPM', () => {
    it('should calculate WPM correctly', () => {
      expect(calculateWPM(250, 5)).toBe(10) // 250 chars in 5 minutes = 10 WPM
      expect(calculateWPM(100, 2)).toBe(10) // 100 chars in 2 minutes = 10 WPM
      expect(calculateWPM(0, 1)).toBe(0) // No characters typed
    })

    it('should return 0 when time is 0', () => {
      expect(calculateWPM(100, 0)).toBe(0)
    })

    it('should handle decimal minutes', () => {
      expect(calculateWPM(125, 2.5)).toBe(10) // 125 chars in 2.5 minutes = 10 WPM
    })
  })

  describe('calculateAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      expect(calculateAccuracy(90, 100)).toBe(90) // 90% accuracy
      expect(calculateAccuracy(50, 100)).toBe(50) // 50% accuracy
      expect(calculateAccuracy(100, 100)).toBe(100) // Perfect accuracy
    })

    it('should return 100 when no characters typed', () => {
      expect(calculateAccuracy(0, 0)).toBe(100)
    })

    it('should handle edge cases', () => {
      expect(calculateAccuracy(0, 100)).toBe(0) // 0% accuracy
      expect(calculateAccuracy(1, 1)).toBe(100) // Single character correct
    })
  })

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(0)).toBe('0:00')
      expect(formatTime(30)).toBe('0:30')
      expect(formatTime(60)).toBe('1:00')
      expect(formatTime(90)).toBe('1:30')
      expect(formatTime(3661)).toBe('61:01') // Over an hour
    })

    it('should pad seconds with leading zero', () => {
      expect(formatTime(65)).toBe('1:05')
      expect(formatTime(125)).toBe('2:05')
    })
  })
})