// CV template themes. All are single-column and ATS-safe; text stays in normal
// flow so ATS parsers read it. Photo (when enabled) is decorative only.

export const TEMPLATES = [
  { id: "modern",    name: "Modern",    previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto", accent: "#2563eb", align: "left",   nameUpper: true,  divider: "accent-bar",     density: "normal",  showPhoto: false },
  { id: "klasik",    name: "Klasik",    previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto", accent: "#1f2937", align: "center", nameUpper: true,  divider: "full-underline", density: "normal",  showPhoto: false },
  { id: "minimal",   name: "Minimal",   previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto", accent: "#0f172a", align: "left",   nameUpper: false, divider: "none",           density: "airy",    showPhoto: false },
  { id: "kompakt",   name: "Kompakt",   previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto", accent: "#0d9488", align: "left",   nameUpper: true,  divider: "thin",           density: "compact", showPhoto: false },
  { id: "fotografli", name: "Fotoğraflı", previewFont: "Arial, Helvetica, sans-serif", pdfFont: "Roboto", accent: "#0369a1", align: "left", nameUpper: true,  divider: "accent-bar",     density: "normal",  showPhoto: true },
];

export const DEFAULT_TEMPLATE = "modern";

export const getTemplate = (id) =>
  TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
