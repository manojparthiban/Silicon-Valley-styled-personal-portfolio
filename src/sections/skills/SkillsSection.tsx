import React, { useMemo, useState } from "react";
import { m } from "framer-motion";
import TiltCard from "@/components/common/TiltCard";
import SkillOrbit, { OrbitSkill, SkillIcon } from "@/sections/skills/SkillOrbit";
import { Label, SectionHeader, reveal } from "@/components/common/SectionBits";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type Skill = Omit<OrbitSkill, "group">;

const groups: Array<{ id: string; title: string; wide?: boolean; skills: Skill[] }> = [
  {
    id: "sap",
    title: "sap & enterprise",
    wide: true,
    skills: [
      { name: "SAP ABAP", icon: "/images/logos/sap.webp" },
      { name: "S/4HANA", mark: "S/4" },
      { name: "RAP", mark: "RAP" },
      { name: "CDS Views", mark: "CDS" },
      { name: "OData", mark: "OD" },
      { name: "Fiori / UI5", mark: "UI5" },
      { name: "SAP BTP", mark: "BTP" },
    ],
  },
  {
    id: "lang",
    title: "languages & data",
    skills: [
      { name: "Python", icon: `${DEVICON}/python/python-original.svg` },
      { name: "Java", icon: `${DEVICON}/java/java-original.svg` },
      { name: "SQL", icon: `${DEVICON}/mysql/mysql-original.svg`, mono: true },
      { name: "Pandas", icon: `${DEVICON}/pandas/pandas-original.svg`, mono: true },
    ],
  },
  {
    id: "ai",
    title: "ai & ml",
    skills: [
      { name: "OpenAI", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", mono: true },
      { name: "PyTorch", icon: `${DEVICON}/pytorch/pytorch-original.svg` },
      { name: "Scikit Learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    ],
  },
  {
    id: "ops",
    title: "cloud, devops & iot",
    skills: [
      { name: "Firebase", icon: `${DEVICON}/firebase/firebase-plain.svg` },
      { name: "Docker", icon: `${DEVICON}/docker/docker-original.svg` },
      { name: "Azure DevOps", icon: `${DEVICON}/azure/azure-original.svg` },
      { name: "Raspberry Pi", icon: `${DEVICON}/raspberrypi/raspberrypi-original.svg` },
    ],
  },
  {
    id: "flow",
    title: "workflow",
    skills: [
      { name: "n8n", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg", mono: true },
      { name: "Jira", icon: `${DEVICON}/jira/jira-original.svg` },
      { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg", mono: true },
      { name: "Microsoft Office", icon: "https://img.icons8.com/color/240/microsoft-office-2019.png" },
    ],
  },
];

const SkillsSection = React.memo(() => {
  const [active, setActive] = useState<string | null>(null);

  const orbitSkills = useMemo<OrbitSkill[]>(
    () => groups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.title }))),
    [],
  );

  return (
    <section className="skills relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-14 md:pt-20 pb-2 md:pb-4">
      <div className="sec-backdrop" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="03"
          name="skills"
          title={
            <>
              Tools of the trade<span className="text-primary">.</span>
            </>
          }
          sub="The SAP stack I work with every day, from ABAP and CDS on S/4HANA to Fiori, RAP and BTP extensions."
        />

        <div className="skills-layout">
          {/* ── 3D orbit ── */}
          <m.div {...reveal} className="skills-layout__orbit">
            <div className="bento-card skills-orbit-card">
              <Label>stack.orbit()</Label>
              <SkillOrbit skills={orbitSkills} active={active} />
            </div>
          </m.div>

          {/* ── Grouped skills ── */}
          <div className="skills-groups">
            {groups.map((group) => (
              <m.div key={group.id} {...reveal} className={group.wide ? "skills-groups__wide" : undefined}>
                <TiltCard className="bento-card skills-group" max={5}>
                  <div className="skills-group__head">
                    <Label>{group.title}</Label>
                    <span className="skills-group__count">{String(group.skills.length).padStart(2, "0")}</span>
                  </div>
                  <ul className={`skills-group__list ${group.wide ? "skills-group__list--wide" : ""}`}>
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        tabIndex={0}
                        className={`skills-row ${active === skill.name ? "is-active" : ""}`}
                        onPointerEnter={() => setActive(skill.name)}
                        onPointerLeave={() => setActive(null)}
                        onFocus={() => setActive(skill.name)}
                        onBlur={() => setActive(null)}
                      >
                        <span className="skills-row__tile">
                          <SkillIcon skill={{ ...skill, group: group.title }} size={22} />
                        </span>
                        <span className="skills-row__name">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
