import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { RESUME_FILENAME, RESUME_URL } from "@/lib/resume";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  sections: Array<{ id: string; label: string; num: string }>;
  active: string;
  onNavigate: (id: string) => void;
}

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/manojparthiban" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/manoj-parthi31/" },
  { icon: Mail, label: "Email", href: "mailto:manojparthiban2002@gmail.com" },
];

/**
 * Lightweight mobile menu: a panel that folds down from the nav bar in 3D.
 * Replaces the Radix dialog sheet (no extra chunk), with Escape to close,
 * scroll lock, focus handling and `inert` while hidden.
 */
const MobileMenu = ({ open, onClose, sections, active, onNavigate }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open) panel.removeAttribute("inert");
    else panel.setAttribute("inert", "");
    if (!open) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the menu once it starts opening
    const focusTimer = window.setTimeout(() => panel.querySelector<HTMLElement>("a, button")?.focus(), 60);

    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`mnav-backdrop ${open ? "is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        id="mobile-menu"
        className={`mnav ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <p className="mnav__label">
          <span aria-hidden="true">//</span> navigate
        </p>
        <ul className="mnav__links">
          {sections.map((s, i) => (
            <li key={s.id} style={{ "--i": i } as React.CSSProperties}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(s.id);
                }}
                className="mnav__link"
              >
                <span className="mnav__num">{s.num}</span>
                <span className="mnav__text">{s.label}</span>
                <ArrowUpRight className="mnav__arrow w-5 h-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mnav__foot" style={{ "--i": sections.length } as React.CSSProperties}>
          <div className="mnav__socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="mnav__social">
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
          <a href={RESUME_URL} download={RESUME_FILENAME} className="nav__cta">
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
