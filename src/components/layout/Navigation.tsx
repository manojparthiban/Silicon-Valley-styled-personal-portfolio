import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import { scrollToSection } from "@/lib/scroll";
import { RESUME_FILENAME, RESUME_URL } from "@/lib/resume";

const sections = [
  { id: "about", label: "About", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "blogs", label: "Blog", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

/**
 * Floating nav bar.
 * - Scroll progress, condensed state and hide-on-scroll-down are written straight to the
 *   DOM from one rAF-throttled passive listener, so scrolling never re-renders React.
 * - Active section comes from an IntersectionObserver (re-renders only when it changes).
 * - The active link is marked by a highlight that slides between links.
 */
const Navigation = React.memo(() => {
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  // While a nav click is scrolling the page, keep the bar visible
  const pinnedUntil = useRef(0);

  /* ── scroll: progress, condensed, hide/show ── */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : "0");
      el.classList.toggle("is-condensed", y > 24);

      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      if (y < 140 || delta < 0 || openRef.current || performance.now() < pinnedUntil.current) {
        el.classList.remove("is-hidden");
      }
      else el.classList.add("is-hidden");
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── scroll spy ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...sections.map((s) => s.id)].forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  /* ── sliding highlight under the active link ── */
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      list.style.setProperty("--pill-x", `${link ? link.offsetLeft : 0}px`);
      list.style.setProperty("--pill-w", `${link ? link.offsetWidth : 0}px`);
      list.classList.toggle("has-active", !!link);
    };
    place();
    // Widths change once the web fonts land
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const navigate = useCallback((id: string) => {
    setOpen(false);
    pinnedUntil.current = performance.now() + 1600;
    headerRef.current?.classList.remove("is-hidden");
    scrollToSection(id);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  return (
    <header ref={headerRef} className={`nav ${open ? "is-open" : ""}`}>
      <nav className="nav__bar" aria-label="Primary">
        <a
          href="#hero"
          className="nav__brand"
          onClick={(e) => {
            e.preventDefault();
            navigate("hero");
          }}
        >
          <span className="nav__mark" aria-hidden="true">
            {/* same MP ligature as the favicon: the M's right leg is the P's stem */}
            <svg viewBox="0 0 64 64" width="22" height="22">
              <path
                d="M13 46V19l12.5 15L38 19v27M38 19h6.5a8.5 8.5 0 0 1 0 17H38"
                fill="none"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="nav__name">Manoj Parthiban</span>
        </a>

        <ul ref={listRef} className="nav__links">
          <li className="nav__pill" aria-hidden="true" />
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-id={s.id}
                aria-current={active === s.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(s.id);
                }}
                className="nav__link"
              >
                <span className="nav__num">{s.num}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <ThemeToggle />
          <a href={RESUME_URL} download={RESUME_FILENAME} className="nav__cta nav__cta--desktop">
            <Download className="w-4 h-4" />
            Resume
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>

        <span className="nav__progress" aria-hidden="true" />
      </nav>

      <MobileMenu open={open} onClose={closeMenu} sections={sections} active={active} onNavigate={navigate} />
    </header>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
