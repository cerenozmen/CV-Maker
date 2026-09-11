import { useMemo, useState } from "react";
import { analyzeJob } from "../lib/jobMatch";
import { Textarea } from "./ui/textarea";
import { Target, Plus, CheckCircle2 } from "lucide-react";

export const JobMatcher = ({ data, onAddSkill }) => {
  const [jobText, setJobText] = useState("");
  const result = useMemo(() => analyzeJob(jobText, data), [jobText, data]);

  const tone =
    !result ? {}
    : result.score >= 70 ? { text: "text-emerald-700", bg: "bg-emerald-50", ring: "ring-emerald-200", bar: "bg-emerald-500" }
    : result.score >= 40 ? { text: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-200", bar: "bg-amber-500" }
    : { text: "text-red-700", bg: "bg-red-50", ring: "ring-red-200", bar: "bg-red-500" };

  return (
    <div data-testid="job-matcher" className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-1 flex items-center gap-2">
        <Target className="h-4 w-4 text-slate-500" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">İş İlanı Eşleştirme</span>
      </div>
      <p className="mb-3 text-[11px] text-slate-400">
        İş ilanı metnini yapıştırın; CV'nizde eksik olan anahtar kelimeleri gösterelim.
      </p>
      <Textarea
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        rows={5}
        placeholder="İş ilanının tamamını buraya yapıştırın..."
        data-testid="job-text-input"
        className="resize-none rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500"
      />

      {result && (
        <div className="mt-4" data-testid="job-match-result">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Eşleşme Skoru</span>
            <span data-testid="job-match-score" className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-bold ring-1 ring-inset ${tone.text} ${tone.bg} ${tone.ring}`}>
              %{result.score}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full transition-all duration-500 ${tone.bar}`} style={{ width: `${result.score}%` }} />
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-[12px] font-semibold text-slate-700">
              Eksik anahtar kelimeler {result.missing.length > 0 && <span className="text-slate-400">({result.missing.length})</span>}
            </p>
            {result.missing.length === 0 ? (
              <p className="flex items-center gap-1.5 text-[12px] text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Harika! Öne çıkan tüm anahtar kelimeler CV'nizde mevcut.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2" data-testid="missing-keywords">
                {result.missing.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => onAddSkill(kw)}
                    data-testid={`add-keyword-${kw}`}
                    title="Becerilere ekle"
                    className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-200 transition-colors hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-200"
                  >
                    {kw} <Plus className="h-3 w-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {result.matched.length > 0 && (
            <div className="mt-4">
              <p className="mb-1.5 text-[12px] font-semibold text-slate-700">
                Eşleşen kelimeler <span className="text-slate-400">({result.matched.length})</span>
              </p>
              <div className="flex flex-wrap gap-2" data-testid="matched-keywords">
                {result.matched.map((kw) => (
                  <span key={kw} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
