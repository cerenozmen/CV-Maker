import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { dateRange, formatDate } from "../lib/cvUtils";
import { getTemplate } from "../lib/templates";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammT.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLoHQiA8.ttf", fontStyle: "italic" },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const DENSITY = {
  normal:  { section: 14, entry: 8, body: 9.5, title: 10.5, sub: 9.5, date: 8.5 },
  airy:    { section: 20, entry: 11, body: 10, title: 11, sub: 10, date: 8.5 },
  compact: { section: 10, entry: 6, body: 9, title: 10, sub: 9, date: 8 },
};

function buildStyles(templateId) {
  const t = getTemplate(templateId);
  const d = DENSITY[t.density] || DENSITY.normal;
  const divider = {
    "accent-bar": { borderBottomWidth: 1.5, borderBottomColor: t.accent, color: t.accent, letterSpacing: 1 },
    "full-underline": { borderBottomWidth: 1, borderBottomColor: "#cbd5e1", color: "#0f172a", letterSpacing: 1 },
    none: { borderBottomWidth: 0, color: "#0f172a", letterSpacing: 2 },
    thin: { borderBottomWidth: 1, borderBottomColor: t.accent, color: "#0f172a", letterSpacing: 1 },
  }[t.divider];

  const styles = StyleSheet.create({
    page: { fontFamily: t.pdfFont, fontSize: d.body, color: "#1a1a1a", paddingVertical: 40, paddingHorizontal: 44, lineHeight: 1.4 },
    header: { borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 8, marginBottom: 4, textAlign: t.align },
    headerRow: { flexDirection: "row", alignItems: "center", textAlign: "left" },
    photo: { width: 68, height: 68, borderRadius: 34, objectFit: "cover", marginRight: 14, borderWidth: 1.5, borderColor: t.accent },
    name: { fontSize: 20, fontWeight: 700, textTransform: t.nameUpper ? "uppercase" : "none", letterSpacing: t.nameUpper ? 1 : 0, color: "#0f172a" },
    title: { fontSize: 12, marginTop: 2, color: t.accent },
    contact: { fontSize: 8.5, marginTop: 6, color: "#334155" },
    section: { marginTop: d.section },
    sectionTitle: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", paddingBottom: 3, marginBottom: 6, ...divider },
    itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    itemTitle: { fontSize: d.title, fontWeight: 700, color: "#0f172a" },
    itemSub: { fontSize: d.sub, color: "#334155", marginTop: 1 },
    itemDate: { fontSize: d.date, color: "#475569", marginLeft: 8 },
    body: { fontSize: d.body, color: "#1a1a1a" },
    bulletRow: { flexDirection: "row", marginTop: 2, paddingRight: 4 },
    bulletDot: { width: 10, fontSize: d.body },
    bulletText: { flex: 1, fontSize: d.body, color: "#1a1a1a" },
    entry: { marginBottom: d.entry },
  });
  return styles;
}

export const CvPdfDocument = ({ data, template, order }) => {
  const s = buildStyles(template);
  const t = getTemplate(template);
  const p = data.personal || {};
  const fullName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Adınız Soyadınız";
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  const skills = (data.skills || []).filter((x) => x.trim());

  const Item = ({ title, subtitle, date, children }) => (
    <View style={s.entry} wrap={false}>
      <View style={s.itemRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.itemTitle}>{title}</Text>
          {subtitle ? <Text style={s.itemSub}>{subtitle}</Text> : null}
        </View>
        {date ? <Text style={s.itemDate}>{date}</Text> : null}
      </View>
      {children}
    </View>
  );

  const Bullets = ({ items = [] }) => {
    const list = items.filter((b) => b && b.trim());
    if (!list.length) return null;
    return (
      <View style={{ marginTop: 2 }}>
        {list.map((b, i) => (
          <View key={i} style={s.bulletRow}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={s.bulletText}>{b}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderers = {
    summary: () =>
      data.summary && data.summary.trim() ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Profesyonel Profil</Text>
          <Text style={s.body}>{data.summary}</Text>
        </View>
      ) : null,
    education: () =>
      (data.education || []).length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Eğitim</Text>
          {data.education.map((e) => (
            <Item key={e.id} title={e.degree || "Bölüm / Derece"} subtitle={[e.school, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)}>
              {e.gpa ? <Text style={s.body}>Not Ortalaması: {e.gpa}</Text> : null}
            </Item>
          ))}
        </View>
      ) : null,
    experience: () =>
      (data.experience || []).length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>İş Deneyimi</Text>
          {data.experience.map((e) => (
            <Item key={e.id} title={e.position || "Pozisyon"} subtitle={[e.company, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)}>
              <Bullets items={e.bullets} />
            </Item>
          ))}
        </View>
      ) : null,
    skills: () =>
      skills.length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Beceriler</Text>
          <Text style={s.body}>{skills.join("   •   ")}</Text>
        </View>
      ) : null,
    languages: () =>
      (data.languages || []).length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Diller</Text>
          {data.languages.map((l) => (
            <Text key={l.id} style={[s.body, { marginBottom: 1 }]}>
              <Text style={{ fontWeight: 700 }}>{l.name}</Text>{l.level ? ` — ${l.level}` : ""}
            </Text>
          ))}
        </View>
      ) : null,
    projects: () =>
      (data.projects || []).length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Projeler</Text>
          {data.projects.map((pr) => (
            <Item key={pr.id} title={pr.name || "Proje"} subtitle={[pr.role, pr.link].filter(Boolean).join(" — ")} date={dateRange(pr.startDate, pr.endDate, pr.current)}>
              <Bullets items={pr.bullets} />
            </Item>
          ))}
        </View>
      ) : null,
    certificates: () =>
      (data.certificates || []).length ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Sertifikalar</Text>
          {data.certificates.map((c) => (
            <Item key={c.id} title={c.name || "Sertifika"} subtitle={c.issuer} date={c.expiryDate ? `${formatDate(c.issueDate)} – ${formatDate(c.expiryDate)}` : formatDate(c.issueDate)}>
              {c.credential ? <Text style={s.body}>Kimlik: {c.credential}</Text> : null}
            </Item>
          ))}
        </View>
      ) : null,
  };

  return (
    <Document title={`${fullName} - CV`} author={fullName}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          {t.showPhoto ? (
            <View style={s.headerRow}>
              {p.photo ? <Image src={p.photo} style={s.photo} /> : null}
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{fullName}</Text>
                {p.title ? <Text style={s.title}>{p.title}</Text> : null}
                {contacts.length ? <Text style={s.contact}>{contacts.join("   •   ")}</Text> : null}
              </View>
            </View>
          ) : (
            <>
              <Text style={s.name}>{fullName}</Text>
              {p.title ? <Text style={s.title}>{p.title}</Text> : null}
              {contacts.length ? <Text style={s.contact}>{contacts.join("   •   ")}</Text> : null}
            </>
          )}
        </View>
        {(order || []).map((id) => (
          <View key={id}>{renderers[id] ? renderers[id]() : null}</View>
        ))}
      </Page>
    </Document>
  );
};
