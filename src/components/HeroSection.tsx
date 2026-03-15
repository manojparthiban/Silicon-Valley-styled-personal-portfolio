import React, { useRef } from "react";
import { Button } from "./ui/button";
import {
  Github,
  Linkedin,
  MessageCircle,
  Download,
  Terminal,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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

/* ── stagger helpers ──────────────────────────── */
/* ── stagger helpers ──────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const childVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ────────────────────────────────────────────── */

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
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"],
    });

    // Parallax transforms
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
      <section
        ref={sectionRef}
        className="hero-section relative min-h-screen overflow-hidden flex items-center"
      >
        {/* ── Animated Background ─────────────────── */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
          {/* Gradient mesh blobs */}
          <div className="hero-bg-blob hero-bg-blob--1" />
          <div className="hero-bg-blob hero-bg-blob--2" />
          <div className="hero-bg-blob hero-bg-blob--3" />
          {/* Dot grid overlay */}
          <div className="hero-dot-grid" />
        </motion.div>

        {/* ── Content ──────────────────────────────── */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-28 md:py-32 lg:py-0"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* ═══════════ LEFT COLUMN ═══════════ */}
            <motion.div
              className="w-full lg:w-[55%] space-y-7"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status badge */}
              <motion.div variants={childVariants}>
                <span className="hero-badge">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                  <span>Software Developer</span>
                </span>
              </motion.div>

              {/* Greeting + Name */}
              <motion.div variants={childVariants}>
                <p className="text-primary font-semibold text-lg tracking-wide mb-2">
                  Vanakam! 👋
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
                  I'm{" "}
                  <span className="hero-name-gradient">{name}</span>
                </h1>
              </motion.div>

              {/* Title + Description */}
              <motion.div
                variants={childVariants}
                className="space-y-3 max-w-xl"
              >
                <p className="text-lg md:text-xl text-foreground/80 font-medium">
                  {title}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={childVariants}
                className="flex flex-col sm:flex-row gap-3 pt-2"
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
                  className="hero-btn-primary group"
                >
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </Button>

                <Button
                  onClick={() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hero-btn-ghost group"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={childVariants}
                className="flex items-center gap-3 pt-2"
              >
                {[
                  {
                    icon: Github,
                    link: socialLinks.github,
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    link: socialLinks.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: MessageCircle,
                    link: socialLinks.messenger,
                    label: "Email",
                  },
                ].map((s) => (
                  <motion.button
                    key={s.label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => window.open(s.link, "_blank")}
                    className="hero-social-icon"
                    aria-label={s.label}
                  >
                    <s.icon className="w-[18px] h-[18px]" />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* ═══════════ RIGHT COLUMN – Dev Dashboard ═══════════ */}
            <motion.div
              className="w-full lg:w-[45%]"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: 0.3,
              }}
            >
              <motion.div
                className="hero-dashboard"
                variants={floatVariants}
                animate="animate"
              >
                {/* ── Dashboard Header ───── */}
                <div className="hero-dashboard__header">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      developer.panel
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                </div>

                {/* ── Large Avatar ───── */}
                <div className="hero-avatar-large">
                  <div className="hero-avatar-ring-lg">
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-[18px]"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* ── Identity ───── */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Back-end Developer • SAP Certified
                  </p>
                </div>

                {/* ── Code Snippet Preview ───── */}
                <div className="hero-code-block">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-semibold text-primary">
                      about.ts
                    </span>
                  </div>
                  <pre className="text-[13px] leading-relaxed">
                    <code>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-emerald-400">developer</span>{" "}
                      <span className="text-foreground/60">=</span>{" "}
                      <span className="text-yellow-400">{"{" + ""}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-foreground/50">name:</span>{" "}
                      <span className="text-orange-300">
                        '{name}'
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-foreground/50">role:</span>{" "}
                      <span className="text-orange-300">
                        'Back-end Dev'
                      </span>
                      ,{"\n"}
                      {"  "}
                      <span className="text-foreground/50">passion:</span>{" "}
                      <span className="text-orange-300">
                        'Building systems'
                      </span>
                      {"\n"}
                      <span className="text-yellow-400">{"}" + ""}</span>
                      <span className="text-foreground/40">;</span>
                    </code>
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight className="w-6 h-6 text-muted-foreground/50 rotate-90" />
        </motion.div>
      </section>
    );
  },
);

HeroSection.displayName = "HeroSection";

export default HeroSection;