import { Flame, MapPin, Snowflake } from 'lucide-react'
import PizzaArt from './PizzaArt'
import { BUSINESS } from '@/config'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* glow de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-tomate/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-queso/30 bg-queso/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-queso">
            <MapPin size={12} />
            {BUSINESS.zona}
          </p>

          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] uppercase">
            Pizzas caseras,
            <br />
            <span className="text-tomate">listas para</span>
            <br />
            tu horno.
          </h1>

          <p className="mt-6 max-w-md text-lg text-crema-dim">
            Hechas artesanalmente y congeladas en su punto. Las guardás en el
            freezer, las horneás en 10 minutos y comés como recién hechas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-tomate px-6 py-3 font-semibold text-crema hover:bg-tomate-deep transition-colors"
            >
              Ver pizzas y promos
            </a>
            <a
              href="#como-se-hacen"
              className="rounded-full border border-crema/20 px-6 py-3 font-semibold text-crema hover:border-crema/40 transition-colors"
            >
              Cómo se hornean
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-crema-dim">
            <li className="flex items-center gap-2">
              <Snowflake size={15} className="text-queso" /> Congeladas · 8 porciones
            </li>
            <li className="flex items-center gap-2">
              <Flame size={15} className="text-queso" /> Del freezer al horno
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-queso" /> Cumples y reuniones
            </li>
          </ul>
        </div>

        <div className="relative mx-auto">
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-queso/10 blur-2xl" />
          </div>
          <div className="relative animate-[spin_60s_linear_infinite]">
            <PizzaArt
              size={340}
              toppings={['muzza', 'tomate', 'aceituna', 'provenzal', 'jamon', 'morron']}
            />
          </div>
          <p className="relative mt-4 text-center text-xs uppercase tracking-[0.3em] text-crema-dim">
            Simplemente irresistible
          </p>
        </div>
      </div>
    </section>
  )
}
