"use client";

import { useEffect, useState } from "react";
import { Code2, ChevronRight, Sparkles, Globe, Calendar, Heart, Menu, X } from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { NAVIGATION, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MonogramLogo from "@/components/UI/MonogramLogo";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 } // Lower threshold for mobile
    );

    const footer = document.getElementById("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  // Handle navigation click for mobile
  const handleNavigationClick = (itemId: string) => {
    const element = document.getElementById(itemId);
    if (element) {
      const offset = window.innerWidth < 768 ? 60 : 80; // Smaller offset for mobile
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
      aria-label="Footer"
    >
      {/* Top decorative border - hidden on mobile for cleaner look */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent hidden sm:block" />
      
      {/* Bottom decorative border - hidden on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent hidden sm:block" />
      
      {/* Corner accents - hidden on mobile */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-emerald-500/30 hidden sm:block" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-amber-500/30 hidden sm:block" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-emerald-500/30 hidden sm:block" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-amber-500/30 hidden sm:block" />

      {/* Subtle background pattern - lighter on mobile */}
      <div 
        className="absolute inset-0 opacity-3 dark:opacity-5 sm:opacity-5 dark:sm:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0',
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Mobile menu toggle button */}
        <div className="lg:hidden py-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle footer menu"
          >
            <div className="flex items-center gap-2">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {isMobileMenuOpen ? "Close Menu" : "Quick Navigation"}
              </span>
            </div>
            <ChevronRight className={cn(
              "w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform",
              isMobileMenuOpen ? "rotate-90" : "rotate-0"
            )} />
          </button>
        </div>

        {/* Mobile navigation menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="px-4 py-6 space-y-4 bg-white dark:bg-gray-900 rounded-lg my-4 border border-gray-200 dark:border-gray-800">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Quick Links</span>
            </h3>
            {NAVIGATION.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={`Navigate to ${item.name}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.name}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main footer content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Brand column - Full width on mobile */}
            <div
              className={cn(
                "lg:col-span-1 space-y-6 transition-all duration-1000 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 w-16 h-16">
                  <MonogramLogo size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Yohannes Belete
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    MERN Stack & Next.js Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Building modern web applications with clean architecture and scalable solutions. 
                Focused on creating exceptional digital experiences.
              </p>

              {/* Current availability - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex-1">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 truncate">
                    Available for projects
                  </span>
                </div>

                {/* Location info */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 flex-1">
                  <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Based in</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Adama, Ethiopia
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links - Horizontal scroll on mobile if needed */}
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Connect with me
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {SOCIAL_LINKS.slice(0, 4).map((social) => {
                    const Icon = social.icon;
                    return (
                      <MagneticElement key={social.platform} strength={0.2}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                            "transition-all duration-300 active:scale-95 sm:hover:scale-110 sm:hover:shadow-md",
                            "active:bg-emerald-50 dark:active:bg-emerald-500/10 sm:hover:bg-emerald-50 dark:sm:hover:bg-emerald-500/10",
                            "active:border-emerald-200 dark:active:border-emerald-500/30"
                          )}
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 sm:group-hover:text-emerald-600 dark:sm:group-hover:text-emerald-400 transition-colors duration-300" />
                        </a>
                      </MagneticElement>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick links - Hidden on mobile, shown in mobile menu */}
            <div
              className={cn(
                "hidden lg:block transition-all duration-1000 ease-out delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Navigation</span>
              </h3>
              <nav className="space-y-3" aria-label="Footer navigation">
                {NAVIGATION.map((item) => (
                  <MagneticElement key={item.id} strength={0.1}>
                    <button
                      onClick={() => handleNavigationClick(item.id)}
                      className="group flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-emerald-500 transition-all duration-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticElement>
                ))}
              </nav>
            </div>

            {/* Expertise - Adjust layout for mobile */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <span>Technical Expertise</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "MERN Stack",
                  "Next.js & React",
                  "TypeScript",
                  "RESTful APIs",
                  "Database Design",
                  "Performance",
                  "UI/UX Design",
                  "Cloud Deployment",
                ].map((expertise) => (
                  <div
                    key={expertise}
                    className="flex items-center gap-3 p-3 rounded-lg group hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-colors duration-300 border border-transparent hover:border-amber-200 dark:hover:border-amber-500/20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/30 dark:bg-amber-500/30 group-hover:bg-amber-500 transition-all duration-300 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors truncate">
                      {expertise}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section - Stacked on mobile */}
        <div className="py-6 sm:py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:text-left sm:flex-row">
            <div className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
              © {new Date().getFullYear()} Yohannes Belete. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 sm:order-2">
              
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Heart className="w-3 h-3 fill-red-500 text-red-500 flex-shrink-0" />
                <span>Crafted with passion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;