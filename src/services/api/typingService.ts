// const API_BASE_URL = '/api/typing'

// export interface TypingText {
//   _id: string
//   title: string
//   content: string
//   difficulty: 'easy' | 'medium' | 'hard'
//   category: string
//   wordCount: number
//   createdAt: Date
// }

// export interface TypingSession {
//   _id: string
//   userId: string
//   textId: string | TypingText
//   audioFileId?: string
//   wpm: number
//   accuracy: number
//   duration: number
//   errorCount: number
//   completedAt: Date
// }

// export interface SubmitSessionData {
//   textId: string
//   audioFileId?: string
//   wpm: number
//   accuracy: number
//   duration: number
//   errorCount: number
// }

// export interface TypingStats {
//   totalSessions: number
//   averageWpm: number
//   averageAccuracy: number
//   bestWpm: number
//   bestAccuracy: number
//   totalTimeTyped: number
//   recentSessions: TypingSession[]
// }

// export interface LeaderboardEntry {
//   _id: string
//   username: string
//   bestWpm: number
//   bestAccuracy: number
//   totalSessions: number
//   averageWpm: number
//   averageAccuracy: number
// }

// export interface PaginationParams {
//   page?: number
//   limit?: number
// }

// export interface TextsParams extends PaginationParams {
//   difficulty?: string
//   category?: string
// }

// export interface SessionsParams extends PaginationParams {
//   sortBy?: string
//   sortOrder?: 'asc' | 'desc'
// }

// class TypingService {
//   private getAuthHeader(): HeadersInit {
//     const token = localStorage.getItem('token')
//     return token ? { Authorization: `Bearer ${token}` } : {}
//   }

//   async getTexts(params?: TextsParams) {
//     const queryParams = new URLSearchParams()
//     if (params?.difficulty) queryParams.append('difficulty', params.difficulty)
//     if (params?.category) queryParams.append('category', params.category)
//     if (params?.limit) queryParams.append('limit', params.limit.toString())
//     if (params?.page) queryParams.append('page', params.page.toString())

//     const response = await fetch(
//       `${API_BASE_URL}/texts?${queryParams.toString()}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch texts')
//     }

//     return response.json()
//   }

//   async getText(id: string) {
//     const response = await fetch(`${API_BASE_URL}/texts/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch text')
//     }

//     return response.json()
//   }

//   async getRandomText() {
//     const response = await fetch(`${API_BASE_URL}/texts/random`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch random text')
//     }

//     return response.json()
//   }

//   async getRandomTextByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
//     const response = await fetch(
//       `${API_BASE_URL}/texts/random/${difficulty}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch random text')
//     }

//     return response.json()
//   }

//   async submitSession(data: SubmitSessionData) {
//     const response = await fetch(`${API_BASE_URL}/sessions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         ...this.getAuthHeader(),
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to submit session')
//     }

//     return response.json()
//   }

//   async getSessions(params?: SessionsParams) {
//     const queryParams = new URLSearchParams()
//     if (params?.limit) queryParams.append('limit', params.limit.toString())
//     if (params?.page) queryParams.append('page', params.page.toString())
//     if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
//     if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)

//     const response = await fetch(
//       `${API_BASE_URL}/sessions?${queryParams.toString()}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           ...this.getAuthHeader(),
//         },
//       }
//     )

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch sessions')
//     }

//     return response.json()
//   }

//   async getStats(): Promise<TypingStats> {
//     const response = await fetch(`${API_BASE_URL}/stats`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         ...this.getAuthHeader(),
//       },
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch stats')
//     }

//     return response.json()
//   }

//   async getLeaderboard(type: 'wpm' | 'accuracy' = 'wpm', limit: number = 10) {
//     const queryParams = new URLSearchParams()
//     queryParams.append('type', type)
//     queryParams.append('limit', limit.toString())

//     const response = await fetch(
//       `${API_BASE_URL}/leaderboard?${queryParams.toString()}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch leaderboard')
//     }

//     return response.json()
//   }
// }

// export default new TypingService()
