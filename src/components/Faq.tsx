import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useSite } from '@/lib/site'

// Las preguntas visibles acá tienen que coincidir con el JSON-LD FAQPage del index.html
export default function Faq() {
  const { faqs } = useSite()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h2 className="font-retro text-4xl md:text-5xl uppercase text-center">
        Preguntas <span className="text-rojo">frecuentes</span>
      </h2>

      <div className="mt-10 space-y-4">
        {faqs.map((f, i) => (
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
