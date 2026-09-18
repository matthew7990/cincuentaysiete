import { Boxes, Handshake, PartyPopper } from 'lucide-react'
import Starburst from './Starburst'
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
      <div className="relative border-ink shadow-hard bg-rojo bg-halftone-rojo p-8 md:p-12">
        <Starburst
          text="¡MAYOR!"
          className="absolute -top-6 -right-4 w-24 md:w-28 -rotate-6"
          color="text-sol"
        />

        <p className="font-script text-2xl text-sol -rotate-1 inline-block">
          para comercios y eventos
        </p>
        <h2 className="mt-2 font-retro text-4xl md:text-5xl uppercase text-blanco">
          ¿Vendés? Surtí tu local
        </h2>
        <p className="mt-4 max-w-xl font-medium text-blanco/90">
          Trabajamos con mayoristas y particulares. Pizzas congeladas listas
          para exhibir y vender, hechas artesanalmente en Villa Urquiza.
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title} className="border-ink shadow-hard-sm bg-blanco p-5">
              <p.icon size={24} className="text-rojo" />
              <h3 className="mt-3 font-retro text-sm uppercase">{p.title}</h3>
              <p className="mt-1.5 text-sm text-tinta/70">{p.text}</p>
            </div>
          ))}
        </div>

        <a
          href={waLink('Hola 57! Quiero consultar por venta mayorista.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-retro bg-sol text-tinta mt-9"
        >
          Consultar por mayor
        </a>
      </div>
    </section>
  )
}
