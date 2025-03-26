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
  { name: "SAP", icon: "sap.png" },
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

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-6 transition-all group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20"
      initial={{ opacity: 0 }}
      whileInView={{ 
        opacity: 1,
        transition: {
          duration: 0.2
        }
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.01,
        transition: { 
          duration: 0.2
        }
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={skill.icon}
          alt={skill.name}
          loading="lazy"
          className="h-16 w-16 object-contain dark:invert dark:brightness-150 dark:contrast-75 transition-transform duration-200 hover:scale-105"
        />
        <span className="text-sm font-medium text-foreground dark:text-white transition-opacity duration-200">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  return (
    <section className="min-h-screen bg-muted/50 py-24 px-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-foreground dark:text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: "transform, opacity" }}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05,
                duration: 0.2
              }
            }
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name + index} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
