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

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  technologies = ["React", "TypeScript", "Tailwind"],
  liveUrl = "#",
  githubUrl = "#",
}: ProjectCardProps) => {
  return (
    <Card className="w-full sm:w-[360px] h-[400px] bg-card/50 backdrop-blur-sm border-primary/10 flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => window.open(liveUrl, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Live Demo
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => window.open(githubUrl, "_blank")}
        >
          <Github className="w-4 h-4 mr-2" />
          Source
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
