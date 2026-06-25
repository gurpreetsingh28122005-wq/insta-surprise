import { activeSessions } from './store.js'

export function createSessionToken() {
  const token = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`
  activeSessions.add(token)
  return token
}

export function validateSession(authorization) {
  if (!authorization?.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }

  const token = authorization.slice('Bearer '.length)
  if (!activeSessions.has(token)) {
    return { ok: false, status: 401, error: 'Invalid or expired session' }
  }

  return { ok: true, token }
}
