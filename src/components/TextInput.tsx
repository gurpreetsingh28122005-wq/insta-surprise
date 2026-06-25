import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type TextInputProps = {
  id: string
  placeholder: string
  type?: 'text' | 'password' | 'email'
  value: string
  onChange: (value: string) => void
  autoComplete?: string
}

export function TextInput({
  id,
  placeholder,
  type = 'text',
  value,
  onChange,
  autoComplete,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="relative">
      <input
        id={id}
        type={inputType}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className={`w-full rounded-xl border border-ig-dark-border bg-ig-dark-bg px-4 py-[13px] text-[14px] leading-5 text-ig-dark-text outline-none transition-colors placeholder:text-ig-dark-placeholder focus:border-[#3d4f5f] ${
          isPassword ? 'pr-11' : ''
        }`}
      />
      {isPassword && value.length > 0 && (
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ig-dark-text-muted transition-colors hover:text-ig-dark-text"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="size-5" strokeWidth={1.75} />
          ) : (
            <Eye className="size-5" strokeWidth={1.75} />
          )}
        </button>
      )}
    </div>
  )
}
