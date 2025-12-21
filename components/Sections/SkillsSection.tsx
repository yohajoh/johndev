/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Layers,
  Brain,
  ChevronRight,
  Award,
  Star,
  Target,
  CheckCircle,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { SKILL_CATEGORIES, SKILLS_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
    const total = currentSkills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(total / currentSkills.length);
  }, [currentSkills]);

  // Event handlers
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setSkillLevels({});
    setIsAnimating(true);
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
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-gray-900/20 to-background sm:px-4 md:px-6"
      aria-labelledby="skills-heading"
      role="region"
    >
      {/* Professional background - optimized for performance */}

      <div className="container-wide relative z-10 mx-auto max-w-7xl">
        {/* Section header with text shadow */}
        <div
          className={cn(
            "text-center mb-6 md:mb-10 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <MagneticElement strength={0.1}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 mb-4 shadow-lg shadow-emerald-500/5"
              role="note"
              aria-label="Technical Expertise Section"
            >
              <Brain
                className="w-3 h-3 md:w-4 md:h-4 text-emerald-500"
                aria-hidden="true"
              />
              <span className="text-xs md:text-sm font-medium text-emerald-500">
                Technical Expertise
              </span>
            </div>
          </MagneticElement>

          <h1
            id="skills-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.3)]"
          >
            Skills &{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent relative inline-block [text-shadow:0_2px_4px_rgba(16,185,129,0.1)] dark:[text-shadow:0_2px_8px_rgba(16,185,129,0.2)]">
              Technologies
              <span className="sr-only">Expertise</span>
              <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
            </span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.2)] px-2">
            A comprehensive toolkit refined over years of building production
            systems at scale, combining technical expertise with practical
            experience across the entire stack.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left column - Category selector & overview */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 space-y-4 md:space-y-6">
              {/* Category selector with shadow */}
              <div
                className={cn(
                  "p-3 md:p-4 rounded-xl md:rounded-2xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80 shadow-xl shadow-black/5 dark:shadow-black/20",
                  "transition-all duration-700 ease-out delay-100",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                )}
                role="tablist"
                aria-label="Skill categories"
              >
                <h2 className="font-heading text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shadow-inner shadow-emerald-500/10">
                    <Layers
                      className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm md:text-base">Categories</span>
                </h2>

                <div className="space-y-2" role="tablist">
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
                            "w-full text-left h-auto p-2 md:p-3 rounded-lg md:rounded-xl cursor-pointer transition-all duration-300 shadow-sm shadow-black/5 dark:shadow-black/10",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-background focus:shadow-lg focus:shadow-emerald-500/20",
                            isActive
                              ? "bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                              : "bg-white/5 hover:bg-white/10 border border-transparent hover:shadow-md hover:shadow-black/10 dark:hover:shadow-black/20"
                          )}
                        >
                          <div className="flex items-center gap-2 md:gap-3 w-full">
                            <div
                              className={cn(
                                "w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-inner",
                                isActive
                                  ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg shadow-emerald-500/30"
                                  : "bg-white/5 text-muted-foreground group-hover:text-emerald-500 shadow-sm"
                              )}
                            >
                              <Icon
                                className="w-4 h-4 md:w-4.5 md:h-4.5"
                                aria-hidden="true"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3
                                className={cn(
                                  "font-heading font-semibold truncate text-sm [text-shadow:0_1px_1px_rgba(0,0,0,0.1)]",
                                  isActive
                                    ? "text-emerald-500"
                                    : "text-foreground"
                                )}
                              >
                                {category.label}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate mt-0.5 hidden md:block">
                                {category.description}
                              </p>
                            </div>

                            <ChevronRight
                              className={cn(
                                "w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 flex-shrink-0",
                                isActive
                                  ? "text-emerald-500 rotate-90"
                                  : "text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5"
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
                  "p-3 md:p-4 rounded-xl md:rounded-2xl gradient-border backdrop-blur-sm bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 shadow-xl shadow-emerald-500/5 dark:shadow-black/20",
                  "transition-all duration-700 ease-out delay-200",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                )}
                role="complementary"
                aria-label="Proficiency overview"
              >
                {/* Average proficiency */}
                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent mb-1 [text-shadow:0_2px_4px_rgba(16,185,129,0.2)] dark:[text-shadow:0_2px_8px_rgba(16,185,129,0.3)]">
                      {avgProficiency}%
                    </div>
                    <div className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                      Avg. Proficiency in {currentCategory?.label}
                    </div>

                    {/* Progress ring - FIXED */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mt-3 md:mt-4">
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
                          className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 drop-shadow-md"
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
          <div className="lg:col-span-2 mt-4 md:mt-0">
            {/* Skills card with shadow */}
            <div
              id={`${activeCategory}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeCategory}-tab`}
              className={cn(
                "p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80 shadow-xl shadow-black/5 dark:shadow-black/20",
                "transition-all duration-700 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              {/* Category header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-3 mb-4 md:mb-6">
                <div>
                  <div className="flex items-center gap-2 md:gap-3 mb-1">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-r from-emerald-500/10 to-amber-500/10 flex items-center justify-center shadow-inner shadow-emerald-500/10">
                      {currentCategory && (
                        <currentCategory.icon
                          className="w-4 h-4 md:w-4.5 md:h-4.5 text-emerald-500 drop-shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                        {currentCategory?.label} Skills
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)] hidden sm:block">
                        {currentCategory?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-left sm:self-start">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(16,185,129,0.2)]">
                    {avgProficiency}%
                  </div>
                  <div className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    Average Proficiency
                  </div>
                  <div className="flex items-center gap-1 mt-1 justify-end sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-2.5 h-2.5 md:w-3 md:h-3 drop-shadow-sm",
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
              <div
                className="space-y-3 md:space-y-4"
                role="list"
                aria-label="Skill list"
              >
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
                        "group p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 shadow-sm shadow-black/5 dark:shadow-black/10",
                        "hover:bg-white/5 hover:scale-[1.01] hover:shadow-md hover:shadow-black/10 dark:hover:shadow-black/20",
                        "focus-within:ring-1 focus-within:ring-emerald-500/50 focus-within:ring-offset-1 focus-within:ring-offset-background focus-within:outline-none focus-within:shadow-md focus-within:shadow-emerald-500/10"
                      )}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      tabIndex={0}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                        <div className="flex items-center gap-2 md:gap-3 w-full">
                          <div
                            className={cn(
                              "w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-all duration-300 shadow-inner flex-shrink-0",
                              isHovered
                                ? `bg-gradient-to-r ${skillGradient} text-white shadow-md shadow-emerald-500/30`
                                : "bg-white/5 text-muted-foreground shadow-sm"
                            )}
                          >
                            <Icon
                              className="w-4 h-4 md:w-4.5 md:h-4.5 drop-shadow-sm"
                              aria-hidden="true"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-sm md:text-base font-semibold text-foreground mb-0.5 [text-shadow:0_1px_1px_rgba(0,0,0,0.1)]">
                              {skill.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                              <div className="flex items-center gap-1">
                                <Target
                                  className="w-2.5 h-2.5 text-emerald-500 drop-shadow-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                                  {skill.experience}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle
                                  className="w-2.5 h-2.5 text-amber-500 drop-shadow-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                                  {skill.projects} projects
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:text-left sm:self-start">
                          <div
                            className={cn(
                              "text-lg md:text-xl font-bold transition-colors duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",
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
                      <p className="text-xs text-muted-foreground mb-2 md:mb-3 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)] line-clamp-2">
                        {skill.description}
                      </p>

                      {/* Skill bar - FIXED: Now properly animates */}
                      <div className="relative h-2 md:h-2.5 rounded-full bg-white/5 overflow-hidden shadow-inner">
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
                            "h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out shadow-sm"
                          )}
                          style={{
                            width: `${isVisible ? level : 0}%`,
                            transitionDelay: `${index * 100 + 500}ms`,
                            background: skillColor,
                            boxShadow: `0 1px 4px ${skillColor}40`,
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
                          className="absolute inset-0 flex justify-between px-0.5"
                          aria-hidden="true"
                        >
                          {[0, 25, 50, 75, 100].map((marker) => (
                            <div
                              key={marker}
                              className="w-px h-2 md:h-2.5 bg-white/10 shadow-sm"
                              style={{ marginLeft: `${marker}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Level labels - Minimal */}
                      <div className="flex justify-between text-[9px] xs:text-xs text-muted-foreground mt-1 px-0.5 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                        <span className="hidden xs:inline">Beginner</span>
                        <span className="xs:hidden">B</span>
                        <span className="hidden md:inline">Intermediate</span>
                        <span className="md:hidden">I</span>
                        <span>Adv</span>
                        <span className="hidden xs:inline">Expert</span>
                        <span className="xs:hidden">E</span>
                        <span className="hidden md:inline">Master</span>
                        <span className="md:hidden">M</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend with shadow - Minimal */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/10">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    <span className="hidden sm:inline">Expert </span>(90+)
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm shadow-amber-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    <span className="hidden sm:inline">Advanced </span>(80+)
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm shadow-orange-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    <span className="hidden sm:inline">Proficient </span>(70+)
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-lime-500 to-lime-600 shadow-sm shadow-lime-500/20"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]">
                    <span className="hidden sm:inline">Intermediate </span>(60+)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
