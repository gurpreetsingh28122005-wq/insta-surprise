// In-memory database for educational purposes only.
// IMPORTANT: In a real-world scenario, passwords should always be hashed
// using bcrypt before storage. Never persist plaintext passwords.
//
// VERCEL NOTE: This data resets on every cold start and is not shared
// across serverless instances. Use a real database for production.
export const credentialsStore = []
export const activeSessions = new Set()
