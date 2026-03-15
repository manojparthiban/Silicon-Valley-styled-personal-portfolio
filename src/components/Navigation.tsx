import React, { useCallback } from "react";
import { Menu, Home, User, Code, FolderGit2, Mail, X, Book } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const menuItems = {
  hero: { icon: Home, label: "Home" },
  about: { icon: User, label: "About" },
  skills: { icon: Code, label: "Skills" },
  projects: { icon: FolderGit2, label: "Projects" },
  blogs: { icon: Book, label: "Blog" },
  contact: { icon: Mail, label: "Contact" },
};

const Navigation = React.memo(
  ({
    sections = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "blogs", label: "Blog" },
      { id: "contact", label: "Contact" },
    ],
  }: NavigationProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const scrollToSection = useCallback((id: string) => {
      const element = document.getElementById(id);
      if (element) {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
        const options: ScrollIntoViewOptions = {
          behavior: "smooth",
          block: "start",
        };
        requestAnimationFrame(() => {
          element.scrollIntoView({
            ...options,
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        });
      }
      return () => {
        document.documentElement.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
      };
    }, []);

    return (
      <nav className="fixed top-4 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-5xl z-50 glass-nav rounded-2xl px-2 transition-all duration-300 ease-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 2, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95, rotate: -2, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ willChange: "transform", transform: "translateZ(0)" }}
            >
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">MP</h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <ThemeToggle />
              <AnimatePresence>
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollToSection(section.id)}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover:bg-primary/5 active:scale-95"
                    >
                      {section.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10 transition-colors"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] border-l border-primary/10 bg-background/90 backdrop-blur-xl shadow-lg rounded-l-3xl p-0"
                >
                  <div className="relative h-full p-6 mt-6 flex flex-col space-y-1">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Menu</h2>
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                      </div>
                      <ThemeToggle />
                    </div>

                    {sections.map((section) => {
                      const MenuItem = menuItems[section.id as keyof typeof menuItems].icon;
                      return (
                        <SheetClose asChild key={section.id}>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              scrollToSection(section.id);
                              setIsOpen(false);
                            }}
                            className="w-full justify-start gap-3 py-6 text-base font-medium group transition-colors"
                          >
                            <MenuItem className="h-5 w-5 transition-transform group-hover:scale-110" />
                            {section.label}
                          </Button>
                        </SheetClose>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    );
  },
);

// Add display name for better debugging in React DevTools
Navigation.displayName = "Navigation";

export default Navigation;
