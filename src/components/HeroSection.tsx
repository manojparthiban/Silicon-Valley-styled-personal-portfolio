import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, MessageCircle } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  avatarUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    messenger?: string;
  };
  onContactClick?: () => void;
}

const HeroSection = React.memo(
  ({
    name = "Manoj Parthiban",
    title = "UI Designer from London",
    description = "Currently working with @idea as a UI Consultant.",
    avatarUrl = "/ProfileFoto.jpg",
    socialLinks = {
      github: "https://github.com/manojparthiban",
      linkedin: "https://www.linkedin.com/in/manoj-parthi31/",
      messenger: "mailto:manojparthiban2002@gmail.com",
    },
    onContactClick = () => console.log("Contact clicked"),
  }: HeroSectionProps) => {
    return (
      <section className="min-h-screen bg-background relative overflow-hidden flex items-center py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

        {/* Animated Gradient Beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-beam-1 opacity-50" />
          <div className="absolute w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-beam-2 opacity-50" />
          <div className="absolute w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-beam-3 opacity-50" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-xl font-medium"
            >
              Vanakam !
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
            >
              It's me, <span className="text-primary">{name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl"
            >
              {title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl"
            >
              {description}
            </motion.p>

            {/* New Glassmorphic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4"
            >
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Manoj_Resume.pdf";
                  link.download = "Manoj_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-foreground/10 backdrop-blur-md border border-white/10 hover:bg-primary/20 text-foreground rounded-full px-8 py-6 h-12 transition-all duration-300 font-medium text-base hover:shadow-lg hover:border-primary/20"
              >
                Get Resume/CV
              </Button>
              <Button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  projectsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-foreground/10 backdrop-blur-md border border-white/10 hover:bg-primary/20 text-foreground rounded-full px-8 py-6 h-12 transition-all duration-300 font-medium text-base hover:shadow-lg hover:border-primary/20"
              >
                See my works
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full lg:w-[600px] aspect-[4/3]"
          >
            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-muted to-muted/50 group transition-all duration-500 hover:border-primary/50">
              <div className="absolute inset-[2px] rounded-[1.9rem] overflow-hidden bg-background">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Social Icons */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(socialLinks.messenger, "_blank")}
                className="bg-foreground/10 border-0 backdrop-blur-sm hover:bg-primary/20 text-foreground rounded-full w-12 h-12"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(socialLinks.linkedin, "_blank")}
                className="bg-foreground/10 border-0 backdrop-blur-sm hover:bg-primary/20 text-foreground rounded-full w-12 h-12"
              >
                <Linkedin className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(socialLinks.github, "_blank")}
                className="bg-foreground/10 border-0 backdrop-blur-sm hover:bg-primary/20 text-foreground rounded-full w-12 h-12"
              >
                <Github className="h-6 w-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  },
);

// Add display name for better debugging in React DevTools
HeroSection.displayName = "HeroSection";

export default HeroSection;