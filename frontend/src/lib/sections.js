import { User, FileText, GraduationCap, Briefcase, Wrench, Languages, FolderGit2, Award } from "lucide-react";

// Body sections that can be reordered (personal details are always fixed on top).
export const SECTION_META = {
  summary:      { label: "Profesyonel Profil", icon: FileText },
  education:    { label: "Eğitim",              icon: GraduationCap },
  experience:  { label: "İş Deneyimi",         icon: Briefcase },
  skills:       { label: "Beceriler",           icon: Wrench },
  languages:    { label: "Diller",              icon: Languages },
  projects:     { label: "Projeler",            icon: FolderGit2 },
  certificates: { label: "Sertifikalar",        icon: Award },
};

export const PERSONAL_META = { label: "Kişisel Bilgiler", icon: User };

export const DEFAULT_SECTION_ORDER = [
  "summary", "education", "experience", "skills", "languages", "projects", "certificates",
];
