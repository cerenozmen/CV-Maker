import { TEMPLATES } from "../lib/templates";
import { Check, LayoutTemplate } from "lucide-react";

export const TemplatePicker = ({ value, onChange }) => (
  <div data-testid="template-picker" className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="mb-3 flex items-center gap-2">
      <LayoutTemplate className="h-4 w-4 text-slate-500" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Şablon Seçimi</span>
    </div>
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
      {TEMPLATES.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            data-testid={`template-${t.id}`}
            aria-pressed={active}
            className={`group relative flex flex-col items-start gap-2 rounded-lg border p-2.5 text-left transition-colors ${active ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300"}`}
          >
            {/* mini preview */}
            <div className="h-14 w-full overflow-hidden rounded bg-white ring-1 ring-slate-100" style={{ fontFamily: t.previewFont }}>
              {t.showPhoto ? (
                <div className="flex items-center gap-1.5 px-2 pt-1.5">
                  <div className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: t.accent }} />
                  <div className="flex-1">
                    <div className="h-1 w-8 rounded-sm bg-slate-400" />
                    <div className="mt-0.5 h-0.5 w-full bg-slate-200" />
                  </div>
                </div>
              ) : (
                <div className="px-2 pt-1.5" style={{ textAlign: t.align }}>
                  <div className="h-1.5 w-8 rounded-sm" style={{ backgroundColor: t.accent, margin: t.align === "center" ? "0 auto" : undefined }} />
                  <div className="mt-1 h-0.5 w-full bg-slate-200" />
                </div>
              )}
              <div className="mt-1.5 space-y-1 px-2">
                <div className="h-1 w-10 rounded-sm" style={{ backgroundColor: t.divider === "none" ? "#94a3b8" : t.accent }} />
                <div className="h-0.5 w-full bg-slate-200" />
                <div className="h-0.5 w-5/6 bg-slate-200" />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className={`text-xs font-semibold ${active ? "text-blue-600" : "text-slate-700"}`}>{t.name}</span>
              {active && <Check className="h-3.5 w-3.5 text-blue-600" />}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);
