"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMousePosition } from "@/hooks/useMousePosition";
import { NAVIGATION, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { MinimalMonogramLogo } from "@/components/UI/MonogramLogo";
import { ThemeToggle } from "@/components/ThemeProvider";
import { MobileMenu } from "@/components/Navigation/MobileMenu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const { progress } = useScrollProgress();
  const { x: mouseX, y: mouseY } = useMousePosition();

  // Set mounted state
  useEffect(() => {
    setMounted(true);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle scroll effect with throttling
  useEffect(() => {
    if (!mounted) return;

    let ticking = false;
    const scrollThreshold = 1;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > scrollThreshold);

      // Update active section based on scroll position
      let newActiveSection = "home";
      let minDistance = Infinity;

      for (const item of NAVIGATION) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            newActiveSection = item.id;
          }
        }
      }

      setActiveSection(newActiveSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  // Handle dropdown click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  }, []);

  // Memoized navigation links
  const navigationLinks = useMemo(
    () =>
      NAVIGATION.map((item) => ({
        ...item,
        isActive: activeSection === item.id,
      })),
    [activeSection]
  );

  // Memoized social links
  const socialLinks = useMemo(() => SOCIAL_LINKS || [], []);

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Navigation Bar */}
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4",
          isScrolled
            ? "bg-background/95 border-b border-border/50 shadow-lg backdrop-blur-lg"
            : "bg-transparent",
          "transform-gpu"
        )}
        aria-label="Main navigation"
      >
        {/* Background overlay when scrolled */}
        {isScrolled && (
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-lg pointer-events-none"
            aria-hidden="true"
          />
        )}

        <div className="container-wide mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollToSection("#home")}
                className="group relative flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:rounded-lg"
                aria-label="Go to home"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                    <MinimalMonogramLogo
                      size={isScrolled ? 28 : 32}
                      className="transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="hidden md:block">
                  <span className="font-heading text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Yohannes Belete
                  </span>
                  <span className="block text-xs text-muted-foreground font-medium">
                    Senior Developer
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((item) => {
                const Icon = item.icon;
                const isActive = item.isActive;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "group relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all duration-200",
                      "hover:bg-primary/10 hover:scale-105",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      isActive &&
                        "bg-gradient-to-r from-primary/20 to-secondary/20"
                    )}
                    aria-label={`Navigate to ${item.name}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    )}

                    <div className="relative flex items-center space-x-2">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium text-xs sm:text-sm tracking-wide">
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <ThemeToggle className="group relative p-1.5 sm:p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/10 hover:bg-white/20" />

              {/* Social Links Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    "group relative px-3 py-1.5 sm:px-4 sm:p-2 rounded-xl transition-all duration-200",
                    isScrolled
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30"
                      : "bg-gradient-to-r from-primary/15 to-secondary/15 hover:from-primary/25 hover:to-secondary/25",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50"
                  )}
                  aria-label="Social media links"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium text-xs sm:text-sm hidden sm:inline">
                      Connect
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200",
                        isDropdownOpen && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-background/95 backdrop-blur-lg border border-border shadow-xl py-2 animate-fade-in-up"
                    role="menu"
                  >
                    <div className="px-3 py-1.5 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground">
                        Connect with me
                      </span>
                    </div>
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "group flex items-center space-x-3 px-3 py-2 transition-all duration-200",
                            "hover:bg-primary/5",
                            "focus:outline-none focus:bg-primary/5"
                          )}
                          role="menuitem"
                          aria-label={social.label}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                              social.color,
                              "group-hover:scale-110"
                            )}
                          >
                            <Icon className={cn("w-4 h-4", social.textColor)} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {social.platform}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {social.label}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "lg:hidden group relative p-1.5 sm:p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
                  isScrolled
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-white/5 hover:bg-white/10"
                )}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <Menu
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-200",
                      isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-200",
                      isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Reduced floating particles - only when scrolled */}
        {isScrolled && mounted && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-primary/30"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${20 + i * 20}%`,
                  animation: `float ${8 + i * 3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </nav>

      {/* Scroll indicator - only on desktop */}
      {mounted && (
        <div
          className="fixed top-24 right-4 z-40 hidden lg:flex flex-col items-center space-y-2"
          aria-hidden="true"
        >
          <div className="w-2 h-40 rounded-full bg-background/80 backdrop-blur-lg border border-border overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent transition-all duration-300 ease-out"
              style={{ height: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground rotate-90 whitespace-nowrap">
            {Math.round(progress)}%
          </span>
        </div>
      )}

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] px-4 py-2 bg-primary text-white rounded-lg font-medium focus:z-[9999]"
      >
        Skip to main content
      </a>
    </>
  );
};

export default Navigation;
