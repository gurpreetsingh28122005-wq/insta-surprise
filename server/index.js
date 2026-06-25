import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 3001

// In-memory database for educational purposes only.
// IMPORTANT: In a real-world scenario, passwords should always be hashed
// using bcrypt before storage. Never persist plaintext passwords.
const credentialsStore = []
const activeSessions = new Set()

app.use(cors())
app.use(express.json())

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authorization.slice('Bearer '.length)
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Invalid or expired session' })
  }

  next()
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body ?? {}

  if (!username?.trim()) {
    return res.status(400).json({ error: 'Username is required' })
  }

  const entry = {
    id: credentialsStore.length + 1,
    username: username.trim(),
    // IMPORTANT: In production, store bcrypt.hash(password, 10) instead of plaintext.
    password: typeof password === 'string' ? password : '',
    submittedAt: new Date().toISOString(),
  }

  credentialsStore.push(entry)

  const token = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`
  activeSessions.add(token)

  res.status(201).json({
    success: true,
    token,
    message: 'Login recorded successfully',
  })
})

app.get('/api/data', requireAuth, (_req, res) => {
  res.json({
    count: credentialsStore.length,
    data: credentialsStore,
  })
})

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
