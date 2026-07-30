import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollAnimation";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Empresa", href: "/#empresa" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Industrias", href: "/#industrias" },
  { label: "Clientes", href: "/#clientes" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 20;

  // Prevent body scroll when mobile menu is open
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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663751686161/MKadoAWFfElgzipt.webp"
            alt="ADAMI"
            className="h-8 w-8 lg:h-9 lg:w-9 transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg lg:text-xl font-semibold tracking-tight text-foreground">
              ADAMI
            </span>
            <span className="font-sans text-[9px] font-medium tracking-[0.15em] text-muted-foreground uppercase hidden sm:block mt-0.5">
              Soluciones Industriales
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#contacto"
          className="hidden lg:inline-flex items-center px-6 py-2.5 text-foreground font-sans text-sm transition-all duration-200 border border-accent text-accent hover:bg-accent hover:text-background"
        >
          Contáctenos
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background border-t border-border"
          >
            <ul className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-6 py-3 border border-accent text-accent font-sans text-sm"
                >
                  Contáctenos
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
