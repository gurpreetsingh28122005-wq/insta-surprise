import surpriseBackground from '../assets/surprise-bg.png'

export function SurprisePage() {
  return (
    <main className="relative min-h-svh w-full overflow-hidden bg-[#0d1117]">
      <img
        src={surpriseBackground}
        alt="i miss you"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </main>
  )
}
