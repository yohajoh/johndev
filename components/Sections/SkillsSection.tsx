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
  Zap,
  Sparkles,
  Cpu,
  Hexagon,
  Menu,
  X,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { SKILL_CATEGORIES, SKILLS_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer
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
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-category-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
  }, []);

  // Get skill level indicator
  const getSkillLevelIndicator = useCallback((level: number) => {
    if (level >= 90)
      return { color: "text-emerald-500", icon: Sparkles, label: "Expert" };
    if (level >= 80)
      return { color: "text-amber-500", icon: Zap, label: "Advanced" };
    if (level >= 70)
      return { color: "text-orange-500", icon: Cpu, label: "Proficient" };
    if (level >= 60)
      return { color: "text-lime-500", icon: CheckCircle, label: "Intermediate" };
    return { color: "text-green-500", icon: CheckCircle, label: "Beginner" };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden bg-background py-8 md:py-16 lg:py-24"
      aria-labelledby="skills-heading"
      role="region"
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(59, 130, 246, 0.05) 2px, rgba(59, 130, 246, 0.05) 4px)
          `,
        }} />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <MagneticElement strength={0.1} className="inline-block">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md sm:rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-primary" aria-hidden="true" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-primary whitespace-nowrap">
                Technical Stack
              </span>
            </div>
          </MagneticElement>

          <h1
            id="skills-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4"
          >
            <span className="relative inline-block">
              Tech
              <span className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
            </span>{" "}
            <span className="text-gradient-primary inline-block">Toolkit</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            A curated collection of technologies I wield to craft exceptional digital experiences
          </p>
        </div>

        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-6">
          <div className="mobile-category-menu">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-foreground"
            >
              <div className="flex items-center gap-3">
                {currentCategory && (
                  <>
                    <currentCategory.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{currentCategory.label}</span>
                  </>
                )}
              </div>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {isMobileMenuOpen && (
              <div className="mt-2 p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                {SKILL_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-white/5 text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Left column - Category selector (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Category selector - Hexagonal design */}
              <div
                className={cn(
                  "p-4 sm:p-6 xl:p-8 rounded-2xl xl:rounded-3xl bg-white/3 backdrop-blur-sm border border-white/10 shadow-lg xl:shadow-2xl",
                  "transition-all duration-700 delay-100",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                )}
              >
                <h2 className="font-heading text-lg xl:text-xl font-bold text-foreground mb-6 xl:mb-8 flex items-center gap-3">
                  <div className="relative">
                    <Hexagon className="w-6 h-6 xl:w-8 xl:h-8 text-primary" aria-hidden="true" />
                    <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm" />
                  </div>
                  <span>Domains</span>
                </h2>

                <div className="space-y-2 xl:space-y-3">
                  {SKILL_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                      <MagneticElement key={category.id} strength={0.1}>
                        <button
                          onClick={() => handleCategoryChange(category.id)}
                          className={cn(
                            "w-full text-left p-3 xl:p-4 2xl:p-5 rounded-xl xl:rounded-2xl transition-all duration-300 group",
                            "relative overflow-hidden",
                            isActive
                              ? "bg-primary/10 border-l-2 xl:border-l-4 border-primary shadow-md"
                              : "bg-white/5 hover:bg-white/10 border-l-2 xl:border-l-4 border-transparent"
                          )}
                        >
                          {/* Animated background */}
                          <div
                            className={cn(
                              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                              isActive ? "opacity-100" : ""
                            )}
                            style={{
                              background: isActive
                                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent)"
                                : "linear-gradient(90deg, rgba(255, 255, 255, 0.05), transparent)",
                            }}
                          />

                          <div className="relative flex items-center gap-3 xl:gap-4">
                            <div
                              className={cn(
                                "w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-lg xl:rounded-xl flex items-center justify-center transition-all duration-300",
                                "relative overflow-hidden shrink-0",
                                isActive
                                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                                  : "bg-white/5 text-muted-foreground group-hover:text-primary"
                              )}
                            >
                              <Icon className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 relative z-10" aria-hidden="true" />
                              {/* Hexagonal pattern overlay */}
                              <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `
                                  linear-gradient(30deg, transparent 45%, #fff 45%, #fff 55%, transparent 55%),
                                  linear-gradient(-30deg, transparent 45%, #fff 45%, #fff 55%, transparent 55%)
                                `,
                                backgroundSize: '12px 12px',
                              }} />
                            </div>

                            <div className="flex-1 text-left min-w-0">
                              <h3 className="font-heading font-semibold text-foreground text-sm xl:text-base mb-0.5 xl:mb-1 truncate">
                                {category.label}
                              </h3>
                              <p className="text-xs xl:text-sm text-muted-foreground line-clamp-2">
                                {category.description}
                              </p>
                            </div>

                            <ChevronRight
                              className={cn(
                                "w-4 h-4 xl:w-5 xl:h-5 transition-all duration-300 shrink-0",
                                isActive
                                  ? "text-primary translate-x-0.5 xl:translate-x-1"
                                  : "text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 xl:group-hover:translate-x-1"
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        </button>
                      </MagneticElement>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills visualization */}
          <div className="lg:col-span-2 lg:pl-0">
            <div
              className={cn(
                "p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/3 backdrop-blur-sm border border-white/10 shadow-lg sm:shadow-2xl",
                "transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              {/* Category header with geometric elements */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        {currentCategory && (
                          <currentCategory.icon
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      {/* Corner accents */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 truncate">
                        {currentCategory?.label}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-primary to-transparent shrink-0" />
                        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 sm:line-clamp-none">
                          {currentCategory?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 w-full sm:w-auto justify-center sm:justify-start">
                    <div className="text-xl sm:text-2xl font-bold text-primary">
                      {avgProficiency}%
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      Avg Proficiency
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills grid - Hexagonal cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {currentSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  const levelInfo = getSkillLevelIndicator(skill.level);
                  const LevelIcon = levelInfo.icon;
                  const isHovered = hoveredSkill === skill.name;

                  return (
                    <MagneticElement key={skill.name} strength={0.05} className="h-full">
                      <div
                        className={cn(
                          "group p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 relative overflow-hidden h-full",
                          "bg-gradient-to-br from-white/5 to-white/2 border border-white/10",
                          "hover:border-primary/30 hover:shadow-xl sm:hover:shadow-2xl active:scale-[0.98] sm:hover:scale-[1.02]",
                          isVisible ? "animate-fade-in-up" : "opacity-0"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `
                              radial-gradient(circle at 20% 80%, ${levelInfo.color.replace('text-', 'rgba(59,130,246,')}0.3) 0%, transparent 50%),
                              repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
                            `,
                          }} />
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 flex-1">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div
                                className={cn(
                                  "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 relative shrink-0",
                                  "bg-gradient-to-br from-white/10 to-white/5",
                                  "group-hover:scale-105 sm:group-hover:scale-110"
                                )}
                              >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                                {/* Skill level indicator ring */}
                                <div
                                  className="absolute -inset-1 border rounded-lg sm:rounded-xl transition-transform duration-300"
                                  style={{
                                    borderColor: levelInfo.color.replace('text-', ''),
                                    opacity: 0.3,
                                  }}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-heading text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1 truncate">
                                  {skill.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                  <div className="flex items-center gap-1">
                                    <Target className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
                                    <span className="text-xs text-muted-foreground truncate">
                                      {skill.experience}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <CheckCircle
                                      className="w-3 h-3 text-secondary flex-shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {skill.projects} projects
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Level indicator - Simple badge */}
                            <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
                              <div className="flex items-center gap-1 sm:justify-end">
                                <LevelIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                                <span className={cn("text-xs sm:text-sm font-medium truncate", levelInfo.color)}>
                                  {levelInfo.label}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground whitespace-nowrap">
                                {skill.level}% proficiency
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3 mt-auto">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </MagneticElement>
                  );
                })}
              </div>

              {/* Legend - Simplified */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Expert</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Advanced</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Proficient</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-lime-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Intermediate</span>
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