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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-2xl border-b border-primary/10 shadow-sm transition-[background-color,backdrop-filter,border-color] duration-150 ease-out will-change-[background-color,backdrop-filter,border-color]">
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
                {sections.map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.5 }}
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollToSection(section.id)}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover:bg-primary/5 active:scale-95"
                    >
                      {section.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full"
                        initial={{ width: "0%", opacity: 0 }}
                        whileHover={{ 
                          width: "100%", 
                          opacity: 1,
                          transition: { 
                            width: { type: "spring", stiffness: 400, damping: 20 },
                            opacity: { duration: 0.2 }
                          } 
                        }}
                        whileTap={{ width: "100%", opacity: 1 }}
                        exit={{ width: "0%", opacity: 0, transition: { duration: 0.2 } }}
                        style={{ willChange: "width, opacity", transform: "translateZ(0)" }}
                      />
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
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{ willChange: "transform", transform: "translateZ(0)" }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] border-l border-primary/10 
                  bg-background/80 backdrop-blur-2xl shadow-lg 
                  rounded-l-3xl text-foreground p-0 overflow-hidden
                  transition-[background-color,backdrop-filter] duration-150 ease-out
                  will-change-[transform,opacity]"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative h-full backdrop-blur-sm"
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                  >
                    {/* Menu content */}
                    <div className="flex flex-col space-y-1 p-6 mt-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-lg font-semibold mb-2">Menu</h2>
                          <motion.div 
                            className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
                            style={{ willChange: "transform", transform: "translateZ(0)" }}
                          />
                        </div>
                        <ThemeToggle />
                      </div>

                      {sections.map((section, index) => {
                        const MenuItem = menuItems[section.id as keyof typeof menuItems].icon;
                        return (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: index * 0.05, 
                              type: "spring",
                              stiffness: 300,
                              damping: 30
                            }}
                            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                          >
                            <SheetClose asChild>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  scrollToSection(section.id);
                                  setIsOpen(false);
                                }}
                                className="w-full justify-start gap-3 py-6 text-base font-medium group"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 20, mass: 0.5 }}
                                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                                >
                                  <MenuItem className="h-5 w-5" />
                                </motion.div>
                                {section.label}
                              </Button>
                            </SheetClose>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
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
