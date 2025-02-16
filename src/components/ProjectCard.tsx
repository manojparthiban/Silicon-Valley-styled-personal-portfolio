import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

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
        <div className="h-48 overflow-hidden group">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>

        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground dark:text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground dark:text-gray-300">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-primary/10 hover:bg-primary/15 text-foreground dark:text-white transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/20 hover:bg-primary/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white transition-colors"
            onClick={() => window.open(liveUrl, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/20 hover:bg-primary/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white transition-colors"
            onClick={() => window.open(githubUrl, "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            Source
          </Button>
        </CardFooter>
      </Card>
    );
  },
);

// Add display name for better debugging in React DevTools
ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
