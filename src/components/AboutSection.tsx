import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

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

/* ── animation variants ───────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ── experience data ──────────────────── */
const experiences = [
  {
    date: "Apr 2025 – Present",
    title: "SAP ABAP Developer",
    company: "Si2 Technologies Pvt Ltd",
    location: "Vadodara, Gujarat",
    current: true,
    points: [
      "Developed & maintained SAP ABAP & WRICEF objects including Smartforms, Adobe Forms, and ALV Grid Reports",
      "Integrated SAP systems with 3rd party software using OData and REST APIs, and CSV file generation for internal & external systems",
      "Created custom reports aggregating SAP usage and analytics data across the organization",
      "Assisted with SAP Fiori application design using RAP (RESTful ABAP Programming Model) and SAP UI5",
      "Spearheaded a POC for automating Sales Order creation via SAP BPA on the SAP BTP platform",
      "Exploring SAP AI Core and BTP services to develop cloud-ready applications within the SAP ecosystem",
    ],
  },
  {
    date: "Feb 2024 – July 2024",
    title: "Software Development Intern",
    company: "Bosch Global Software Technologies",
    location: "Bengaluru",
    current: false,
    points: [
      "Developed Python-based radio diagnostic data transmission system",
      "Implemented cloud integration for RF transceiver analytics",
      "Designed mesh networking protocol for Sub-GHz devices",
      "Gained experience in agile development methodologies",
    ],
  },
];

const AboutSection = React.memo(
  ({
    bio = "👨‍💻 Computer Science engineer passionate about software development, from Tiruchirapalli, Tamil Nadu 🛕. 🎓 A recent graduate from Amrita School of Engineering (Coimbatore), certified in SAP ABAP Back-End Development. 🏆 Skilled in Python, SQL, IoT, ML & AI with proven hands-on projects. 🚀 Committed to advancing technology while ensuring safety and efficiency, I'm excited to explore new horizons in the tech world! 🌍✨",
    education = "Bachelor's in Computer and Communication Engineering",
    university = "Amrita Vishwa Vidyapeetham, Coimbatore.",
    certifications = [
      {
        title: "SAP Certified Associate",
        name: "SAP ABAP Back-End Development (HANA Cloud)",
        company: "Eviden (Atos)",
        logo: "/sap.png",
        salary: "Valid Till: Dec 2025",
        link: "https://www.credly.com/badges/a13889c1-5cfb-4edd-a28f-cd3c5877a3ef",
      },
      {
        title: "SAP Certified Associate",
        name: "SAP Fiori Application Developer",
        company: "SAP",
        logo: "/sap.png",
        salary: "Valid Till: Aug 2026",
        link: "https://www.credly.com/badges/9f91c4bd-694c-4d7d-9644-f0d2acdc7a60",
      },
    ],
  }: AboutSectionProps) => {
    return (
      <section className="about-section relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* ── Section Header ─────────────── */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="about-section-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-5 mb-4">
              Background &{" "}
              <span className="hero-name-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Get to know more about my journey, skills, and what drives me
            </p>
          </motion.div>

          {/* ── Bio Glass Card ─────────────── */}
          <motion.div variants={itemVariants} className="about-bio-card mb-14">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/85 text-center">
              {bio}
            </p>
          </motion.div>

          {/* ── Two Column Grid ─────────────── */}
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            {/* ═══ Work Experience ═══ */}
            <motion.div variants={itemVariants} className="about-glass-card">
              <div className="about-card-header">
                <div className="about-icon-box">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Work Experience
                </h3>
              </div>

              <div className="relative pl-7 sm:pl-8 mt-6">
                {/* Timeline line */}
                <div className="absolute left-[11px] sm:left-[13px] top-2 w-[2px] h-[calc(100%-16px)] bg-gradient-to-b from-primary/40 via-primary/15 to-transparent rounded-full" />

                <div className="space-y-8">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative">
                      {/* Timeline dot */}
                      <div className="about-timeline-dot">
                        <div
                          className={`w-2 h-2 rounded-full ${exp.current ? "bg-primary" : "bg-muted-foreground/50"}`}
                        />
                      </div>

                      {/* Current badge */}
                      {exp.current && (
                        <span className="about-current-badge">Current</span>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.date}</span>
                        </div>

                        <h4 className="text-base sm:text-lg font-semibold text-foreground">
                          {exp.title}
                        </h4>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>
                            {exp.company}, {exp.location}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {exp.points.map((point, j) => (
                            <div
                              key={j}
                              className="flex items-start gap-2.5 group/point"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-primary/50 mt-1 flex-shrink-0 transition-transform group-hover/point:translate-x-0.5" />
                              <p className="text-sm text-foreground/75 leading-relaxed">
                                {point}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ═══ Education ═══ */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="about-glass-card">
                <div className="about-card-header">
                  <div className="about-icon-box">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Education
                  </h3>
                </div>

                <div className="mt-6 about-edu-row">
                  <div className="about-edu-icon">🎓</div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">
                      {education}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {university}
                    </p>
                  </div>
                </div>
              </div>

              {/* ═══ Certifications ═══ */}
              <div className="about-glass-card">
                <div className="about-card-header">
                  <div className="about-icon-box">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Certifications
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="cert-card group/cert"
                      onClick={() =>
                        cert.link && window.open(cert.link, "_blank")
                      }
                      style={{ cursor: cert.link ? "pointer" : "default" }}
                    >
                      <div className="cert-card__accent" />

                      <div className="flex items-start gap-4">
                        <div className="cert-card__logo">
                          <img
                            src={cert.logo}
                            alt={cert.company}
                            className="w-10 h-10 object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <span className="cert-card__badge">
                            {cert.title}
                          </span>

                          <h4 className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                            {cert.name}
                          </h4>

                          <p className="text-xs text-muted-foreground">
                            {cert.company}
                          </p>

                          {cert.salary && (
                            <p className="text-[11px] text-muted-foreground/70 font-medium">
                              {cert.salary}
                            </p>
                          )}

                          {cert.link && (
                            <span className="cert-card__link">
                              View Credential
                              <ExternalLink className="w-3 h-3 transition-transform duration-200 group-hover/cert:translate-x-0.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  },
);

AboutSection.displayName = "AboutSection";

export default AboutSection;
