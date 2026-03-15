import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { FolderGit2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Automated Hydroponic Controller",
    description:
      "An automated control system optimizing nutrition and water management for hydroponics.",
    imageUrl: "/Hydroponics.jpg",
    technologies: ["Arduino", "C++", "Firebase", "IoT Sensors", "Fusion 360"],
    liveUrl: "https://ieeexplore.ieee.org/document/10677314",
    githubUrl: "#",
    category: "IoT",
  },
  {
    id: 2,
    title: "Personal Portfolio Webapp",
    description: "Silicon Valley UI based personal Portfolio site",
    imageUrl: "/Portfolio.png",
    technologies: ["React Native", "TypeScript", "Vite"],
    liveUrl: "https://manojparthiban.vercel.app/",
    githubUrl: "https://manojparthiban.vercel.app/",
    category: "Web",
  },
  {
    id: 3,
    title: "Road Lane Detection for Autonomous Vehicles",
    description:
      "A real-time lane detection algorithm for autonomous driving and advanced driver assistance systems",
    imageUrl: "/roadlane.png",
    technologies: ["Python", "OpenCV", "PyTeseract", "CV Algos"],
    liveUrl: "#",
    githubUrl:
      "https://github.com/manojparthiban/Computer_Vision_FeatureDetection",
    category: "ML/AI",
  },
];

const categories = ["All", "IoT", "ML/AI", "Web"];

/* ── animation variants ───────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ProjectsSection = React.memo(
  ({ projects = defaultProjects }: ProjectsSectionProps) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = useMemo(() => {
      return selectedCategory === "All"
        ? projects
        : projects.filter((p) => p.category === selectedCategory);
    }, [selectedCategory, projects]);

    return (
      <section className="projects-section relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {/* ── Section Header ─────────────── */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="about-section-badge">
              <FolderGit2 className="w-3.5 h-3.5" />
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-5 mb-4">
              Featured{" "}
              <span className="hero-name-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Explore my work spanning web development, ML & AI, computer vision,
              and IoT automation
            </p>
          </motion.div>

          {/* ── Category Filters ─────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`project-filter-btn ${selectedCategory === cat ? "project-filter-btn--active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── Project Cards Grid ─────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  technologies={project.technologies}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    );
  },
);

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
