import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PromoStrip from '@/components/PromoStrip'
import Catalog from '@/components/Catalog'
import CheckeredStrip from '@/components/CheckeredStrip'
import HowToBake from '@/components/HowToBake'
import Wholesale from '@/components/Wholesale'
import About from '@/components/About'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import CartBar from '@/components/CartBar'
import AdminApp from '@/admin/AdminApp'
import { SiteProvider, isPreviewMode, clearPreview } from '@/lib/site'

function PublicSite() {
  const [preview] = useState(isPreviewMode)
  return (
    <>
      {preview && (
        <div className="fixed top-0 inset-x-0 z-[70] bg-tinta text-blanco text-center py-1.5 font-ticket text-xs">
          MODO VISTA PREVIA - solo lo ves vos.{' '}
          <button
            className="underline text-sol"
            onClick={() => {
              clearPreview()
              location.reload()
            }}
          >
            salir
          </button>
        </div>
      )}
      <Navbar />
      <main>
        <Hero />
        <PromoStrip />
        <Catalog />
        <CheckeredStrip />
        <HowToBake />
        <Wholesale />
        <About />
        <Faq />
      </main>
      <Footer />
      <CartBar />
    </>
  )
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <SiteProvider>
      {hash.startsWith('#/admin') ? <AdminApp /> : <PublicSite />}
    </SiteProvider>
  )
}
