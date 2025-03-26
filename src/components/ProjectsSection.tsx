import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";

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
    liveUrl: "#",
    githubUrl: "#",
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

const ProjectsSection = React.memo(({ projects = defaultProjects }: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <section className="min-h-screen bg-muted/50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-white">
            My Projects
          </h2>
          <p className="text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of projects spanning web development, ML & AI
            projects, Computer Vision-based projects, Automation, and IoT.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`min-w-[100px] transition-colors duration-300 ${selectedCategory !== category && "text-foreground dark:text-white hover:text-foreground dark:hover:text-white"}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="transition-opacity duration-150 hover:opacity-90"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Add display name for debugging in React DevTools
ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
