type LoginButtonProps = {
  disabled: boolean
  isLoading?: boolean
}

export function LoginButton({ disabled, isLoading = false }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-3 w-full rounded-xl py-[11px] text-[14px] font-semibold text-white transition-opacity ${
        disabled
          ? 'cursor-default bg-ig-blue-disabled'
          : 'cursor-pointer bg-ig-blue hover:bg-ig-blue-hover active:opacity-90'
      }`}
    >
      {isLoading ? 'Logging in...' : 'Log in'}
    </button>
  )
}
