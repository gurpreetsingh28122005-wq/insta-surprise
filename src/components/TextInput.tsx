import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type TextInputProps = {
  id: string
  label: string
  type?: 'text' | 'password' | 'email'
  value: string
  onChange: (value: string) => void
  autoComplete?: string
}

export function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isFloating = isFocused || value.length > 0

  return (
    <div className="relative mb-1.5">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-2 z-10 origin-left text-instagram-text-secondary transition-all duration-150 ease-out ${
          isFloating
            ? 'top-1.5 scale-[0.6667] text-[12px] leading-none'
            : 'top-1/2 -translate-y-1/2 scale-100 text-[12px]'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={inputType}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-[3px] border bg-instagram-input-bg px-2 pb-1.5 pt-[18px] text-[12px] leading-[18px] text-instagram-text outline-none transition-colors ${
          isFocused
            ? 'border-[#a8a8a8] bg-white'
            : 'border-instagram-border hover:border-[#a8a8a8]'
        } ${isPassword ? 'pr-9' : ''}`}
      />
      {isPassword && value.length > 0 && (
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-instagram-text-secondary transition-colors hover:text-instagram-text"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="size-4" strokeWidth={1.75} />
          ) : (
            <Eye className="size-4" strokeWidth={1.75} />
          )}
        </button>
      )}
    </div>
  )
}
