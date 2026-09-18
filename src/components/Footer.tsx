import { MapPin, MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/InstagramIcon'
import SmartImage from '@/components/SmartImage'
import { useSite } from '@/lib/site'
import { waChatLink } from '@/lib/whatsapp'

export default function Footer() {
  const { business } = useSite()
  return (
    <footer className="bg-rojo bg-halftone-rojo">
      {/* damero de cierre */}
      <div className="bg-checker h-5 border-b-4 border-blanco/20" />

      <div className="mx-auto max-w-6xl px-4 py-14 text-blanco">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-3">
              <SmartImage
                base="logo"
                alt="Logo de 57"
                className="h-14 w-14 rounded-full border-4 border-blanco object-cover bg-blanco"
                fallback={
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-blanco border-4 border-blanco font-retro text-xl text-rojo">
                    57
                  </span>
                }
              />
              <span>
                <span className="block font-retro text-lg uppercase leading-none">
                  Pizzas caseras
                </span>
                <span className="block font-script text-xl text-sol mt-1">
                  listas para hornear
                </span>
              </span>
            </p>
            <p className="mt-4 flex items-center gap-2 font-ticket text-sm text-blanco/70">
              <MapPin size={14} /> {business.zona}
            </p>
          </div>

          <div className="flex flex-col gap-3 font-ticket text-sm">
            <a
              href={waChatLink(business.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-blanco/80 hover:text-sol transition-colors"
            >
              <MessageCircle size={16} className="text-sol" />
              WhatsApp: {business.whatsappDisplay}
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-blanco/80 hover:text-sol transition-colors"
            >
              <InstagramIcon size={16} className="text-sol" />
              {business.instagramHandle}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t-2 border-dashed border-blanco/20 pt-6 text-center font-ticket text-xs text-blanco/50">
          {business.fullName} - Pizzas caseras listas para hornear · {business.barrio}, CABA
        </p>
      </div>
    </footer>
  )
}
