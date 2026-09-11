import { dateRange, formatDate } from "../lib/cvUtils";

const Section = ({ title, children }) => (
  <section className="mt-4">
    <h2 className="mb-2 border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wider text-slate-900">
      {title}
    </h2>
    {children}
  </section>
);

const ItemHeader = ({ title, subtitle, date, right }) => (
  <div className="flex items-baseline justify-between gap-3">
    <div className="min-w-0">
      <p className="text-[13px] font-bold text-slate-900">{title}</p>
      {subtitle && <p className="text-[12px] font-medium text-slate-700">{subtitle}</p>}
    </div>
    {(date || right) && (
      <p className="shrink-0 text-[11px] font-medium text-slate-600">{date || right}</p>
    )}
  </div>
);

const Bullets = ({ items = [] }) => {
  const list = items.filter((b) => b && b.trim());
  if (!list.length) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4">
      {list.map((b, i) => (
        <li key={i} className="text-[12px] leading-snug text-slate-800">{b}</li>
      ))}
    </ul>
  );
};

export const CvPreviewPaper = ({ data }) => {
  const p = data.personal || {};
  const fullName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Adınız Soyadınız";
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);

  return (
    <div
      id="cv-paper"
      data-testid="cv-preview-paper"
      className="mx-auto w-full max-w-[794px] bg-white p-10 sm:p-12"
      style={{ fontFamily: "Arial, Helvetica, sans-serif", minHeight: "1123px" }}
    >
      <header className="border-b border-slate-300 pb-3">
        <h1 className="text-[26px] font-bold uppercase tracking-wide text-slate-900">{fullName}</h1>
        {p.title && <p className="mt-0.5 text-[14px] font-medium text-slate-700">{p.title}</p>}
        {contacts.length > 0 && (
          <p className="mt-2 text-[11px] leading-relaxed text-slate-700">
            {contacts.join("  •  ")}
          </p>
        )}
      </header>

      {data.summary && data.summary.trim() && (
        <Section title="Profesyonel Profil">
          <p className="text-[12px] leading-snug text-slate-800">{data.summary}</p>
        </Section>
      )}

      {(data.education || []).length > 0 && (
        <Section title="Eğitim">
          <div className="space-y-2.5">
            {data.education.map((e) => (
              <div key={e.id}>
                <ItemHeader
                  title={e.degree || "Bölüm / Derece"}
                  subtitle={[e.school, e.city].filter(Boolean).join(", ")}
                  date={dateRange(e.startDate, e.endDate, e.current)}
                />
                {e.gpa && <p className="text-[12px] text-slate-800">Not Ortalaması: {e.gpa}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.experience || []).length > 0 && (
        <Section title="İş Deneyimi">
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id}>
                <ItemHeader
                  title={e.position || "Pozisyon"}
                  subtitle={[e.company, e.city].filter(Boolean).join(", ")}
                  date={dateRange(e.startDate, e.endDate, e.current)}
                />
                <Bullets items={e.bullets} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.skills || []).filter((s) => s.trim()).length > 0 && (
        <Section title="Beceriler">
          <p className="text-[12px] leading-snug text-slate-800">
            {data.skills.filter((s) => s.trim()).join("  •  ")}
          </p>
        </Section>
      )}

      {(data.languages || []).length > 0 && (
        <Section title="Diller">
          <div className="space-y-0.5">
            {data.languages.map((l) => (
              <p key={l.id} className="text-[12px] text-slate-800">
                <span className="font-semibold">{l.name}</span>
                {l.level ? ` — ${l.level}` : ""}
              </p>
            ))}
          </div>
        </Section>
      )}

      {(data.projects || []).length > 0 && (
        <Section title="Projeler">
          <div className="space-y-3">
            {data.projects.map((pr) => (
              <div key={pr.id}>
                <ItemHeader
                  title={pr.name || "Proje Adı"}
                  subtitle={[pr.role, pr.link].filter(Boolean).join(" — ")}
                  date={dateRange(pr.startDate, pr.endDate, pr.current)}
                />
                <Bullets items={pr.bullets} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {(data.certificates || []).length > 0 && (
        <Section title="Sertifikalar">
          <div className="space-y-2">
            {data.certificates.map((c) => (
              <div key={c.id}>
                <ItemHeader
                  title={c.name || "Sertifika"}
                  subtitle={c.issuer}
                  date={c.expiryDate ? `${formatDate(c.issueDate)} – ${formatDate(c.expiryDate)}` : formatDate(c.issueDate)}
                />
                {c.credential && <p className="text-[12px] text-slate-700">Kimlik: {c.credential}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};
