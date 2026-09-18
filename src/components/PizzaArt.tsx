import type { Topping } from '@/data/products'

// Arte SVG de la pizza: cada topping dibuja sus propias formas.
// Posiciones deterministas para que no cambien en cada render.
const SPOTS: [number, number][] = [
  [-14, -10], [10, -16], [16, 6], [-8, 14], [2, -2], [-18, 4], [18, -8], [6, 16],
]

function ToppingShapes({ t, i }: { t: Topping; i: number }) {
  const [x, y] = SPOTS[i % SPOTS.length]
  switch (t) {
    case 'muzza':
      return <ellipse cx={x} cy={y} rx="7" ry="5.5" fill="#f8e3a1" opacity="0.95" />
    case 'tomate':
      return <circle cx={x} cy={y} r="5.5" fill="#c93420" />
    case 'cebolla':
      return <circle cx={x} cy={y} r="4.5" fill="none" stroke="#f3e7c9" strokeWidth="1.6" opacity="0.9" />
    case 'jamon':
      return <rect x={x - 5} y={y - 4} width="10" height="8" rx="1.5" fill="#e58a8a" transform={`rotate(${i * 25} ${x} ${y})`} />
    case 'morron':
      return <rect x={x - 6} y={y - 2} width="12" height="4" rx="2" fill="#7fae4c" transform={`rotate(${i * 40} ${x} ${y})`} />
    case 'aceituna':
      return <circle cx={x} cy={y} r="3" fill="#3a3230" stroke="#6b5f5a" strokeWidth="1" />
    case 'calabresa':
      return <circle cx={x} cy={y} r="5" fill="#8f2418" stroke="#c93420" strokeWidth="1" />
    case 'provenzal':
      return <circle cx={x} cy={y} r="1.6" fill="#4e7a3a" />
    case 'cherry':
      return <circle cx={x} cy={y} r="4" fill="#d64a2f" stroke="#a8321c" strokeWidth="1" />
  }
}

export default function PizzaArt({ toppings, size = 120 }: { toppings: Topping[]; size?: number }) {
  const spread = Array.from({ length: 8 }, (_, i) => toppings[i % toppings.length])
  return (
    <svg viewBox="-32 -32 64 64" width={size} height={size} role="img" aria-hidden="true">
      <circle r="30" fill="#eec27a" />
      <circle r="30" fill="none" stroke="#d99827" strokeWidth="3.5" />
      <circle r="25" fill="#c2401f" />
      <circle r="24" fill="#f2b33d" opacity="0.94" />
      {spread.map((t, i) => (
        <ToppingShapes key={i} t={t} i={i} />
      ))}
    </svg>
  )
}
