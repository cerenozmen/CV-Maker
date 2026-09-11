import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const Field = ({ label, value, onChange, placeholder, type = "text", testId, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <Label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </Label>
    <Input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      data-testid={testId}
      className="h-10 rounded-lg border-slate-200 bg-white text-sm text-slate-900 transition-colors focus-visible:ring-blue-500"
    />
  </div>
);
