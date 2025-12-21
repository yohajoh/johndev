/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface MonogramLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "ornate";
}

const MonogramLogo = ({
  size = 64,
  animated = true,
  className = "",
  variant = "default",
}: MonogramLogoProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get colors based on theme
  const colors = {
    primary: theme === "dark" ? "#3b82f6" : "#2563eb",
    secondary: theme === "dark" ? "#f59e0b" : "#d97706",
    accent: theme === "dark" ? "#10b981" : "#059669",
    background: theme === "dark" ? "#1e293b" : "#f8fafc",
  };

  if (!mounted) {
    return (
      <div
        className={`animate-pulse bg-muted rounded-lg ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Outer Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.primary}20 0%, transparent 70%)`,
        }}
        // variants={glowVariants}
        initial="hidden"
        animate={animated ? "visible" : "hidden"}
      />

      {/* Main Logo Container */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        // variants={containerVariants}
        initial={animated ? "hidden" : "visible"}
        animate={isHovering ? "hover" : "visible"}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill={`url(#bg-gradient-${variant})`}
          // variants={fillVariants}
        />

        {/* Y Letter - Stylized */}
        <motion.path
          d="M30 25 L50 50 L70 25"
          stroke={colors.primary}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          custom={0}
          // variants={pathVariants}
        />
        <motion.path
          d="M50 50 L50 75"
          stroke={colors.primary}
          strokeWidth="4"
          strokeLinecap="round"
          custom={1}
          // variants={pathVariants}
        />

        {/* B Letter - Integrated */}
        <motion.path
          d="M55 30 L55 70"
          stroke={colors.secondary}
          strokeWidth="4"
          strokeLinecap="round"
          custom={2}
          // variants={pathVariants}
        />
        <motion.path
          d="M55 30 C70 30 80 40 80 50 C80 60 70 70 55 70"
          stroke={colors.secondary}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          custom={3}
          // variants={pathVariants}
        />
        <motion.path
          d="M55 50 C65 50 70 55 70 50 C70 45 65 50 55 50"
          stroke={colors.secondary}
          strokeWidth="2"
          strokeLinecap="round"
          custom={4}
          // variants={pathVariants}
        />

        {/* Decorative Elements */}
        {variant === "ornate" && (
          <>
            <motion.circle
              cx="30"
              cy="25"
              r="3"
              fill={colors.accent}
              custom={5}
              // variants={fillVariants}
            />
            <motion.circle
              cx="70"
              cy="25"
              r="3"
              fill={colors.accent}
              custom={6}
              // variants={fillVariants}
            />
            <motion.circle
              cx="80"
              cy="50"
              r="3"
              fill={colors.accent}
              custom={7}
              // variants={fillVariants}
            />
            <motion.circle
              cx="50"
              cy="75"
              r="3"
              fill={colors.accent}
              custom={8}
              // variants={fillVariants}
            />
          </>
        )}

        {/* Inner Geometric Pattern */}
        <motion.path
          d="M40 40 L60 40 L60 60 L40 60 Z"
          stroke={colors.accent}
          strokeWidth="2"
          strokeDasharray="4"
          fill="none"
          custom={9}
          // variants={pathVariants}
        />

        {/* Center Dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="6"
          fill={colors.accent}
          // variants={fillVariants}
        />

        {/* Subtle Inner Glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="white"
          opacity="0.1"
          // variants={fillVariants}
        />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="bg-gradient-default"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.background} />
            <stop
              offset="100%"
              stopColor={colors.background}
              stopOpacity="0.8"
            />
          </linearGradient>
          <linearGradient
            id="bg-gradient-ornate"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.1" />
            <stop
              offset="50%"
              stopColor={colors.secondary}
              stopOpacity="0.05"
            />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="glow-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </motion.svg>

      {/* Interactive Hover Effect */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.primary}15 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Particle Effects on Hover */}
      {isHovering &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background:
                i % 3 === 0
                  ? colors.primary
                  : i % 3 === 1
                  ? colors.secondary
                  : colors.accent,
            }}
            initial={{
              x: size / 2,
              y: size / 2,
              scale: 0,
            }}
            animate={{
              x: [
                size / 2,
                size / 2 + Math.cos((i * Math.PI) / 4) * (size / 2),
                size / 2 + Math.cos((i * Math.PI) / 4) * (size / 3),
              ],
              y: [
                size / 2,
                size / 2 + Math.sin((i * Math.PI) / 4) * (size / 2),
                size / 2 + Math.sin((i * Math.PI) / 4) * (size / 3),
              ],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.5, 1],
              ease: "easeOut",
              repeat: 0,
            }}
          />
        ))}
    </motion.div>
  );
};

// Animated Logo Variant
export const AnimatedMonogramLogo = ({
  size = 120,
  className = "",
}: Omit<MonogramLogoProps, "animated" | "variant">) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Outer Orbit Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: size, height: size }}
      />

      {/* Inner Orbit Ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-secondary/20 border-dashed"
        animate={{ rotate: -360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: size - 48, height: size - 48 }}
      />

      {/* Pulsing Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: size, height: size }}
      />

      {/* Main Logo */}
      <MonogramLogo size={size} animated variant="ornate" />
    </motion.div>
  );
};

// Minimal Variant
export const MinimalMonogramLogo = ({
  size = 32,
  className = "",
}: Omit<MonogramLogoProps, "variant" | "animated">) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setMounted(true);
  }, []);

  if (!mounted) return null;

  const color = theme === "dark" ? "#3b82f6" : "#2563eb";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Y Letter */}
      <path
        d="M30 25 L50 50 L70 25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 50 L50 75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* B Letter */}
      <path
        d="M55 30 L55 70"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M55 30 C70 30 80 40 80 50 C80 60 70 70 55 70"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default MonogramLogo;
