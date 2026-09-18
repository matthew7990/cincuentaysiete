import { Flame, Refrigerator, Timer, UtensilsCrossed } from 'lucide-react'

const STEPS = [
  {
    icon: Flame,
    title: 'Precalentá fuerte',
    text: 'Horno a 250-280°C, bien caliente. Es la clave de una base crocante.',
  },
  {
    icon: Refrigerator,
    title: 'Del freezer, directo',
    text: 'Sacá la pizza del freezer y llevala al horno sin descongelar.',
  },
  {
    icon: Timer,
    title: '8 a 12 minutos',
    text: 'Está lista cuando la muzza burbujea y el borde se dora.',
  },
  {
    icon: UtensilsCrossed,
    title: 'A comer',
    text: 'Cortala en 8 y sale como recién hecha. Buen provecho.',
  },
]

export default function HowToBake() {
  return (
    <section id="como-se-hacen" className="bg-crema py-16 md:py-24 text-noche">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-tomate">
          Cómo hornearlas
        </p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl uppercase">
          Del freezer a la mesa en 10 minutos
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-noche p-6 text-crema">
              <div className="flex items-center justify-between">
                <s.icon size={26} className="text-queso" />
                <span className="font-display text-3xl text-crema/20">{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg uppercase">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-crema-dim">{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-sm text-noche/70">
          Se conservan hasta 3 meses en el freezer. Una vez horneada, no volver a
          congelar (aunque dudamos que sobre).
        </p>
      </div>
    </section>
  )
}
