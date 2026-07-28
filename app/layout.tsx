import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ADAMI Industrial — Soluciones Industriales de Precisión',
  description: 'Más de 30 años forjando el futuro industrial. Diseño, fabricación y servicios industriales de alta precisión para los sectores más exigentes del mundo.',
  keywords: 'ADAMI, industrial, mecanizado, metalurgia, automatización, metrología, Córdoba, Argentina',
  openGraph: {
    title: 'ADAMI Industrial',
    description: 'Soluciones industriales de alta precisión',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080C14] text-[#F0F4FA] antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
