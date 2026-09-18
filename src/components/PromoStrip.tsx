const ITEMS = [
  '3 DE MUZZA $21.000',
  '3 DE SABORES $27.000',
  'CONGELADAS · LISTAS PARA HORNEAR',
  'PEDÍ POR WHATSAPP',
]

export default function PromoStrip() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden bg-rojo border-y-4 border-tinta py-3">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="font-retro text-sm uppercase text-blanco flex items-center gap-10">
            {t}
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-sol" fill="currentColor" aria-hidden="true">
              <path d="M12 0l2.6 9.4H24l-7.6 5.5 2.9 9.1-7.3-5.6-7.3 5.6 2.9-9.1L0 9.4h9.4z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
