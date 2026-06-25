import express from 'express'
import cors from 'cors'
import { handleGetData, handleLogin } from '../api/_lib/routes.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

app.post('/api/login', (req, res) => {
  const { status, body } = handleLogin(req.body)
  res.status(status).json(body)
})

app.get('/api/data', (req, res) => {
  const { status, body } = handleGetData(req.headers.authorization)
  res.status(status).json(body)
})

app.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}`)
})
