/**
 * ============================================================================
 * NAVIGATION COMPONENT - Responsive Site-Wide Navigation
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This navigation bar was developed with significant AI assistance
 * for both desktop and mobile responsiveness.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Navigation structure and mobile menu (~80%)
 * - Cursor AI Editor: Active state indicators and glassmorphism (~15%)
 * - GitHub Copilot: Logo and theme toggle integration (~5%)
 * 
 * Human Intervention:
 * - Navigation hierarchy decisions
 * - Active route indicator design
 * - Mobile menu UX
 * - Logo animation effects
 * - CTA button positioning
 * 
 * Technologies:
 * - React Router DOM v6.30.1 (routing and active states)
 * - Tailwind CSS (responsive breakpoints, glassmorphism)
 * - Lucide React (icons)
 * - Theme Toggle integration
 * - Language Switcher integration
 * 
 * Features:
 * - Responsive design (desktop + mobile)
 * - Active route highlighting
 * - Mobile hamburger menu
 * - Theme toggle button
 * - Language switcher (4 languages)
 * - Glassmorphism effect
 * - Logo with hover animation
 * - Primary CTA button
 * 
 * Navigation Items:
 * - Home, About, Habitat, Location, Editor
 * 
 * Complexity: MEDIUM
 * Lines of code: 123
 * 
 * Estimated Development Time:
 * - With AI assistance: 2-3 hours
 * - Without AI: 3-4 business days
 * ============================================================================
 */

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.svg";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: t.nav.home },
    { path: "/about", label: t.nav.about },
    { path: "/habitat", label: t.nav.docs },
    { path: "/location", label: t.nav.location },
    { path: "/editor", label: t.nav.editor },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
          <div className="relative group">
          <img
            src={logo}
            alt="Logo"
            className="h-6 w-6 transition-transform group-hover:rotate-12 dark:invert"
          />
            <div className="absolute inset-0 blur-lg bg-primary/20 group-hover:bg-primary/40 transition-all" />
          </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Space & Spaces
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`relative transition-all ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Language Switcher & CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/editor">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(175,76,15,0.3)] hover:shadow-[0_0_30px_rgba(175,76,15,0.5)] transition-all">
                {t.home.ctaDesign}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex items-center gap-2 px-2 pt-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">Tema</span>
            </div>
            <Link to="/editor" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                {t.home.ctaDesign}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
