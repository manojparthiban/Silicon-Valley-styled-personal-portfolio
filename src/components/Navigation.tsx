import React from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavigationProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

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
    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-2xl border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">MP</h1>
            </div>

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[240px] sm:w-[280px] bg-background/50 backdrop-blur-2xl border-l border-primary/10"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    <ThemeToggle />
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant="ghost"
                        onClick={() => {
                          scrollToSection(section.id);
                        }}
                        className="justify-start"
                      >
                        {section.label}
                      </Button>
                    ))}
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
