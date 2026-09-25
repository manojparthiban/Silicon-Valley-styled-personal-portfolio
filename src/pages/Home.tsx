import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/sections/hero/HeroSection";
import AboutSection from "@/sections/about/AboutSection";
import SkillsSection from "@/sections/skills/SkillsSection";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import BlogSection from "@/sections/blog/BlogSection";
import ContactSection from "@/sections/contact/ContactSection";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const Home = () => {
  return (
    <div className="bg-background/50 relative">
      <ScrollToTop />
      <Navigation />
      <div id="hero">
        <HeroSection
          name="Manoj Parthiban"
          description="I turn complex business problems into clean, dependable systems, from SAP back-ends and integrations to the tools around them. Always learning, always shipping."
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

      <div id="blogs">
        <BlogSection />
      </div>

      <div id="contact">
        <ContactSection
          socialLinks={{
            github: "https://github.com/manojparthiban",
            linkedin: "https://www.linkedin.com/in/manoj-parthi31/",
            twitter: "https://twitter.com/ImMj31",
            email: "mailto:manojparthiban2002@gmail.com",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
