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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { 
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.img
          src={skill.icon}
          alt={skill.name}
          loading="lazy"
          className="h-16 w-16 object-contain dark:invert dark:brightness-150 dark:contrast-75 will-change-transform"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          }}
        />
        <span className="text-sm font-medium text-foreground dark:text-white">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  return (
    <section className="min-h-screen bg-muted/50 py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-foreground dark:text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
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
