# Mi Ahorro

App móvil para llevar tus cuentas, tus gastos e ingresos y tus metas de ahorro.
Es una **PWA**: se abre desde el navegador y se instala en la pantalla de inicio
como cualquier app, funciona sin internet y **no tiene servidor ni registro**:
todo se guarda solo en el teléfono.

> Vive en su propia carpeta (`ahorro/`) y no depende del sitio de Adami: no
> comparte código, dependencias ni build con él.

## Qué hace

- **Cuentas**: efectivo, banco, tarjeta… cada una con su saldo. Se pueden mover
  fondos entre cuentas (transferencias) sin que cuenten como gasto ni ingreso.
- **Anotar en segundos**: botón **+**, monto con teclado numérico propio (con
  tecla `00` para montos grandes), una categoría y listo. Se puede cambiar la
  cuenta, la fecha y agregar una nota. Todo se puede **deshacer**.
- **Metas de ahorro**: nombre, monto, fecha límite opcional y cuánto ahorrar al
  mes para llegar a tiempo. Se aporta o se retira dinero; lo reservado deja de
  contar como _disponible_. Al completar una meta hay una pequeña celebración.
- **Meta de ahorro mensual** (opcional) con barra de avance en el inicio.
- **Resumen**: ahorro del mes, tasa de ahorro, gastos por categoría y los
  últimos 6 meses.
- **Tus datos**: copia de seguridad (archivo `.json`, se comparte desde el menú
  del teléfono), restaurar copia, exportar a Excel (`.csv`) y borrar todo.
- Modo claro/oscuro (automático o a elección), sin conexión, atajos
  “Nuevo gasto” / “Nuevo ingreso” en el ícono (Android).
- Moneda configurable (ARS, USD, EUR, MXN, CLP, COP, PEN, UYU, BRL, BOB, PYG,
  GTQ, CRC, DOP). Una sola moneda por instalación: cambiarla solo cambia el
  símbolo, no convierte montos.

## Probarla en la computadora

No hay nada que instalar ni compilar. Basta un servidor de archivos estáticos:

```bash
npx serve ahorro        # o: python3 -m http.server 4173 -d ahorro
```

y abrir la dirección que indique. En el celular conviene probarla ya publicada
(ver abajo): el modo sin conexión y la instalación necesitan **HTTPS**.

## Instalarla en el teléfono

1. Publica la carpeta `ahorro/` (siguiente sección) y abre la dirección en el
   teléfono.
2. **Android (Chrome)**: menú ⋮ → _Instalar app_ (o el botón “Instalar” que
   aparece en la app).
   **iPhone (Safari)**: botón _Compartir_ → _Agregar a pantalla de inicio_.

> **iPhone**: usa la app desde el ícono de la pantalla de inicio. Safari borra
> los datos de los sitios que no se usan en 7 días, pero no los de las apps
> instaladas. Igual conviene guardar una copia de seguridad de vez en cuando
> (la app lo recuerda).

## Publicarla

Es un sitio 100 % estático: sirve cualquier hosting con HTTPS (Vercel, Netlify,
GitHub Pages, Cloudflare Pages…). Hay que servir el contenido de `ahorro/`:

- **Vercel**: nuevo proyecto con _Root Directory_ `ahorro`, _Framework_ “Other”,
  sin comando de build ni carpeta de salida.
- **Netlify / Cloudflare Pages**: _Publish directory_ `ahorro`.

Antes de publicar una versión nueva ejecuta:

```bash
node ahorro/tools/stamp-sw.mjs
```

Actualiza `sw.js` con la lista de archivos y un número de versión calculado
del contenido. Sin ese paso los teléfonos que ya la instalaron seguirían
viendo la versión anterior.

## Datos y privacidad

- Se guardan en `localStorage` del navegador (clave `mi-ahorro:v1`), como un
  único JSON. Nada sale del teléfono.
- Los montos son enteros en centavos, así que las sumas nunca arrastran errores
  de decimales.
- Si el JSON guardado estuviera dañado, antes de empezar de cero se conserva una
  copia aparte (`mi-ahorro:v1:corrupt`). Todo lo que se lee (disco o copia
  importada) se valida y se sanea.
- Sin sincronización entre dispositivos: para pasar los datos a otro teléfono,
  usa _Guardar copia de seguridad_ → _Restaurar copia_.

## Cómo está hecha

JavaScript moderno sin dependencias ni paso de compilación (módulos ES), HTML y
CSS a mano.

```
ahorro/
├─ index.html              página única
├─ manifest.webmanifest    nombre, íconos y atajos de la app instalada
├─ sw.js                   service worker (sin conexión) — lo genera tools/
├─ css/app.css             colores, componentes, hojas y animaciones
├─ icons/                  ícono de la app (svg + png)
├─ tools/stamp-sw.mjs      regenera la lista de archivos y la versión de sw.js
└─ js/
   ├─ app.js               arranque, pestañas, acciones
   ├─ state.js             datos, validación, guardado y deshacer
   ├─ stats.js             saldos, totales, resumen mensual
   ├─ money.js dates.js    montos y fechas (formato local, centavos)
   ├─ views/               Inicio, Movimientos, Metas, Resumen
   ├─ sheets/              hojas inferiores: movimiento, cuenta, meta, ajustes…
   └─ ui/                  hojas, teclado numérico, avisos, efectos
```

Decisiones de diseño que conviene no deshacer sin pensarlo:

- **Teclado numérico propio** en vez del del sistema: es más rápido, no tapa
  media pantalla y evita el zoom automático de iOS.
- **Hojas inferiores** con arrastre para cerrar y con el botón _atrás_ de
  Android integrado (cada hoja agrega una entrada al historial; las operaciones
  del historial se hacen en cola para que abrir y cerrar a la vez no la rompa).
- **Deshacer en lugar de confirmar** para borrar movimientos, cuentas y metas.
- **Todo texto se escapa antes de dibujarse** (la plantilla `html` lo hace sola),
  incluido lo que viene de una copia de seguridad.
- Colores de ingreso/gasto validados para daltonismo y contraste (claro y
  oscuro); el signo `+`/`−` nunca depende solo del color.
- Movimiento medido: nada anima si se usa decenas de veces al día (cambiar de
  pestaña, teclear); lo ocasional (hojas, avisos) usa curvas rápidas y
  respeta _reducir movimiento_.

## Formato

El repo usa Prettier (`pnpm format`). Esta carpeta tiene su propia
configuración (`.prettierrc`) con el formateo de HTML dentro de plantillas
desactivado, porque ahí los espacios importan.
