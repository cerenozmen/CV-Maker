import { dateRange, formatDate } from "../lib/cvUtils";
import { getTemplate } from "../lib/templates";

const DENSITY = {
  normal:  { section: 16, entry: 12, body: 12, title: 13, sub: 12, date: 11 },
  airy:    { section: 22, entry: 16, body: 12.5, title: 13.5, sub: 12.5, date: 11 },
  compact: { section: 11, entry: 8, body: 11, title: 12, sub: 11, date: 10.5 },
};

function resolveTheme(id) {
  const t = getTemplate(id);
  const d = DENSITY[t.density] || DENSITY.normal;
  const dividerStyle = {
    "accent-bar": { borderBottom: `2px solid ${t.accent}`, color: t.accent },
    "full-underline": { borderBottom: "1px solid #cbd5e1", color: "#0f172a" },
    none: { borderBottom: "none", color: "#0f172a", letterSpacing: "1.5px" },
    thin: { borderBottom: `1px solid ${t.accent}`, color: "#0f172a" },
  }[t.divider];
  return { t, d, dividerStyle };
}

export const CvPreviewPaper = ({ data, template, order }) => {
  const { t, d, dividerStyle } = resolveTheme(template);
  const p = data.personal || {};
  const fullName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Adınız Soyadınız";
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);

  const secTitle = (title) => (
    <h2
      className="mb-2 pb-1 text-[13px] font-bold uppercase tracking-wider"
      style={{ ...dividerStyle }}
    >
      {title}
    </h2>
  );

  const ItemHeader = ({ title, subtitle, date }) => (
    <div className="flex items-baseline justify-between gap-3">
      <div className="min-w-0">
        <p className="font-bold text-slate-900" style={{ fontSize: d.title }}>{title}</p>
        {subtitle && <p className="font-medium text-slate-700" style={{ fontSize: d.sub }}>{subtitle}</p>}
      </div>
      {date && <p className="shrink-0 font-medium text-slate-600" style={{ fontSize: d.date }}>{date}</p>}
    </div>
  );

  const Bullets = ({ items = [] }) => {
    const list = items.filter((b) => b && b.trim());
    if (!list.length) return null;
    return (
      <ul className="mt-1 list-disc space-y-0.5 pl-4">
        {list.map((b, i) => (
          <li key={i} className="leading-snug text-slate-800" style={{ fontSize: d.body }}>{b}</li>
        ))}
      </ul>
    );
  };

  const renderers = {
    summary: () =>
      data.summary && data.summary.trim() ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Profesyonel Profil")}
          <p className="leading-snug text-slate-800" style={{ fontSize: d.body }}>{data.summary}</p>
        </section>
      ) : null,

    education: () =>
      (data.education || []).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Eğitim")}
          <div style={{ display: "flex", flexDirection: "column", gap: d.entry }}>
            {data.education.map((e) => (
              <div key={e.id}>
                <ItemHeader title={e.degree || "Bölüm / Derece"} subtitle={[e.school, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)} />
                {e.gpa && <p className="text-slate-800" style={{ fontSize: d.body }}>Not Ortalaması: {e.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : null,

    experience: () =>
      (data.experience || []).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("İş Deneyimi")}
          <div style={{ display: "flex", flexDirection: "column", gap: d.entry }}>
            {data.experience.map((e) => (
              <div key={e.id}>
                <ItemHeader title={e.position || "Pozisyon"} subtitle={[e.company, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)} />
                <Bullets items={e.bullets} />
              </div>
            ))}
          </div>
        </section>
      ) : null,

    skills: () =>
      (data.skills || []).filter((s) => s.trim()).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Beceriler")}
          <p className="leading-snug text-slate-800" style={{ fontSize: d.body }}>
            {data.skills.filter((s) => s.trim()).join("  •  ")}
          </p>
        </section>
      ) : null,

    languages: () =>
      (data.languages || []).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Diller")}
          <div className="space-y-0.5">
            {data.languages.map((l) => (
              <p key={l.id} className="text-slate-800" style={{ fontSize: d.body }}>
                <span className="font-semibold">{l.name}</span>{l.level ? ` — ${l.level}` : ""}
              </p>
            ))}
          </div>
        </section>
      ) : null,

    projects: () =>
      (data.projects || []).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Projeler")}
          <div style={{ display: "flex", flexDirection: "column", gap: d.entry }}>
            {data.projects.map((pr) => (
              <div key={pr.id}>
                <ItemHeader title={pr.name || "Proje Adı"} subtitle={[pr.role, pr.link].filter(Boolean).join(" — ")} date={dateRange(pr.startDate, pr.endDate, pr.current)} />
                <Bullets items={pr.bullets} />
              </div>
            ))}
          </div>
        </section>
      ) : null,

    certificates: () =>
      (data.certificates || []).length ? (
        <section style={{ marginTop: d.section }}>
          {secTitle("Sertifikalar")}
          <div style={{ display: "flex", flexDirection: "column", gap: Math.max(6, d.entry - 4) }}>
            {data.certificates.map((c) => (
              <div key={c.id}>
                <ItemHeader title={c.name || "Sertifika"} subtitle={c.issuer} date={c.expiryDate ? `${formatDate(c.issueDate)} – ${formatDate(c.expiryDate)}` : formatDate(c.issueDate)} />
                {c.credential && <p className="text-slate-700" style={{ fontSize: d.body }}>Kimlik: {c.credential}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div
      id="cv-paper"
      data-testid="cv-preview-paper"
      className="mx-auto w-full max-w-[794px] bg-white p-10 sm:p-12"
      style={{ fontFamily: t.previewFont, minHeight: "1123px" }}
    >
      <header className="border-b border-slate-300 pb-3" style={{ textAlign: t.align }}>
        <h1
          className="font-bold text-slate-900"
          style={{ fontSize: 26, textTransform: t.nameUpper ? "uppercase" : "none", letterSpacing: t.nameUpper ? "1px" : "0" }}
        >
          {fullName}
        </h1>
        {p.title && <p className="mt-0.5 font-medium" style={{ fontSize: 14, color: t.accent }}>{p.title}</p>}
        {contacts.length > 0 && (
          <p className="mt-2 leading-relaxed text-slate-700" style={{ fontSize: 11 }}>{contacts.join("  •  ")}</p>
        )}
      </header>

      {(order || []).map((id) => (
        <div key={id}>{renderers[id] ? renderers[id]() : null}</div>
      ))}
    </div>
  );
};
