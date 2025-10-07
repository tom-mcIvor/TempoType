// const API_BASE_URL = '/api/auth'

// export interface RegisterData {
//   username: string
//   email: string
//   password: string
// }

// export interface LoginData {
//   email: string
//   password: string
// }

// export interface UpdateProfileData {
//   username?: string
//   email?: string
// }

// export interface ChangePasswordData {
//   currentPassword: string
//   newPassword: string
// }

// export interface User {
//   id: string
//   username: string
//   email: string
//   lastLogin?: Date
//   createdAt: Date
// }

// export interface AuthResponse {
//   message: string
//   token: string
//   user: User
// }

// export interface ProfileResponse {
//   user: User
// }

// class AuthService {
//   private getAuthHeader(): HeadersInit {
//     const token = localStorage.getItem('token')
//     return token ? { Authorization: `Bearer ${token}` } : {}
//   }

//   async register(data: RegisterData): Promise<AuthResponse> {
//     const response = await fetch(`${API_BASE_URL}/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Registration failed')
//     }

//     const result = await response.json()
//     if (result.token) {
//       localStorage.setItem('token', result.token)
//     }
//     return result
//   }

//   async login(data: LoginData): Promise<AuthResponse> {
//     const response = await fetch(`${API_BASE_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Login failed')
//     }

//     const result = await response.json()
//     if (result.token) {
//       localStorage.setItem('token', result.token)
//     }
//     return result
//   }

//   async getProfile(): Promise<ProfileResponse> {
//     const response = await fetch(`${API_BASE_URL}/me`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         ...this.getAuthHeader(),
//       },
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to fetch profile')
//     }

//     return response.json()
//   }

//   async updateProfile(data: UpdateProfileData): Promise<ProfileResponse> {
//     const response = await fetch(`${API_BASE_URL}/me`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         ...this.getAuthHeader(),
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to update profile')
//     }

//     return response.json()
//   }

//   async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
//     const response = await fetch(`${API_BASE_URL}/change-password`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         ...this.getAuthHeader(),
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Failed to change password')
//     }

//     return response.json()
//   }

//   async logout(): Promise<void> {
//     try {
//       await fetch(`${API_BASE_URL}/logout`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...this.getAuthHeader(),
//         },
//       })
//     } finally {
//       localStorage.removeItem('token')
//     }
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token')
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token')
//   }
// }

// export default new AuthService()
