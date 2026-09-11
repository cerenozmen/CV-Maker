import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Plus, Trash2, X } from "lucide-react";

export const AddButton = ({ onClick, children, testId }) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
    data-testid={testId}
    className="mt-1 w-full gap-2 rounded-lg border-dashed border-slate-300 text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600"
  >
    <Plus className="h-4 w-4" />
    {children}
  </Button>
);

export const EntryCard = ({ children, onRemove, testId, removeTestId }) => (
  <div
    data-testid={testId}
    className="relative rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-slate-300"
  >
    <button
      type="button"
      onClick={onRemove}
      data-testid={removeTestId}
      className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
      aria-label="Sil"
    >
      <Trash2 className="h-4 w-4" />
    </button>
    <div className="flex flex-col gap-4 pr-8">{children}</div>
  </div>
);

const MiniField = ({ label, value, onChange, placeholder, type = "text", testId }) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</Label>
    <Input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      data-testid={testId}
      className="h-10 rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500"
    />
  </div>
);

export { MiniField };

export const DateFields = ({ entry, onChange, currentLabel = "Halen devam ediyor", startTestId, endTestId, currentTestId }) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    <MiniField label="Başlangıç Tarihi" type="month" value={entry.startDate} onChange={(v) => onChange({ ...entry, startDate: v })} testId={startTestId} />
    <div className="flex flex-col gap-1.5">
      <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Bitiş Tarihi</Label>
      <Input
        type="month"
        value={entry.endDate || ""}
        disabled={entry.current}
        onChange={(e) => onChange({ ...entry, endDate: e.target.value })}
        data-testid={endTestId}
        className="h-10 rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500 disabled:opacity-50"
      />
      <label className="mt-1 flex cursor-pointer items-center gap-2 text-xs text-slate-600">
        <Checkbox
          checked={!!entry.current}
          onCheckedChange={(c) => onChange({ ...entry, current: !!c, endDate: c ? "" : entry.endDate })}
          data-testid={currentTestId}
        />
        {currentLabel}
      </label>
    </div>
  </div>
);

export const BulletsEditor = ({ bullets = [], onChange, testIdPrefix }) => {
  const setAt = (i, val) => {
    const next = [...bullets];
    next[i] = val;
    onChange(next);
  };
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i));
  const add = () => onChange([...bullets, ""]);
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Açıklama / Başarı Maddeleri
      </Label>
      {bullets.map((b, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-3 text-slate-400">•</span>
          <Textarea
            value={b}
            onChange={(e) => setAt(i, e.target.value)}
            rows={2}
            placeholder="Somut, ölçülebilir bir başarı yazın..."
            data-testid={`${testIdPrefix}-bullet-${i}`}
            className="resize-none rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-2 rounded-md p-1 text-slate-400 transition-colors hover:text-red-500"
            aria-label="Maddeyi sil"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        data-testid={`${testIdPrefix}-add-bullet`}
        className="flex w-fit items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
      >
        <Plus className="h-3.5 w-3.5" /> Madde ekle
      </button>
    </div>
  );
};
