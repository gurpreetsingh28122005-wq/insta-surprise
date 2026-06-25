import { credentialsStore } from './store.js'
import { createSessionToken, validateSession } from './auth.js'

export function handleLogin(body) {
  const { username, password } = body ?? {}

  if (!username?.trim()) {
    return { status: 400, body: { error: 'Username is required' } }
  }

  const entry = {
    id: credentialsStore.length + 1,
    username: username.trim(),
    // IMPORTANT: In production, store bcrypt.hash(password, 10) instead of plaintext.
    password: typeof password === 'string' ? password : '',
    submittedAt: new Date().toISOString(),
  }

  credentialsStore.push(entry)

  const token = createSessionToken()

  return {
    status: 201,
    body: {
      success: true,
      token,
      message: 'Login recorded successfully',
    },
  }
}

export function handleGetData(authorization) {
  const session = validateSession(authorization)

  if (!session.ok) {
    return { status: session.status, body: { error: session.error } }
  }

  return {
    status: 200,
    body: {
      count: credentialsStore.length,
      data: credentialsStore,
    },
  }
}
