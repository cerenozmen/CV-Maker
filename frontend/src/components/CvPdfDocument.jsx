import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { dateRange, formatDate } from "../lib/cvUtils";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammT.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLoHQiA8.ttf", fontStyle: "italic" },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const s = StyleSheet.create({
  page: { fontFamily: "Roboto", fontSize: 10, color: "#1a1a1a", paddingVertical: 40, paddingHorizontal: 44, lineHeight: 1.4 },
  name: { fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#0f172a" },
  title: { fontSize: 12, marginTop: 2, color: "#334155" },
  contact: { fontSize: 8.5, marginTop: 6, color: "#334155" },
  headerRule: { borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 8, marginBottom: 4 },
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#0f172a", borderBottomWidth: 1.5, borderBottomColor: "#1e293b", paddingBottom: 3, marginBottom: 6 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  itemTitle: { fontSize: 10.5, fontWeight: 700, color: "#0f172a" },
  itemSub: { fontSize: 9.5, color: "#334155", marginTop: 1 },
  itemDate: { fontSize: 8.5, color: "#475569", marginLeft: 8 },
  body: { fontSize: 9.5, color: "#1a1a1a" },
  bulletRow: { flexDirection: "row", marginTop: 2, paddingRight: 4 },
  bulletDot: { width: 10, fontSize: 9.5 },
  bulletText: { flex: 1, fontSize: 9.5, color: "#1a1a1a" },
  entry: { marginBottom: 8 },
});

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

export const CvPdfDocument = ({ data }) => {
  const p = data.personal || {};
  const fullName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Adınız Soyadınız";
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  const skills = (data.skills || []).filter((x) => x.trim());

  return (
    <Document title={`${fullName} - CV`} author={fullName}>
      <Page size="A4" style={s.page}>
        <View style={s.headerRule}>
          <Text style={s.name}>{fullName}</Text>
          {p.title ? <Text style={s.title}>{p.title}</Text> : null}
          {contacts.length ? <Text style={s.contact}>{contacts.join("   •   ")}</Text> : null}
        </View>

        {data.summary && data.summary.trim() ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Profesyonel Profil</Text>
            <Text style={s.body}>{data.summary}</Text>
          </View>
        ) : null}

        {(data.education || []).length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Eğitim</Text>
            {data.education.map((e) => (
              <Item key={e.id} title={e.degree || "Bölüm / Derece"} subtitle={[e.school, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)}>
                {e.gpa ? <Text style={s.body}>Not Ortalaması: {e.gpa}</Text> : null}
              </Item>
            ))}
          </View>
        ) : null}

        {(data.experience || []).length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>İş Deneyimi</Text>
            {data.experience.map((e) => (
              <Item key={e.id} title={e.position || "Pozisyon"} subtitle={[e.company, e.city].filter(Boolean).join(", ")} date={dateRange(e.startDate, e.endDate, e.current)}>
                <Bullets items={e.bullets} />
              </Item>
            ))}
          </View>
        ) : null}

        {skills.length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Beceriler</Text>
            <Text style={s.body}>{skills.join("   •   ")}</Text>
          </View>
        ) : null}

        {(data.languages || []).length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Diller</Text>
            {data.languages.map((l) => (
              <Text key={l.id} style={[s.body, { marginBottom: 1 }]}>
                <Text style={{ fontWeight: 700 }}>{l.name}</Text>
                {l.level ? ` — ${l.level}` : ""}
              </Text>
            ))}
          </View>
        ) : null}

        {(data.projects || []).length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Projeler</Text>
            {data.projects.map((pr) => (
              <Item key={pr.id} title={pr.name || "Proje"} subtitle={[pr.role, pr.link].filter(Boolean).join(" — ")} date={dateRange(pr.startDate, pr.endDate, pr.current)}>
                <Bullets items={pr.bullets} />
              </Item>
            ))}
          </View>
        ) : null}

        {(data.certificates || []).length ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Sertifikalar</Text>
            {data.certificates.map((c) => (
              <Item key={c.id} title={c.name || "Sertifika"} subtitle={c.issuer} date={c.expiryDate ? `${formatDate(c.issueDate)} – ${formatDate(c.expiryDate)}` : formatDate(c.issueDate)}>
                {c.credential ? <Text style={s.body}>Kimlik: {c.credential}</Text> : null}
              </Item>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
};
