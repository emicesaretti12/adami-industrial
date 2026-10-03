// Regenera la lista de archivos y la versión de caché de ../sw.js.
// Ejecutar después de cambiar cualquier archivo de la app:
//   node ahorro/tools/stamp-sw.mjs
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_FILES = new Set(["sw.js", "README.md"]);
const SKIP_DIRS = new Set(["tools"]);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : walk(path);
    return SKIP_FILES.has(entry.name)
      ? []
      : [relative(root, path).split(sep).join("/")];
  });
}

const files = walk(root).sort();
const hash = createHash("sha256");
for (const file of files) {
  hash.update(file);
  hash.update(readFileSync(join(root, file)));
}
const version = hash.digest("hex").slice(0, 10);

const swPath = join(root, "sw.js");
let sw = readFileSync(swPath, "utf8");
// Una por línea y con coma final, como deja el Prettier del repo.
const assets = ["./", ...files.map(f => `./${f}`)]
  .map(f => `  ${JSON.stringify(f)},\n`)
  .join("");
sw = sw.replace(
  /\/\* BEGIN ASSETS \*\/[\s\S]*?\/\* END ASSETS \*\//,
  `/* BEGIN ASSETS */\nconst ASSETS = [\n${assets}];\n/* END ASSETS */`
);
sw = sw.replace(
  /const VERSION = "[^"]*";/,
  `const VERSION = "mi-ahorro-${version}";`
);
writeFileSync(swPath, sw);
console.log(`sw.js actualizado: ${files.length} archivos, versión ${version}`);
