import { Minus, Plus } from 'lucide-react'
import PizzaArt from './PizzaArt'
import SmartImage from './SmartImage'
import { CATEGORY_LABEL, CATEGORY_ORDER, formatPrice } from '@/lib/utils'
import { useSite } from '@/lib/site'
import { useCart } from '@/store/cart'
import type { Product } from '@/types'

function Badge({ kind }: { kind: NonNullable<Product['badge']> }) {
  const styles = kind === 'promo' ? 'bg-rojo' : 'bg-verde'
  const label = kind === 'promo' ? '¡PROMO!' : '¡NUEVA!'
  return (
    <span
      className={`border-ink shadow-hard-xs px-2.5 py-0.5 font-retro text-[11px] uppercase text-blanco -rotate-3 ${styles}`}
    >
      {label}
    </span>
  )
}

function ProductCard({ p }: { p: Product }) {
  const qty = useCart((s) => s.items[p.id] ?? 0)
  const add = useCart((s) => s.add)
  const remove = useCart((s) => s.remove)

  return (
    <article className="group flex flex-col border-ink shadow-hard bg-blanco p-5 transition-transform hover:-translate-y-1">
      <div className="relative">
        <div className="border-ink bg-papel aspect-square overflow-hidden grid place-items-center">
          <SmartImage
            base={`fotos/${p.id}`}
            alt={`Pizza ${p.name} de 57`}
            className="w-full h-full object-cover"
            fallback={<PizzaArt toppings={p.toppings} size={150} />}
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          {p.badge && <Badge kind={p.badge} />}
          {p.size && (
            <span className="font-ticket text-[11px] uppercase bg-blanco border-2 border-tinta px-1.5 py-0.5">
              {p.size}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-retro text-xl uppercase">{p.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-tinta/70">{p.desc}</p>

      <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-dashed border-tinta/25 pt-4">
        <div>
          {p.originalPrice && (
            <p className="font-ticket text-xs text-tinta/50 line-through">
              {formatPrice(p.originalPrice)}
            </p>
          )}
          <p className="font-ticket text-2xl font-bold text-rojo">{formatPrice(p.price)}</p>
        </div>

        {qty === 0 ? (
          <button onClick={() => add(p.id)} className="btn-retro bg-teal text-blanco">
            Agregar
          </button>
        ) : (
          <div className="flex items-center gap-2 border-ink shadow-hard-xs bg-sol px-2 py-1">
            <button
              onClick={() => remove(p.id)}
              aria-label={`Quitar una ${p.name}`}
              className="p-1 hover:text-rojo"
            >
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="min-w-5 text-center font-ticket font-bold">{qty}</span>
            <button
              onClick={() => add(p.id)}
              aria-label={`Agregar una ${p.name}`}
              className="p-1 hover:text-rojo"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default function Catalog() {
  const { products } = useSite()
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="font-retro text-4xl md:text-5xl uppercase">
          Elegí tus <span className="text-rojo">pizzas</span>
        </h2>
        <span className="font-script text-2xl text-teal rotate-[-2deg]">todas congeladas</span>
      </div>
      <p className="mt-4 max-w-lg font-medium text-tinta/75">
        De 8 porciones, listas para hornear. Armá el pedido acá y lo mandás
        directo por WhatsApp.
      </p>

      {CATEGORY_ORDER.map((cat) => (
        <div key={cat} className="mt-12">
          <h3 className="font-retro text-lg uppercase inline-block border-b-4 border-sol pb-1">
            {CATEGORY_LABEL[cat]}
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p) => p.category === cat).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
