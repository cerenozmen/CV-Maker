import { computeAtsAudit } from "../lib/cvUtils";
import { CheckCircle2, Circle, Gauge } from "lucide-react";

export const AtsScoreChecker = ({ data }) => {
  const { score, checks, passed, total } = computeAtsAudit(data);
  const tone =
    score >= 80 ? { text: "text-emerald-700", bg: "bg-emerald-50", ring: "ring-emerald-200", bar: "bg-emerald-500" }
    : score >= 50 ? { text: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-200", bar: "bg-amber-500" }
    : { text: "text-red-700", bg: "bg-red-50", ring: "ring-red-200", bar: "bg-red-500" };

  return (
    <div data-testid="ats-score-checker" className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-slate-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">ATS Uyum Skoru</span>
        </div>
        <span data-testid="ats-score-value" className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-bold ring-1 ring-inset ${tone.text} ${tone.bg} ${tone.ring}`}>
          %{score}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all duration-500 ${tone.bar}`} style={{ width: `${score}%` }} />
      </div>
      <p className="mt-2 text-[11px] text-slate-400">{passed} / {total} kontrol geçildi</p>
      <ul className="mt-3 space-y-1.5">
        {checks.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px]">
            {c.pass
              ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              : <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />}
            <span className={c.pass ? "text-slate-600" : "text-slate-400"}>{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
