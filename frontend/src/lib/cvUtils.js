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
