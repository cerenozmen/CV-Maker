// Client-side ATS keyword matcher. Extracts keywords from a pasted job posting
// and compares them against the CV content — no external API needed.

const TR_STOPWORDS = new Set([
  "ve", "ile", "veya", "için", "gibi", "kadar", "daha", "çok", "en", "bir", "bu",
  "şu", "o", "da", "de", "ki", "ama", "fakat", "ancak", "hem", "ya", "ise", "göre",
  "olan", "olarak", "olması", "olup", "the", "and", "or", "for", "with", "to", "of",
  "in", "on", "at", "a", "an", "is", "are", "be", "as", "by", "we", "you", "our",
  "your", "will", "must", "should", "have", "has", "en az", "en fazla", "tüm",
  "her", "bazı", "yeni", "iyi", "güçlü", "aşağıdaki", "gerekli", "tercih", "sahip",
  "konusunda", "üzerinde", "yönelik", "içinde", "arası", "yıl", "ay", "gün",
  "aday", "adayı", "adaylar", "pozisyon", "pozisyonu", "iş", "işi", "çalışma",
  "deneyim", "deneyime", "deneyimli", "deneyimi", "deneyiminiz", "tecrübe",
  "tecrübeli", "minimum", "asgari", "yetkinlik", "yetkinlikler", "gereksinim",
  "gereksinimler", "bilgi", "bilgisi", "beceri", "becerileri",
  "ekip", "takım", "şirket", "firma", "departman", "sorumlu", "sorumluluk",
  "görev", "görevler", "nitelikler", "aranan", "özellikler",
]);

const norm = (s) => (s || "").toLocaleLowerCase("tr");

function tokenize(text) {
  return norm(text)
    .replace(/[^\p{L}\p{N}+#.]+/gu, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.]+|[.]+$/g, ""))
    .filter((t) => t.length >= 2 && !/^\d+$/.test(t) && !TR_STOPWORDS.has(t));
}

export function buildCvText(data) {
  const p = data.personal || {};
  const parts = [
    p.title,
    data.summary,
    ...(data.skills || []),
    ...(data.experience || []).flatMap((e) => [e.position, e.company, ...(e.bullets || [])]),
    ...(data.education || []).flatMap((e) => [e.degree, e.school]),
    ...(data.projects || []).flatMap((e) => [e.name, e.role, ...(e.bullets || [])]),
    ...(data.certificates || []).map((c) => c.name),
    ...(data.languages || []).map((l) => l.name),
  ];
  return norm(parts.filter(Boolean).join(" "));
}

export function analyzeJob(jobText, data) {
  const tokens = tokenize(jobText);
  if (!tokens.length) return null;

  const freq = new Map();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);

  // Rank by frequency then length; keep the most relevant terms.
  const ranked = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, 30)
    .map(([term]) => term);

  const cvText = buildCvText(data);
  const matched = [];
  const missing = [];
  for (const term of ranked) {
    if (cvText.includes(term)) matched.push(term);
    else missing.push(term);
  }

  const score = ranked.length ? Math.round((matched.length / ranked.length) * 100) : 0;
  return { score, matched, missing, total: ranked.length };
}
