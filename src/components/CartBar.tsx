import { useMemo, useState } from 'react'
import { MessageCircle, Minus, Plus, Receipt, Trash2, X } from 'lucide-react'
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
      {/* Ticket del pedido */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-tinta/60"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-full w-full max-w-md bg-papel border-l-4 border-tinta p-6 flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-retro text-2xl uppercase flex items-center gap-2">
                <Receipt size={22} className="text-rojo" /> Tu pedido
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="p-2 border-ink shadow-hard-xs bg-blanco hover:bg-papel-2"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="mt-6 flex-1 space-y-3 font-ticket">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 border-2 border-tinta/20 bg-blanco px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="font-bold truncate">{product.name}</p>
                    <p className="text-xs text-tinta/60">
                      {formatPrice(product.price)} c/u
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => remove(product.id)}
                      className="p-1 border-2 border-tinta bg-papel hover:bg-sol"
                      aria-label="Quitar"
                    >
                      <Minus size={13} strokeWidth={3} />
                    </button>
                    <span className="min-w-5 text-center font-bold">{qty}</span>
                    <button
                      onClick={() => add(product.id)}
                      className="p-1 border-2 border-tinta bg-papel hover:bg-sol"
                      aria-label="Agregar"
                    >
                      <Plus size={13} strokeWidth={3} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-ink shadow-hard bg-blanco p-5 ticket-edge">
              <div className="flex items-center justify-between font-ticket">
                <p className="text-sm uppercase text-tinta/60">Total estimado</p>
                <p className="text-3xl font-bold text-rojo">{formatPrice(total)}</p>
              </div>
              <a
                href={waLink(orderMessage(lines, total))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-retro bg-verde text-blanco w-full justify-center mt-4 py-3.5"
              >
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </a>
              <button
                onClick={clear}
                className="mt-4 flex w-full items-center justify-center gap-2 font-ticket text-xs uppercase text-tinta/60 hover:text-rojo"
              >
                <Trash2 size={13} /> Vaciar pedido
              </button>
            </div>
            <p className="mt-3 text-center font-ticket text-[11px] text-tinta/50 pb-4">
              * El pedido llega como mensaje de WhatsApp. Entrega y pago se
              coordinan por chat.
            </p>
          </aside>
        </div>
      )}

      {/* Barra flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 inset-x-4 z-50 mx-auto flex max-w-md items-center justify-between border-ink shadow-hard bg-sol px-5 py-3.5 font-retro text-tinta hover:bg-[#d99827] transition-colors"
      >
        <span className="flex items-center gap-2 uppercase text-sm">
          <Receipt size={18} />
          Ver pedido ({count})
        </span>
        <span className="font-ticket text-lg font-bold">{formatPrice(total)}</span>
      </button>
    </>
  )
}
