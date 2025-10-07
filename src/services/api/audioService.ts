const API_BASE_URL = '/api/audio'

export interface AudioFile {
  _id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  title: string
  artist?: string
  genre?: string
  duration?: number
  uploadedAt: Date
}

export interface SourceFile {
  filename: string
  url: string
}

export interface UploadAudioData {
  file: File
  title: string
  artist?: string
  genre?: string
}

export interface UpdateAudioData {
  title?: string
  artist?: string
  genre?: string
}

export interface AudioParams {
  genre?: string
  limit?: number
  page?: number
  search?: string
}

class AudioService {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async uploadAudio(data: UploadAudioData) {
    const formData = new FormData()
    formData.append('audio', data.file)
    formData.append('title', data.title)
    if (data.artist) formData.append('artist', data.artist)
    if (data.genre) formData.append('genre', data.genre)

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeader(),
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload audio')
    }

    return response.json()
  }

  async getAudioFiles(params?: AudioParams) {
    const queryParams = new URLSearchParams()
    if (params?.genre) queryParams.append('genre', params.genre)
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.search) queryParams.append('search', params.search)

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch audio files')
    }

    return response.json()
  }

  async getSourceFiles(): Promise<{ files: SourceFile[] }> {
    const response = await fetch(`${API_BASE_URL}/source-files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch source files')
    }

    return response.json()
  }

  async getAudioFile(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch audio file')
    }

    return response.json()
  }

  getStreamUrl(id: string): string {
    return `${API_BASE_URL}/${id}/stream`
  }

  getSourceFileStreamUrl(filename: string): string {
    return `${API_BASE_URL}/source-files/stream/${encodeURIComponent(filename)}`
  }

  async updateAudioFile(id: string, data: UpdateAudioData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update audio file')
    }

    return response.json()
  }

  async deleteAudioFile(id: string) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete audio file')
    }

    return response.json()
  }

  async getGenres() {
    const response = await fetch(`${API_BASE_URL}/meta/genres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch genres')
    }

    return response.json()
  }
}

export default new AudioService()
