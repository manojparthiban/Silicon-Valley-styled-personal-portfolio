import React from "react";
import { Menu, Home, User, Code, FolderGit2, Mail, X } from "lucide-react";
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
  contact: { icon: Mail, label: "Contact" },
};

const Navigation = React.memo(
  ({
    sections = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
  }: NavigationProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-2xl border-b border-primary/10 shadow-sm transition-[background-color,backdrop-filter,border-color] duration-150 ease-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">MP</h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <ThemeToggle />
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {section.label}
                </Button>
              ))}
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
                  className="w-[280px] border-l border-primary/10 
                  bg-background/80 backdrop-blur-2xl shadow-lg 
                  rounded-l-3xl text-foreground p-0 overflow-hidden
                  transition-[background-color,backdrop-filter] duration-150 ease-out"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative h-full"
                  >
                    {/* Menu content */}
                    <div className="flex flex-col space-y-1 p-6 mt-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-lg font-semibold mb-2">Menu</h2>
                          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
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
                            transition={{ delay: index * 0.05, duration: 0.15 }}
                          >
                            <SheetClose asChild>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  scrollToSection(section.id);
                                  setIsOpen(false);
                                }}
                                className="w-full justify-start gap-3 py-6 text-base font-medium"
                              >
                                <MenuItem className="h-5 w-5" />
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
