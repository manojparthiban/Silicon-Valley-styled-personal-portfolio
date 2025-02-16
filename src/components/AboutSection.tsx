import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  bio?: string;
  experience?: string;
  education?: string;
  university?: string;
  interests?: string;
  certifications?: Array<{
    title: string;
    name: string;
    company: string;
    logo: string;
    salary?: string;
    link?: string;
  }>;
}

const AboutSection = React.memo(
  ({
    bio = "👨‍💻 Computer Science engineer passionate about software development, from Tiruchirapalli, Tamil Nadu 🛕. 🎓 A recent graduate from Amrita School of Engineering (Coimbatore), certified in SAP ABAP Back-End Development. 🏆 Skilled in Python, SQL, IoT, ML & AI with proven hands-on projects. 🚀 Committed to advancing technology while ensuring safety and efficiency, I’m excited to explore new horizons in the tech world! 🌍✨",
    experience = "I have interned at Bosch Global Software Technologies (Bengaluru) from February to July 2024 🏢, during which I developed a Python-based application 🐍 to efficiently transmit radio diagnostic data 📡 from EFR32 radio hardware to the Cloud ☁️. I also analyzed the Wirepas Radio Application Stack to model and implement a mesh networking protocol 🔗 focused on Sub-GHz RF transceivers, gaining valuable hands-on coding experience, system integration skills, and exposure to agile methodologies 🚀.",
    education = "Bachelor's in Computer and Communication Engineering",
    university = "Amrita Vishwa Vidyapeetham, Coimbatore.",
    interests = "Definetly not a Coder xD, just love to drive around the town.",
    certifications = [{
      title: "SAP Certified Associate",
      name: "SAP ABAP Back-End Development (HANA Clould)",
      company: "Eviden (Atos)",
      logo: "/sap.png",
      salary: "Valid Till: Dec 2025",
      link: "https://www.credly.com/badges/a13889c1-5cfb-4edd-a28f-cd3c5877a3ef"
    }],
  }: AboutSectionProps) => {
    return (
      <section className="min-h-screen bg-muted/50 py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white">
              About Me
            </h2>
            <p className="text-muted-foreground dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto px-4">
              Get to know more about my background and what drives me
            </p>
          </motion.div>

          {/* Bio Section - No Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 20
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto text-primary mb-16"
          >
            <p className="text-base sm:text-lg leading-relaxed text-foreground dark:text-white text-center px-4">
              {bio}
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-[85rem] mx-auto px-4">
            {/* Work Experience Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full will-change-transform"
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
                    <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                    <path d="m16 20 2 2 4-4"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">Work Experience</h3>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-3 top-0 w-px h-full bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"/>
                <div className="space-y-8">
                  {/* Current Position */}
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 bg-primary/10 rounded-full border-2 border-primary/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"/>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                          <line x1="16" x2="16" y1="2" y2="6"/>
                          <line x1="8" x2="8" y1="2" y2="6"/>
                          <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                        <span>Feb 2024 - July 2024</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground dark:text-white">Software Development Intern</h4>
                      <div className="flex items-center gap-2 text-sm text-foreground/80 dark:text-white/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Bosch Global Software Technologies, Bengaluru</span>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Developed Python-based radio diagnostic data transmission system</p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Implemented cloud integration for RF transceiver analytics</p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Designed mesh networking protocol for Sub-GHz devices</p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Gained experience in agile development methodologies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all duration-300 group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">My Certification</h3>
              </div>

              {certifications.map((cert, index) => (
                <div key={index} className="relative group/card">
                  <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-lg border border-primary/10 rounded-lg p-6 transition-all duration-300 group-hover/card:border-primary/20">
                    <div className="flex items-start justify-between mb-4">
                      <motion.img 
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        src={cert.logo} 
                        alt={`${cert.company} logo`} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="text-lg font-semibold text-foreground/80 dark:text-white/80">{cert.title}</h4>
                      <h3 className="text-xl font-bold text-foreground dark:text-white leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">{cert.company}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {cert.salary && (
                        <span className="text-sm font-medium text-foreground/60 dark:text-white/60">
                          {cert.salary}
                        </span>
                      )}
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover/card:translate-x-1"
                      >
                        View Certificate
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all duration-300 group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">Education</h3>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-3 top-0 w-px h-full bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"/>
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-8 top-0 w-6 h-6 bg-primary/10 rounded-full border-2 border-primary/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"/>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                          <line x1="16" x2="16" y1="2" y2="6"/>
                          <line x1="8" x2="8" y1="2" y2="6"/>
                          <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                        <span>2020 - 2024</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground dark:text-white">{education}</h4>
                      <div className="flex items-center gap-2 text-sm text-foreground/80 dark:text-white/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{university}</span>
                      </div>
                      
                      <div className="mt-4 pl-6 space-y-2">
                        <div className="relative">
                          <div className="absolute -left-6 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Computer Science and Communication Engineering</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-6 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"/>
                          <p className="text-sm text-foreground/80 dark:text-white/80">Focus on Software Development and System Design</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interests Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all duration-300 group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12h6"/>
                    <path d="M12 9v6"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">Interests</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 transition-colors hover:bg-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                    <span className="font-medium text-foreground dark:text-white">Exploring</span>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">Love to drive around the town</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 transition-colors hover:bg-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span className="font-medium text-foreground dark:text-white">Tech</span>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">Love to explore new technologies! & love to build something connected.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
);

// Add display name for debugging in React DevTools
AboutSection.displayName = "AboutSection";

export default AboutSection;
