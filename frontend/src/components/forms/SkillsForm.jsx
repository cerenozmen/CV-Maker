import { useState } from "react";
import { Input } from "../ui/input";
import { X, Plus } from "lucide-react";

export const SkillsForm = ({ skills = [], update }) => {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const parts = draft.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) update([...skills, ...parts]);
    setDraft("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    }
  };

  const remove = (i) => update(skills.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Beceri yazıp Enter'a basın (örn. React)"
          data-testid="input-skill"
          className="h-10 rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500"
        />
        <button
          type="button"
          onClick={commit}
          data-testid="add-skill-button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-slate-700"
          aria-label="Beceri ekle"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2" data-testid="skills-list">
        {skills.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200"
          >
            {s}
            <button
              type="button"
              onClick={() => remove(i)}
              data-testid={`remove-skill-${i}`}
              className="transition-colors hover:text-red-500"
              aria-label={`${s} sil`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-slate-400">Henüz beceri eklenmedi.</p>
        )}
      </div>
    </div>
  );
};
