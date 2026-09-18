import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { SiteData } from '@/types'
import { DEFAULT_SITE } from '@/data/defaults'

const PREVIEW_KEY = 'site_preview'

const SiteCtx = createContext<SiteData>(DEFAULT_SITE)

export function useSite() {
  return useContext(SiteCtx)
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData>(DEFAULT_SITE)

  useEffect(() => {
    // Vista previa del admin: si hay borrador, se muestra en vez del sitio publicado
    const preview = localStorage.getItem(PREVIEW_KEY)
    if (preview) {
      try {
        setSite(JSON.parse(preview))
        return
      } catch {
        localStorage.removeItem(PREVIEW_KEY)
      }
    }
    fetch(`${import.meta.env.BASE_URL}site.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setSite)
      .catch(() => {})
  }, [])

  return <SiteCtx.Provider value={site}>{children}</SiteCtx.Provider>
}

export function isPreviewMode() {
  return localStorage.getItem(PREVIEW_KEY) !== null
}

export function setPreview(data: SiteData) {
  localStorage.setItem(PREVIEW_KEY, JSON.stringify(data))
}

export function clearPreview() {
  localStorage.removeItem(PREVIEW_KEY)
}
