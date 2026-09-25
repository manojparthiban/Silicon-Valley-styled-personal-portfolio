import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import ProjectCard, { Project } from "@/sections/projects/ProjectCard";
import { SectionHeader } from "@/components/common/SectionBits";

const projects: Project[] = [
  {
    id: 1,
    title: "Automated Hydroponic Controller",
    description:
      "An automated control system optimizing nutrition and water management for hydroponics. Published with IEEE.",
    imageUrl: "/images/projects/hydroponic-controller.webp",
    technologies: ["Arduino", "C++", "Firebase", "IoT Sensors", "Fusion 360"],
    category: "IoT",
    liveUrl: "https://ieeexplore.ieee.org/document/10677314",
    liveLabel: "Read the paper",
  },
  {
    id: 2,
    title: "Personal Portfolio Webapp",
    description: "This site: a Silicon Valley styled portfolio with 3D motion, built for speed.",
    imageUrl: "/images/projects/portfolio.webp",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    liveUrl: "https://manojparthiban.vercel.app/",
    githubUrl: "https://manojparthiban.vercel.app/",
  },
  {
    id: 3,
    title: "Road Lane Detection for Autonomous Vehicles",
    description:
      "A real-time lane detection algorithm for autonomous driving and advanced driver assistance systems.",
    imageUrl: "/images/projects/road-lane-detection.webp",
    technologies: ["Python", "OpenCV", "PyTesseract", "CV Algos"],
    category: "ML/AI",
    githubUrl: "https://github.com/manojparthiban/Computer_Vision_FeatureDetection",
  },
];

const categories = ["All", "IoT", "ML/AI", "Web"];

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
  exit: {},
};

// Cards swing in and out around their vertical axis when the filter changes
const card = {
  hidden: { opacity: 0, rotateY: -32, y: 30 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
  exit: { opacity: 0, rotateY: 28, y: -10, transition: { duration: 0.22, ease: "easeIn" } },
};

/* ── Segmented filter with a sliding highlight ── */
const Filter = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = useState({ x: 0, w: 0 });

  useLayoutEffect(() => {
    const place = () => {
      const btn = btnRefs.current[value];
      if (btn) setThumb({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [value]);

  return (
    <div ref={trackRef} className="seg" role="tablist" aria-label="Filter projects">
      <span
        className="seg__thumb"
        aria-hidden="true"
        style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }}
      />
      {categories.map((cat) => {
        const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
        return (
          <button
            key={cat}
            ref={(el) => {
              btnRefs.current[cat] = el;
            }}
            type="button"
            role="tab"
            aria-selected={value === cat}
            onClick={() => onChange(cat)}
            className={`seg__btn ${value === cat ? "is-active" : ""}`}
          >
            {cat}
            <span className="seg__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
};

const ProjectsSection = React.memo(() => {
  const [category, setCategory] = useState("All");

  const visible = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [category],
  );

  return (
    <section className="projects relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-14 md:pt-20 pb-2 md:pb-4">
      <div className="sec-backdrop" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          name="projects"
          title={
            <>
              Selected work<span className="text-primary">.</span>
            </>
          }
          sub={<Filter value={category} onChange={setCategory} />}
        />

        <AnimatePresence mode="wait">
          <m.ul
            key={category}
            className="proj-grid"
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            exit="exit"
          >
            {visible.map((project) => (
              <m.li key={project.id} variants={card}>
                <ProjectCard project={project} />
              </m.li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
