import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import Infrastructure from '@/components/sections/Infrastructure'
import Clients from '@/components/sections/Clients'
import Stats from '@/components/sections/Stats'
import CTABanner from '@/components/sections/CTABanner'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Industries />
      <Infrastructure />
      <Clients />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  )
}
