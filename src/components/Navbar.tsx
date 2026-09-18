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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? 'bg-noche/90 backdrop-blur border-b border-crema/10' : ''
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-tomate font-display text-lg text-crema">
            57
          </span>
          <span className="hidden sm:block font-display text-sm uppercase tracking-wide">
            Pizzas Caseras
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-crema-dim">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-crema transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full border border-crema/15 text-crema-dim hover:text-crema hover:border-crema/30 transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={waChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-tomate px-4 py-2 text-sm font-semibold text-crema hover:bg-tomate-deep transition-colors"
          >
            <MessageCircle size={16} />
            Pedí por WhatsApp
          </a>
        </div>
      </nav>
    </header>
  )
}
