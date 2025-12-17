"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  MapPin,
  Award,
  Users,
  Code2,
  Rocket,
  Target,
  Brain,
  Download,
  ChevronRight,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import Image from "next/image";

const TIMELINE = [
  {
    year: "2024",
    title: "Senior Software Architect",
    company: "TechVision Inc.",
    description:
      "Leading architecture decisions for enterprise-scale applications.",
    achievements: [
      "Reduced latency by 60%",
      "Scaled to 10M+ users",
      "Saved $2M in infrastructure",
    ],
    icon: Rocket,
    color: "primary",
  },
  {
    year: "2022",
    title: "Lead Full-Stack Developer",
    company: "Digital Solutions Co.",
    description: "Spearheaded microservices architecture and team leadership.",
    achievements: [
      "Built 50+ microservices",
      "Mentored 15+ developers",
      "Improved CI/CD pipeline",
    ],
    icon: Users,
    color: "secondary",
  },
  {
    year: "2020",
    title: "Senior Software Engineer",
    company: "StartupX",
    description: "Built core platform features from scratch to scale.",
    achievements: [
      "0 to 100K users",
      "99.9% uptime",
      "Implemented real-time features",
    ],
    icon: Code2,
    color: "accent",
  },
  {
    year: "2018",
    title: "Full-Stack Developer",
    company: "WebCraft Agency",
    description: "Developed responsive web applications for various clients.",
    achievements: [
      "30+ projects",
      "Improved performance by 70%",
      "Client satisfaction 95%",
    ],
    icon: Target,
    color: "primary",
  },
];

const SKILLS_HIGHLIGHTS = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: Code2,
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"],
    icon: Rocket,
  },
  {
    category: "DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
    icon: Target,
  },
  {
    category: "Soft Skills",
    skills: [
      "Leadership",
      "Problem Solving",
      "Communication",
      "Mentoring",
      "Agile",
    ],
    icon: Brain,
  },
];

const PERSONAL_INTERESTS = [
  {
    name: "Open Source",
    description: "Contributing to meaningful projects",
    icon: Code2,
  },
  {
    name: "Mentoring",
    description: "Helping junior developers grow",
    icon: Users,
  },
  {
    name: "Photography",
    description: "Capturing moments and landscapes",
    icon: Award,
  },
  {
    name: "Hiking",
    description: "Exploring nature and staying active",
    icon: MapPin,
  },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div
        className="container-wide relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="w-4 h-4" />
            My Journey
          </motion.span>
          <h2 className="font-heading text-foreground mb-6">
            About <span className="text-gradient-primary">Me</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A decade-long journey from curious coder to systems architect,
            driven by engineering excellence and passion for solving complex
            problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Timeline */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={item.year}
                    custom={index}
                    variants={timelineVariants}
                    className="relative pl-20"
                    onMouseEnter={() => setActiveTimeline(index)}
                    onMouseLeave={() => setActiveTimeline(0)}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className={`absolute left-6 w-6 h-6 rounded-full border-4 ${
                        activeTimeline === index
                          ? "bg-primary border-primary shadow-glow-primary"
                          : "bg-background border-primary/50"
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.3 }}
                      animate={{
                        scale: activeTimeline === index ? 1.2 : 1,
                      }}
                    >
                      {activeTimeline === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/20"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Timeline Content */}
                    <motion.div
                      className={`p-6 rounded-2xl border transition-all duration-300 ${
                        activeTimeline === index
                          ? "bg-card border-primary/30 shadow-lg"
                          : "bg-card/50 border-border/50 hover:border-primary/20"
                      }`}
                      whileHover={{ x: 10 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activeTimeline === index
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item.year}
                          </span>
                          <h3 className="font-heading text-xl text-foreground mb-1 mt-3">
                            {item.title}
                          </h3>
                          <p className="font-body text-sm text-primary mb-2">
                            {item.company}
                          </p>
                        </div>
                        <item.icon
                          className={`w-8 h-8 ${
                            activeTimeline === index
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>

                      <p className="font-body text-sm text-muted-foreground mb-4">
                        {item.description}
                      </p>

                      <div className="space-y-2">
                        {item.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-2 text-xs"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: activeTimeline === index ? 1 : 0.5,
                              x: activeTimeline === index ? 0 : -10,
                            }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                activeTimeline === index
                                  ? "bg-primary"
                                  : "bg-muted-foreground"
                              }`}
                            />
                            <span
                              className={
                                activeTimeline === index
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills & Personal Info */}
          <motion.div className="space-y-12" variants={itemVariants}>
            {/* Personal Card */}
            <motion.div
              className="card-hover p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <div className="w-20 h-20 rounded-xl bg-background flex items-center justify-center">
                      <Award className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                    10+
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-foreground mb-2">
                    Yohannes Belete
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      10+ Years Exp
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Passionate about building scalable systems, mentoring
                    developers, and contributing to open source. Always learning
                    and pushing boundaries.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                {[
                  { label: "Projects", value: "50+", color: "primary" },
                  { label: "Clients", value: "100+", color: "secondary" },
                  { label: "Mentored", value: "15+", color: "accent" },
                  { label: "Uptime", value: "99.99%", color: "primary" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-muted/30"
                  >
                    <div
                      className={`font-heading text-2xl font-bold text-${stat.color} mb-1`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills Categories */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Core Competencies
              </h4>

              <div className="flex flex-wrap gap-2 mb-6">
                {SKILLS_HIGHLIGHTS.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveSkillCategory(category.category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSkillCategory === category.category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SKILLS_HIGHLIGHTS.find(
                  (cat) => cat.category === activeSkillCategory
                )?.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    className="p-3 rounded-xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-medium text-foreground">{skill}</span>
                    <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${80 + Math.random() * 20}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Interests */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                Beyond Coding
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {PERSONAL_INTERESTS.map((interest, i) => (
                  <MagneticElement key={interest.name} strength={0.1}>
                    <motion.div
                      className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <interest.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h5 className="font-heading text-base text-foreground">
                          {interest.name}
                        </h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interest.description}
                      </p>
                    </motion.div>
                  </MagneticElement>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/50"
            >
              <MagneticElement strength={0.2}>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl text-primary font-semibold hover:bg-primary/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Full Resume</span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              </MagneticElement>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 rounded-full bg-primary/5 blur-2xl animate-float" />
      <div
        className="absolute bottom-1/3 right-0 w-40 h-40 rounded-full bg-secondary/5 blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      />
    </section>
  );
};

export default AboutSection;
