/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ChevronDown, Download, Rocket } from "lucide-react";
import { TypewriterEffect } from "@/components/UI/TypewriterEffect";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { TYPEWRITER_TEXTS, METRICS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import John from "@/public/john.jpg";
import Image from "next/image";
import { Button } from "@/components/UI/Button";

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const animationFrameRef = useRef<number>(0);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height / 2)));
    setScrollProgress(progress);
  }, []);

  // Initialize visibility and animations
  useEffect(() => {
    if (!isMounted) return;

    const scrollThrottled = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        handleScroll();
        animationFrameRef.current = 0;
      });
    };

    window.addEventListener("scroll", scrollThrottled, { passive: true });
    handleScroll();
    setIsVisible(true);

    return () => {
      window.removeEventListener("scroll", scrollThrottled);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMounted, handleScroll]);

  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!isMounted) return;

      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    [isMounted]
  );

  const handleOpenResume = useCallback(() => {
    if (isMounted) {
      window.open(
        "https://drive.google.com/file/d/1CTNTQZJm7UPyVkFKdjihIpLA_C7zDGkx/view?usp=drive_link",
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, [isMounted]);

  // Memoize constants
  const memoizedMetrics = useMemo(() => METRICS || [], []);
  const memoizedSocialLinks = useMemo(() => SOCIAL_LINKS || [], []);
  const memoizedTypewriterTexts = useMemo(
    () => TYPEWRITER_TEXTS || ["Full-Stack Developer"],
    []
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24"
      aria-label="Hero section"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Yohannes Belete" />
      <meta itemProp="jobTitle" content="Senior Full-Stack Developer" />
      <meta
        itemProp="description"
        content="Building exceptional digital experiences with modern technologies. Specializing in full-stack development, cloud architecture, and performance optimization for scalable applications."
      />

      {/* Enhanced Background */}
      <OptimizedBackground />

      {/* Main content */}
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Intro */}
          <div
            className={cn(
              "space-y-8",
              isVisible ? "animate-fade-in-up" : "opacity-0"
            )}
          >
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="block text-foreground">
                  Hello, I&#39;m{" "}
                  <span className="text-gradient-primary relative">
                    Yohannes
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
                  </span>
                </span>
                <span className="block text-foreground mt-2 xl:text-6xl">
                  {isMounted && (
                    <TypewriterEffect
                      texts={memoizedTypewriterTexts.slice()}
                      speed={50}
                      delay={2000}
                      loop={true}
                      className="text-gradient-primary font-bold"
                      cursor={true}
                      cursorBlinkSpeed={500}
                      aria-label="Roles: Senior Full-Stack Developer, System Architect, DevOps Engineer, Cloud Specialist, UI/UX Enthusiast, Problem Solver"
                    />
                  )}
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
                itemProp="description"
              >
                Building exceptional digital experiences with modern
                technologies. Specializing in full-stack development, cloud
                architecture, and performance optimization for scalable
                applications.
              </p>
            </div>

            {/* Metrics */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              role="list"
              aria-label="Achievements"
            >
              {memoizedMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <MagneticElement key={metric.label} strength={0.1}>
                    <div
                      className={cn(
                        "p-4 rounded-2xl bg-gradient-to-br from-card/80 to-background/80 border border-white/5 backdrop-blur-sm",
                        "transition-all duration-300 hover:border-primary/30 hover:scale-105",
                        "animate-fade-in-up"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      role="listitem"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-foreground">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MagneticElement>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("contact")}
                variant="primary"
                size="lg"
                icon={
                  <Rocket
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    aria-hidden="true"
                  />
                }
                iconPosition="left"
                className="group"
                aria-label="Start a new project with me"
              >
                Start a Project
                <div
                  className="w-2 h-2 rounded-full bg-white/50 animate-pulse group-hover:animate-none ml-2"
                  aria-hidden="true"
                />
              </Button>

              <Button
                onClick={handleOpenResume}
                variant="outline"
                size="lg"
                icon={
                  <Download
                    className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                    aria-hidden="true"
                  />
                }
                iconPosition="left"
                className="group"
                aria-label="Download my resume"
              >
                Download Resume
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div
                className="flex items-center gap-3"
                role="list"
                aria-label="Social media profiles"
              >
                {memoizedSocialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <MagneticElement key={social.platform} strength={0.2}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group w-10 h-10 rounded-xl flex items-center justify-center",
                          "bg-white/5 border border-white/10 backdrop-blur-sm",
                          "transition-all duration-300 hover:scale-110 hover:shadow-lg",
                          "animate-fade-in-up"
                        )}
                        style={{ animationDelay: `${index * 50 + 400}ms` }}
                        aria-label={`Follow me on ${social.label}`}
                        itemProp="sameAs"
                      >
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </a>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Photo frame */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <div
                className="relative aspect-square rounded-3xl overflow-hidden border-8 border-card shadow-2xl"
                aria-label="Profile photo of Yohannes Belete"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-3xl p-1"
                  aria-hidden="true"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                    <div className="relative w-full h-full transform-gpu">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 transform-gpu">
                        <Image
                          src={John}
                          alt="Yohannes Belete - Senior Full-Stack Developer"
                          fill
                          className="object-cover transform-gpu"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          loading="eager"
                          itemProp="image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Tech Stack */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md">
                <div
                  className="flex flex-wrap justify-center gap-3"
                  role="list"
                  aria-label="Technical skills"
                >
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "AWS",
                    "Docker",
                  ].map((tech, i) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg text-sm font-medium",
                        "transition-all duration-300 hover:scale-110",
                        "animate-fade-in-up"
                      )}
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Code Snippet */}
              <div
                className="absolute -top-12 right-0 hidden xl:block animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
                aria-label="Code snippet representing my developer profile"
              >
                <figure className="p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
                  <figcaption className="sr-only">
                    Developer profile code snippet
                  </figcaption>
                  <div className="flex gap-2 mb-2" aria-hidden="true">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <pre
                    className="text-xs font-mono text-muted-foreground"
                    aria-label="JavaScript object defining my profile"
                  >
                    <code>
                      {`const developer = {\n  name: "Yohannes Belete",\n  role: "Full-Stack Developer",\n  passion: "Building amazing things"\n}`}
                    </code>
                  </pre>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-10",
          "group flex flex-col items-center gap-2",
          "transition-all duration-500 hover:scale-110",
          "animate-fade-in-up"
        )}
        style={{ animationDelay: "800ms" }}
        aria-label="Scroll to next section"
      >
        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1 group-hover:border-primary transition-colors duration-300">
          <div
            className="w-1 h-3 rounded-full bg-primary animate-scroll-indicator"
            aria-hidden="true"
          />
        </div>
        <ChevronDown
          className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 animate-scroll-indicator"
          aria-hidden="true"
        />
      </button>

      {/* Progress indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
        role="progressbar"
        aria-valuenow={scrollProgress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {isMounted && (
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};

// Optimized background component using CSS
const OptimizedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-background to-gray-900" />

      {/* Subtle animated mesh gradient using CSS */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(14, 165, 233, 0.1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(236, 72, 153, 0.1) 0px, transparent 50%)
          `,
          transform: `translate(${mousePosition.x * 20}px, ${
            mousePosition.y * 20
          }px)`,
          transition: "transform 0.3s linear",
        }}
      />

      {/* Performance-optimized particles using pure CSS */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: "blur(1px)",
              transform: "translateZ(0)", // GPU acceleration
            }}
          />
        ))}
      </div>

      {/* Animated grid lines with minimal opacity */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
          transform: "translateZ(0)",
        }}
      />

      {/* Glowing orbs with CSS animations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
          style={{
            animation: "pulse 8s ease-in-out infinite",
            transform: "translateZ(0)",
          }}
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64">
        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl"
          style={{
            animation: "pulse 12s ease-in-out infinite",
            animationDelay: "1s",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Subtle scan line effect */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          )`,
          backgroundSize: "100% 4px",
          animation: "scan 15s linear infinite",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default HeroSection;
