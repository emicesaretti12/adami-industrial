import { useLocation } from "wouter";
import { CONTACT } from "@/lib/contact";

/**
 * Acceso directo a WhatsApp (canal comercial principal).
 * Solo se muestra si VITE_WHATSAPP_NUMBER está definido.
 * En /contacto no aparece: ahí el formulario ya envía por WhatsApp.
 */
export default function WhatsAppButton() {
  const [location] = useLocation();
  if (!CONTACT.whatsapp || location === "/contacto") return null;

  const text = encodeURIComponent("Hola ADAMI, quiero pedir un presupuesto.");

  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="press fixed z-40 right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:right-6 md:bottom-6 flex items-center gap-2 h-12 pl-3 pr-4 rounded-full bg-[#1f8f4e] text-white text-sm font-medium shadow-lg shadow-black/15 hover:bg-[#1a7a43]"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
      </svg>
      <span>Cotizar</span>
    </a>
  );
}
