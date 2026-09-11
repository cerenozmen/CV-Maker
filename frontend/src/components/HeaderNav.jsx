import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { CvPdfDocument } from "./CvPdfDocument";
import { FileText, Download, Sparkles, Eraser, Loader2 } from "lucide-react";

export const HeaderNav = ({ data, template, order, onLoadSample, onClear }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const blob = await pdf(<CvPdfDocument data={data} template={template} order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const p = data.personal || {};
      const name = `${p.firstName || "CV"}_${p.lastName || ""}`.trim().replace(/\s+/g, "_");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name || "CV"}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF oluşturma hatası", e);
      alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-[15px] font-bold tracking-tight text-white">ATS CV Hazırlayıcı</h1>
            <p className="hidden text-[11px] text-slate-400 sm:block">Sade, profesyonel ve ATS uyumlu özgeçmiş</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            data-testid="load-sample-button"
            className="hidden items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 sm:flex"
          >
            <Sparkles className="h-3.5 w-3.5" /> Örnek Veri
          </button>
          <button
            type="button"
            onClick={onClear}
            data-testid="clear-form-button"
            className="hidden items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 sm:flex"
          >
            <Eraser className="h-3.5 w-3.5" /> Temizle
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            data-testid="pdf-download-button"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {loading ? "Hazırlanıyor..." : "PDF İndir"}
          </button>
        </div>
      </div>
    </header>
  );
};
