"use client";

import { motion } from "framer-motion";
import { AnimatedMonogramLogo } from "@/components/Logo/MonogramLogo";
import { Loader2, Sparkles, Code2, Cpu, Zap } from "lucide-react";

const LOADING_TIPS = [
  "Optimizing performance...",
  "Loading 3D assets...",
  "Compiling components...",
  "Initializing animations...",
  "Setting up cursor effects...",
  "Preparing portfolio...",
];

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0
                ? "bg-primary/40"
                : i % 3 === 1
                ? "bg-secondary/40"
                : "bg-accent/40"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Logo */}
        <div className="relative mb-8">
          <AnimatedMonogramLogo size={120} />

          {/* Rotating Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: 140, height: 140, left: -10, top: -10 }}
          />

          {/* Pulsing Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: 140, height: 140, left: -10, top: -10 }}
          />
        </div>

        {/* Loading Text */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Yohannes <span className="text-gradient-primary">Belete</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Senior Full-Stack Developer & System Architect
          </p>
        </motion.div>

        {/* Loading Progress */}
        <div className="w-64 md:w-80 mx-auto mb-8">
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          <motion.div
            className="flex justify-between mt-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Loading</span>
            <span>Portfolio</span>
          </motion.div>
        </div>

        {/* Loading Tips */}
        <motion.div
          className="h-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="relative h-full">
            {LOADING_TIPS.map((tip, index) => (
              <motion.div
                key={tip}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [20, 0, 0, -20],
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "linear",
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: Code2, label: "React", color: "text-blue-500" },
            {
              icon: Cpu,
              label: "Next.js",
              color: "text-gray-800 dark:text-white",
            },
            { icon: Zap, label: "TypeScript", color: "text-blue-600" },
          ].map((tech) => (
            <motion.div
              key={tech.label}
              className="flex flex-col items-center"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center ${tech.color}`}
              >
                <tech.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground mt-2">
                {tech.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Percentage */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
            <span className="text-xs text-muted-foreground">
              Preparing your experience...
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  );
};

export default LoadingScreen;
