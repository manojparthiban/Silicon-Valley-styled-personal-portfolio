import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    // Respect users who ask the OS for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
};
