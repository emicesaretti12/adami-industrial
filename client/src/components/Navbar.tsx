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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 h-16 md:h-20"
          : "bg-transparent h-16 md:h-20"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/">
          <span className="flex flex-col relative z-50 group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#4e6e94] rounded-sm" />
              <span className="text-2xl font-bold tracking-tight text-[#1a2b3d]">
                ADAMI
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium ml-3.5">
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
                <span className="relative px-1 py-2 text-sm font-medium text-[#1a2b3d] hover:text-[#4e6e94] transition-colors cursor-pointer">
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4e6e94] rounded-full"
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
          className="md:hidden relative z-50 p-2 text-[#1a2b3d]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 pb-6 flex flex-col h-screen"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, index) => {
                const isActive = location === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
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
    </motion.header>
  );
}
