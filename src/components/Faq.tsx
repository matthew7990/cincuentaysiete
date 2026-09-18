import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BUSINESS } from '@/config'

// Importante: las preguntas de acá tienen que coincidir con el JSON-LD FAQPage del index.html
const FAQS = [
  {
    q: '¿Las pizzas vienen congeladas?',
    a: 'Sí. Todas nuestras pizzas van congeladas y listas para hornear: las sacás del freezer directo al horno, sin descongelar. Duran hasta 3 meses en el freezer.',
  },
  {
    q: '¿Cuánto tardan en hornearse?',
    a: 'Entre 8 y 12 minutos con el horno bien precalentado a 250-280°C. Están listas cuando la muzzarella burbujea y el borde se dora.',
  },
  {
    q: '¿Cómo hago un pedido?',
    a: 'Armás tu pedido en esta web y lo enviás por WhatsApp, o nos escribís directamente. Coordinamos entrega y pago por el mismo chat.',
  },
  {
    q: '¿Venden por mayor?',
    a: 'Sí, trabajamos con mayoristas y particulares: almacenes, rotiserías, dietéticas y eventos. Escribinos por WhatsApp para precios por cantidad.',
  },
  {
    q: '¿Dónde están?',
    a: `Estamos en ${BUSINESS.zona}. Coordinamos retiro o entrega por WhatsApp.`,
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h2 className="font-retro text-4xl md:text-5xl uppercase text-center">
        Preguntas <span className="text-rojo">frecuentes</span>
      </h2>

      <div className="mt-10 space-y-4">
        {FAQS.map((f, i) => (
          <div key={f.q} className="border-ink shadow-hard-sm bg-blanco">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-retro text-sm uppercase">{f.q}</span>
              <span
                className={`grid place-items-center w-8 h-8 shrink-0 border-ink bg-sol transition-transform ${
                  open === i ? 'rotate-45' : ''
                }`}
              >
                <Plus size={16} strokeWidth={3} />
              </span>
            </button>
            {open === i && (
              <p className="mx-5 mb-5 px-0 pt-4 text-sm leading-relaxed text-tinta/70 border-t-2 border-dashed border-tinta/20">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
