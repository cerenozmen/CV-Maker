import { Field } from "./Field";

export const PersonalDetailsForm = ({ data, update }) => {
  const set = (key) => (val) => update({ ...data, [key]: val });
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label="Ad" value={data.firstName} onChange={set("firstName")} placeholder="Ahmet" testId="input-first-name" />
      <Field label="Soyad" value={data.lastName} onChange={set("lastName")} placeholder="Yılmaz" testId="input-last-name" />
      <Field label="Unvan" value={data.title} onChange={set("title")} placeholder="Kıdemli Yazılım Geliştirici" testId="input-title" className="sm:col-span-2" />
      <Field label="E-posta" value={data.email} onChange={set("email")} placeholder="ahmet@ornek.com" testId="input-email" type="email" />
      <Field label="Telefon" value={data.phone} onChange={set("phone")} placeholder="+90 5xx xxx xx xx" testId="input-phone" />
      <Field label="Konum (İl / Ülke)" value={data.location} onChange={set("location")} placeholder="İstanbul, Türkiye" testId="input-location" className="sm:col-span-2" />
      <Field label="LinkedIn" value={data.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/kullanici" testId="input-linkedin" />
      <Field label="GitHub" value={data.github} onChange={set("github")} placeholder="github.com/kullanici" testId="input-github" />
      <Field label="Web Sitesi" value={data.website} onChange={set("website")} placeholder="siteniz.com" testId="input-website" className="sm:col-span-2" />
    </div>
  );
};
