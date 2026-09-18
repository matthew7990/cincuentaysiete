import { Flame, MapPin, Snowflake } from 'lucide-react'
import PizzaArt from './PizzaArt'
import SmartImage from './SmartImage'
import Confetti from './Confetti'
import Starburst from './Starburst'
import { BUSINESS } from '@/config'

const CHIPS = [
  { icon: Snowflake, text: 'Congeladas · 8 porciones' },
  { icon: Flame, text: 'Del freezer al horno' },
  { icon: MapPin, text: 'Cumples y reuniones' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-halftone pt-32 pb-16 md:pt-44 md:pb-24">
      <Confetti />

      <div className="relative mx-auto max-w-6xl px-4 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="font-script text-2xl md:text-3xl text-rojo -rotate-2 inline-block">
            {BUSINESS.fullName} presenta
          </p>

          <h1 className="mt-4 font-retro text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95] uppercase">
            Pizzas
            <br />
            caseras,
            <br />
            <span className="text-stack inline-block mt-1">al horno</span>
            <br />
            y listo.
          </h1>

          <p className="mt-7 max-w-md text-lg font-medium">
            Hechas artesanalmente en <strong>{BUSINESS.barrio}</strong>. Las
            guardás en el freezer, las horneás en 10 minutos y comés como
            recién hechas.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#catalogo" className="btn-retro bg-rojo text-blanco text-base px-7 py-3.5">
              Ver pizzas y promos
            </a>
            <a href="#como-se-hacen" className="btn-retro bg-blanco text-base px-7 py-3.5">
              Cómo se hornean
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-3">
            {CHIPS.map((c) => (
              <li
                key={c.text}
                className="flex items-center gap-2 border-ink shadow-hard-xs bg-blanco px-3 py-1.5 font-ticket text-xs font-bold uppercase"
              >
                <c.icon size={14} className="text-rojo" />
                {c.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          {/* sticker gigante con la pizza */}
          <div className="border-ink shadow-hard bg-blanco rounded-full aspect-square overflow-hidden grid place-items-center rotate-3">
            <SmartImage
              base="fotos/hero"
              alt="Pizza casera de 57"
              className="w-full h-full object-cover"
              fallback={
                <PizzaArt
                  size={300}
                  toppings={['muzza', 'tomate', 'aceituna', 'provenzal', 'jamon', 'morron']}
                />
              }
            />
          </div>
          <Starburst
            text="¡10 MIN!"
            sub="al horno"
            className="absolute -top-4 -right-2 w-24 md:w-28 animate-wobble"
            color="text-sol"
          />
          <p className="font-script text-xl text-teal text-center mt-5 -rotate-2">
            simplemente irresistible
          </p>
        </div>
      </div>
    </section>
  )
}
