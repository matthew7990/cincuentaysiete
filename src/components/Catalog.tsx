import { Minus, Plus } from 'lucide-react'
import PizzaArt from './PizzaArt'
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  PRODUCTS,
  formatPrice,
  type Product,
} from '@/data/products'
import { useCart } from '@/store/cart'

function Badge({ kind }: { kind: NonNullable<Product['badge']> }) {
  const styles =
    kind === 'promo'
      ? 'bg-tomate text-crema'
      : 'bg-albahaca text-crema'
  const label = kind === 'promo' ? 'PROMO' : 'NUEVO'
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${styles}`}>
      {label}
    </span>
  )
}

function ProductCard({ p }: { p: Product }) {
  const qty = useCart((s) => s.items[p.id] ?? 0)
  const add = useCart((s) => s.add)
  const remove = useCart((s) => s.remove)

  return (
    <article className="group flex flex-col rounded-2xl border border-crema/10 bg-noche-2 p-5 transition-colors hover:border-queso/30">
      <div className="flex items-start justify-between">
        <PizzaArt toppings={p.toppings} size={96} />
        <div className="flex flex-col items-end gap-2">
          {p.badge && <Badge kind={p.badge} />}
          {p.size && (
            <span className="text-[11px] uppercase tracking-wider text-crema-dim">{p.size}</span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-xl uppercase">{p.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-crema-dim">{p.desc}</p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          {p.originalPrice && (
            <p className="text-xs text-crema-dim line-through">{formatPrice(p.originalPrice)}</p>
          )}
          <p className="font-display text-2xl text-queso">{formatPrice(p.price)}</p>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => add(p.id)}
            className="rounded-full bg-tomate px-4 py-2 text-sm font-semibold text-crema transition-colors hover:bg-tomate-deep"
          >
            Agregar
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-full border border-queso/40 px-2 py-1">
            <button
              onClick={() => remove(p.id)}
              aria-label={`Quitar una ${p.name}`}
              className="p-1 text-crema-dim hover:text-crema"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-4 text-center font-semibold">{qty}</span>
            <button
              onClick={() => add(p.id)}
              aria-label={`Agregar una ${p.name}`}
              className="p-1 text-crema-dim hover:text-crema"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default function Catalog() {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="font-display text-4xl md:text-5xl uppercase">
        Elegí tus <span className="text-tomate">pizzas</span>
      </h2>
      <p className="mt-3 max-w-lg text-crema-dim">
        Todas congeladas, de 8 porciones, listas para hornear. Armá el pedido acá
        y lo mandás por WhatsApp.
      </p>

      {CATEGORY_ORDER.map((cat) => (
        <div key={cat} className="mt-12">
          <h3 className="font-display text-lg uppercase tracking-wider text-queso">
            {CATEGORY_LABEL[cat]}
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.category === cat).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
