import { CATEGORY } from "../data.js";
import { todayISO } from "../dates.js";
import { DECIMAL } from "../money.js";
import { getState, replaceAll, restore, sanitize, setMeta } from "../state.js";
import { sortTransactions } from "../stats.js";
import { confirmSheet } from "../ui/sheet.js";
import { toast } from "../ui/toast.js";
import { accountMap } from "../views/shared.js";

function download(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function markBackup() {
  setMeta({ lastBackup: Date.now() });
  toast("Copia guardada");
}

// En el teléfono abre el menú de compartir (Archivos, Drive, WhatsApp…); en la
// computadora descarga el archivo.
export async function exportBackup() {
  const body = JSON.stringify(
    {
      app: "mi-ahorro",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: getState(),
    },
    null,
    2
  );
  const file = new File([body], `mi-ahorro-${todayISO()}.json`, {
    type: "application/json",
  });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Copia de seguridad de Mi Ahorro",
      });
      markBackup();
      return;
    }
  } catch (err) {
    if (err?.name === "AbortError") return; // cerró el menú sin elegir
  }
  download(file);
  markBackup();
}

const TYPE_LABEL = {
  expense: "Gasto",
  income: "Ingreso",
  transfer: "Transferencia",
};

// Las celdas que empiezan con = + - @ se prefijan para que Excel no las
// interprete como fórmulas.
const cell = value => {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

const amountText = cents =>
  `${Math.floor(cents / 100)}${DECIMAL}${String(cents % 100).padStart(2, "0")}`;

export function exportCsv() {
  const s = getState();
  const accounts = accountMap(s);
  const rows = [
    ["Fecha", "Tipo", "Categoría", "Cuenta", "Cuenta destino", "Monto", "Nota"],
  ];
  for (const t of sortTransactions(s.transactions).reverse()) {
    rows.push([
      t.date,
      TYPE_LABEL[t.type],
      t.type === "transfer" ? "" : (CATEGORY.get(t.categoryId)?.name ?? ""),
      accounts.get(t.accountId)?.name ?? "",
      accounts.get(t.toAccountId)?.name ?? "",
      amountText(t.amount),
      t.note,
    ]);
  }
  const csv =
    "\uFEFF" + // BOM: Excel reconoce así la codificación UTF-8
    rows.map(r => r.map(cell).join(";")).join("\r\n");
  download(
    new File([csv], `mi-ahorro-${todayISO()}.csv`, { type: "text/csv" })
  );
  toast("Archivo CSV listo");
}

export async function importBackup(file) {
  let next = null;
  try {
    const parsed = JSON.parse(await file.text());
    next = sanitize(parsed?.app === "mi-ahorro" ? parsed.data : parsed);
  } catch {
    // no es JSON
  }
  if (!next || !next.accounts.length) {
    toast("Ese archivo no parece una copia de Mi Ahorro");
    return false;
  }
  const ok = await confirmSheet({
    title: "¿Restaurar esta copia?",
    message: `Reemplaza tus datos actuales por los de la copia: ${next.accounts.length} cuentas y ${next.transactions.length} movimientos. Podrás deshacerlo unos segundos.`,
    confirmLabel: "Restaurar",
  });
  if (!ok) return false;
  const before = JSON.stringify(getState());
  next.onboarded = true;
  replaceAll(next);
  toast("Copia restaurada", {
    action: "Deshacer",
    onAction: () => restore(before),
  });
  return true;
}
