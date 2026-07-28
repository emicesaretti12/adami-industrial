# ADAMI - Brainstorm de Diseño

## Enfoque 1: Industrial Brutalism Moderno
**Nombre del Tema:** Acero Forjado
**Breve Descripción:** Estética industrial cruda y potente con tipografía bold, texturas de metal/acerado, fondos oscuros con acentos ámbar/naranja (chispas de soldadura). Evoca fuerza, precisión y tradición metalúrgica.
**Probabilidad:** 0.07

## Enfoque 2: Ingeniería de Precisión
**Nombre del Tema:** Blueprint Técnico
**Breve Descripción:** Limpio, técnico, inspirado en planos de ingeniería con líneas finas, estética de dibujo técnico, fondo claro con acentos azules, sistemas de cuadrícula. Transmite exactitud y profesionalismo.
**Probabilidad:** 0.04

## Enfoque 3: Industrial Futurista
**Nombre del Tema:** Fábrica Digital
**Breve Descripción:** Oscuro, alta tecnología con elementos brillantes, efectos de partículas, cian/naranja neón, sensación cinematográfica. Representa la fusión entre industria tradicional e innovación tecnológica.
**Probabilidad:** 0.09

---

## Enfoque Seleccionado: Acero Forjado (Industrial Brutalism Moderno)

### Movimiento de Diseño
Industrial Brutalism con refinamiento moderno — combina la estética cruda de la industria pesada con pulido contemporáneo. Referencias: diseño editorial suizo + arquitectura industrial + interfaces de maquinaria CNC.

### Principios Core
1. **Potencia Visual:** Tipografía display masiva que domina el espacio, evocando la escala de la maquinaria industrial.
2. **Materialidad Honesta:** Texturas de acero, metal cepillado, superficies mecanizadas visibles en cada elemento.
3. **Precisión Funcional:** Cada elemento tiene propósito, como un componente mecanizado — sin decoración superflua.
4. **Contraste Estructural:** Oscuro profundo vs. ámbar incandescente, creando tensión visual como metal al rojo vivo.

### Filosofía de Color
- **Fondo Principal:** Negro acero profundo (`oklch(0.15 0.005 260)`) — evoca el taller, la fundición, el ambiente industrial.
- **Acento Primario:** Ámbar incandescente (`oklch(0.68 0.18 55)`) — como metal fundido, chispas de soldadura, señalización industrial.
- **Acento Secundario:** Gris acero (`oklch(0.45 0.01 260)`) — metal cepillado, estructuras, maquinaria.
- **Texto:** Blanco hueso (`oklch(0.95 0.005 80)`) — alto contraste sobre oscuro, legibilidad industrial.
- **Racional:** El ámbar representa la energía transformadora de la industria (calor, soldadura, fundición). El negro acero es el lienzo de la manufactura. Juntos comunican decades de experiencia en metalurgia e innovación.

### Paradigma de Layout
Layout asimétrico con secciones de ancho completo y alturas variables. Hero a pantalla completa con tipografía gigante descentrada. Secciones de servicios en grid asimétrico (no uniforme). Líneas finas divisoras como marcas de corte CNC. Scroll horizontal en industries para evocar línea de producción.

### Elementos Signature
1. **Líneas de Corte:** Separadores horizontales finos color ámbar que evocan marcas de corte de CNC/torno.
2. **Contadores Animados:** Números de trayectoria, proyectos, clientes que se incrementan al hacer scroll.
3. **Grid Técnico:** Fondo sutil de cuadrícula técnica que aparece/desaparece con parallax.

### Filosofía de Interacción
Las interacciones deben sentirse mecánicas y precisas — como operar maquinaria de alta calidad. Los hovers tienen resistencia táctil (scale sutil + cambio de color). Las transiciones entre secciones son potentes pero controladas. El scroll revela contenido como una fresadora revela la pieza.

### Animación
- **Entrada de secciones:** Reveal con clip-path + translateY, 600ms con easing potente.
- **Hero:** Texto con stagger de palabras, fondo con partículas de chispas animadas (canvas).
- **Contadores:** Animación numérica al entrar en viewport, easing desacelerado.
- **Hover en cards:** Scale 1.02 + glow ámbar + elevación de sombra.
- **Scroll parallax:** Imágenes de fondo se mueven a velocidad distinta que el contenido.
- **Nav:** Transforma de transparente a sólido con blur al hacer scroll.
- **Respeto a prefers-reduced-motion:** Todas las animaciones no esenciales se desactivan.

### Sistema Tipográfico
- **Display/Títulos:** "Oswald" — condensada, industrial, potente. Pesos 600-700. Tamaños grandes (clamp 3rem-8rem).
- **Cuerpo:** "Inter" — legible, neutra, profesional. Pesos 400-500.
- **Acentos/Técnicos:** "JetBrains Mono" — para números, etiquetas técnicas, datos. Evoca interfaces de maquinaria.
- **Jerarquía:** Display > H2 (Oswald 500) > H3 (Oswald 400) > Body (Inter 400) > Technical (JetBrains Mono 400).

### Esencia de Marca
**Posicionamiento:** Grupo ADAMI es el motor industrial de Argentina — 30 años transformando desafíos productivos en soluciones tecnológicas de precisión.
**Personalidad:** Preciso, Confiable, Innovador.

### Voz de Marca
Los titulares son directos y potentes, como instrucciones de ingeniería. Los CTAs son verbos de acción concreta. Sin relleno genérico.

**Ejemplo titular:** "Treinta años forjando el futuro industrial."
**Ejemplo CTA:** "Construyamos su próxima solución."

### Wordmark y Logo
Símbolo: Una "A" estilizada formada por líneas geométricas que evocan una pieza mecanizada vista en corte transversal — angular, técnico, inconfundible. En ámbar sobre oscuro.

### Color Signature de Marca
**Ámbar ADAMI** — `oklch(0.68 0.18 55)` / `#E8A020` — un ámbar profundo, incandescente, inconfundiblemente industrial.
