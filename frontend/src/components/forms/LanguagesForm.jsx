import { uid } from "../../lib/cvUtils";
import { AddButton, EntryCard, MiniField } from "./parts";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const LEVELS = ["Ana Dil", "İleri (C1)", "İleri (C2)", "Orta (B1)", "Orta (B2)", "Başlangıç (A1)", "Başlangıç (A2)"];

export const LanguagesForm = ({ items = [], update }) => {
  const change = (id, next) => update(items.map((it) => (it.id === id ? next : it)));
  const remove = (id) => update(items.filter((it) => it.id !== id));
  const add = () => update([...items, { id: uid(), name: "", level: "Orta (B1)" }]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <EntryCard key={it.id} onRemove={() => remove(it.id)} testId={`language-item-${i}`} removeTestId={`remove-language-${i}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniField label="Dil" value={it.name} onChange={(v) => change(it.id, { ...it, name: v })} placeholder="İngilizce" testId={`input-lang-name-${i}`} />
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Seviye</Label>
              <Select value={it.level} onValueChange={(v) => change(it.id, { ...it, level: v })}>
                <SelectTrigger data-testid={`select-lang-level-${i}`} className="h-10 rounded-lg border-slate-200 bg-white text-sm">
                  <SelectValue placeholder="Seviye seçin" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </EntryCard>
      ))}
      <AddButton onClick={add} testId="add-language-button">Dil Ekle</AddButton>
    </div>
  );
};
