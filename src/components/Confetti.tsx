import type { ReactNode } from 'react'

// Confeti Memphis ochentero: zigzags, triangulos, aros, cruces.
// Posiciones fijas (deterministas) - decorativo puro.
const SHAPES: { svg: ReactNode; className: string }[] = [
  {
    className: 'top-[8%] left-[4%] w-16 text-teal rotate-12',
    svg: (
      <polyline points="0,20 10,4 20,20 30,4 40,20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    className: 'top-[16%] right-[6%] w-10 text-rosa -rotate-12',
    svg: <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="5" />,
  },
  {
    className: 'top-[55%] left-[2%] w-9 text-sol rotate-45',
    svg: <polygon points="12,2 22,22 2,22" fill="currentColor" />,
  },
  {
    className: 'top-[70%] right-[3%] w-14 text-rojo rotate-6',
    svg: (
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </g>
    ),
  },
  {
    className: 'bottom-[12%] left-[38%] w-14 text-verde -rotate-6',
    svg: (
      <polyline points="0,16 8,2 16,16 24,2 32,16 40,2 48,16" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    className: 'top-[38%] left-[46%] w-6 text-teal',
    svg: <circle cx="12" cy="12" r="10" fill="currentColor" />,
  },
  {
    className: 'bottom-[28%] right-[42%] w-8 text-sol rotate-12',
    svg: <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="5" />,
  },
]

export default function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <svg key={i} viewBox="0 0 48 26" className={`absolute ${s.className}`}>
          {s.svg}
        </svg>
      ))}
    </div>
  )
}
