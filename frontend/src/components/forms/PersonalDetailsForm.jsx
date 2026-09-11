import { useRef, useState } from "react";
import { Field } from "./Field";
import { fileToResizedDataUrl } from "../../lib/cvUtils";
import { PhotoCropperDialog } from "../PhotoCropperDialog";
import { Upload, Trash2, User, Crop } from "lucide-react";

export const PersonalDetailsForm = ({ data, update }) => {
  const set = (key) => (val) => update({ ...data, [key]: val });
  const fileRef = useRef(null);
  const [cropOpen, setCropOpen] = useState(false);

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const original = await fileToResizedDataUrl(file, 800);
      update({ ...data, photoOriginal: original, photoCrop: null });
      setCropOpen(true);
    } catch (_) { /* ignore */ }
    e.target.value = "";
  };

  const onCropSave = (croppedDataUrl, cropState) => {
    update({ ...data, photo: croppedDataUrl, photoCrop: cropState });
    setCropOpen(false);
  };

  const removePhoto = () => update({ ...data, photo: "", photoOriginal: "", photoCrop: null });

  return (
    <div className="flex flex-col gap-4">
      {/* Profile photo (optional; used by photo-enabled templates) */}
      <div className="flex items-center gap-4 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300" data-testid="photo-thumbnail">
          {data.photo ? (
            <img src={data.photo} alt="Profil" className="h-full w-full object-cover" />
          ) : (
            <User className="h-7 w-7 text-slate-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-slate-700">Profil Fotoğrafı</p>
          <p className="text-[11px] text-slate-400">İsteğe bağlı — yalnızca "Fotoğraflı" şablonda görünür. ATS uyumunu etkilemez.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" data-testid="input-photo" />
            <button type="button" onClick={() => fileRef.current?.click()} data-testid="upload-photo-button" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700">
              <Upload className="h-3.5 w-3.5" /> Yükle
            </button>
            {data.photoOriginal && (
              <button type="button" onClick={() => setCropOpen(true)} data-testid="edit-photo-button" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600">
                <Crop className="h-3.5 w-3.5" /> Kırp
              </button>
            )}
            {(data.photo || data.photoOriginal) && (
              <button type="button" onClick={removePhoto} data-testid="remove-photo-button" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-red-300 hover:text-red-500">
                <Trash2 className="h-3.5 w-3.5" /> Kaldır
              </button>
            )}
          </div>
        </div>
      </div>

      <PhotoCropperDialog
        open={cropOpen}
        src={data.photoOriginal}
        initialCrop={data.photoCrop}
        onCancel={() => setCropOpen(false)}
        onSave={onCropSave}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Ad" value={data.firstName} onChange={set("firstName")} placeholder="Ahmet" testId="input-first-name" />
        <Field label="Soyad" value={data.lastName} onChange={set("lastName")} placeholder="Yılmaz" testId="input-last-name" />
        <Field label="Unvan" value={data.title} onChange={set("title")} placeholder="Kıdemli Yazılım Geliştirici" testId="input-title" className="sm:col-span-2" />
        <Field label="E-posta" value={data.email} onChange={set("email")} placeholder="ahmet@ornek.com" testId="input-email" type="email" />
        <Field label="Telefon" value={data.phone} onChange={set("phone")} placeholder="+90 5xx xxx xx xx" testId="input-phone" />
        <Field label="Konum (İl / Ülke)" value={data.location} onChange={set("location")} placeholder="İstanbul, Türkiye" testId="input-location" className="sm:col-span-2" />
        <Field label="LinkedIn" value={data.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/kullanici" testId="input-linkedin" />
        <Field label="GitHub" value={data.github} onChange={set("github")} placeholder="github.com/kullanici" testId="input-github" />
        <Field label="Web Sitesi" value={data.website} onChange={set("website")} placeholder="siteniz.com" testId="input-website" className="sm:col-span-2" />
      </div>
    </div>
  );
};
