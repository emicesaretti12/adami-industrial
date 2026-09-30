/**
 * Datos y canal de contacto de ADAMI.
 *
 * WhatsApp es el canal comercial principal: +54 9 3513 27-8310.
 * Se puede reemplazar sin tocar código con VITE_WHATSAPP_NUMBER en Vercel
 * (solo dígitos, con código de país, sin + ni espacios).
 */
const DEFAULT_WHATSAPP = "5493513278310";

export const CONTACT = {
  email: "info@adami.com.ar",
  phoneDisplay: "+54 351 225-0295",
  phoneHref: "tel:+543512250295",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") || DEFAULT_WHATSAPP,
  whatsappDisplay: "+54 9 3513 27-8310",
};

export interface LeadData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export function buildLeadText(d: LeadData) {
  const lines = [
    `Hola ADAMI, soy ${d.name.trim()}${d.company.trim() ? ` de ${d.company.trim()}` : ""}.`,
    "",
    d.message.trim(),
    "",
    `Email: ${d.email.trim()}`,
  ];
  if (d.phone.trim()) lines.push(`Teléfono: ${d.phone.trim()}`);
  return lines.join("\n");
}

/** URL que entrega la consulta por el canal configurado (WhatsApp o email). */
export function buildLeadUrl(d: LeadData) {
  const text = buildLeadText(d);
  if (CONTACT.whatsapp) {
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
  }
  const subject = `Consulta web${d.company.trim() ? ` — ${d.company.trim()}` : ""}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
