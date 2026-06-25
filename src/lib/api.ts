import { clearAuthToken, getAuthToken } from './auth'

export type StoredCredential = {
  id: number
  username: string
  password: string
  submittedAt: string
}

export type LoginResponse = {
  success: boolean
  token: string
  message: string
}

export type DataResponse = {
  count: number
  data: StoredCredential[]
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error ?? 'Request failed')
  }

  return payload as T
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  return parseJsonResponse<LoginResponse>(response)
}

export async function fetchStoredData(): Promise<DataResponse> {
  const token = getAuthToken()

  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch('/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) {
    clearAuthToken()
    throw new Error('Session expired. Please log in again.')
  }

  return parseJsonResponse<DataResponse>(response)
}
