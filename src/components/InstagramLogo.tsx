import instagramLogo from '../assets/instagram-logo.png'

export function InstagramLogo() {
  return (
    <img
      src={instagramLogo}
      alt="Instagram"
      className="h-[80px] w-[80px] select-none"
      draggable={false}
    />
  )
}
