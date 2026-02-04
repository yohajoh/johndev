"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Award,
  Briefcase,
  GraduationCap,
  Target,
  CheckCircle,
  Globe,
  Code,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button } from "@/components/UI/Button";
import {
  EXPERIENCE_TIMELINE,
  EDUCATION,
  FEATURE_HIGHLIGHTS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import MonogramLogo from "@/components/UI/MonogramLogo";

// Memoized constants for performance
const STATS_DATA = [
  { value: "20+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "20+", label: "Technologies" },
  { value: "99%", label: "Success Rate" },
];

const SKILLS_DATA = [
  {
    label: "Technical Skills",
    percentage: 95,
    color: "from-primary to-secondary",
  },
  {
    label: "Project Management",
    percentage: 90,
    color: "from-secondary to-accent",
  },
  {
    label: "Client Satisfaction",
    percentage: 98,
    color: "from-accent to-primary",
  },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const [isVisible, setIsVisible] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number>(0);

  // Memoized tab change handler
  const handleTabChange = useCallback((tab: "experience" | "education") => {
    setActiveTab(tab);
  }, []);

  // Memoized timeline data
  const timelineData = useMemo(
    () => (activeTab === "experience" ? EXPERIENCE_TIMELINE : EDUCATION),
    [activeTab]
  );

  // Memoized timeline icon
  const TimelineIcon = useMemo(
    () => (activeTab === "experience" ? Briefcase : GraduationCap),
    [activeTab]
  );

  // Optimized Intersection Observer with mobile threshold
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current && sectionRef.current) {
              observerRef.current.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "20px",
      }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Optimized progress animation with requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const duration = 1200;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic bezier easing for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      setProgressValues(
        SKILLS_DATA.map((skill) => easedProgress * skill.percentage)
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-gray-900/20 to-background"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Schema.org metadata for SEO */}
      <meta
        itemProp="jobTitle"
        content="Full-Stack Developer & MERN Stack Expert"
      />
      <meta
        itemProp="description"
        content="MERN Stack & Next.js developer specializing in modern full-stack development and scalable applications."
      />
      <meta
        itemProp="knowsAbout"
        content="MERN Stack, Next.js, React, Node.js, MongoDB, TypeScript, Full-Stack Development"
      />

      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header - Mobile optimized */}
        <header
          className={cn(
            "text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <MagneticElement strength={0.1}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6 shadow-lg mx-auto"
              role="status"
              aria-label="About me section"
            >
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-primary">About Me</span>
            </div>
          </MagneticElement>

          <h1
            id="about-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4"
          >
            Professional{" "}
            <span className="text-gradient-primary relative inline-block">
              Journey
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            MERN Stack & Next.js developer building scalable applications with
            clean code and great user experiences.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left column - Personal info & features */}
          <div className="space-y-6 sm:space-y-8">
            {/* Personal introduction card - Mobile optimized */}
            <article
              className={cn(
                "p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-card/50 border border-border shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300",
                isVisible ? "animate-fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: "100ms" }}
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 md:gap-6">
                {/* Avatar - Smaller on mobile */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                    <MonogramLogo />
                  </div>
                  <div className="z-[9999] absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    <CheckCircle
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="flex-1 mt-2 sm:mt-0">
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                    Yohannes Belete
                  </h2>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                    MERN Stack & Next.js Developer
                  </p>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 shadow-sm">
                      <Globe
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">
                        Adama, Ethiopia
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 shadow-sm">
                      <Code
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Full-Stack
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 pt-4 sm:pt-5 md:pt-6 lg:pt-8 border-t border-border">
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                  Building modern web applications using MERN Stack and Next.js.
                  Focused on clean architecture and scalable solutions.
                </p>
              </div>
            </article>

            {/* Features highlights - Mobile optimized */}
            <div
              className={cn(isVisible ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-foreground mb-3 sm:mb-4">
                My Expertise
              </h3>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {FEATURE_HIGHLIGHTS.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <MagneticElement key={feature.title} strength={0.1}>
                      <article
                        className={cn(
                          "p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card/50 border border-border shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300",
                          "hover:border-primary hover:scale-[1.02]",
                          "animate-fade-in-up"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                        aria-label={`${feature.title}: ${feature.description}`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-sm sm:shadow-md`}
                            aria-hidden="true"
                          >
                            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-foreground mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                              {feature.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Experience & Education */}
          <div className="space-y-6 sm:space-y-8">
            {/* Tabs - Mobile optimized */}
            <div
              className="flex gap-1 sm:gap-2 p-1 rounded-xl sm:rounded-2xl bg-muted/50 border border-border shadow-md sm:shadow-lg"
              role="tablist"
              aria-label="Experience and education tabs"
            >
              <Button
                onClick={() => handleTabChange("experience")}
                variant={activeTab === "experience" ? "primary" : "ghost"}
                className="flex-1 min-w-0"
                aria-selected={activeTab === "experience"}
                role="tab"
                aria-controls="experience-content"
                id="experience-tab"
                icon={<Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />}
                iconPosition="left"
                size="sm"
              >
                <span className="truncate">Experience</span>
              </Button>
              <Button
                onClick={() => handleTabChange("education")}
                variant={activeTab === "education" ? "primary" : "ghost"}
                className="flex-1 min-w-0"
                aria-selected={activeTab === "education"}
                role="tab"
                aria-controls="education-content"
                id="education-tab"
                icon={<GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />}
                iconPosition="left"
                size="sm"
              >
                <span className="truncate">Education</span>
              </Button>
            </div>

            {/* Tab content */}
            <div className="relative">
              {/* Timeline content - Mobile optimized */}
              <div
                id={`${activeTab}-content`}
                role="tabpanel"
                aria-labelledby={`${activeTab}-tab`}
                className={cn(
                  "space-y-4 sm:space-y-5 md:space-y-6",
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: "300ms" }}
              >
                {timelineData.map((item, index) => (
                  <MagneticElement key={item.id} strength={0.05}>
                    <article
                      className={cn(
                        "relative pl-6 sm:pl-7 md:pl-8 lg:pl-10 pb-4 sm:pb-5 md:pb-6 lg:pb-8 border-l-2 border-primary/40 last:pb-0 group",
                        "animate-fade-in-up"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      itemScope
                      itemType={
                        activeTab === "experience"
                          ? "https://schema.org/Person"
                          : "https://schema.org/EducationalOccupationalCredential"
                      }
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[7px] sm:-left-[8px] md:-left-[9px] top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-primary to-secondary border-2 sm:border-3 md:border-4 border-background shadow-md sm:shadow-lg" />

                      {/* Current indicator */}
                      {"current" in item && item.current && (
                        <div
                          className="absolute -left-2 sm:-left-2.5 md:-left-3 top-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-ping"
                          aria-hidden="true"
                        />
                      )}

                      {/* Card - Mobile optimized */}
                      <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card/50 border border-border shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-sm sm:text-base md:text-lg lg:text-xl font-bold text-foreground mb-1">
                              {"position" in item
                                ? item.position
                                : `${item.degree} in ${item.field}`}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mt-1 sm:mt-2">
                              <TimelineIcon
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-5 lg:w-5 lg:h-5 text-primary flex-shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-primary font-semibold text-xs sm:text-sm md:text-base truncate">
                                {"company" in item
                                  ? item.company
                                  : item.institution}
                              </span>
                              {"current" in item && item.current && (
                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 shadow-sm whitespace-nowrap">
                                  Current
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20 shadow-sm sm:shadow-md mt-1 sm:mt-0 whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>

                        {/* Description */}
                        {"description" in item ? (
                          <ul
                            className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                            aria-label="Responsibilities"
                          >
                            {item.description.map((desc, i) => (
                              <li key={i} className="flex items-start gap-2 sm:gap-3">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0 shadow-sm" />
                                <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                  {desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <>
                            {"grade" in item && item.grade && (
                              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-secondary/10 mb-3 sm:mb-4 md:mb-5 lg:mb-6 shadow-sm sm:shadow-md">
                                <Award
                                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-secondary"
                                  aria-hidden="true"
                                />
                                <span className="text-sm sm:text-base font-semibold text-foreground">
                                  {item.grade}
                                </span>
                              </div>
                            )}
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              Software engineering with modern development
                              methodologies.
                            </p>
                          </>
                        )}

                        {/* Technologies - Mobile optimized */}
                        {"technologies" in item && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-border">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-border hover:border-primary/20 shadow-sm"
                                aria-label={`Technology: ${tech}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </MagneticElement>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
