import React, { useState } from "react";
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
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web",
  },
  {
    id: 2,
    title: "Mobile Weather App",
    description:
      "Real-time weather tracking application with location services",
    imageUrl: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b",
    technologies: ["React Native", "TypeScript", "API"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Mobile",
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "Generate unique images using machine learning algorithms",
    imageUrl: "https://images.unsplash.com/photo-1547954575-855750c57bd3",
    technologies: ["Python", "TensorFlow", "React"],
    liveUrl: "#",
    githubUrl: "#",
    category: "AI",
  },
];

const categories = ["All", "Web", "Mobile", "AI"];

const ProjectsSection = ({
  projects = defaultProjects,
}: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects spanning web development, mobile
            applications, and AI solutions.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
