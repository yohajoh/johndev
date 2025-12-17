"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ChevronRight,
  Sparkles,
  Code2,
  Cpu,
  Zap,
} from "lucide-react";
import { AnimatedMonogramLogo } from "@/components/Logo/MonogramLogo";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import Image from "next/image";
import { TypewriterEffect } from "@/components/UI/TypewriterEffect";
import John from "@/public/john.jpg";

const STATS = [
  { label: "Projects", value: "50+", icon: Code2 },
  { label: "Experience", value: "10+ Years", icon: Cpu },
  { label: "Clients", value: "100+", icon: Zap },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/yohannesbelete",
    label: "GitHub",
    color: "text-gray-800 dark:text-gray-200",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yohannesbelete",
    label: "LinkedIn",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yohannesbelete",
    label: "Twitter",
    color: "text-sky-500 dark:text-sky-400",
  },
  {
    icon: Mail,
    href: "mailto:hello@yohannesbelete.dev",
    label: "Email",
    color: "text-red-500 dark:text-red-400",
  },
];

const TYPING_TEXTS = [
  "Senior Full-Stack Developer",
  "System Architect",
  "DevOps Engineer",
  "Cloud Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [activeStat, setActiveStat] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Spring animations for smoothness
  const springY = useSpring(y, { damping: 30, stiffness: 200 });
  const springScale = useSpring(scale, { damping: 30, stiffness: 200 });

  // Stat rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % STATS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Trigger particle explosion on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
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
  };

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: "backOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20 md:pt-0"
      id="hero"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 noise-texture opacity-10" />

      {/* Animated Background Elements */}
      <FloatingShapes count={15} />
      {showParticles && <ParticleExplosion />}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-secondary/20 via-accent/10 to-transparent blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />

      {/* Content Container */}
      <motion.div
        className="container-wide relative z-10 h-full"
        style={{ y: springY, scale: springScale, rotateX }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[90vh] py-20">
          {/* Left Column - Text Content */}
          <motion.div className="space-y-8 lg:space-y-12" ref={textRef}>
            {/* Welcome Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                <span className="block text-muted-foreground">Hi, I'm</span>
                <span className="block text-gradient-primary mt-2">
                  Yohannes
                </span>
                <span className="block text-gradient-secondary">Belete</span>
              </h1>

              {/* Typewriter Effect */}
              <div className="h-12 md:h-16">
                <TypewriterEffect
                  texts={TYPING_TEXTS}
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold"
                  speed={50}
                  delay={1000}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              I craft exceptional digital experiences with modern technologies.
              Specializing in full-stack development, cloud architecture, and
              performance optimization for scalable applications.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={statCardVariants}
                  whileHover="hover"
                  className={`p-4 rounded-2xl border ${
                    activeStat === index
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card/50 border-border/50"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon
                      className={`w-5 h-5 ${
                        activeStat === index
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      activeStat === index
                        ? "text-gradient-primary"
                        : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <MagneticElement strength={0.2}>
                <motion.button
                  onClick={() => scrollToSection("projects")}
                  className="btn-primary px-8 py-4 text-base md:text-lg group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View My Work</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </MagneticElement>

              <MagneticElement strength={0.2}>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="btn-outline px-8 py-4 text-base md:text-lg group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </motion.a>
              </MagneticElement>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticElement key={social.label} strength={0.3}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-card/50 border border-border/50 ${social.color} hover:bg-primary/5 hover:border-primary/30 transition-all duration-300`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  </MagneticElement>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Photo & Logo */}
          <motion.div className="relative lg:pl-12">
            {/* Main Photo Container */}
            <motion.div
              className="relative mx-auto lg:mx-0 max-w-md lg:max-w-lg"
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setIsHoveringPhoto(true)}
              onHoverEnd={() => setIsHoveringPhoto(false)}
            >
              {/* Photo Frame */}
              <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-card shadow-2xl">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-3xl p-1">
                  {/* Main Photo */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                    {/* Placeholder for actual photo - Replace with your image */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="text-center">
                        <AnimatedMonogramLogo size={200} />
                        {/* <p className="mt-4 text-sm text-muted-foreground">
                          Your professional photo here
                        </p> */}
                        <Image src={John} fill alt="this is the owner photo" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {isHoveringPhoto && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end justify-center pb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.button
                            className="px-6 py-3 bg-white text-primary rounded-xl font-semibold flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection("contact")}
                          >
                            <Mail className="w-4 h-4" />
                            Let's Connect
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-24 h-24"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-full h-full border-2 border-dashed border-primary/30 rounded-full" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 w-20 h-20"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-full h-full border-2 border-dotted border-secondary/30 rounded-full" />
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 right-8 px-4 py-2 bg-card border border-border/50 rounded-xl shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Available
                  </span>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 -left-4 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-xl shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xs font-semibold">Open Source</span>
                </motion.div>
              </div>

              {/* Animated Tech Stack */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "AWS",
                    "Docker",
                  ].map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                        borderColor: "hsl(var(--primary) / 0.3)",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Code Snippets */}
            <motion.div
              className="absolute -top-12 right-0 hidden xl:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
                <div className="flex gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <pre className="text-xs font-mono text-muted-foreground">
                  <code>
                    {`const developer = {\n  name: "Yohannes Belete",\n  role: "Full-Stack Developer",\n  passion: "Building amazing things"\n}`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 group"
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">
            Explore More
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center group-hover:border-primary transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2" />
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
};

// Floating Shapes Background Component
const FloatingShapes = ({ count = 12 }: { count: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = 20 + Math.random() * 40;
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: size,
              height: size,
              background:
                i % 3 === 0
                  ? "radial-gradient(circle, hsl(var(--primary) / 0.1), transparent)"
                  : i % 3 === 1
                  ? "radial-gradient(circle, hsl(var(--secondary) / 0.1), transparent)"
                  : "radial-gradient(circle, hsl(var(--accent) / 0.1), transparent)",
              borderRadius: i % 2 === 0 ? "50%" : "30%",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
    </div>
  );
};

// Particle Explosion Effect
const ParticleExplosion = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 50;
        const distance = 100 + Math.random() * 200;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background:
                i % 3 === 0
                  ? "hsl(var(--primary))"
                  : i % 3 === 1
                  ? "hsl(var(--secondary))"
                  : "hsl(var(--accent))",
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        );
      })}
    </div>
  );
};

export default HeroSection;
