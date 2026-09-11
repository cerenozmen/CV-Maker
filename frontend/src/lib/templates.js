// CV template themes. All are single-column and ATS-safe; they differ only in
// typography, accent color, alignment, divider style and spacing density.

export const TEMPLATES = [
  { id: "modern",  name: "Modern",  previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto",     accent: "#2563eb", align: "left",   nameUpper: true,  divider: "accent-bar",     density: "normal"  },
  { id: "klasik",  name: "Klasik",  previewFont: "Georgia, 'Times New Roman', serif", pdfFont: "RobotoSlab", accent: "#1f2937", align: "center", nameUpper: true,  divider: "full-underline", density: "normal"  },
  { id: "minimal", name: "Minimal", previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto",     accent: "#0f172a", align: "left",   nameUpper: false, divider: "none",           density: "airy"    },
  { id: "kompakt", name: "Kompakt", previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto",     accent: "#0d9488", align: "left",   nameUpper: true,  divider: "thin",           density: "compact" },
];

export const DEFAULT_TEMPLATE = "modern";

const ACCENTS = {
  modern: "#2563eb",
  klasik: "#1f2937",
  minimal: "#0f172a",
  kompakt: "#0d9488",
};

export const getTemplate = (id) =>
  TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];

export const accentOf = (id) => ACCENTS[id] || ACCENTS.modern;
