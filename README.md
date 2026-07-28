# ADAMI Industrial — Rediseño Web

Rediseño completo del sitio web de ADAMI Industrial usando **Next.js 15**, **Framer Motion** y **Tailwind CSS**.

## Tecnologías

- **Next.js 15** con App Router
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** — animaciones pesadas y profesionales
- **GSAP** — animaciones avanzadas
- **Lucide React** — iconografía

## Características

- Pantalla de carga animada con logo ADAMI
- Hero con sistema de partículas en canvas
- Animaciones de scroll reveal con Framer Motion
- Contador animado de estadísticas
- Navbar con scroll progress bar
- Cursor personalizado
- Secciones: Hero, Stats, Empresa, Servicios, Industrias, Infraestructura, Clientes, CTA, Contacto, Footer
- Paleta de colores: Azul Adami `#2B6CB0` + negro industrial `#080C14`
- Diseño minimalista de marca premium
- Totalmente responsive

## Instalación

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
pnpm run start
```

## Estructura

```
app/
  layout.tsx      — Layout principal con fuentes
  page.tsx        — Página principal
  globals.css     — Estilos globales y variables CSS

components/
  Navbar.tsx          — Navegación con progress bar
  Footer.tsx          — Pie de página
  CustomCursor.tsx    — Cursor personalizado
  LoadingScreen.tsx   — Pantalla de carga
  RevealSection.tsx   — Wrapper de animación scroll
  sections/
    Hero.tsx          — Hero con partículas
    Stats.tsx         — Contadores animados
    About.tsx         — Empresa + timeline
    Services.tsx      — Servicios expandibles
    Industries.tsx    — Sectores industriales
    Infrastructure.tsx — Infraestructura
    Clients.tsx       — Clientes + marquee
    CTABanner.tsx     — Call to action
    Contact.tsx       — Formulario de contacto
```
