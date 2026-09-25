import React from "react";
import { m } from "framer-motion";

/** Cards flip up out of the page as they scroll into view */
export const flipIn = {
  hidden: { opacity: 0, y: 48, rotateX: 14 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 20, mass: 0.9 },
  },
};

/** Spread onto any `m.*` element to give it the flip-in reveal */
export const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: flipIn,
} as const;

/** Small mono caption, e.g. "// experience" */
export const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="sec-label">
    <span aria-hidden="true">//</span> {children}
  </p>
);

interface SectionHeaderProps {
  index: string;
  name: string;
  title: React.ReactNode;
  sub: React.ReactNode;
}

/** "02 ABOUT" + large display title + supporting line */
export const SectionHeader = ({ index, name, title, sub }: SectionHeaderProps) => (
  <m.header {...reveal} className="sec-head">
    <div>
      <p className="sec-index">
        <span>{index}</span> {name}
      </p>
      <h2 className="sec-title">{title}</h2>
    </div>
    <div className="sec-sub">{sub}</div>
  </m.header>
);
