import React, { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Render as an external link instead of a div */
  href?: string;
  "aria-label"?: string;
}

/**
 * Card that tilts toward the cursor with a soft glare. Pointer position is written
 * straight to CSS variables, so moving the mouse never re-renders React.
 */
const TiltCard = ({ children, className = "", max = 7, href, ...rest }: TiltCardProps) => {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const props = {
    className: `tilt ${className}`,
    onPointerMove,
    onPointerLeave,
    ...rest,
  };

  const content = (
    <>
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </>
  );

  return href ? (
    <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {content}
    </a>
  ) : (
    <div ref={ref as React.RefObject<HTMLDivElement>} {...props}>
      {content}
    </div>
  );
};

export default TiltCard;
