import React from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import { ScrollToTop } from "./ScrollToTop";
import { BackgroundGradient } from "./BackgroundGradient";

const Home = () => {
  const handleContactSubmit = (data: any) => {
    console.log("Contact form submitted:", data);
  };

  return (
    <div className="bg-background/50 relative">
      <BackgroundGradient />
      <ScrollToTop />
      <Navigation />
      <div id="hero">
        <HeroSection
          name="Manoj Parthiban"
          title="Enthusiastic Engineer and Back-end Developer"
          description="I love to turn complex ideas into intuitive codes that helps businesses grow."
          onContactClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="contact">
        <ContactSection
          onSubmit={handleContactSubmit}
          socialLinks={{
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            email: "mailto:john.doe@example.com",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
