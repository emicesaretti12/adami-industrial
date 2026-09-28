/**
 * Datos y canal de contacto de ADAMI.
 *
 * WhatsApp es el canal comercial principal. Para activarlo, definir en Vercel:
 *   VITE_WHATSAPP_NUMBER=5493511234567   (solo dígitos, con código de país, sin + ni espacios)
 * Mientras no esté definido, el formulario arma un email a info@adami.com.ar.
 */
export const CONTACT = {
  email: "info@adami.com.ar",
  phoneDisplay: "+54 351 4666050",
  phoneHref: "tel:+543514666050",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") || undefined,
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
