import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { PersonalDetailsForm } from "./forms/PersonalDetailsForm";
import { ProfileSummaryForm } from "./forms/ProfileSummaryForm";
import { EducationForm } from "./forms/EducationForm";
import { WorkExperienceForm } from "./forms/WorkExperienceForm";
import { SkillsForm } from "./forms/SkillsForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { CertificatesForm } from "./forms/CertificatesForm";
import { User, FileText, GraduationCap, Briefcase, Wrench, Languages, FolderGit2, Award } from "lucide-react";

const SectionTitle = ({ icon: Icon, label, count }) => (
  <div className="flex items-center gap-2.5">
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
      <Icon className="h-4 w-4" />
    </span>
    <span className="text-[14px] font-semibold text-slate-800">{label}</span>
    {typeof count === "number" && count > 0 && (
      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">{count}</span>
    )}
  </div>
);

export const CvFormEditor = ({ data, patch }) => {
  return (
    <Accordion type="multiple" defaultValue={["personal", "summary"]} className="flex flex-col gap-3">
      <AccordionItem value="personal" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-personal">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={User} label="Kişisel Bilgiler" /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <PersonalDetailsForm data={data.personal} update={(v) => patch({ personal: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="summary" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-summary">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={FileText} label="Profesyonel Profil" /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <ProfileSummaryForm value={data.summary} update={(v) => patch({ summary: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-education">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={GraduationCap} label="Eğitim" count={data.education.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <EducationForm items={data.education} update={(v) => patch({ education: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-experience">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={Briefcase} label="İş Deneyimi" count={data.experience.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <WorkExperienceForm items={data.experience} update={(v) => patch({ experience: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-skills">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={Wrench} label="Beceriler" count={data.skills.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <SkillsForm skills={data.skills} update={(v) => patch({ skills: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="languages" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-languages">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={Languages} label="Diller" count={data.languages.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <LanguagesForm items={data.languages} update={(v) => patch({ languages: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-projects">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={FolderGit2} label="Projeler" count={data.projects.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <ProjectsForm items={data.projects} update={(v) => patch({ projects: v })} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="certificates" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-certificates">
        <AccordionTrigger className="py-4 hover:no-underline"><SectionTitle icon={Award} label="Sertifikalar" count={data.certificates.length} /></AccordionTrigger>
        <AccordionContent className="pb-5">
          <CertificatesForm items={data.certificates} update={(v) => patch({ certificates: v })} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
