import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // setState bails out when the value is unchanged, so this only re-renders on threshold crossings
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="icon"
            aria-label="Scroll to top"
            className="rounded-full w-11 h-11 bg-card text-foreground border border-border shadow-lg hover:text-primary hover:border-primary/40 hover:bg-card transition-colors"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </m.div>
      )}
    </AnimatePresence>
  );
};
