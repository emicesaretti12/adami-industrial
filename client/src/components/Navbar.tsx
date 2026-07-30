import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollAnimation";

const navLinks = [
  { label: "Empresa", href: "/#empresa" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Industrias", href: "/#industrias" },
  { label: "Clientes", href: "/#clientes" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 10;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="https://www.adami.com.ar/wp-content/uploads/2016/05/adami-logo-header.png"
            alt="ADAMI"
            className="h-8 w-auto lg:h-10 transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="flex flex-col leading-tight hidden sm:block">
            <span className="font-display text-sm lg:text-base font-bold text-accent">
              ADAMI
            </span>
            <span className="font-sans text-[10px] font-medium text-muted-foreground">
              Industrial Solutions
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#contacto"
          className="hidden lg:inline-flex items-center px-6 py-2.5 bg-accent text-white font-sans text-sm font-medium transition-all duration-200 hover:bg-blue-900"
        >
          Contacto
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <ul className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-sans text-base text-foreground hover:text-accent transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200">
                <a
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-6 py-2.5 bg-accent text-white font-sans text-sm font-medium hover:bg-blue-900 transition-all duration-200"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
