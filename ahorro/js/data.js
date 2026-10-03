export const CURRENCIES = [
  ["ARS", "Peso argentino"],
  ["BOB", "Boliviano"],
  ["BRL", "Real brasileño"],
  ["CLP", "Peso chileno"],
  ["COP", "Peso colombiano"],
  ["CRC", "Colón costarricense"],
  ["DOP", "Peso dominicano"],
  ["EUR", "Euro"],
  ["GTQ", "Quetzal guatemalteco"],
  ["MXN", "Peso mexicano"],
  ["PEN", "Sol peruano"],
  ["PYG", "Guaraní paraguayo"],
  ["USD", "Dólar estadounidense"],
  ["UYU", "Peso uruguayo"],
];

export const EXPENSE_CATEGORIES = [
  { id: "comida", name: "Comida", icon: "🍽️" },
  { id: "super", name: "Súper", icon: "🛒" },
  { id: "transporte", name: "Transporte", icon: "🚌" },
  { id: "casa", name: "Casa", icon: "🏠" },
  { id: "servicios", name: "Servicios", icon: "💡" },
  { id: "salud", name: "Salud", icon: "💊" },
  { id: "ocio", name: "Ocio", icon: "🎬" },
  { id: "ropa", name: "Ropa", icon: "👕" },
  { id: "estudios", name: "Estudios", icon: "📚" },
  { id: "regalos", name: "Regalos", icon: "🎁" },
  { id: "mascotas", name: "Mascotas", icon: "🐾" },
  { id: "otros-g", name: "Otros", icon: "✨" },
];

export const INCOME_CATEGORIES = [
  { id: "sueldo", name: "Sueldo", icon: "💼" },
  { id: "extra", name: "Extra", icon: "💻" },
  { id: "ventas", name: "Ventas", icon: "🏷️" },
  { id: "regalo", name: "Regalo", icon: "🎁" },
  { id: "intereses", name: "Intereses", icon: "📈" },
  { id: "otros-i", name: "Otros", icon: "✨" },
];

export const CATEGORY = new Map([
  ...EXPENSE_CATEGORIES.map(c => [c.id, { ...c, type: "expense" }]),
  ...INCOME_CATEGORIES.map(c => [c.id, { ...c, type: "income" }]),
]);

export const TRANSFER_ICON = "🔁";

export const ACCOUNT_ICONS = ["💵", "🏦", "💳", "🐷", "💰", "📱", "👛", "🏧"];

export const GOAL_ICONS = [
  "🎯",
  "✈️",
  "🏖️",
  "🏠",
  "🚗",
  "📱",
  "💻",
  "🎓",
  "💍",
  "👶",
  "🛡️",
  "🎁",
  "🎸",
  "🐶",
  "⚽",
  "🌱",
];
