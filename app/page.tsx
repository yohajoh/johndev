"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import HeroSection from "@/components/Hero/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import SkillsSection from "@/components/Skills/SkillsSection";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import ContactSection from "@/components/Contact/ContactSection";
import { LoadingScreen } from "@/components/Loading/LoadingScreen";
import { ParticleBackground } from "@/components/Background/ParticleBackground";
import { FloatingElements } from "@/components/Background/FloatingElements";
import { useLoading } from "@/hooks/useLoading";

// Smooth scroll helper
function smoothScrollTo(target: string) {
  const element = document.querySelector(target);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { isLoading } = useLoading(1500);

  // Parallax effects
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.8, 0.8, 0]
  );

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to sections with number keys (1-5)
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            smoothScrollTo("#hero");
            break;
          case "2":
            e.preventDefault();
            smoothScrollTo("#about");
            break;
          case "3":
            e.preventDefault();
            smoothScrollTo("#skills");
            break;
          case "4":
            e.preventDefault();
            smoothScrollTo("#projects");
            break;
          case "5":
            e.preventDefault();
            smoothScrollTo("#contact");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Elements */}
        {/* <ParticleBackground /> */}
        {/* <FloatingElements /> */}

        {/* Parallax Background Layer */}
        <motion.div
          className="fixed inset-0 z-[-2] pointer-events-none"
          style={{ y: parallaxY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute inset-0 noise-texture" />
        </motion.div>

        {/* Gradient Orbs */}
        <motion.div
          className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl -translate-x-1/2 -translate-y-1/2 z-[-1]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 blur-3xl translate-x-1/2 translate-y-1/2 z-[-1]"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />

        {/* Main Content */}
        <div id="main-content" className="relative z-10">
          {/* Hero Section */}
          <section id="hero" className="min-h-screen relative">
            <HeroSection />

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              style={{ opacity }}
            >
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground animate-pulse-soft">
                Explore
              </span>
              <motion.div
                className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2" />
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="section-padding relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            <AboutSection />
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            className="section-padding relative bg-gradient-to-b from-background via-muted/20 to-background"
          >
            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
            <SkillsSection />
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="section-padding-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <ProjectsSection />
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="section-padding relative bg-gradient-to-b from-background via-card/50 to-background"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <ContactSection />
          </section>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass border border-border/50 flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>

          {/* Section Navigation Dots */}
          <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            {["hero", "about", "skills", "projects", "contact"].map(
              (section, index) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(`#${section}`);
                  }}
                  className="relative group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors duration-300" />
                  <div className="absolute right-full pr-4 top-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                  </div>
                </motion.a>
              )
            )}
          </nav>
        </div>
      </motion.div>

      {/* Accessibility Notification */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Portfolio loaded successfully. Use Ctrl + number keys (1-5) to navigate
        between sections.
      </div>
    </>
  );
}
