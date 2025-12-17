"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Zap, Database, Cloud, Globe } from "lucide-react";

const FLOATING_ELEMENTS = [
  {
    id: 1,
    icon: Code2,
    color: "text-blue-500",
    size: "w-12 h-12",
    top: "10%",
    left: "15%",
    delay: 0,
    duration: 20,
  },
  {
    id: 2,
    icon: Cpu,
    color: "text-purple-500",
    size: "w-10 h-10",
    top: "20%",
    left: "85%",
    delay: 2,
    duration: 25,
  },
  {
    id: 3,
    icon: Zap,
    color: "text-yellow-500",
    size: "w-14 h-14",
    top: "60%",
    left: "10%",
    delay: 4,
    duration: 30,
  },
  {
    id: 4,
    icon: Database,
    color: "text-green-500",
    size: "w-8 h-8",
    top: "70%",
    left: "90%",
    delay: 6,
    duration: 18,
  },
  {
    id: 5,
    icon: Cloud,
    color: "text-sky-500",
    size: "w-16 h-16",
    top: "30%",
    left: "5%",
    delay: 8,
    duration: 22,
  },
  {
    id: 6,
    icon: Globe,
    color: "text-red-500",
    size: "w-9 h-9",
    top: "80%",
    left: "70%",
    delay: 10,
    duration: 28,
  },
];

export const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {FLOATING_ELEMENTS.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} rounded-2xl bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm border border-white/10 dark:border-gray-800/10 flex items-center justify-center ${element.color}`}
          style={{
            top: element.top,
            left: element.left,
          }}
          animate={{
            y: [0, -50, 0, 50, 0],
            x: [0, 30, 0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "linear",
            delay: element.delay,
          }}
        >
          <element.icon className="w-1/2 h-1/2" />
        </motion.div>
      ))}

      {/* Geometric Shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute ${
            i % 4 === 0
              ? "w-24 h-1 bg-gradient-to-r from-primary/30 to-transparent"
              : i % 4 === 1
              ? "w-1 h-24 bg-gradient-to-b from-secondary/30 to-transparent"
              : i % 4 === 2
              ? "w-16 h-16 border-2 border-accent/30 rotate-45"
              : "w-20 h-20 rounded-full border-2 border-primary/20"
          }`}
          style={{
            top: `${15 + i * 10}%`,
            left: `${20 + i * 8}%`,
          }}
          animate={{
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
