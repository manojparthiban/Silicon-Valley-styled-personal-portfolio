import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: "SAP", icon: "https://img.icons8.com/ios-glyphs/100/sap.png" },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Microsoft Office",
    icon: "https://img.icons8.com/color/240/microsoft-office-2019.png",
  },
  {
    name: "Jira",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  },
  {
    name: "OpenAI",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  },
  {
    name: "Notion",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "Scikit Learn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Azure DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Raspberry Pi",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  // Triple the skills array for smoother infinite scroll
  const scrollingSkills = [...skills, ...skills, ...skills];

  return (
    <section className="min-h-screen bg-muted/50 py-20 px-4 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* First Row - Left to Right */}
          <div className="w-full overflow-hidden select-none">
            <motion.div
              className="flex space-x-16"
              animate={{
                x: ["-33.33%", "-66.66%"],
              }}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
              style={{
                width: `${250 * Math.ceil(skills.length / 2) * 3}px`,
              }}
            >
              {[
                ...skills.slice(0, Math.ceil(skills.length / 2)),
                ...skills.slice(0, Math.ceil(skills.length / 2)),
                ...skills.slice(0, Math.ceil(skills.length / 2)),
              ].map((skill, index) => (
                <div
                  key={`row1-${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center space-y-4 w-[200px] flex-shrink-0"
                >
                  <div className="w-24 h-24 relative group">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain filter dark:invert transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="w-full overflow-hidden select-none">
            <motion.div
              className="flex space-x-16"
              animate={{
                x: ["-66.66%", "-33.33%"],
              }}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
              style={{
                width: `${250 * Math.floor(skills.length / 2) * 3}px`,
              }}
            >
              {[
                ...skills.slice(Math.ceil(skills.length / 2)),
                ...skills.slice(Math.ceil(skills.length / 2)),
                ...skills.slice(Math.ceil(skills.length / 2)),
              ].map((skill, index) => (
                <div
                  key={`row2-${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center space-y-4 w-[200px] flex-shrink-0"
                >
                  <div className="w-24 h-24 relative group">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain filter dark:invert transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
