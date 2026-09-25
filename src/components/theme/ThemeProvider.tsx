import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** Flip the theme, revealing the new one in a circle that grows from `origin` */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
});

// index.html applies the saved/system theme class before first paint; start from it
const initialTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const applyClass = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    applyClass(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const doc = document as ViewTransitionDocument;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!doc.startViewTransition || reduceMotion) {
        setTheme(next);
        return;
      }

      // Swap the class synchronously inside the transition so the "new" snapshot is correct
      const transition = doc.startViewTransition(() => {
        applyClass(next);
        setTheme(next);
      });

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [theme],
  );

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
