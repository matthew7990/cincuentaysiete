import { MapPin, MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/InstagramIcon'
import { BUSINESS } from '@/config'
import { waChatLink } from '@/lib/whatsapp'

export default function Footer() {
  return (
    <footer className="border-t border-crema/10 bg-noche-2">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-tomate font-display text-xl text-crema">
                57
              </span>
              <span className="font-display text-lg uppercase">Pizzas Caseras</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-crema-dim">
              <MapPin size={14} /> {BUSINESS.zona}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={waChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-crema-dim hover:text-crema transition-colors"
            >
              <MessageCircle size={16} className="text-queso" />
              WhatsApp: {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-crema-dim hover:text-crema transition-colors"
            >
              <InstagramIcon size={16} className="text-queso" />
              {BUSINESS.instagramHandle}
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-crema/10 pt-6 text-center text-xs text-crema-dim">
          {BUSINESS.fullName} - Pizzas caseras listas para hornear · {BUSINESS.barrio}, CABA
        </p>
      </div>
    </footer>
  )
}
