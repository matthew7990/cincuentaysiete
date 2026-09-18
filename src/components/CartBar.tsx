import { useMemo, useState } from 'react'
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/data/products'
import { orderMessage, waLink, type CartLine } from '@/lib/whatsapp'
import { useCart } from '@/store/cart'

export default function CartBar() {
  const items = useCart((s) => s.items)
  const add = useCart((s) => s.add)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)
  const [open, setOpen] = useState(false)

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(items)
        .map(([id, qty]) => {
          const product = PRODUCTS.find((p) => p.id === id)
          return product ? { product, qty } : null
        })
        .filter((l): l is CartLine => l !== null),
    [items],
  )

  const total = lines.reduce((acc, l) => acc + l.product.price * l.qty, 0)
  const count = lines.reduce((acc, l) => acc + l.qty, 0)

  if (count === 0) return null

  return (
    <>
      {/* Panel del pedido */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-noche/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-full w-full max-w-md bg-noche-2 border-l border-crema/10 p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase">Tu pedido</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="p-2 text-crema-dim hover:text-crema">
                <X size={20} />
              </button>
            </div>

            <ul className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center justify-between gap-3 rounded-xl border border-crema/10 p-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{product.name}</p>
                    <p className="text-sm text-crema-dim">{formatPrice(product.price)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => remove(product.id)} className="p-1.5 rounded-full border border-crema/15 text-crema-dim hover:text-crema" aria-label="Quitar">
                      <Minus size={14} />
                    </button>
                    <span className="min-w-5 text-center font-semibold">{qty}</span>
                    <button onClick={() => add(product.id)} className="p-1.5 rounded-full border border-crema/15 text-crema-dim hover:text-crema" aria-label="Agregar">
                      <Plus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-crema/10 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-crema-dim">Total estimado</p>
                <p className="font-display text-3xl text-queso">{formatPrice(total)}</p>
              </div>
              <a
                href={waLink(orderMessage(lines, total))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-tomate px-6 py-3.5 font-semibold text-crema hover:bg-tomate-deep transition-colors"
              >
                <MessageCircle size={18} />
                Enviar pedido por WhatsApp
              </a>
              <button
                onClick={clear}
                className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-crema-dim hover:text-crema"
              >
                <Trash2 size={14} /> Vaciar pedido
              </button>
              <p className="mt-3 text-center text-xs text-crema-dim">
                El pedido se envía como mensaje de WhatsApp. Entrega y pago se coordinan por chat.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Barra flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 inset-x-4 z-50 mx-auto flex max-w-md items-center justify-between rounded-full bg-queso px-5 py-3.5 font-semibold text-noche shadow-xl shadow-black/40 hover:bg-queso-deep transition-colors"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag size={18} />
          {count} {count === 1 ? 'ítem' : 'ítems'}
        </span>
        <span className="font-display">{formatPrice(total)}</span>
      </button>
    </>
  )
}
