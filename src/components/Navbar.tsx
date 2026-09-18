import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/InstagramIcon'
import { BUSINESS } from '@/config'
import { waChatLink } from '@/lib/whatsapp'

const LINKS = [
  { href: '#catalogo', label: 'Pizzas' },
  { href: '#como-se-hacen', label: 'Cómo hornearlas' },
  { href: '#mayoristas', label: 'Mayoristas' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className={`border-b-4 border-tinta transition-colors ${
          scrolled ? 'bg-papel' : 'bg-papel/95'
        }`}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-rojo border-ink shadow-hard-xs font-retro text-lg text-blanco">
              57
            </span>
            <span className="hidden sm:block font-script text-xl text-tinta leading-none pt-1">
              pizzas caseras
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 font-retro text-[13px] uppercase">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-rojo transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 border-ink shadow-hard-xs bg-blanco hover:bg-papel-2 transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={waChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-retro bg-rojo text-blanco"
            >
              <MessageCircle size={16} />
              Pedí ya
            </a>
          </div>
        </div>
      </nav>
      {/* filete de damero bajo la barra */}
      <div className="bg-checker h-2.5 border-b-4 border-tinta" />
    </header>
  )
}
