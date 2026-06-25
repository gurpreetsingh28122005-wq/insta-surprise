import { type FormEvent, useState } from 'react'
import { FacebookIcon } from './FacebookIcon'
import { InstagramLogo } from './InstagramLogo'
import { TextInput } from './TextInput'
import { LoginButton } from './LoginButton'
import { OrDivider } from './OrDivider'

export function LoginBox() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = username.trim().length > 0 && password.trim().length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isFormValid) return
  }

  return (
    <div className="w-full max-w-[350px]">
      <div className="rounded-[1px] border border-instagram-border bg-white px-10 pb-5 pt-10 max-sm:px-8 max-sm:pt-8">
        <div className="mb-6 flex justify-center">
          <InstagramLogo />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <TextInput
            id="username"
            label="Phone number, username, or email"
            type="text"
            value={username}
            onChange={setUsername}
            autoComplete="username"
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />

          <LoginButton disabled={!isFormValid} />

          <OrDivider />

          <button
            type="button"
            className="flex items-center justify-center gap-2 text-[14px] font-semibold text-[#385185] transition-opacity hover:opacity-70"
          >
            <FacebookIcon className="size-4 text-[#385185]" />
            Log in with Facebook
          </button>
        </form>

        <a
          href="#"
          className="mt-[18px] block text-center text-[12px] text-[#00376b] hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <div className="mt-2.5 rounded-[1px] border border-instagram-border bg-white px-10 py-5 text-center text-[14px] text-instagram-text max-sm:px-8">
        Don&apos;t have an account?{' '}
        <a href="#" className="font-semibold text-instagram-blue hover:underline">
          Sign up
        </a>
      </div>
    </div>
  )
}
