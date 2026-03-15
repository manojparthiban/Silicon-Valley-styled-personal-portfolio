import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard = React.memo(
  ({
    title = "Project Title",
    description = "A brief description of the project and its key features.",
    imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    technologies = ["React", "TypeScript", "Tailwind"],
    liveUrl = "#",
    githubUrl = "#",
  }: ProjectCardProps) => {
    return (
      <motion.div
        className="project-card group"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        {/* Image */}
        <div className="project-card__img-wrap">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="project-card__overlay">
            <div className="flex gap-2">
              {liveUrl && liveUrl !== "#" && (
                <button
                  onClick={() => window.open(liveUrl, "_blank")}
                  className="project-card__overlay-btn"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {githubUrl && githubUrl !== "#" && (
                <button
                  onClick={() => window.open(githubUrl, "_blank")}
                  className="project-card__overlay-btn"
                  aria-label="Source Code"
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="project-card__body">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1.5">
            {description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {technologies.map((tech, i) => (
              <span key={i} className="project-card__tag">
                {tech}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-foreground/5 dark:border-white/5">
            {liveUrl && liveUrl !== "#" && (
              <button
                onClick={() => window.open(liveUrl, "_blank")}
                className="project-card__action"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </button>
            )}
            {githubUrl && githubUrl !== "#" && (
              <button
                onClick={() => window.open(githubUrl, "_blank")}
                className="project-card__action"
              >
                <Github className="w-3.5 h-3.5" />
                Source
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
