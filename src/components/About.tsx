import { useSite } from '@/lib/site'

export default function About() {
  const { business } = useSite()
  return (
    <section id="nosotros" className="bg-papel-2 bg-halftone border-y-4 border-tinta py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-script text-2xl text-teal -rotate-1 inline-block">
          quiénes somos
        </p>
        <h2 className="mt-2 font-retro text-4xl md:text-5xl uppercase">
          El sabor casero,
          <br />
          <span className="text-stack inline-block mt-1">en cada bocado</span>
        </h2>
        <p className="mt-7 text-lg leading-relaxed font-medium text-tinta/80">
          {business.fullName} nació en {business.barrio} con una idea simple:
          que la pizza rica no dependa de tener tiempo para amasar. Hacemos
          pizzas artesanales con ingredientes de calidad, las congelamos en su
          punto justo y te las llevamos listas para hornear.
        </p>
        <p className="mt-4 text-lg leading-relaxed font-medium text-tinta/80">
          Para cumples, reuniones o ese antojo de martes a la noche. Vos ponés
          el horno, nosotros la pizza.
        </p>
      </div>
    </section>
  )
}
