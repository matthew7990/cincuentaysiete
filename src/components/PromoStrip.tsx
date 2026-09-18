const ITEMS = [
  '3 DE MUZZA $21.000',
  '3 DE SABORES $27.000',
  'CONGELADAS · LISTAS PARA HORNEAR',
  'PEDÍ POR WHATSAPP',
]

export default function PromoStrip() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden bg-tomate py-2.5 -rotate-1">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="font-display text-sm uppercase tracking-widest text-crema">
            {t} <span className="text-queso mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
