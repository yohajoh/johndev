"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { HeroSection } from "@/components/Sections/HeroSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { SkillsSection } from "@/components/Sections/SkillsSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { Footer } from "@/components/Sections/Footer";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/components/Providers/SmoothScroll";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);

  // Handle scroll and active section with debouncing
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      let currentSection = "home";
      let minDistance = Infinity;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
      isScrollingRef.current = false;
    }, 50);
  }, []);

  // Smooth scrolling for anchor links
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]');

    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          isScrollingRef.current = true;
          smoothScrollTo(element, 80, 1000);

          // Update active section after scroll
          setTimeout(() => {
            setActiveSection(targetId);
            isScrollingRef.current = false;
          }, 1000);
        }
      }
    }
  }, []);

  // Initialize scroll and navigation
  useEffect(() => {
    // Set initial scroll position
    window.scrollTo(0, 0);

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Add click listener for anchor links
    document.addEventListener("click", handleAnchorClick);

    // Initial section detection
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleAnchorClick]);

  // Handle section indicator click
  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      smoothScrollTo(element, 80, 1000);

      setTimeout(() => {
        setActiveSection(sectionId);
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `
          radial-gradient(at 40% 20%, rgba(22, 163, 74, 0.05) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(245, 158, 11, 0.05) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.03) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(59, 130, 246, 0.03) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%),
          radial-gradient(at 80% 100%, rgba(239, 68, 68, 0.03) 0px, transparent 50%)
        `,
      }}
    >
      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {["home", "about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => handleSectionClick(section)}
            className="group relative flex items-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:rounded-full"
            aria-label={`Jump to ${section} section`}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === section
                  ? "bg-gradient-to-r from-primary to-secondary scale-150"
                  : "bg-white/30 group-hover:bg-white/50"
              )}
            />
            <span
              className={cn(
                "absolute right-6 text-xs font-medium whitespace-nowrap transition-all duration-300",
                activeSection === section
                  ? "text-primary opacity-100 translate-x-0"
                  : "text-muted-foreground opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
