import { getAuthToken } from './auth'
import { supabase, type UserLoginRow } from './supabase'

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

function mapUserLoginRow(row: UserLoginRow): StoredCredential {
  return {
    id: row.id,
    username: row.username,
    password: row.password,
    submittedAt: row.created_at,
  }
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  if (!username.trim()) {
    throw new Error('Username is required')
  }

  const { error } = await supabase.from('user_logins').insert({
    username: username.trim(),
    // IMPORTANT: In production, passwords should be hashed with bcrypt before storage.
    password: typeof password === 'string' ? password : '',
  })

  if (error) {
    throw new Error(error.message)
  }

  return {
    success: true,
    token: `session-${Date.now()}`,
    message: 'Login recorded successfully',
  }
}

export async function fetchStoredData(): Promise<DataResponse> {
  if (!getAuthToken()) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('user_logins')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  const rows = (data ?? []) as UserLoginRow[]

  return {
    count: rows.length,
    data: rows.map(mapUserLoginRow),
  }
}
