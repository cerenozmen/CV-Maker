import { uid } from "../../lib/cvUtils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AddButton, EntryCard, MiniField } from "./parts";

export const CertificatesForm = ({ items = [], update }) => {
  const change = (id, next) => update(items.map((it) => (it.id === id ? next : it)));
  const remove = (id) => update(items.filter((it) => it.id !== id));
  const add = () =>
    update([...items, { id: uid(), name: "", issuer: "", issueDate: "", expiryDate: "", credential: "" }]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <EntryCard key={it.id} onRemove={() => remove(it.id)} testId={`certificate-item-${i}`} removeTestId={`remove-certificate-${i}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniField label="Sertifika Adı" value={it.name} onChange={(v) => change(it.id, { ...it, name: v })} placeholder="AWS Certified..." testId={`input-cert-name-${i}`} className="sm:col-span-2" />
            <MiniField label="Veren Kurum" value={it.issuer} onChange={(v) => change(it.id, { ...it, issuer: v })} placeholder="Amazon Web Services" testId={`input-cert-issuer-${i}`} />
            <MiniField label="Sertifika No / Link (opsiyonel)" value={it.credential} onChange={(v) => change(it.id, { ...it, credential: v })} placeholder="No veya doğrulama linki" testId={`input-cert-credential-${i}`} />
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Alınma Tarihi</Label>
              <Input type="month" value={it.issueDate || ""} onChange={(e) => change(it.id, { ...it, issueDate: e.target.value })} data-testid={`input-cert-issue-${i}`} className="h-10 rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Geçerlilik Tarihi (opsiyonel)</Label>
              <Input type="month" value={it.expiryDate || ""} onChange={(e) => change(it.id, { ...it, expiryDate: e.target.value })} data-testid={`input-cert-expiry-${i}`} className="h-10 rounded-lg border-slate-200 bg-white text-sm transition-colors focus-visible:ring-blue-500" />
            </div>
          </div>
        </EntryCard>
      ))}
      <AddButton onClick={add} testId="add-certificate-button">Sertifika Ekle</AddButton>
    </div>
  );
};
