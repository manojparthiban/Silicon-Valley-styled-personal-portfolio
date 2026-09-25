import React, { useEffect, useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Award, Download, Github, Linkedin, Mail } from "lucide-react";
import HeroGlobe from "@/sections/hero/HeroGlobe";
import { scrollToSection } from "@/lib/scroll";
import { RESUME_FILENAME, RESUME_URL } from "@/lib/resume";

interface HeroSectionProps {
  name?: string;
  description?: string;
  avatarUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    messenger?: string;
  };
}

/* ── motion variants ─────────────────────────── */
const column = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const titleLine = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};
const letter = {
  hidden: { opacity: 0, y: "0.45em", rotateX: -85 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const ROLES = [
  "SAP ABAP Developer @ Si2 Technologies",
  "Back-end & integration engineer",
  "SAP Certified · ABAP & Fiori",
];

/* ── Typed role line (isolated so typing only re-renders this) ── */
const TypedRole = ({ roles }: { roles: string[] }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(reduceMotion ? roles[0].length : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const full = roles[index];
    let timer: number | undefined;
    if (!deleting && length < full.length) timer = window.setTimeout(() => setLength(length + 1), 42);
    else if (!deleting) timer = window.setTimeout(() => setDeleting(true), 2400);
    else if (length > 0) timer = window.setTimeout(() => setLength(length - 1), 18);
    else {
      setDeleting(false);
      setIndex((index + 1) % roles.length);
    }
    return () => window.clearTimeout(timer);
  }, [length, deleting, index, roles, reduceMotion]);

  return (
    <p className="hero-role">
      <span className="text-primary mr-2.5" aria-hidden="true">
        ❯
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{roles[index].slice(0, length)}</span>
      <span className="hero-caret" aria-hidden="true" />
    </p>
  );
};

/* ── Editor-style status bar clock ── */
const useIndiaTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

/* ── Code shown in the 3D editor card ── */
const codeLines: React.ReactNode[] = [
  <><span className="tok-key">export const</span> <span className="tok-var">manoj</span> <span className="tok-punc">=</span> <span className="tok-punc">{"{"}</span></>,
  <>{"  "}<span className="tok-prop">role</span><span className="tok-punc">:</span> <span className="tok-str">"SAP ABAP Developer"</span><span className="tok-punc">,</span></>,
  <>{"  "}<span className="tok-prop">based</span><span className="tok-punc">:</span> <span className="tok-str">"Vadodara, IN"</span><span className="tok-punc">,</span></>,
  <>{"  "}<span className="tok-prop">stack</span><span className="tok-punc">:</span> <span className="tok-punc">[</span><span className="tok-str">"ABAP"</span><span className="tok-punc">,</span> <span className="tok-str">"RAP"</span><span className="tok-punc">,</span> <span className="tok-str">"BTP"</span><span className="tok-punc">],</span></>,
  <>{"  "}<span className="tok-prop">certified</span><span className="tok-punc">:</span> <span className="tok-bool">true</span><span className="tok-punc">,</span></>,
  <>{"  "}<span className="tok-fn">ship</span><span className="tok-punc">:</span> <span className="tok-punc">()</span> <span className="tok-key">=&gt;</span> <span className="tok-str">"clean code"</span><span className="tok-punc">,</span></>,
  <><span className="tok-punc">{"}"}</span> <span className="tok-key">satisfies</span> <span className="tok-type">Engineer</span><span className="tok-punc">;</span><span className="hero-caret hero-caret--code" /></>,
];

/* ────────────────────────────────────────────── */

const HeroSection = React.memo(
  ({
    name = "Manoj Parthiban",
    description = "",
    avatarUrl = "/images/profile/avatar.webp",
    socialLinks = {
      github: "https://github.com/manojparthiban",
      linkedin: "https://www.linkedin.com/in/manoj-parthi31/",
      messenger: "mailto:manojparthiban2002@gmail.com",
    },
  }: HeroSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const time = useIndiaTime();

    // Pointer → smoothed -1..1 values that drive the card tilt and globe rotation
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const smoothX = useSpring(pointerX, { stiffness: 110, damping: 18, mass: 0.6 });
    const smoothY = useSpring(pointerY, { stiffness: 110, damping: 18, mass: 0.6 });
    const tiltY = useTransform(smoothX, (v) => v * 14);
    const tiltX = useTransform(smoothY, (v) => v * -10);

    // As the hero scrolls away, the 3D stage tips back and the copy fades
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"],
    });
    const stageRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);
    const stageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onPointerLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    const socials = [
      { icon: Github, href: socialLinks.github, label: "GitHub" },
      { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
      { icon: Mail, href: socialLinks.messenger, label: "Email" },
    ];

    return (
      <section
        ref={sectionRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="hero relative isolate min-h-[100svh] overflow-hidden flex flex-col"
      >
        {/* ── Backdrop: perspective grid floor + accent glow ── */}
        <div className="hero-backdrop" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-floor">
            <div className="hero-floor__plane" />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-24 lg:pt-24 lg:pb-20">
          <div className="grid w-full items-center gap-16 lg:gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            {/* ═══════════ COPY ═══════════ */}
            <m.div
              variants={column}
              initial="hidden"
              animate="visible"
              style={{ opacity: copyOpacity, y: copyY }}
              className="min-w-0"
            >
              <m.p variants={rise} className="hero-eyebrow">
                <span className="hero-eyebrow__pulse" aria-hidden="true" />
                <span>vanakam</span>
                <span className="hero-eyebrow__sep">/</span>
                <span>software developer</span>
                <span className="hero-eyebrow__sep">/</span>
                <span>IN</span>
              </m.p>

              <m.h1 variants={column} className="hero-title" aria-label={name}>
                <m.span variants={titleLine} className="hero-title__line" aria-hidden="true">
                  {firstName.split("").map((ch, i) => (
                    <m.span key={i} variants={letter} className="hero-letter">
                      {ch}
                    </m.span>
                  ))}
                </m.span>
                {lastName && (
                  <m.span variants={titleLine} className="hero-title__line hero-title__line--accent" aria-hidden="true">
                    {lastName.split("").map((ch, i) => (
                      <m.span key={i} variants={letter} className="hero-letter">
                        {ch === " " ? " " : ch}
                      </m.span>
                    ))}
                    <span className="hero-title__dot">.</span>
                  </m.span>
                )}
              </m.h1>

              <m.div variants={rise}>
                <TypedRole roles={ROLES} />
              </m.div>

              {description && (
                <m.p variants={rise} className="hero-lede">
                  {description}
                </m.p>
              )}

              <m.div variants={rise} className="flex flex-col sm:flex-row gap-3 mt-9">
                <a href={RESUME_URL} download={RESUME_FILENAME} className="hero-cta hero-cta--primary group">
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download Resume
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="hero-cta hero-cta--ghost group"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </m.div>

              <m.div variants={rise} className="mt-9 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hero-social"
                    >
                      <Icon className="w-[17px] h-[17px]" />
                    </a>
                  ))}
                </div>
                <span className="h-px w-10 bg-border" aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">@manojparthiban</span>
              </m.div>
            </m.div>

            {/* ═══════════ 3D STAGE ═══════════ */}
            <div className="hero-stage">
              <HeroGlobe pointerX={smoothX} pointerY={smoothY} className="hero-globe" />

              <m.div style={{ rotateX: stageRotate, y: stageY }} className="hero-3d">
                <m.div
                  className="hero-3d"
                  initial={{ opacity: 0, rotateX: 24, rotateY: -28, y: 40 }}
                  animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="hero-3d hero-idle">
                    <m.div style={{ rotateX: tiltX, rotateY: tiltY }} className="hero-card">
                      {/* Base layer: the editor window */}
                      <div className="hero-editor">
                        <div className="hero-editor__bar">
                          <span className="hero-editor__dots" aria-hidden="true">
                            <i /><i /><i />
                          </span>
                          <span className="hero-editor__tab">manoj.config.ts</span>
                          <span className="hero-editor__lang">TS</span>
                        </div>
                        <pre className="hero-editor__code" aria-label="Profile summary as code">
                          {codeLines.map((line, i) => (
                            <div key={i} className="hero-editor__line">
                              <span className="hero-editor__ln">{i + 1}</span>
                              <code>{line}</code>
                            </div>
                          ))}
                        </pre>
                      </div>

                      {/* Floating layers at different depths */}
                      <div className="hero-photo" style={{ "--z": "80px" } as React.CSSProperties}>
                        <img
                          src={avatarUrl}
                          alt={name}
                          width={400}
                          height={400}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                        />
                      </div>

                      <span className="hero-chip hero-chip--a" style={{ "--z": "110px" } as React.CSSProperties}>
                        ABAP
                      </span>
                      <span className="hero-chip hero-chip--b" style={{ "--z": "60px" } as React.CSSProperties}>
                        SAP BTP
                      </span>
                      <span className="hero-chip hero-chip--c" style={{ "--z": "95px" } as React.CSSProperties}>
                        Fiori · UI5
                      </span>

                      <div className="hero-badge3d" style={{ "--z": "70px" } as React.CSSProperties}>
                        <Award className="w-4 h-4 text-primary" />
                        <span>
                          <strong>SAP Certified</strong>
                          <small>ABAP · Fiori</small>
                        </span>
                      </div>
                    </m.div>
                  </div>
                </m.div>
              </m.div>
            </div>
          </div>
        </div>

        {/* ── Editor status bar ── */}
        <div className="hero-statusbar" aria-hidden="true">
          <div className="flex items-center gap-5">
            <span className="hero-statusbar__branch">⎇ main</span>
            <span className="hidden md:inline">SAP ABAP · Back-end</span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => scrollToSection("about")}
            className="hero-scrollcue"
          >
            <span>scroll</span>
            <span className="hero-scrollcue__track"><i /></span>
          </button>
          <div className="flex items-center gap-5">
            <span className="hidden md:inline">Vadodara, IN</span>
            <span>{time} IST</span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
        </div>
      </section>
    );
  },
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
