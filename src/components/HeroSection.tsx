import React from "react";
import { Button } from "./ui/button";
import { ArrowDownCircle, Briefcase, Github, Linkedin, MessageCircle } from "lucide-react"

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
      <section className="min-h-screen bg-background relative overflow-hidden flex items-center py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none opacity-0 transition-opacity duration-300 ease-out" 
          style={{ opacity: 1 }}
        />

        {/* Main Content */}
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-left">
            <p className="text-blue-500 text-xl font-medium">Vanakam !</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              It's me, <br />
              <span className="text-blue-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block transition-transform duration-300 hover:scale-[1.02]">
                {name}
              </span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl">{title}</p>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl">{description}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Manoj_Resume.pdf";
                  link.download = "Manoj_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="relative overflow-hidden bg-foreground/5 hover:bg-primary/10 text-foreground rounded-full px-8 py-6 h-12 font-medium text-base transition-all duration-300 ease-out hover:shadow-lg group backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                <span className="flex items-center justify-center gap-2">
                  Download Resume
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </span>
              </Button>

              <Button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  projectsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative overflow-hidden bg-foreground/5 hover:bg-primary/10 text-foreground rounded-full px-8 py-6 h-12 font-medium text-base transition-all duration-300 ease-out hover:shadow-lg group backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                <span className="flex items-center justify-center gap-2">
                  See my works
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </span>
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative w-full lg:w-[600px] aspect-[4/3]">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 p-[3px] group transition-all duration-300">
              <div className="absolute inset-[3px] rounded-[1.9rem] overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Social Icons */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6">
              {[
                { icon: MessageCircle, link: socialLinks.messenger },
                { icon: Linkedin, link: socialLinks.linkedin },
                { icon: Github, link: socialLinks.github },
              ].map((social, index) => (
                <div key={index} className="transition-transform duration-300 hover:scale-110">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(social.link, "_blank")}
                    className="bg-foreground/10 border-0 backdrop-blur-sm hover:bg-primary/20 text-foreground rounded-full w-12 h-12 transition-all duration-300"
                  >
                    <social.icon className="h-6 w-6" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

// Add display name for better debugging in React DevTools
HeroSection.displayName = "HeroSection";

export default HeroSection;