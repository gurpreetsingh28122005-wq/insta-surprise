import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api'
import { setAuthToken } from '../lib/auth'
import { CreateAccountButton } from '../components/CreateAccountButton'
import { InstagramLogo } from '../components/InstagramLogo'
import { LanguageSelector } from '../components/LanguageSelector'
import { LoginButton } from '../components/LoginButton'
import { MetaFooter } from '../components/MetaFooter'
import { TextInput } from '../components/TextInput'

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = username.trim().length > 0 && password.trim().length > 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isFormValid || isLoading) return

    setError('')
    setIsLoading(true)

    try {
      const response = await login(username, password)
      setAuthToken(response.token)
      navigate('/admin')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to log in. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[400px] flex-col bg-ig-dark-bg">
      <LanguageSelector />

      <div className="flex flex-1 flex-col px-4">
        <div className="flex flex-col items-center pt-10">
          <InstagramLogo />

          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <TextInput
                id="username"
                placeholder="Username, email or mobile number"
                type="text"
                value={username}
                onChange={setUsername}
                autoComplete="username"
              />
              <TextInput
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="mt-3 text-center text-[13px] text-red-400" role="alert">
                {error}
              </p>
            )}

            <LoginButton disabled={!isFormValid || isLoading} isLoading={isLoading} />

            <a
              href="#"
              className="mt-4 block text-center text-[14px] font-normal text-ig-dark-text"
            >
              Forgot password?
            </a>
          </form>
        </div>

        <div className="mt-auto w-full pb-2 pt-16">
          <CreateAccountButton />
        </div>
      </div>

      <MetaFooter />
    </div>
  )
}
