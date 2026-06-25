import instagramLogo from '../assets/instagram-logo.png'

export function InstagramLogo() {
  return (
    <img
      src={instagramLogo}
      alt="Instagram"
      className="mb-3 h-[51px] w-auto select-none"
      draggable={false}
    />
  )
}
