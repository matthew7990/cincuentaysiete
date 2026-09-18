import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PromoStrip from '@/components/PromoStrip'
import Catalog from '@/components/Catalog'
import HowToBake from '@/components/HowToBake'
import Wholesale from '@/components/Wholesale'
import About from '@/components/About'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import CartBar from '@/components/CartBar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PromoStrip />
        <Catalog />
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
