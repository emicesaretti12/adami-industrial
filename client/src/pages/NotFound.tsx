import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-overlay" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          }}
        />

        <div className="container relative z-10 text-center py-20">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="block font-display font-bold tracking-tighter leading-none text-gradient"
              style={{ fontSize: "clamp(8rem, 20vw, 16rem)" }}
            >
              404
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
              Página no encontrada
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-10">
              La página que busca no existe o ha sido movida. Verifique la URL o
              vuelva al inicio.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/">
              <button className="btn-primary">
                <Home className="w-4 h-4" />
                Ir al Inicio
              </button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver Atrás
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
