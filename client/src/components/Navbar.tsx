import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
  { name: "Industrias", path: "/industrias" },
  { name: "Empresa", path: "/empresa" },
  { name: "Contacto", path: "/contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Menú mobile abierto: bloquear el scroll de fondo y cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Con el menú abierto el fondo es blanco: logo e ícono tienen que pasar a oscuro
  const isDarkHeader = location === "/" && !isScrolled && !isOpen;

  // Barra de estado del celular del mismo color que el header
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", isDarkHeader ? "#0c1a29" : "#ffffff");
  }, [isDarkHeader]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 pt-[env(safe-area-inset-top)] box-content transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled && !isOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/">
          <span className="flex flex-col relative z-50 group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-6 rounded-sm transition-colors ${isDarkHeader ? 'bg-white' : 'bg-[#4e6e94]'}`} />
              <span className={`text-2xl font-bold tracking-tight transition-colors ${isDarkHeader ? 'text-white' : 'text-[#1a2b3d]'}`}>
                ADAMI
              </span>
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-medium ml-3.5 transition-colors ${isDarkHeader ? 'text-white/70' : 'text-gray-500'}`}>
              Soluciones Industriales
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location === link.path;
            return (
              <Link key={link.path} href={link.path}>
                <span className={`relative px-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isDarkHeader
                    ? isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                    : isActive ? 'text-[#4e6e94] font-semibold' : 'text-[#1a2b3d] hover:text-[#4e6e94]'
                }`}>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkHeader ? 'bg-white' : 'bg-[#4e6e94]'}`}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden relative z-50 p-2 -mr-2 transition-colors ${isDarkHeader ? 'text-white' : 'text-[#1a2b3d]'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-[calc(6rem+env(safe-area-inset-top))] px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] flex flex-col h-[100dvh] overscroll-contain"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, index) => {
                const isActive = location === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link href={link.path}>
                      <span className={`text-3xl font-bold tracking-tight cursor-pointer ${isActive ? 'text-[#4e6e94]' : 'text-[#1a2b3d]'}`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
