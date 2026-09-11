import { uid } from "../../lib/cvUtils";
import { AddButton, EntryCard, MiniField, DateFields, BulletsEditor } from "./parts";

export const ProjectsForm = ({ items = [], update }) => {
  const change = (id, next) => update(items.map((it) => (it.id === id ? next : it)));
  const remove = (id) => update(items.filter((it) => it.id !== id));
  const add = () =>
    update([...items, { id: uid(), name: "", role: "", startDate: "", endDate: "", current: false, link: "", bullets: [""] }]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <EntryCard key={it.id} onRemove={() => remove(it.id)} testId={`project-item-${i}`} removeTestId={`remove-project-${i}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniField label="Proje Adı" value={it.name} onChange={(v) => change(it.id, { ...it, name: v })} placeholder="Proje adı" testId={`input-proj-name-${i}`} />
            <MiniField label="Rol" value={it.role} onChange={(v) => change(it.id, { ...it, role: v })} placeholder="Geliştirici" testId={`input-proj-role-${i}`} />
            <MiniField label="Proje Linki (opsiyonel)" value={it.link} onChange={(v) => change(it.id, { ...it, link: v })} placeholder="github.com/..." testId={`input-proj-link-${i}`} className="sm:col-span-2" />
          </div>
          <DateFields entry={it} onChange={(next) => change(it.id, next)} currentLabel="Devam ediyor" startTestId={`input-proj-start-${i}`} endTestId={`input-proj-end-${i}`} currentTestId={`checkbox-proj-current-${i}`} />
          <BulletsEditor bullets={it.bullets} onChange={(b) => change(it.id, { ...it, bullets: b })} testIdPrefix={`proj-${i}`} />
        </EntryCard>
      ))}
      <AddButton onClick={add} testId="add-project-button">Proje Ekle</AddButton>
    </div>
  );
};
