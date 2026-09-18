import { Flame, Refrigerator, Timer, UtensilsCrossed } from 'lucide-react'

const STEPS = [
  {
    icon: Flame,
    title: 'Precalentá fuerte',
    text: 'Horno a 250-280°C, bien caliente. Es la clave de una base crocante.',
    color: 'bg-rojo',
  },
  {
    icon: Refrigerator,
    title: 'Del freezer, directo',
    text: 'Sacá la pizza del freezer y llevala al horno sin descongelar.',
    color: 'bg-teal',
  },
  {
    icon: Timer,
    title: '8 a 12 minutos',
    text: 'Está lista cuando la muzza burbujea y el borde se dora.',
    color: 'bg-sol',
  },
  {
    icon: UtensilsCrossed,
    title: 'A comer',
    text: 'Cortala en 8 y sale como recién hecha. Buen provecho.',
    color: 'bg-verde',
  },
]

export default function HowToBake() {
  return (
    <section id="como-se-hacen" className="bg-teal bg-halftone-rojo py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-script text-2xl text-sol -rotate-1 inline-block">
          instrucciones de cocina
        </p>
        <h2 className="mt-2 font-retro text-4xl md:text-5xl uppercase text-blanco">
          Del freezer a la mesa
          <br />
          en <span className="text-sol">10 minutos</span>
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="border-ink shadow-hard bg-blanco p-5 rotate-[0.5deg] odd:-rotate-[0.5deg]"
            >
              <div className="flex items-center justify-between">
                <span className={`grid place-items-center w-11 h-11 border-ink ${s.color} text-blanco`}>
                  <s.icon size={22} />
                </span>
                <span className="font-retro text-4xl text-tinta/15">{i + 1}</span>
              </div>
              <h3 className="mt-4 font-retro uppercase">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tinta/70">{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-9 max-w-2xl font-ticket text-sm text-blanco/85">
          * Se conservan hasta 3 meses en el freezer. Una vez horneada, no
          volver a congelar (aunque dudamos que sobre).
        </p>
      </div>
    </section>
  )
}
