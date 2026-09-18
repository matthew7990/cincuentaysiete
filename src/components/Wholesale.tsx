import { Boxes, Handshake, PartyPopper } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

const POINTS = [
  {
    icon: Boxes,
    title: 'Precios por cantidad',
    text: 'Almacenes, rotiserías, dietéticas y autoservicios. Lista mayorista por WhatsApp.',
  },
  {
    icon: PartyPopper,
    title: 'Eventos y cumples',
    text: 'Pedidos grandes para cumpleaños y reuniones, coordinados con anticipación.',
  },
  {
    icon: Handshake,
    title: 'Producto que se vende solo',
    text: 'Pizza casera congelada, de rotación rápida y con margen para el revendedor.',
  },
]

export default function Wholesale() {
  return (
    <section id="mayoristas" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="rounded-3xl border border-queso/25 bg-gradient-to-br from-noche-2 to-carbon p-8 md:p-12">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-queso">
          Mayoristas
        </p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl uppercase">
          ¿Vendés? <span className="text-tomate">Surtí tu local</span>
        </h2>
        <p className="mt-4 max-w-xl text-crema-dim">
          Trabajamos con mayoristas y particulares. Pizzas congeladas listas
          para exhibir y vender, hechas artesanalmente en Villa Urquiza.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title}>
              <p.icon size={24} className="text-queso" />
              <h3 className="mt-3 font-display uppercase">{p.title}</h3>
              <p className="mt-1.5 text-sm text-crema-dim">{p.text}</p>
            </div>
          ))}
        </div>

        <a
          href={waLink('Hola 57! Quiero consultar por venta mayorista.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-queso px-6 py-3 font-semibold text-noche hover:bg-queso-deep transition-colors"
        >
          Consultar por mayor
        </a>
      </div>
    </section>
  )
}
