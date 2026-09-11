import { useEffect, useState } from "react";
import { HeaderNav } from "./HeaderNav";
import { CvFormEditor } from "./CvFormEditor";
import { CvPreviewPaper } from "./CvPreviewPaper";
import { AtsScoreChecker } from "./AtsScoreChecker";
import { TemplatePicker } from "./TemplatePicker";
import { SectionOrderEditor } from "./SectionOrderEditor";
import { JobMatcher } from "./JobMatcher";
import { emptyCv, sampleCv } from "../data/sampleData";
import { DEFAULT_TEMPLATE, getTemplate } from "../lib/templates";
import { DEFAULT_SECTION_ORDER } from "../lib/sections";
import { PencilLine, Eye } from "lucide-react";

const STORAGE_KEY = "ats-cv-data-v1";

// Ensure older saved data has template + a complete, valid sectionOrder.
const normalize = (d) => {
  const data = { ...emptyCv(), ...d };
  data.template = getTemplate(d.template).id || DEFAULT_TEMPLATE;
  const saved = Array.isArray(d.sectionOrder) ? d.sectionOrder : [];
  const valid = saved.filter((id) => DEFAULT_SECTION_ORDER.includes(id));
  const missing = DEFAULT_SECTION_ORDER.filter((id) => !valid.includes(id));
  data.sectionOrder = [...valid, ...missing];
  return data;
};

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch (e) { /* ignore */ }
  return sampleCv();
};

export const CvBuilder = () => {
  const [data, setData] = useState(loadInitial);
  const [mobileTab, setMobileTab] = useState("edit");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }, [data]);

  const patch = (partial) => setData((prev) => ({ ...prev, ...partial }));
  const loadSample = () => setData(sampleCv());
  const clearAll = () => setData(emptyCv());
  const addSkill = (skill) =>
    setData((prev) =>
      prev.skills.some((s) => s.toLocaleLowerCase("tr") === skill.toLocaleLowerCase("tr"))
        ? prev
        : { ...prev, skills: [...prev.skills, skill] }
    );

  return (
    <div className="min-h-screen bg-slate-100" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
      <HeaderNav data={data} template={data.template} order={data.sectionOrder} onLoadSample={loadSample} onClear={clearAll} />

      {/* Mobile toggle */}
      <div className="sticky top-[61px] z-30 flex gap-1 border-b border-slate-200 bg-white p-2 lg:hidden">
        <button onClick={() => setMobileTab("edit")} data-testid="mobile-tab-edit" className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${mobileTab === "edit" ? "bg-slate-900 text-white" : "text-slate-600"}`}>
          <PencilLine className="h-4 w-4" /> Düzenle
        </button>
        <button onClick={() => setMobileTab("preview")} data-testid="mobile-tab-preview" className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors ${mobileTab === "preview" ? "bg-slate-900 text-white" : "text-slate-600"}`}>
          <Eye className="h-4 w-4" /> Önizleme
        </button>
      </div>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Editor column */}
        <div className={`flex flex-col gap-5 ${mobileTab === "edit" ? "block" : "hidden"} lg:flex`}>
          <div className="lg:hidden">
            <div className="flex gap-2">
              <button onClick={loadSample} data-testid="load-sample-button-mobile" className="flex-1 rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-700">Örnek Veri</button>
              <button onClick={clearAll} data-testid="clear-form-button-mobile" className="flex-1 rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-700">Temizle</button>
            </div>
          </div>
          <TemplatePicker value={data.template} onChange={(id) => patch({ template: id })} />
          <SectionOrderEditor order={data.sectionOrder} onChange={(o) => patch({ sectionOrder: o })} />
          <JobMatcher data={data} onAddSkill={addSkill} />
          <AtsScoreChecker data={data} />
          <CvFormEditor data={data} patch={patch} />
        </div>

        {/* Preview column */}
        <div className={`${mobileTab === "preview" ? "block" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-[85px]">
            <div className="overflow-auto rounded-xl bg-slate-200/70 p-3 sm:p-6" style={{ maxHeight: "calc(100vh - 110px)" }}>
              <div className="shadow-2xl ring-1 ring-slate-300">
                <CvPreviewPaper data={data} template={data.template} order={data.sectionOrder} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
