import { useEffect, useMemo, useState } from 'react'
import { Download, Eye, EyeOff, Plus, Rocket, Trash2, Upload, X } from 'lucide-react'
import { useSite, setPreview, clearPreview } from '@/lib/site'
import { checkToken, publishSiteJson } from '@/lib/github'
import { CATEGORY_LABEL, TOPPING_LABEL } from '@/lib/utils'
import type { Category, Product, SiteData, Topping } from '@/types'

const TOKEN_KEY = 'gh_pat'
const ALL_TOPPINGS = Object.keys(TOPPING_LABEL) as Topping[]

const inputCls =
  'w-full border-2 border-tinta bg-blanco px-3 py-2 font-ticket text-sm focus:outline-none focus:shadow-hard-xs'
const labelCls = 'block font-retro text-[11px] uppercase text-tinta/60 mb-1'

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ---------- editores ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  )
}

function ProductEditor({
  p,
  onChange,
  onDelete,
}: {
  p: Product
  onChange: (p: Product) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const set = (patch: Partial<Product>) => onChange({ ...p, ...patch })

  return (
    <div className="border-ink shadow-hard-sm bg-blanco">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-retro text-sm uppercase">
          {p.name || '(sin nombre)'}{' '}
          <span className="font-ticket text-tinta/50 normal-case">${p.price}</span>
        </span>
        <span className="font-ticket text-xs text-tinta/50">{open ? 'cerrar ▲' : 'editar ▼'}</span>
      </button>

      {open && (
        <div className="space-y-3 border-t-2 border-dashed border-tinta/20 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre">
              <input className={inputCls} value={p.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Tamaño (ej: 8 porciones)">
              <input className={inputCls} value={p.size ?? ''} onChange={(e) => set({ size: e.target.value || undefined })} />
            </Field>
            <Field label="Precio $">
              <input
                className={inputCls}
                type="number"
                value={p.price}
                onChange={(e) => set({ price: Number(e.target.value) || 0 })}
              />
            </Field>
            <Field label="Precio anterior (tachado, opcional)">
              <input
                className={inputCls}
                type="number"
                value={p.originalPrice ?? ''}
                onChange={(e) =>
                  set({ originalPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </Field>
            <Field label="Categoría">
              <select
                className={inputCls}
                value={p.category}
                onChange={(e) => set({ category: e.target.value as Category })}
              >
                {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Badge">
              <select
                className={inputCls}
                value={p.badge ?? ''}
                onChange={(e) => set({ badge: (e.target.value || undefined) as Product['badge'] })}
              >
                <option value="">Sin badge</option>
                <option value="promo">¡PROMO!</option>
                <option value="nuevo">¡NUEVA!</option>
              </select>
            </Field>
          </div>
          <Field label="Descripción">
            <textarea className={inputCls} rows={2} value={p.desc} onChange={(e) => set({ desc: e.target.value })} />
          </Field>
          <Field label="Ingredientes (para el dibujo)">
            <div className="flex flex-wrap gap-2">
              {ALL_TOPPINGS.map((t) => (
                <label
                  key={t}
                  className={`cursor-pointer border-2 border-tinta px-2 py-1 font-ticket text-xs ${
                    p.toppings.includes(t) ? 'bg-sol' : 'bg-blanco'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={p.toppings.includes(t)}
                    onChange={() =>
                      set({
                        toppings: p.toppings.includes(t)
                          ? p.toppings.filter((x) => x !== t)
                          : [...p.toppings, t],
                      })
                    }
                  />
                  {TOPPING_LABEL[t]}
                </label>
              ))}
            </div>
          </Field>
          <p className="font-ticket text-[11px] text-tinta/50">
            Foto: public/fotos/{p.id}.jpg
          </p>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 font-ticket text-xs uppercase text-rojo hover:underline"
          >
            <Trash2 size={13} /> Eliminar producto
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------- app ---------- */

type Tab = 'productos' | 'negocio' | 'faq' | 'marquee'

export default function AdminApp() {
  const site = useSite()
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? '')
  const [tokenOk, setTokenOk] = useState<boolean | null>(null)
  const [tab, setTab] = useState<Tab>('productos')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  // El borrador arranca del preview (si había) o del sitio publicado
  const [dirty, setDirty] = useState(false)
  const [draft, setDraft] = useState<SiteData>(() => {
    const p = localStorage.getItem('site_preview')
    if (p) {
      try { return JSON.parse(p) } catch { /* fallthrough */ }
    }
    return site
  })

  // site llega async (fetch site.json): adoptarlo mientras no se editó nada
  useEffect(() => {
    if (!dirty) setDraft(site)
  }, [site, dirty])

  const patch = (part: Partial<SiteData>) => {
    setDirty(true)
    setDraft((d) => ({ ...d, ...part }))
  }

  const json = useMemo(() => JSON.stringify(draft, null, 2), [draft])

  async function handleTokenSubmit() {
    setBusy(true)
    setStatus('Verificando token...')
    const ok = await checkToken(token)
    setTokenOk(ok)
    setBusy(false)
    if (ok) {
      localStorage.setItem(TOKEN_KEY, token)
      setStatus('')
    } else {
      setStatus('Token inválido o sin acceso al repo. Necesita scope repo.')
    }
  }

  async function handlePublish() {
    setBusy(true)
    setStatus('Publicando...')
    try {
      await publishSiteJson(token, json)
      clearPreview()
      setStatus('Publicado. El sitio se actualiza en ~1 minuto.')
    } catch (e) {
      setStatus(`Error al publicar: ${e instanceof Error ? e.message : e}`)
    }
    setBusy(false)
  }

  function handlePreview() {
    setPreview(draft)
    window.location.hash = '#/'
    location.reload()
  }

  function handleDownload() {
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'site.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function handleReset() {
    if (!confirm('Descartar todos los cambios del borrador?')) return
    setDraft(site)
    setDirty(false)
    clearPreview()
    setStatus('Borrador descartado.')
  }

  /* ----- gate de token ----- */
  if (tokenOk !== true) {
    return (
      <div className="min-h-screen bg-papel bg-halftone grid place-items-center px-4">
        <div className="w-full max-w-md border-ink shadow-hard bg-blanco p-8">
          <p className="font-script text-2xl text-rojo">admin</p>
          <h1 className="font-retro text-3xl uppercase mt-1">57 · Panel</h1>
          <p className="mt-4 text-sm text-tinta/70">
            Para editar el sitio pegá un token de GitHub con scope <code>repo</code>.
            Queda guardado solo en este navegador.
          </p>
          <p className="mt-2 font-ticket text-xs text-tinta/50">
            Tip: en esta máquina podés sacarlo con `gh auth token`
          </p>
          <input
            className={`${inputCls} mt-5`}
            type="password"
            placeholder="ghp_..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTokenSubmit()}
          />
          <button
            onClick={handleTokenSubmit}
            disabled={busy || !token}
            className="btn-retro bg-teal text-blanco w-full justify-center mt-4"
          >
            Entrar
          </button>
          {status && <p className="mt-3 font-ticket text-xs text-rojo">{status}</p>}
          <a href="#/" className="mt-5 block text-center font-ticket text-xs text-tinta/50 hover:text-tinta">
            ← volver al sitio
          </a>
        </div>
      </div>
    )
  }

  /* ----- admin ----- */
  const TABS: { id: Tab; label: string }[] = [
    { id: 'productos', label: `Productos (${draft.products.length})` },
    { id: 'negocio', label: 'Negocio' },
    { id: 'faq', label: `FAQ (${draft.faqs.length})` },
    { id: 'marquee', label: 'Cinta' },
  ]

  return (
    <div className="min-h-screen bg-papel bg-halftone pb-32">
      <header className="border-b-4 border-tinta bg-blanco sticky top-0 z-40">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
          <p className="font-retro uppercase">
            <span className="text-rojo">57</span> admin
          </p>
          <div className="flex items-center gap-2">
            <a href="#/" className="btn-retro bg-blanco text-xs px-3 py-2">
              <Eye size={14} /> Ver sitio
            </a>
            <button
              onClick={() => { localStorage.removeItem(TOKEN_KEY); setTokenOk(null) }}
              className="btn-retro bg-blanco text-xs px-3 py-2"
              title="Olvidar token"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-4xl flex gap-2 px-4 pb-3 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`border-2 border-tinta px-3 py-1.5 font-retro text-xs uppercase whitespace-nowrap ${
                tab === t.id ? 'bg-sol shadow-hard-xs' : 'bg-blanco'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {status && (
          <p className="mb-5 border-ink shadow-hard-xs bg-sol px-4 py-2 font-ticket text-sm">
            {status}
          </p>
        )}

        {tab === 'productos' && (
          <div className="space-y-4">
            {draft.products.map((p, i) => (
              <ProductEditor
                key={p.id + i}
                p={p}
                onChange={(np) =>
                  patch({ products: draft.products.map((x, j) => (j === i ? np : x)) })
                }
                onDelete={() =>
                  confirm(`Eliminar "${p.name}"?`) &&
                  patch({ products: draft.products.filter((_, j) => j !== i) })
                }
              />
            ))}
            <button
              onClick={() =>
                patch({
                  products: [
                    ...draft.products,
                    {
                      id: slugify(`nuevo-${draft.products.length}`),
                      name: 'Nuevo producto',
                      desc: '',
                      price: 0,
                      category: 'pizzas',
                      toppings: ['muzza'],
                    },
                  ],
                })
              }
              className="btn-retro bg-verde text-blanco"
            >
              <Plus size={16} /> Agregar producto
            </button>
          </div>
        )}

        {tab === 'negocio' && (
          <div className="border-ink shadow-hard bg-blanco p-6 grid gap-4 sm:grid-cols-2">
            {(
              [
                ['fullName', 'Nombre completo'],
                ['whatsapp', 'WhatsApp (wa.me, ej: 54911...)'],
                ['whatsappDisplay', 'WhatsApp visible'],
                ['instagram', 'URL de Instagram'],
                ['instagramHandle', 'Usuario de IG'],
                ['barrio', 'Barrio'],
                ['zona', 'Zona completa'],
                ['tagline', 'Tagline'],
              ] as const
            ).map(([k, label]) => (
              <Field key={k} label={label}>
                <input
                  className={inputCls}
                  value={draft.business[k]}
                  onChange={(e) => patch({ business: { ...draft.business, [k]: e.target.value } })}
                />
              </Field>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="space-y-4">
            {draft.faqs.map((f, i) => (
              <div key={i} className="border-ink shadow-hard-sm bg-blanco p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    className={inputCls}
                    value={f.q}
                    placeholder="Pregunta"
                    onChange={(e) =>
                      patch({ faqs: draft.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)) })
                    }
                  />
                  <button
                    onClick={() => patch({ faqs: draft.faqs.filter((_, j) => j !== i) })}
                    className="p-2 border-2 border-tinta bg-blanco text-rojo shrink-0"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.a}
                  placeholder="Respuesta"
                  onChange={(e) =>
                    patch({ faqs: draft.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)) })
                  }
                />
              </div>
            ))}
            <button
              onClick={() => patch({ faqs: [...draft.faqs, { q: 'Nueva pregunta?', a: '' }] })}
              className="btn-retro bg-verde text-blanco"
            >
              <Plus size={16} /> Agregar pregunta
            </button>
            <p className="font-ticket text-xs text-tinta/50">
              Ojo: el JSON-LD del index.html es estático - si cambiás las preguntas, actualizá también el bloque FAQPage.
            </p>
          </div>
        )}

        {tab === 'marquee' && (
          <div className="space-y-3">
            {draft.marquee.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  className={inputCls}
                  value={m}
                  onChange={(e) =>
                    patch({ marquee: draft.marquee.map((x, j) => (j === i ? e.target.value : x)) })
                  }
                />
                <button
                  onClick={() => patch({ marquee: draft.marquee.filter((_, j) => j !== i) })}
                  className="p-2 border-2 border-tinta bg-blanco text-rojo shrink-0"
                  aria-label="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              onClick={() => patch({ marquee: [...draft.marquee, 'NUEVO TEXTO'] })}
              className="btn-retro bg-verde text-blanco"
            >
              <Plus size={16} /> Agregar texto
            </button>
          </div>
        )}
      </main>

      {/* barra de acciones */}
      <div className="fixed bottom-0 inset-x-0 border-t-4 border-tinta bg-blanco">
        <div className="mx-auto max-w-4xl flex flex-wrap items-center gap-3 px-4 py-3">
          <button onClick={handlePreview} className="btn-retro bg-sol text-tinta">
            <EyeOff size={15} /> Vista previa
          </button>
          <button onClick={handlePublish} disabled={busy} className="btn-retro bg-rojo text-blanco">
            <Rocket size={15} /> {busy ? 'Publicando...' : 'Publicar en vivo'}
          </button>
          <button onClick={handleDownload} className="btn-retro bg-blanco">
            <Download size={15} /> Descargar JSON
          </button>
          <button onClick={handleReset} className="btn-retro bg-blanco">
            <Upload size={15} className="rotate-180" /> Descartar
          </button>
        </div>
      </div>
    </div>
  )
}
