import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
    imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    technologies = ["React", "TypeScript", "Tailwind"],
    liveUrl = "#",
    githubUrl = "#",
  }: ProjectCardProps) => {
    return (
      <Card className="w-full sm:w-[360px] h-[400px] bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 flex flex-col overflow-hidden transition-all duration-300">
        <motion.div 
          className="h-48 overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ willChange: "transform" }}
        >
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            loading="lazy"
            style={{ willChange: "transform, opacity" }}
          />
        </motion.div>

        <CardHeader className="space-y-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <CardTitle className="text-xl font-bold text-foreground dark:text-white">
              {title}
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{ willChange: "opacity" }}
          >
            <CardDescription className="text-sm text-muted-foreground dark:text-gray-300">
              {description}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <Badge 
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/15 text-foreground dark:text-white transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>

        <CardFooter className="mt-auto gap-2">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: "transform" }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/20 hover:bg-primary/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white transition-colors"
              onClick={() => window.open(liveUrl, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </motion.div>
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: "transform" }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/20 hover:bg-primary/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white transition-colors"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              Source
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    );
  }
);

// Add display name for better debugging in React DevTools
ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
