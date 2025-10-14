/**
 * Word matching utilities for flexible sequence alignment
 * Handles out-of-order words and provides detailed matching results
 */

export interface WordMatchResult {
  accuracy: number
  correctWords: number
  totalWords: number
  inOrderMatches: number
  outOfOrderMatches: number
  incorrectWords: number
  matchedIndices: Set<number>
}

/**
 * Calculates the Longest Common Subsequence (LCS) length between two arrays
 * This finds the longest sequence of words that appear in the same order in both arrays
 */
function longestCommonSubsequence(arr1: string[], arr2: string[]): number {
  const m = arr1.length
  const n = arr2.length
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}

/**
 * Performs flexible word matching that handles out-of-order words
 * Uses a greedy approach to match words from typed text to target text
 *
 * Algorithm:
 * 1. First pass: Match words that are in the correct position (exact position match)
 * 2. Second pass: Match remaining words that appear anywhere in the target (out-of-order)
 * 3. Count remaining unmatched words as incorrect
 *
 * @param typedWords - Array of words the user typed
 * @param targetWords - Array of expected words
 * @returns Detailed matching results
 */
export function matchWords(
  typedWords: string[],
  targetWords: string[]
): WordMatchResult {
  if (typedWords.length === 0) {
    return {
      accuracy: 100,
      correctWords: 0,
      totalWords: 0,
      inOrderMatches: 0,
      outOfOrderMatches: 0,
      incorrectWords: 0,
      matchedIndices: new Set(),
    }
  }

  // Normalize words (lowercase, trim)
  const typed = typedWords.map((w) => w.toLowerCase().trim())
  const target = targetWords.map((w) => w.toLowerCase().trim())

  // Track which target words have been matched
  const matchedTargetIndices = new Set<number>()
  let inOrderMatches = 0
  let outOfOrderMatches = 0

  // First pass: Match words in correct position
  const minLength = Math.min(typed.length, target.length)
  for (let i = 0; i < minLength; i++) {
    if (typed[i] === target[i]) {
      matchedTargetIndices.add(i)
      inOrderMatches++
    }
  }

  // Second pass: Match remaining words that appear out of order
  for (let i = 0; i < typed.length; i++) {
    // Skip if already matched in-order
    if (i < minLength && typed[i] === target[i]) {
      continue
    }

    // Try to find this word in the target (unmatched positions only)
    for (let j = 0; j < target.length; j++) {
      if (!matchedTargetIndices.has(j) && typed[i] === target[j]) {
        matchedTargetIndices.add(j)
        outOfOrderMatches++
        break // Match each typed word only once
      }
    }
  }

  const correctWords = inOrderMatches + outOfOrderMatches
  const totalWords = typed.length
  const incorrectWords = totalWords - correctWords

  // Calculate accuracy as percentage of correct words
  // We weight in-order matches slightly higher for better accuracy
  const weightedCorrect = inOrderMatches * 1.0 + outOfOrderMatches * 0.8
  const accuracy = totalWords > 0
    ? Math.round((weightedCorrect / totalWords) * 100)
    : 100

  return {
    accuracy,
    correctWords,
    totalWords,
    inOrderMatches,
    outOfOrderMatches,
    incorrectWords,
    matchedIndices: matchedTargetIndices,
  }
}

/**
 * Alternative matching algorithm using Longest Common Subsequence
 * This is more forgiving for words that appear in a different order
 *
 * @param typedWords - Array of words the user typed
 * @param targetWords - Array of expected words
 * @returns Accuracy percentage based on LCS
 */
export function matchWordsLCS(
  typedWords: string[],
  targetWords: string[]
): number {
  if (typedWords.length === 0) return 100
  if (targetWords.length === 0) return 0

  const typed = typedWords.map((w) => w.toLowerCase().trim())
  const target = targetWords.map((w) => w.toLowerCase().trim())

  const lcsLength = longestCommonSubsequence(typed, target)

  // Calculate accuracy based on LCS relative to typed words
  const accuracy = Math.round((lcsLength / typed.length) * 100)

  return accuracy
}

/**
 * Calculates accuracy with a tolerance window for position
 * Words are considered correct if they appear within N positions of expected location
 *
 * @param typedWords - Array of words the user typed
 * @param targetWords - Array of expected words
 * @param windowSize - Number of positions to search (default 3)
 * @returns Accuracy percentage
 */
export function matchWordsWithWindow(
  typedWords: string[],
  targetWords: string[],
  windowSize: number = 3
): number {
  if (typedWords.length === 0) return 100
  if (targetWords.length === 0) return 0

  const typed = typedWords.map((w) => w.toLowerCase().trim())
  const target = targetWords.map((w) => w.toLowerCase().trim())

  const matchedTargetIndices = new Set<number>()
  let correctMatches = 0

  // For each typed word, search within a window around expected position
  for (let i = 0; i < typed.length; i++) {
    const searchStart = Math.max(0, i - windowSize)
    const searchEnd = Math.min(target.length, i + windowSize + 1)

    for (let j = searchStart; j < searchEnd; j++) {
      if (!matchedTargetIndices.has(j) && typed[i] === target[j]) {
        matchedTargetIndices.add(j)
        correctMatches++
        break
      }
    }
  }

  return Math.round((correctMatches / typed.length) * 100)
}
