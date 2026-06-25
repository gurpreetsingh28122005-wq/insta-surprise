type LoginButtonProps = {
  disabled: boolean
}

export function LoginButton({ disabled }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-2 h-8 w-full rounded-lg text-[14px] font-semibold text-white transition-colors ${
        disabled
          ? 'cursor-default bg-instagram-blue-disabled'
          : 'cursor-pointer bg-instagram-blue hover:bg-instagram-blue-hover active:bg-instagram-blue'
      }`}
    >
      Log in
    </button>
  )
}
