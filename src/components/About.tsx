import { BUSINESS } from '@/config'

export default function About() {
  return (
    <section id="nosotros" className="border-y border-crema/10 bg-noche-2 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-tomate">
          Quiénes somos
        </p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl uppercase">
          El sabor casero, <span className="text-queso">en cada bocado</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-crema-dim">
          {BUSINESS.fullName} nació en {BUSINESS.barrio} con una idea simple:
          que la pizza rica no dependa de tener tiempo para amasar. Hacemos
          pizzas artesanales con ingredientes de calidad, las congelamos en su
          punto justo y te las llevamos listas para hornear.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-crema-dim">
          Para cumples, reuniones o ese antojo de martes a la noche. Vos ponés
          el horno, nosotros la pizza.
        </p>
      </div>
    </section>
  )
}
