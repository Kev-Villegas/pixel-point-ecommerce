export const PRODUCT_CATEGORIES = [
  {
    name: "Celulares",
    value: "SMARTPHONE",
    brands: [
      "Apple",
      "Samsung",
      "Xiaomi",
      "Realme",
      "Honor",
      "Oneplus",
      "Oppo",
      "Motorola",
      "Google",
    ],
  },
  {
    name: "Consolas",
    value: "CONSOLE",
    brands: ["Valve", "Nintendo", "Sony", "Microsoft"],
  },
  {
    name: "Periféricos",
    value: "PERIPHERAL",
    brands: ["Logitech", "Razer", "HyperX", "Corsair", "Redragon"],
  },
  {
    name: "Otros",
    value: "OTHER",
    brands: [],
  },
];

export const ALL_BRANDS = Array.from(
  new Set(PRODUCT_CATEGORIES.flatMap((c) => c.brands)),
).sort();
