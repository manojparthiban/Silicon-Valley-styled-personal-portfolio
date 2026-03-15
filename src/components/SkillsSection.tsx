import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  category?: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: "SAP ABAP", icon: "sap.png", category: "Enterprise" },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Languages",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Languages",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Data",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    category: "Cloud",
  },
  {
    name: "Microsoft Office",
    icon: "https://img.icons8.com/color/240/microsoft-office-2019.png",
    category: "Tools",
  },
  {
    name: "Jira",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    category: "Tools",
  },
  {
    name: "OpenAI",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
    category: "AI / ML",
  },
  {
    name: "Notion",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg",
    category: "Tools",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    category: "Data",
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    category: "AI / ML",
  },
  {
    name: "Scikit Learn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    category: "AI / ML",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "DevOps",
  },
  {
    name: "Azure DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    category: "DevOps",
  },
  {
    name: "Raspberry Pi",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
    category: "IoT",
  },
];

/* ── animation variants ───────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const SkillCard = ({ skill }: { skill: Skill }) => (
  <motion.div
    className="skill-card group"
    variants={itemVariants}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    {/* Icon */}
    <div className="skill-card__icon-wrap">
      <img
        src={skill.icon}
        alt={skill.name}
        loading="lazy"
        className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-110 dark:invert dark:brightness-150 dark:contrast-75"
      />
    </div>

    {/* Label */}
    <span className="text-sm font-semibold text-foreground/85 group-hover:text-foreground transition-colors duration-200 text-center leading-tight">
      {skill.name}
    </span>

    {/* Category tag */}
    {skill.category && (
      <span className="skill-card__tag">{skill.category}</span>
    )}
  </motion.div>
);

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  return (
    <section className="skills-section relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* ── Section Header ─────────────── */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <span className="about-section-badge">
            <Cpu className="w-3.5 h-3.5" />
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-5 mb-4">
            Skills &{" "}
            <span className="hero-name-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Tools and technologies I work with on a daily basis
          </p>
        </motion.div>

        {/* ── Skills Grid ─────────────── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
          variants={sectionVariants}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name + index} skill={skill} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
