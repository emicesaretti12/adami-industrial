// Service worker: guarda la app en el teléfono para que abra al instante y sin
// internet. La lista de archivos y la versión las genera tools/stamp-sw.mjs;
// no se editan a mano.

const VERSION = "mi-ahorro-4ebdac7910";
/* BEGIN ASSETS */
const ASSETS = [
  "./",
  "./.prettierrc",
  "./css/app.css",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-512.png",
  "./index.html",
  "./js/app.js",
  "./js/data.js",
  "./js/dates.js",
  "./js/demo.js",
  "./js/dom.js",
  "./js/icons.js",
  "./js/money.js",
  "./js/sheets/account.js",
  "./js/sheets/amount.js",
  "./js/sheets/backup.js",
  "./js/sheets/goal.js",
  "./js/sheets/movement.js",
  "./js/sheets/parts.js",
  "./js/sheets/settings.js",
  "./js/sheets/welcome.js",
  "./js/state.js",
  "./js/stats.js",
  "./js/ui/actions.js",
  "./js/ui/fx.js",
  "./js/ui/install.js",
  "./js/ui/pad.js",
  "./js/ui/sheet.js",
  "./js/ui/theme.js",
  "./js/ui/toast.js",
  "./js/views/goals.js",
  "./js/views/home.js",
  "./js/views/moves.js",
  "./js/views/shared.js",
  "./js/views/summary.js",
  "./manifest.webmanifest",
];
/* END ASSETS */

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key.startsWith("mi-ahorro-") && key !== VERSION)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Primero la copia guardada; si falta, la red. Una versión nueva se instala
// completa en su propio caché antes de reemplazar a la anterior.
self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches
      .match(request, { ignoreSearch: true })
      .then(
        hit =>
          hit ??
          fetch(request).catch(() =>
            request.mode === "navigate"
              ? caches.match("./index.html")
              : Response.error()
          )
      )
  );
});
