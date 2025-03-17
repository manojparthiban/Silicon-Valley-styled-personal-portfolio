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
    bio = "👨‍💻 Computer Science engineer passionate about software development, from Tiruchirapalli, Tamil Nadu 🛕. 🎓 A recent graduate from Amrita School of Engineering (Coimbatore), certified in SAP ABAP Back-End Development. 🏆 Skilled in Python, SQL, IoT, ML & AI with proven hands-on projects. 🚀 Committed to advancing technology while ensuring safety and efficiency, I'm excited to explore new horizons in the tech world! 🌍✨",
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
      <section className="min-h-screen bg-muted/50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
        {/* Grid Background Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" 
        />

        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground dark:text-white">
              About Me
            </h2>
            <p className="text-muted-foreground dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto px-2 sm:px-4">
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
                stiffness: 200,
                damping: 20
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ willChange: "transform, opacity" }}
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
                  stiffness: 200,
                  damping: 20
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full will-change-transform"
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }
              }}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
                    <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                    <path d="m16 20 2 2 4-4"/>
                  </svg>
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground dark:text-white">Work Experience</h3>
              </div>

              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-2 sm:left-3 top-0 w-px h-full bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"/>
                <div className="space-y-6 sm:space-y-8">
                  <div className="relative">
                    <motion.div className="absolute -left-6 sm:-left-8 top-0 w-4 sm:w-6 h-4 sm:h-6 bg-primary/10 rounded-full border-2 border-primary/30 flex items-center justify-center">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary"/>
                    </motion.div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/60 dark:text-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                          <line x1="16" x2="16" y1="2" y2="6"/>
                          <line x1="8" x2="8" y1="2" y2="6"/>
                          <line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                        <span>Feb 2024 - July 2024</span>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-foreground dark:text-white">Software Development Intern</h4>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/80 dark:text-white/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Bosch Global Software Technologies, Bengaluru</span>
                      </div>
                      
                      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                        {[
                          "Developed Python-based radio diagnostic data transmission system",
                          "Implemented cloud integration for RF transceiver analytics",
                          "Designed mesh networking protocol for Sub-GHz devices",
                          "Gained experience in agile development methodologies"
                        ].map((point, index) => (
                          <motion.div 
                            key={index}
                            className="relative pl-6"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ 
                              opacity: 1, 
                              x: 0,
                              transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: index * 0.1
                              }
                            }}
                            viewport={{ once: true }}
                            style={{ willChange: "transform, opacity" }}
                          >
                            <motion.div 
                              className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-foreground/40 dark:bg-white/40"
                              whileHover={{ scale: 1.5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              style={{ willChange: "transform" }}
                            />
                            <p className="text-sm text-foreground/80 dark:text-white/80">{point}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full will-change-transform"
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }
              }}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="p-3 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">Education</h3>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  viewport={{ once: true }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <h4 className="text-lg font-semibold text-foreground dark:text-white">{education}</h4>
                  <p className="text-muted-foreground dark:text-gray-300">{university}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 rounded-xl p-8 transition-all group shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 h-full will-change-transform"
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }
              }}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ willChange: "transform" }}
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
                <motion.div 
                  key={index} 
                  className="relative group/card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: index * 0.1
                    }
                  }}
                  viewport={{ once: true }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-lg border border-primary/10 rounded-lg p-6 transition-all duration-300 group-hover/card:border-primary/20"
                    whileHover={{ 
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20
                      }
                    }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <motion.img 
                        src={cert.logo}
                        alt={cert.title}
                        className="w-12 h-12 object-contain rounded-lg"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20
                          }
                        }}
                        style={{ willChange: "transform" }}
                      />
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        style={{ willChange: "transform" }}
                      >
                        View Certificate
                      </motion.a>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: 0.2
                        }
                      }}
                      viewport={{ once: true }}
                      style={{ willChange: "transform, opacity" }}
                    >
                      <h4 className="text-lg font-semibold text-foreground dark:text-white mb-1">{cert.title}</h4>
                      <p className="text-sm text-foreground/80 dark:text-white/80 mb-2">{cert.name}</p>
                      <div className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/>
                        </svg>
                        <span>{cert.company}</span>
                      </div>
                      {cert.salary && (
                        <div className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                            <line x1="16" x2="16" y1="2" y2="6"/>
                            <line x1="8" x2="8" y1="2" y2="6"/>
                            <line x1="3" x2="21" y1="10" y2="10"/>
                          </svg>
                          <span>{cert.salary}</span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
);

// Add display name for better debugging in React DevTools
AboutSection.displayName = "AboutSection";

export default AboutSection;
