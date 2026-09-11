import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const ProfileSummaryForm = ({ value, update }) => (
  <div className="flex flex-col gap-2">
    <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      Profesyonel Özet
    </Label>
    <Textarea
      value={value || ""}
      onChange={(e) => update(e.target.value)}
      rows={6}
      placeholder="Kariyer hedeflerinizi ve öne çıkan yetkinliklerinizi 3-4 cümlede özetleyin. Anahtar kelimeler kullanmayı unutmayın."
      data-testid="input-summary"
      className="resize-none rounded-lg border-slate-200 bg-white text-sm leading-relaxed text-slate-900 transition-colors focus-visible:ring-blue-500"
    />
    <p className="text-[11px] text-slate-400">
      İpucu: İş ilanındaki anahtar kelimeleri özetinize dahil edin — ATS eşleşmesini artırır.
    </p>
  </div>
);
