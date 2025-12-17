"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  animated?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  animated = true,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    ghost:
      "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400",
    gradient:
      "bg-gradient-to-r from-primary via-primary to-secondary text-white hover:shadow-lg focus:ring-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClass = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    widthClass,
    className
  );

  const MotionButton = animated ? motion.button : "button";
  const buttonProps = animated
    ? {
        variants: buttonHover,
        initial: "rest",
        whileHover: disabled || loading ? undefined : "hover",
        whileTap: disabled || loading ? undefined : "tap",
      }
    : {};

  return (
    <MotionButton
      className={buttonClass}
      disabled={disabled || loading}
      {...buttonProps}
      {...(props as any)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      )}

      {/* Gradient shine effect for gradient variant */}
      {variant === "gradient" && !disabled && !loading && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </span>
      )}
    </MotionButton>
  );
};

// Icon Button Variant
export const IconButton = ({
  icon,
  label,
  variant = "ghost",
  size = "md",
  ...props
}: Omit<ButtonProps, "children"> & { icon: ReactNode; label: string }) => {
  const sizes = {
    sm: "p-1.5",
    md: "p-2.5",
    lg: "p-3.5",
    xl: "p-4.5",
  };

  return (
    <Button
      variant={variant}
      size={size}
      icon={icon}
      aria-label={label}
      className={cn("aspect-square p-0", sizes[size])}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </Button>
  );
};

// Floating Action Button
export const FloatingButton = ({
  icon,
  label,
  position = "bottom-right",
  ...props
}: Omit<ButtonProps, "children"> & {
  icon: ReactNode;
  label: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <motion.div
      className={`fixed ${positions[position]} z-40`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <IconButton
        icon={icon}
        label={label}
        variant="gradient"
        size="lg"
        className="shadow-xl"
        {...props}
      />
    </motion.div>
  );
};

// Button Group
export const ButtonGroup = ({
  children,
  direction = "horizontal",
  className,
}: {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row gap-2" : "flex-col gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Button;
