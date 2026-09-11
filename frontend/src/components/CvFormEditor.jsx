import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { PersonalDetailsForm } from "./forms/PersonalDetailsForm";
import { ProfileSummaryForm } from "./forms/ProfileSummaryForm";
import { EducationForm } from "./forms/EducationForm";
import { WorkExperienceForm } from "./forms/WorkExperienceForm";
import { SkillsForm } from "./forms/SkillsForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { CertificatesForm } from "./forms/CertificatesForm";
import { SECTION_META, PERSONAL_META } from "../lib/sections";

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
  const order = data.sectionOrder || [];

  const bodyForms = {
    summary: { count: undefined, node: <ProfileSummaryForm value={data.summary} update={(v) => patch({ summary: v })} /> },
    education: { count: data.education.length, node: <EducationForm items={data.education} update={(v) => patch({ education: v })} /> },
    experience: { count: data.experience.length, node: <WorkExperienceForm items={data.experience} update={(v) => patch({ experience: v })} /> },
    skills: { count: data.skills.length, node: <SkillsForm skills={data.skills} update={(v) => patch({ skills: v })} /> },
    languages: { count: data.languages.length, node: <LanguagesForm items={data.languages} update={(v) => patch({ languages: v })} /> },
    projects: { count: data.projects.length, node: <ProjectsForm items={data.projects} update={(v) => patch({ projects: v })} /> },
    certificates: { count: data.certificates.length, node: <CertificatesForm items={data.certificates} update={(v) => patch({ certificates: v })} /> },
  };

  return (
    <Accordion type="multiple" defaultValue={["personal", "summary"]} className="flex flex-col gap-3">
      <AccordionItem value="personal" className="rounded-xl border border-slate-200 bg-white px-4" data-testid="section-personal">
        <AccordionTrigger className="py-4 hover:no-underline">
          <SectionTitle icon={PERSONAL_META.icon} label={PERSONAL_META.label} />
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <PersonalDetailsForm data={data.personal} update={(v) => patch({ personal: v })} />
        </AccordionContent>
      </AccordionItem>

      {order.map((id) => {
        const meta = SECTION_META[id];
        const form = bodyForms[id];
        if (!meta || !form) return null;
        return (
          <AccordionItem key={id} value={id} className="rounded-xl border border-slate-200 bg-white px-4" data-testid={`section-${id}`}>
            <AccordionTrigger className="py-4 hover:no-underline">
              <SectionTitle icon={meta.icon} label={meta.label} count={form.count} />
            </AccordionTrigger>
            <AccordionContent className="pb-5">{form.node}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
