import { useState, type ReactNode } from 'react'

const EXTS = ['jpg', 'jpeg', 'png', 'webp']
const BASE = import.meta.env.BASE_URL // '/' en dev, '/cincuentaysiete/' en prod

// Prueba {base}.{jpg,jpeg,png,webp} en orden; si ninguna existe muestra el fallback.
export default function SmartImage({
  base,
  alt,
  className,
  fallback,
}: {
  base: string // sin extension, ej: 'fotos/muzza'
  alt: string
  className?: string
  fallback: ReactNode
}) {
  const [i, setI] = useState(0)
  if (i >= EXTS.length) return <>{fallback}</>
  return (
    <img
      src={`${BASE}${base}.${EXTS[i]}`}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setI(i + 1)}
    />
  )
}
