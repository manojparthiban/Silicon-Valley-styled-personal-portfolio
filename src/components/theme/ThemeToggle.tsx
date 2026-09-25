import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`theme-toggle ${className}`}
    >
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
