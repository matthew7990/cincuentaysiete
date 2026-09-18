// Badge estrella tipo sticker de promo ("¡NUEVO!", "-30%")
export default function Starburst({
  text,
  sub,
  className = '',
  color = 'bg-rojo',
}: {
  text: string
  sub?: string
  className?: string
  color?: string
}) {
  // Poligono estrella de 16 puntas
  const points = Array.from({ length: 32 }, (_, i) => {
    const angle = (i * Math.PI) / 16
    const r = i % 2 === 0 ? 50 : 38
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <div className={`relative ${className}`} role="img" aria-label={text}>
      <svg viewBox="0 0 100 100" className={`w-full ${color} drop-shadow-[3px_3px_0_#241a14]`}>
        <polygon points={points} fill="currentColor" stroke="#241a14" strokeWidth="2.5" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          <p className="font-retro text-[clamp(0.7rem,2vw,1.1rem)] text-blanco">{text}</p>
          {sub && <p className="font-ticket text-[clamp(0.5rem,1.4vw,0.75rem)] text-blanco/90 mt-0.5">{sub}</p>}
        </div>
      </div>
    </div>
  )
}
