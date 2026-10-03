const COLORS = { light: "#f4f6f3", dark: "#0c110e" };
const original = new Map();

// "auto" sigue el modo del teléfono; "light"/"dark" lo fuerzan. La barra de
// estado del navegador toma el color de <meta name="theme-color">.
export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light" || theme === "dark") root.dataset.theme = theme;
  else delete root.dataset.theme;

  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    if (!original.has(meta)) original.set(meta, meta.getAttribute("content"));
    meta.setAttribute(
      "content",
      theme === "auto" ? original.get(meta) : COLORS[theme]
    );
  }
}
