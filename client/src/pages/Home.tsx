import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import CTABanner from "@/components/sections/CTABanner";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

/**
 * ADAMI — Home Page
 * Composes all sections into a single-page scrolling experience.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Industries />
        <CTABanner />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
