// Aplica la apariencia elegida antes de pintar, para evitar el parpadeo de
// claro a oscuro al abrir la app. Va en un archivo propio (no en línea) para
// poder usar una política de seguridad que no admita scripts en línea.
try {
  var saved = JSON.parse(localStorage.getItem("mi-ahorro:v1"));
  var theme = saved && saved.settings && saved.settings.theme;
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch (e) {
  // sin acceso al almacenamiento: se usa el modo del teléfono
}
