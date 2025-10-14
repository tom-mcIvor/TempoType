import { describe, it, expect } from '@jest/globals'
import {
  matchWords,
  matchWordsLCS,
  matchWordsWithWindow,
} from './wordMatching'

describe('Word Matching Utilities', () => {
  describe('matchWords', () => {
    it('should return perfect accuracy for exact matches', () => {
      const typed = ['the', 'quick', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      expect(result.accuracy).toBe(100)
      expect(result.correctWords).toBe(4)
      expect(result.inOrderMatches).toBe(4)
      expect(result.outOfOrderMatches).toBe(0)
      expect(result.incorrectWords).toBe(0)
    })

    it('should handle out-of-order words gracefully', () => {
      const typed = ['quick', 'the', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      // Should recognize all words are present but out of order
      expect(result.correctWords).toBe(4)
      expect(result.inOrderMatches).toBe(2) // 'brown' and 'fox' are in correct positions
      expect(result.outOfOrderMatches).toBe(2) // 'quick' and 'the' are out of order
      expect(result.incorrectWords).toBe(0)
      expect(result.accuracy).toBeGreaterThan(0)
    })

    it('should not penalize all subsequent words for one misplaced word', () => {
      const typed = ['the', 'brown', 'quick', 'fox', 'jumps']
      const target = ['the', 'quick', 'brown', 'fox', 'jumps']
      const result = matchWords(typed, target)

      // 'the' matches position 0, 'fox' and 'jumps' match positions 3 and 4
      // 'brown' and 'quick' are out of order
      expect(result.inOrderMatches).toBe(3) // 'the', 'fox', 'jumps'
      expect(result.outOfOrderMatches).toBe(2) // 'brown', 'quick'
      expect(result.correctWords).toBe(5)
      expect(result.incorrectWords).toBe(0)
      expect(result.accuracy).toBeGreaterThan(80)
    })

    it('should handle partially incorrect text', () => {
      const typed = ['the', 'fast', 'brown', 'cat']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      expect(result.correctWords).toBe(2) // 'the' and 'brown'
      expect(result.incorrectWords).toBe(2) // 'fast' and 'cat'
      expect(result.accuracy).toBeLessThan(100)
      expect(result.accuracy).toBeGreaterThan(0)
    })

    it('should handle completely incorrect text', () => {
      const typed = ['hello', 'world', 'test']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      expect(result.correctWords).toBe(0)
      expect(result.incorrectWords).toBe(3)
      expect(result.accuracy).toBe(0)
    })

    it('should handle empty typed text', () => {
      const typed: string[] = []
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      expect(result.accuracy).toBe(100)
      expect(result.correctWords).toBe(0)
      expect(result.totalWords).toBe(0)
    })

    it('should handle case insensitivity', () => {
      const typed = ['THE', 'Quick', 'BROWN', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      expect(result.accuracy).toBe(100)
      expect(result.correctWords).toBe(4)
      expect(result.inOrderMatches).toBe(4)
    })

    it('should handle extra whitespace in words', () => {
      const typed = ['  the  ', 'quick', 'brown  ']
      const target = ['the', 'quick', 'brown']
      const result = matchWords(typed, target)

      expect(result.accuracy).toBe(100)
      expect(result.correctWords).toBe(3)
    })

    it('should handle duplicate words correctly', () => {
      const typed = ['the', 'the', 'quick', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      // First 'the' matches position 0, second 'the' has no match
      // 'quick' and 'fox' match their positions
      expect(result.correctWords).toBe(3)
      expect(result.incorrectWords).toBe(1)
    })

    it('should handle words appearing later in audio', () => {
      const typed = ['fox', 'the', 'quick', 'brown']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      // All words are present but in wrong order
      expect(result.correctWords).toBe(4)
      expect(result.incorrectWords).toBe(0)
      // Accuracy should be good but not perfect due to ordering
      expect(result.accuracy).toBeGreaterThan(70)
      expect(result.accuracy).toBeLessThan(100)
    })

    it('should handle longer sequences with mixed accuracy', () => {
      const typed = [
        'the',
        'quick',
        'fox',
        'brown',
        'jumps',
        'over',
        'lazy',
        'the',
        'dog',
      ]
      const target = [
        'the',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog',
      ]
      const result = matchWords(typed, target)

      // Most words should match, some out of order
      expect(result.correctWords).toBeGreaterThan(7)
      expect(result.accuracy).toBeGreaterThan(80)
    })
  })

  describe('matchWordsLCS', () => {
    it('should return perfect accuracy for exact matches', () => {
      const typed = ['the', 'quick', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsLCS(typed, target)

      expect(accuracy).toBe(100)
    })

    it('should handle out-of-order words', () => {
      const typed = ['quick', 'the', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsLCS(typed, target)

      // LCS would find 'brown', 'fox' as common subsequence
      expect(accuracy).toBeGreaterThan(0)
      expect(accuracy).toBeLessThan(100)
    })

    it('should return 100 for empty typed text', () => {
      const typed: string[] = []
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsLCS(typed, target)

      expect(accuracy).toBe(100)
    })

    it('should handle completely different sequences', () => {
      const typed = ['hello', 'world']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsLCS(typed, target)

      expect(accuracy).toBe(0)
    })
  })

  describe('matchWordsWithWindow', () => {
    it('should return perfect accuracy for exact matches', () => {
      const typed = ['the', 'quick', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsWithWindow(typed, target)

      expect(accuracy).toBe(100)
    })

    it('should match words within position window', () => {
      const typed = ['the', 'brown', 'quick', 'fox']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsWithWindow(typed, target, 2)

      // 'brown' at position 1 should match target 'brown' at position 2 (within window)
      // 'quick' at position 2 should match target 'quick' at position 1 (within window)
      expect(accuracy).toBeGreaterThan(75)
    })

    it('should not match words outside position window', () => {
      const typed = ['fox', 'the', 'quick', 'brown']
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsWithWindow(typed, target, 1)

      // With small window, words far from expected position won't match
      expect(accuracy).toBeLessThan(100)
    })

    it('should handle empty typed text', () => {
      const typed: string[] = []
      const target = ['the', 'quick', 'brown', 'fox']
      const accuracy = matchWordsWithWindow(typed, target)

      expect(accuracy).toBe(100)
    })

    it('should allow custom window sizes', () => {
      const typed = ['the', 'quick', 'fox', 'brown']
      const target = ['the', 'quick', 'brown', 'fox']

      const accuracySmallWindow = matchWordsWithWindow(typed, target, 1)
      const accuracyLargeWindow = matchWordsWithWindow(typed, target, 5)

      // Larger window should have better or equal accuracy
      expect(accuracyLargeWindow).toBeGreaterThanOrEqual(accuracySmallWindow)
    })
  })

  describe('Real-world scenarios', () => {
    it('should handle speech recognition errors gracefully', () => {
      // User says: "I want to go to the store"
      // System hears: "I want go to the store"
      const typed = ['I', 'want', 'go', 'to', 'the', 'store']
      const target = ['I', 'want', 'to', 'go', 'to', 'the', 'store']
      const result = matchWords(typed, target)

      // Should recognize most words are correct
      expect(result.correctWords).toBeGreaterThan(4)
      expect(result.accuracy).toBeGreaterThan(60)
    })

    it('should handle hesitation and repeated words', () => {
      // User says: "the the quick brown"
      const typed = ['the', 'the', 'quick', 'brown']
      const target = ['the', 'quick', 'brown', 'fox']
      const result = matchWords(typed, target)

      // Should not completely fail due to repetition
      expect(result.accuracy).toBeGreaterThan(50)
    })

    it('should handle words spoken too early', () => {
      // User rushes ahead and says words before they appear in audio
      const typed = ['jumps', 'the', 'quick', 'brown', 'fox']
      const target = ['the', 'quick', 'brown', 'fox', 'jumps']
      const result = matchWords(typed, target)

      // All words are correct, just in different order
      expect(result.correctWords).toBe(5)
      expect(result.accuracy).toBeGreaterThan(70)
    })
  })
})
