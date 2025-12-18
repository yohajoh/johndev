"use client";

import { ReactNode, ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Download,
  Heart,
  Star,
  Zap,
  Rocket,
  Sparkles,
} from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient"
    | "danger"
    | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  animated?: boolean;
  pulse?: boolean;
  glow?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  shadow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      animated = true,
      pulse = false,
      glow = false,
      rounded = "lg",
      shadow = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden select-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 active:scale-95",
      secondary:
        "bg-gradient-to-r from-secondary to-accent text-white hover:shadow-lg hover:scale-105 active:scale-95",
      outline:
        "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:border-primary/80",
      ghost:
        "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      gradient:
        "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-xl hover:scale-105 active:scale-95",
      danger:
        "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:scale-105 active:scale-95",
      success:
        "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105 active:scale-95",
    };

    const sizes = {
      xs: "px-3 py-1.5 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };

    const roundedStyles = {
      sm: "rounded",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl",
      full: "rounded-full",
    };

    const shadowStyles = shadow ? "shadow-lg" : "";
    const widthClass = fullWidth ? "w-full" : "";

    const buttonClass = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      roundedStyles[rounded],
      shadowStyles,
      widthClass,
      pulse && "animate-pulse",
      glow && "shadow-[0_0_20px_rgba(22,163,74,0.3)]",
      animated && "transform-gpu",
      className
    );

    // Icon based on variant
    const getVariantIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="w-4 h-4" aria-hidden="true" />;
        case "danger":
          return <AlertCircle className="w-4 h-4" aria-hidden="true" />;
        case "gradient":
          return <Sparkles className="w-4 h-4" aria-hidden="true" />;
        default:
          return null;
      }
    };

    const variantIcon = getVariantIcon();

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        {...props}
      >
        {/* Shimmer effect for gradient variants */}
        {(variant === "gradient" || variant === "primary") &&
          !disabled &&
          !loading && (
            <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <span
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000",
                  isHovered && "translate-x-full"
                )}
                aria-hidden="true"
              />
            </span>
          )}

        {/* Ripple effect on click */}
        {isActive && !disabled && !loading && (
          <span
            className="absolute inset-0 bg-white/20 animate-ping rounded-[inherit]"
            aria-hidden="true"
          />
        )}

        {/* Loading spinner */}
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Loading...
          </span>
        ) : (
          <span className="relative flex items-center gap-2">
            {variantIcon && iconPosition === "left" && variantIcon}
            {icon && iconPosition === "left" && icon}
            {children}
            {variantIcon && iconPosition === "right" && variantIcon}
            {icon && iconPosition === "right" && icon}

            {/* Hover arrow for certain variants */}
            {(variant === "primary" || variant === "gradient") &&
              isHovered &&
              !disabled && (
                <ChevronRight
                  className="w-4 h-4 ml-1 transition-all duration-300 translate-x-0 opacity-100"
                  aria-hidden="true"
                />
              )}
          </span>
        )}

        {/* Glow effect on hover */}
        {glow && isHovered && !disabled && !loading && (
          <div
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10"
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Icon Button Variant
interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: ReactNode;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, label, variant = "ghost", size = "md", rounded = "full", ...props },
    ref
  ) => {
    const sizes = {
      xs: "p-1.5",
      sm: "p-2",
      md: "p-2.5",
      lg: "p-3.5",
      xl: "p-4.5",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        icon={icon}
        rounded={rounded}
        className={cn("aspect-square p-0", sizes[size])}
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// Floating Action Button
interface FloatingButtonProps
  extends Omit<IconButtonProps, "variant" | "size"> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const FloatingButton = ({
  position = "bottom-right",
  ...props
}: FloatingButtonProps) => {
  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div className={`fixed ${positions[position]} z-40`}>
      <IconButton
        {...props}
        variant="gradient"
        size="lg"
        className="shadow-xl hover:shadow-2xl transition-all duration-300"
      />
    </div>
  );
};

// Button Group
interface ButtonGroupProps {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  attached?: boolean;
  className?: string;
}

export const ButtonGroup = ({
  children,
  direction = "horizontal",
  attached = false,
  className,
}: ButtonGroupProps) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        attached && "gap-0",
        !attached && "gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

// Specialized buttons using our Button component
export const DownloadButton = (
  props: Omit<ButtonProps, "icon" | "iconPosition">
) => (
  <Button
    icon={<Download className="w-4 h-4" aria-hidden="true" />}
    iconPosition="left"
    {...props}
  />
);

export const ExternalLinkButton = (
  props: Omit<ButtonProps, "icon" | "iconPosition">
) => (
  <Button
    icon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
    iconPosition="right"
    {...props}
  />
);

export const LoveButton = (props: Omit<IconButtonProps, "icon" | "label">) => (
  <IconButton
    icon={<Heart className="w-4 h-4" aria-hidden="true" />}
    label="Love"
    {...props}
  />
);

export const StarButton = (props: Omit<IconButtonProps, "icon" | "label">) => (
  <IconButton
    icon={<Star className="w-4 h-4" aria-hidden="true" />}
    label="Star"
    {...props}
  />
);

export const ZapButton = (props: Omit<IconButtonProps, "icon" | "label">) => (
  <IconButton
    icon={<Zap className="w-4 h-4" aria-hidden="true" />}
    label="Zap"
    {...props}
  />
);

export const RocketButton = (
  props: Omit<IconButtonProps, "icon" | "label">
) => (
  <IconButton
    icon={<Rocket className="w-4 h-4" aria-hidden="true" />}
    label="Launch"
    {...props}
  />
);

export default Button;
