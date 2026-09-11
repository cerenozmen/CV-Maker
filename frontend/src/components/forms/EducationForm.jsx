import { uid } from "../../lib/cvUtils";
import { AddButton, EntryCard, MiniField, DateFields } from "./parts";

export const EducationForm = ({ items = [], update }) => {
  const change = (id, next) => update(items.map((it) => (it.id === id ? next : it)));
  const remove = (id) => update(items.filter((it) => it.id !== id));
  const add = () =>
    update([...items, { id: uid(), school: "", degree: "", city: "", startDate: "", endDate: "", current: false, gpa: "" }]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <EntryCard key={it.id} onRemove={() => remove(it.id)} testId={`education-item-${i}`} removeTestId={`remove-education-${i}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniField label="Okul / Üniversite" value={it.school} onChange={(v) => change(it.id, { ...it, school: v })} placeholder="Boğaziçi Üniversitesi" testId={`input-edu-school-${i}`} />
            <MiniField label="Bölüm / Derece" value={it.degree} onChange={(v) => change(it.id, { ...it, degree: v })} placeholder="Bilgisayar Müh., Lisans" testId={`input-edu-degree-${i}`} />
            <MiniField label="Şehir" value={it.city} onChange={(v) => change(it.id, { ...it, city: v })} placeholder="İstanbul" testId={`input-edu-city-${i}`} />
            <MiniField label="Not Ortalaması (opsiyonel)" value={it.gpa} onChange={(v) => change(it.id, { ...it, gpa: v })} placeholder="3.45 / 4.00" testId={`input-edu-gpa-${i}`} />
          </div>
          <DateFields entry={it} onChange={(next) => change(it.id, next)} currentLabel="Halen devam ediyor" startTestId={`input-edu-start-${i}`} endTestId={`input-edu-end-${i}`} currentTestId={`checkbox-edu-current-${i}`} />
        </EntryCard>
      ))}
      <AddButton onClick={add} testId="add-education-button">Eğitim Ekle</AddButton>
    </div>
  );
};
