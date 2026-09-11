export const TR_MONTHS = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

export function formatDate(value) {
  if (!value) return "";
  const [y, m] = String(value).split("-");
  if (!y) return String(value);
  if (!m) return y;
  const idx = parseInt(m, 10) - 1;
  const mon = TR_MONTHS[idx] || "";
  return `${mon} ${y}`.trim();
}

export function dateRange(start, end, current) {
  const s = formatDate(start);
  const e = current ? "Halen" : formatDate(end);
  if (!s && !e) return "";
  if (s && e) return `${s} – ${e}`;
  return s || e;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// Reads an image File, downscales it (keeping aspect ratio) and returns a
// compressed JPEG data URL — keeps localStorage small and PDF embedding fast.
export function fileToResizedDataUrl(file, max = 400) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function computeAtsAudit(data) {
  const checks = [];
  const p = data.personal || {};

  checks.push({
    label: "Ad, soyad ve unvan girildi",
    pass: Boolean(p.firstName && p.lastName && p.title),
  });
  checks.push({
    label: "E-posta ve telefon eklendi",
    pass: Boolean(p.email && p.phone),
  });
  checks.push({
    label: "Profesyonel profil özeti yazıldı (min. 40 karakter)",
    pass: (data.summary || "").trim().length >= 40,
  });
  checks.push({
    label: "En az bir eğitim bilgisi eklendi",
    pass: (data.education || []).length >= 1,
  });
  checks.push({
    label: "En az bir iş deneyimi eklendi",
    pass: (data.experience || []).length >= 1,
  });
  checks.push({
    label: "Deneyimlerde tarih ve açıklama maddeleri var",
    pass:
      (data.experience || []).length > 0 &&
      (data.experience || []).every(
        (e) => e.startDate && (e.bullets || []).some((b) => b.trim())
      ),
  });
  checks.push({
    label: "En az 5 beceri listelendi",
    pass: (data.skills || []).filter((s) => s.trim()).length >= 5,
  });
  checks.push({
    label: "En az bir dil eklendi",
    pass: (data.languages || []).length >= 1,
  });
  checks.push({
    label: "Tek sütunlu, ATS dostu standart format",
    pass: true,
  });

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);
  return { score, checks, passed, total: checks.length };
}
