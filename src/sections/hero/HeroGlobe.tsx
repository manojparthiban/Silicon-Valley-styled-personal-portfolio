import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

interface HeroGlobeProps {
  /** Smoothed pointer position, -1..1 on each axis */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  className?: string;
}

const PERSPECTIVE = 2.6;
const TAU = Math.PI * 2;

/** Reads the theme's `--primary` ("210 90% 65%") as an `hsl()` string canvas understands. */
const readPrimary = () => {
  const [h, s, l] = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim()
    .split(/\s+/);
  return h ? `hsl(${h}, ${s}, ${l})` : "hsl(212, 90%, 50%)";
};

/**
 * A rotating 3D point-cloud globe with an orbit ring, drawn with plain canvas 2D
 * (no WebGL/three.js). It only animates while on screen and the tab is visible.
 */
const HeroGlobe = ({ pointerX, pointerY, className }: HeroGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.matchMedia("(max-width: 767px)").matches ? 520 : 900;

    // Evenly spread points over a unit sphere (Fibonacci lattice)
    const sphere = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      sphere.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
    }

    // A tilted orbit ring around the globe
    const RING = 140;
    const ring = new Float32Array(RING * 3);
    for (let i = 0; i < RING; i++) {
      const a = (i / RING) * TAU;
      ring.set([Math.cos(a) * 1.38, Math.sin(a) * 0.22, Math.sin(a) * 1.38], i * 3);
    }

    let color = readPrimary();
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    // Rotate a point around Y then X; returns screen x, y and depth z (-1 back .. 1 front)
    const project = (x: number, y: number, z: number, rotY: number, rotX: number, out: number[]) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y2 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      const scale = PERSPECTIVE / (PERSPECTIVE - z2);
      out[0] = x1 * scale;
      out[1] = y2 * scale;
      out[2] = z2;
    };

    let spin = 0;
    let last = performance.now();
    const p = [0, 0, 0];

    const draw = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      spin += dt * 0.00011;

      const rotY = spin + pointerX.get() * 0.45;
      const rotX = 0.38 + pointerY.get() * 0.22;
      const radius = Math.min(width, height) * 0.36;
      const cx = width / 2;
      const cy = height / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (let i = 0; i < count; i++) {
        project(sphere[i * 3], sphere[i * 3 + 1], sphere[i * 3 + 2], rotY, rotX, p);
        const depth = (p[2] + 1) / 2; // 0 back .. 1 front
        const size = 0.8 + depth * 1.7;
        ctx.globalAlpha = 0.12 + depth * depth * 0.88;
        ctx.fillRect(cx + p[0] * radius - size / 2, cy + p[1] * radius - size / 2, size, size);
      }

      // Orbit ring spins the other way, with one bright "satellite"
      const ringRot = -spin * 1.8;
      for (let i = 0; i < RING; i++) {
        project(ring[i * 3], ring[i * 3 + 1], ring[i * 3 + 2], ringRot, rotX, p);
        const depth = (p[2] + 1.4) / 2.8;
        ctx.globalAlpha = 0.06 + depth * 0.45;
        ctx.fillRect(cx + p[0] * radius - 0.6, cy + p[1] * radius - 0.6, 1.2, 1.2);
      }
      project(ring[0], ring[1], ring[2], ringRot, rotX, p);
      const sx = cx + p[0] * radius;
      const sy = cy + p[1] * radius;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(sx, sy, 7, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(sx, sy, 2.6, 0, TAU);
      ctx.fill();
    };

    let frame = 0;
    let onScreen = true;
    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduceMotion || frame || !onScreen || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw(performance.now());
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? start() : stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Re-read the accent colour when the theme toggles
    const themeObserver = new MutationObserver(() => {
      color = readPrimary();
      if (!frame) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pointerX, pointerY]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default HeroGlobe;
