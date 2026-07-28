import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (scrollY > prevScroll && scrollY > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScroll(scrollY);
  }, [scrollY, prevScroll]);

  const scrolled = scrollY > 40;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663751686161/MKadoAWFfElgzipt.webp"
            alt="ADAMI"
            className="h-8 w-8 lg:h-10 lg:w-10 transition-all duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl lg:text-2xl font-700 tracking-tight text-foreground">
              ADAMI
            </span>
            <span className="font-sans text-[10px] font-medium tracking-wider text-muted-foreground hidden sm:block">
              Soluciones Industriales
            </span>
          </div>
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-4" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="/#contacto"
          className="hidden lg:inline-flex items-center px-6 py-2.5 bg-white/10 hover:bg-white/15 text-foreground font-sans text-sm font-medium transition-all duration-300 rounded-full border border-white/10 hover:border-white/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Contáctenos
        </motion.a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 rounded-full hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : (
            <div className="flex flex-col gap-1.5">
              <span className="block w-5 h-[2px] bg-foreground rounded-full transition-all duration-300" />
              <span className="block w-5 h-[2px] bg-foreground rounded-full transition-all duration-300" />
            </div>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden glass-strong border-b border-white/5 overflow-hidden"
          >
            <ul className="container py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="pt-4"
              >
                <a
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-6 py-3 bg-white/10 text-foreground font-sans text-sm font-medium rounded-full"
                >
                  Contáctenos
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
