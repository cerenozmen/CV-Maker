import { uid } from "../../lib/cvUtils";
import { AddButton, EntryCard, MiniField, DateFields, BulletsEditor } from "./parts";

export const WorkExperienceForm = ({ items = [], update }) => {
  const change = (id, next) => update(items.map((it) => (it.id === id ? next : it)));
  const remove = (id) => update(items.filter((it) => it.id !== id));
  const add = () =>
    update([...items, { id: uid(), company: "", position: "", city: "", startDate: "", endDate: "", current: false, bullets: [""] }]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <EntryCard key={it.id} onRemove={() => remove(it.id)} testId={`experience-item-${i}`} removeTestId={`remove-experience-${i}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniField label="Pozisyon" value={it.position} onChange={(v) => change(it.id, { ...it, position: v })} placeholder="Yazılım Geliştirici" testId={`input-exp-position-${i}`} />
            <MiniField label="Şirket" value={it.company} onChange={(v) => change(it.id, { ...it, company: v })} placeholder="Şirket A.Ş." testId={`input-exp-company-${i}`} />
            <MiniField label="Şehir" value={it.city} onChange={(v) => change(it.id, { ...it, city: v })} placeholder="İstanbul" testId={`input-exp-city-${i}`} />
          </div>
          <DateFields entry={it} onChange={(next) => change(it.id, next)} currentLabel="Halen çalışıyorum" startTestId={`input-exp-start-${i}`} endTestId={`input-exp-end-${i}`} currentTestId={`checkbox-exp-current-${i}`} />
          <BulletsEditor bullets={it.bullets} onChange={(b) => change(it.id, { ...it, bullets: b })} testIdPrefix={`exp-${i}`} />
        </EntryCard>
      ))}
      <AddButton onClick={add} testId="add-experience-button">İş Deneyimi Ekle</AddButton>
    </div>
  );
};
