/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Code2,
  Database,
  Cloud,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Server,
  Lock,
  Zap,
  GitBranch,
  Box,
  Brain,
  Palette,
  Smartphone,
  LineChart,
  Shield,
  Rocket,
  Users,
  MessageSquare,
  ChevronRight,
  Award,
  Star,
  Target,
  CheckCircle,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button } from "@/components/UI/Button";
import {
  SKILL_CATEGORIES,
  SKILLS_DATA,
  FEATURE_HIGHLIGHTS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// Professional background component with performance optimizations
const ProfessionalBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Memoize static background elements to prevent re-renders
  const staticBackground = useMemo(
    () => (
      <>
        {/* Optimized gradient background using CSS only - green/gold/orange theme */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(22, 163, 74, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.05) 0%, transparent 70%),
              linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(3, 7, 18, 0.95) 100%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Subtle grid pattern using CSS gradients (lightweight) */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "center center",
          }}
          aria-hidden="true"
        />

        {/* Fixed corner accents - green/gold theme */}
        <div className="absolute top-0 left-0 w-64 h-64">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl" />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent blur-3xl" />
        </div>

        {/* Dark overlay for bottom section in dark mode */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent dark:from-gray-950 dark:via-gray-950/95 dark:to-transparent" />
      </>
    ),
    []
  );

  // Minimal floating elements with reduced count
  const floatingElements = useMemo(
    () => (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`floating-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${15 + i * 20}%`,
              top: `${20 + ((i * 15) % 70)}%`,
              background: `radial-gradient(circle, rgba(${22 + i * 10}, ${
                163 + i * 5
              }, ${74 + i * 10}, 0.05), transparent 70%)`,
              animation: `float ${15 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </>
    ),
    []
  );

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {staticBackground}
      {floatingElements}

      {/* Subtle animated orbs with reduced movement */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96">
        <div className="absolute inset-0 animate-pulse-slow opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/5 to-transparent rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96">
        <div
          className="absolute inset-0 animate-pulse-slow opacity-10"
          style={{ animationDelay: "1s" }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-amber-500/5 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number>(0);

  // Intersection Observer with proper cleanup
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    observerRef.current.observe(currentRef);

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Optimized animation with requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Optimized easing function
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      setAnimationProgress(easeOutCubic(progress));

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

  // Animate skill levels with proper timing
  useEffect(() => {
    if (!isVisible) return;

    const skills =
      SKILLS_DATA[activeCategory as keyof typeof SKILLS_DATA] || [];
    const timeoutIds: NodeJS.Timeout[] = [];

    // Reset levels
    setSkillLevels({});

    // Set animation state
    setIsAnimating(true);

    skills.forEach((skill, index) => {
      const timeoutId = setTimeout(() => {
        setSkillLevels((prev) => ({
          ...prev,
          [skill.name]: skill.level,
        }));

        // If this is the last skill, mark animation as complete
        if (index === skills.length - 1) {
          setTimeout(() => setIsAnimating(false), 100);
        }
      }, index * 150); // Increased delay for better visibility

      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
      setIsAnimating(false);
    };
  }, [activeCategory, isVisible]);

  // Memoized computations
  const currentSkills = useMemo(
    () => SKILLS_DATA[activeCategory as keyof typeof SKILLS_DATA] || [],
    [activeCategory]
  );

  const currentCategory = useMemo(
    () => SKILL_CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const avgProficiency = useMemo(() => {
    if (currentSkills.length === 0) return 0;
    const total = currentSkills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(total / currentSkills.length);
  }, [currentSkills]);

  // Event handlers
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setSkillLevels({});
    setIsAnimating(true);
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Accessibility: Add keyboard navigation for categories
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, categoryId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCategoryChange(categoryId);
      }
    },
    [handleCategoryChange]
  );

  // Helper function to get skill color based on level (green/amber/orange theme)
  const getSkillColor = useCallback((level: number) => {
    if (level >= 90) return "#10b981"; // Emerald-500
    if (level >= 80) return "#f59e0b"; // Amber-500
    if (level >= 70) return "#f97316"; // Orange-500
    if (level >= 60) return "#84cc16"; // Lime-500
    return "#22c55e"; // Green-500 as default
  }, []);

  // Helper function to get gradient based on level
  const getSkillGradient = useCallback((level: number) => {
    if (level >= 90) return "from-emerald-500 to-emerald-600";
    if (level >= 80) return "from-amber-500 to-amber-600";
    if (level >= 70) return "from-orange-500 to-orange-600";
    if (level >= 60) return "from-lime-500 to-lime-600";
    return "from-green-500 to-green-600";
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="skills-heading"
      role="region"
    >
      {/* Professional background - optimized for performance */}
      <ProfessionalBackground />

      <div className="container-wide relative z-10">
        {/* Section header with text shadow */}
        <div
          className={cn(
            "text-center mb-16 md:mb-20 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <MagneticElement strength={0.1}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 mb-6 shadow-lg shadow-emerald-500/5"
              role="note"
              aria-label="Technical Expertise Section"
            >
              <Brain className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-medium text-emerald-500">
                Technical Expertise
              </span>
            </div>
          </MagneticElement>

          <h1
            id="skills-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.3)]"
          >
            Skills &{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent relative inline-block [text-shadow:0_2px_4px_rgba(16,185,129,0.1)] dark:[text-shadow:0_2px_8px_rgba(16,185,129,0.2)]">
              Technologies
              <span className="sr-only">Expertise</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.2)]">
            A comprehensive toolkit refined over years of building production
            systems at scale, combining technical expertise with practical
            experience across the entire stack.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column - Category selector & overview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Category selector with shadow */}
              <div
                className={cn(
                  "p-6 rounded-3xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80 shadow-xl shadow-black/5 dark:shadow-black/20",
                  "transition-all duration-700 ease-out delay-100",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                )}
                role="tablist"
                aria-label="Skill categories"
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-inner shadow-emerald-500/10">
                    <Layers
                      className="w-5 h-5 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                  Categories
                </h2>

                <div className="space-y-3" role="tablist">
                  {SKILL_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                      <MagneticElement key={category.id} strength={0.1}>
                        <div
                          role="tab"
                          tabIndex={0}
                          aria-selected={isActive}
                          aria-controls={`${category.id}-panel`}
                          id={`${category.id}-tab`}
                          onClick={() => handleCategoryChange(category.id)}
                          onKeyDown={(e) => handleKeyDown(e, category.id)}
                          className={cn(
                            "w-full text-left h-auto p-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm shadow-black/5 dark:shadow-black/10",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-background focus:shadow-lg focus:shadow-emerald-500/20",
                            isActive
                              ? "bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                              : "bg-white/5 hover:bg-white/10 border border-transparent hover:shadow-md hover:shadow-black/10 dark:hover:shadow-black/20"
                          )}
                        >
                          <div className="flex items-center gap-4 w-full">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-inner",
                                isActive
                                  ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg shadow-emerald-500/30"
                                  : "bg-white/5 text-muted-foreground group-hover:text-emerald-500 shadow-sm"
                              )}
                            >
                              <Icon className="w-6 h-6" aria-hidden="true" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3
                                className={cn(
                                  "font-heading font-semibold truncate [text-shadow:0_1px_1px_rgba(0,0,0,0.1)]",
                                  isActive
                                    ? "text-emerald-500"
                                    : "text-foreground"
                                )}
                              >
                                {category.label}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate mt-1">
                                {category.description}
                              </p>
                            </div>

                            <ChevronRight
                              className={cn(
                                "w-5 h-5 transition-transform duration-300 flex-shrink-0",
                                isActive
                                  ? "text-emerald-500 rotate-90"
                                  : "text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1"
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </MagneticElement>
                    );
                  })}
                </div>
              </div>

              {/* Quick overview with shadow */}
              <div
                className={cn(
                  "p-6 rounded-3xl gradient-border backdrop-blur-sm bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 shadow-xl shadow-emerald-500/5 dark:shadow-black/20",
                  "transition-all duration-700 ease-out delay-200",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                )}
                role="complementary"
                aria-label="Proficiency overview"
              >
                {/* Average proficiency */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent mb-2 [text-shadow:0_2px_4px_rgba(16,185,129,0.2)] dark:[text-shadow:0_2px_8px_rgba(16,185,129,0.3)]">
                      {avgProficiency}%
                    </div>
                    <div className="text-sm text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                      Avg. Proficiency in {currentCategory?.label}
                    </div>

                    {/* Progress ring - FIXED */}
                    <div className="relative w-32 h-32 mx-auto mt-6">
                      <svg
                        className="w-full h-full drop-shadow-lg"
                        viewBox="0 0 100 100"
                        role="img"
                        aria-label={`Average proficiency: ${avgProficiency}% in ${currentCategory?.label}`}
                      >
                        <title>Average proficiency: {avgProficiency}%</title>
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        {/* Progress circle - FIXED: Proper animation */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          strokeDashoffset={
                            283 - (283 * (isVisible ? avgProficiency : 0)) / 100
                          }
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-1000 ease-out drop-shadow-md"
                          style={{
                            transitionDelay: "300ms",
                            filter:
                              "drop-shadow(0 2px 3px rgba(16, 185, 129, 0.3))",
                          }}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#10b981" />{" "}
                            {/* Emerald-500 */}
                            <stop offset="100%" stopColor="#f59e0b" />{" "}
                            {/* Amber-500 */}
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Award
                          className="w-8 h-8 text-emerald-500 drop-shadow-md"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills visualization */}
          <div className="lg:col-span-2">
            {/* Skills card with shadow */}
            <div
              id={`${activeCategory}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeCategory}-tab`}
              className={cn(
                "p-6 md:p-8 rounded-3xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80 shadow-xl shadow-black/5 dark:shadow-black/20",
                "transition-all duration-700 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              {/* Category header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 flex items-center justify-center shadow-inner shadow-emerald-500/10">
                      {currentCategory && (
                        <currentCategory.icon
                          className="w-6 h-6 text-emerald-500 drop-shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                        {currentCategory?.label} Skills
                      </h3>
                      <p className="text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                        {currentCategory?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(16,185,129,0.2)]">
                    {avgProficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Average Proficiency
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4 drop-shadow-sm",
                          i < Math.floor(avgProficiency / 20)
                            ? "fill-amber-500 text-amber-500 drop-shadow-md"
                            : "text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills grid */}
              <div className="space-y-6" role="list" aria-label="Skill list">
                {currentSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  const level = skillLevels[skill.name] || 0;
                  const isHovered = hoveredSkill === skill.name;
                  const skillColor = getSkillColor(level);
                  const skillGradient = getSkillGradient(level);

                  return (
                    <div
                      key={skill.name}
                      role="listitem"
                      className={cn(
                        "group p-4 rounded-2xl transition-all duration-300 shadow-sm shadow-black/5 dark:shadow-black/10",
                        "hover:bg-white/5 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/20",
                        "focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:outline-none focus-within:shadow-xl focus-within:shadow-emerald-500/10"
                      )}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner",
                              isHovered
                                ? `bg-gradient-to-r ${skillGradient} text-white shadow-lg shadow-emerald-500/30`
                                : "bg-white/5 text-muted-foreground shadow-sm"
                            )}
                          >
                            <Icon
                              className="w-6 h-6 drop-shadow-sm"
                              aria-hidden="true"
                            />
                          </div>

                          <div>
                            <h4 className="font-heading text-lg font-semibold text-foreground mb-1 [text-shadow:0_1px_1px_rgba(0,0,0,0.1)]">
                              {skill.name}
                            </h4>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Target
                                  className="w-3 h-3 text-emerald-500 drop-shadow-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                                  {skill.experience}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  className="w-3 h-3 text-amber-500 drop-shadow-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                                  {skill.projects} projects
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={cn(
                              "text-2xl font-bold transition-colors duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",
                              isHovered ? "text-emerald-500" : "text-foreground"
                            )}
                          >
                            {level}%
                          </div>
                          <div className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                            Proficiency
                          </div>
                        </div>
                      </div>

                      {/* Skill description */}
                      <p className="text-sm text-muted-foreground mb-4 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                        {skill.description}
                      </p>

                      {/* Skill bar - FIXED: Now properly animates */}
                      <div className="relative h-3 rounded-full bg-white/5 overflow-hidden shadow-inner">
                        {/* Animated background */}
                        <div
                          className="absolute inset-0 opacity-20 transition-all duration-1000 ease-out"
                          style={{
                            background: skillColor,
                            width: isVisible ? "100%" : "0%",
                            transitionDelay: `${index * 100 + 500}ms`,
                          }}
                          aria-hidden="true"
                        />

                        {/* Progress bar - FIXED: Proper width animation */}
                        <div
                          className={cn(
                            "h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out shadow-md"
                          )}
                          style={{
                            width: `${isVisible ? level : 0}%`,
                            transitionDelay: `${index * 100 + 500}ms`,
                            background: skillColor,
                            boxShadow: `0 2px 8px ${skillColor}40`,
                          }}
                          role="progressbar"
                          aria-valuenow={level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency: ${level}%`}
                        >
                          {/* Shimmer effect */}
                          {isHovered && (
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        {/* Level markers */}
                        <div
                          className="absolute inset-0 flex justify-between px-1"
                          aria-hidden="true"
                        >
                          {[0, 25, 50, 75, 100].map((marker) => (
                            <div
                              key={marker}
                              className="w-px h-3 bg-white/10 shadow-sm"
                              style={{ marginLeft: `${marker}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Level labels */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                        <span>Master</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend with shadow */}
              <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Expert (90-100%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm shadow-amber-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Advanced (80-89%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm shadow-orange-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Proficient (70-79%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-lime-500 to-lime-600 shadow-sm shadow-lime-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Intermediate (60-69%)
                  </span>
                </div>
              </div>
            </div>

            {/* Skill highlights with shadows */}
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",
                "transition-all duration-700 ease-out delay-400",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              role="complementary"
              aria-label="Skill highlights"
            >
              {FEATURE_HIGHLIGHTS.slice(0, 3).map((highlight, index) => {
                const Icon = highlight.icon;
                // Map gradients to green/amber theme
                const gradientMap: Record<string, string> = {
                  "from-primary to-secondary": "from-emerald-500 to-amber-500",
                  "from-secondary to-accent": "from-amber-500 to-orange-500",
                  "from-accent to-primary": "from-orange-500 to-emerald-500",
                };
                const gradient =
                  gradientMap[highlight.gradient] ||
                  "from-emerald-500 to-amber-500";

                return (
                  <MagneticElement key={highlight.title} strength={0.1}>
                    <div
                      className={cn(
                        "p-6 rounded-2xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80 shadow-lg shadow-black/5 dark:shadow-black/15",
                        "hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10",
                        "focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:outline-none focus-within:shadow-xl focus-within:shadow-emerald-500/10"
                      )}
                      style={{ transitionDelay: `${index * 100 + 400}ms` }}
                      tabIndex={0}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20`}
                      >
                        <Icon
                          className="w-6 h-6 text-white drop-shadow-md"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                        {highlight.description}
                      </p>

                      {/* Progress indicator - FIXED */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                            Mastery
                          </span>
                          <span className="text-emerald-500 [text-shadow:0_1px_2px_rgba(16,185,129,0.2)]">
                            95%
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-white/5 overflow-hidden shadow-inner">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-1000 ease-out shadow-md shadow-emerald-500/20"
                            style={{
                              width: isVisible ? "95%" : "0%",
                              transitionDelay: `${index * 100 + 600}ms`,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </MagneticElement>
                );
              })}
            </div>

            {/* Additional info with shadow */}
            <div
              className={cn(
                "mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/5 via-transparent to-amber-500/5 border border-white/10 shadow-lg shadow-emerald-500/5 dark:shadow-black/20",
                "transition-all duration-700 ease-out delay-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              role="contentinfo"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                    Continuous Learning
                  </h4>
                  <p className="text-sm text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    I dedicate 10+ hours weekly to learning new technologies,
                    contributing to open source, and staying updated with
                    industry trends.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                    Certifications
                  </h4>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Certifications"
                  >
                    {[
                      "AWS Solutions Architect",
                      "Google Cloud Professional",
                      "React Advanced",
                      "Node.js Certified",
                    ].map((cert) => (
                      <span
                        key={cert}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-emerald-500/10"
                        role="listitem"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action with shadow */}
        <div
          className={cn(
            "mt-16 text-center",
            "transition-all duration-700 ease-out delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Button
            onClick={scrollToContact}
            variant="primary"
            size="lg"
            icon={
              <Rocket
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 drop-shadow-md"
                aria-hidden="true"
              />
            }
            iconPosition="left"
            className="group bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
            aria-label="Contact me for development projects"
          >
            Need a Skilled Developer?
            <span className="sr-only">Contact me</span>
            <div
              className="w-2 h-2 rounded-full bg-white/50 animate-pulse ml-2 drop-shadow-md"
              aria-hidden="true"
            />
          </Button>

          <p className="text-sm text-muted-foreground mt-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
            Let&#39;s discuss how my skills can contribute to your project&#39;s
            success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
