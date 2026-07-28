import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
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
  const scrolled = scrollY > 60;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/manus-storage/adami-logo_11c9fab3.png"
            alt="ADAMI"
            className="h-9 w-9 transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-700 tracking-tight text-foreground">
              ADAMI
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              Soluciones Industriales
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#contacto"
          className="hidden lg:inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] rounded-sm"
        >
          Contáctenos
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
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <ul className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-sans text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
