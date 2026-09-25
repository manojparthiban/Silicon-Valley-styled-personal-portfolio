import { useEffect, useRef } from "react";

export interface OrbitSkill {
  name: string;
  group: string;
  icon?: string;
  /** Short text shown instead of an icon */
  mark?: string;
  /** Single-colour black logo: inverted in dark mode */
  mono?: boolean;
}

export const SkillIcon = ({ skill, size = 28 }: { skill: OrbitSkill; size?: number }) =>
  skill.icon ? (
    <img
      src={skill.icon}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`skill-icon ${skill.mono ? "skill-icon--mono" : ""}`}
    />
  ) : (
    <span className="skill-mark">{skill.mark}</span>
  );

interface SkillOrbitProps {
  skills: OrbitSkill[];
  /** Skill to rotate to the front (driven by hovering the list) */
  active: string | null;
}

const TAU = Math.PI * 2;
const REST_PITCH = -0.22;

/**
 * Skills arranged on a 3D sphere. Auto-rotates, can be dragged with inertia, and turns
 * the `active` skill to face the viewer. Positions are written straight to the DOM each
 * frame (no React renders), and the loop sleeps while off screen.
 */
const SkillOrbit = ({ skills, active }: SkillOrbitProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const focusNameRef = useRef<HTMLSpanElement>(null);
  const focusGroupRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Highlight the active item
  useEffect(() => {
    itemRefs.current.forEach((el, i) => el?.classList.toggle("is-active", skills[i].name === active));
  }, [active, skills]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const n = skills.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Even spread over the sphere (Fibonacci lattice)
    const pts = skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      return [Math.cos(t) * r, y, Math.sin(t) * r] as const;
    });

    let yaw = 0.4;
    let pitch = REST_PITCH;
    let vYaw = 0;
    let vPitch = 0;
    let radius = 0;
    let front = -1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let last = performance.now();

    const measure = () => {
      radius = stage.clientWidth * 0.37;
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const target = activeRef.current ? skills.findIndex((s) => s.name === activeRef.current) : -1;

      if (target >= 0 && !dragging) {
        // Rotate so the target point faces +z
        const [x, y, z] = pts[target];
        let ty = Math.atan2(-x, z);
        ty += Math.round((yaw - ty) / TAU) * TAU;
        const tp = Math.atan2(y, Math.hypot(x, z));
        const k = Math.min(1, dt * 0.009);
        yaw += (ty - yaw) * k;
        pitch += (tp - pitch) * k;
        vYaw = vPitch = 0;
      } else if (!dragging) {
        yaw += vYaw * dt;
        pitch += vPitch * dt;
        vYaw *= 0.94;
        vPitch *= 0.94;
        if (!reduceMotion) yaw += dt * 0.00022;
        pitch += (REST_PITCH - pitch) * Math.min(1, dt * 0.0015);
      }
      pitch = Math.max(-1.2, Math.min(1.2, pitch));

      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      let bestZ = -2;
      let best = 0;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const [x, y, z] = pts[i];
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const depth = (z2 + 1) / 2;
        el.style.transform = `translate3d(${(x1 * radius).toFixed(1)}px, ${(-y2 * radius).toFixed(1)}px, 0) scale(${(0.5 + depth * 0.55).toFixed(3)})`;
        el.style.opacity = (0.22 + depth * 0.78).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        if (z2 > bestZ) {
          bestZ = z2;
          best = i;
        }
      }

      if (best !== front) {
        itemRefs.current[front]?.classList.remove("is-front");
        itemRefs.current[best]?.classList.add("is-front");
        front = best;
        if (focusNameRef.current) focusNameRef.current.textContent = skills[best].name;
        if (focusGroupRef.current) focusGroupRef.current.textContent = skills[best].group;
      }
    };

    let frame = 0;
    let onScreen = true;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame || !onScreen || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Drag to spin (horizontal on touch; vertical touch still scrolls the page)
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      yaw += dx * 0.009;
      pitch -= dy * 0.009;
      vYaw = (dx * 0.009) / 16;
      vPitch = (-dy * 0.009) / 16;
    };
    const onUp = () => {
      dragging = false;
      stage.classList.remove("is-dragging");
    };

    measure();
    draw(performance.now());
    start();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? start() : stop();
    });
    intersection.observe(stage);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [skills]);

  return (
    <div className="orbit">
      <div ref={stageRef} className="orbit__stage" aria-hidden="true">
        <span className="orbit__rings">
          <span className="orbit__ring orbit__ring--a" />
          <span className="orbit__ring orbit__ring--b" />
          <span className="orbit__ring orbit__ring--c" />
        </span>
        <span className="orbit__core" />
        <ul>
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="orbit__item"
            >
              <span className="orbit__tile">
                <SkillIcon skill={skill} size={30} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="orbit__focus" aria-live="off">
        <span className="orbit__focus-label">// in focus</span>
        <span ref={focusNameRef} className="orbit__focus-name" />
        <span ref={focusGroupRef} className="orbit__focus-group" />
      </p>
      <p className="orbit__hint">{skills.length} skills · drag to spin</p>
    </div>
  );
};

export default SkillOrbit;
