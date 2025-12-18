"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    const applyTheme = (themeToApply: Theme) => {
      const root = document.documentElement;

      if (disableTransitionOnChange) {
        const originalTransition = root.style.transition;
        root.style.transition = "none";

        root.classList.remove("light", "dark");

        if (themeToApply === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          root.classList.add(systemTheme);
          setResolvedTheme(systemTheme);
        } else {
          root.classList.add(themeToApply);
          setResolvedTheme(themeToApply);
        }

        setTimeout(() => {
          root.style.transition = originalTransition;
        }, 0);
      } else {
        root.classList.remove("light", "dark");

        if (themeToApply === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          root.classList.add(systemTheme);
          setResolvedTheme(systemTheme);
        } else {
          root.classList.add(themeToApply);
          setResolvedTheme(themeToApply);
        }
      }

      if (themeToApply !== "system") {
        localStorage.setItem("theme", themeToApply);
      } else {
        localStorage.removeItem("theme");
      }
    };

    // Get initial theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let initialTheme: Theme = storedTheme || defaultTheme;

    if (initialTheme === "system") {
      initialTheme = systemPrefersDark ? "dark" : "light";
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [defaultTheme, disableTransitionOnChange]);

  // Handle system theme changes
  useEffect(() => {
    if (theme !== "system" || !mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    // Use addListener for better browser compatibility
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    if (!mounted) return;

    setThemeState(newTheme);
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
      localStorage.removeItem("theme");
    } else {
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  // Prevent hydration mismatch by not rendering children until mounted
  // but still provide the context to avoid hook errors
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
          resolvedTheme,
        }}
      >
        <div style={{ display: "none" }} aria-hidden="true">
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// Theme toggle component
interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle between light and dark
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={toggleTheme}
      onDoubleClick={cycleTheme}
      className={className}
      aria-label={`Switch to ${
        resolvedTheme === "dark" ? "light" : "dark"
      } theme`}
      title={`Current: ${theme} (${resolvedTheme}) - Click to toggle, double-click to cycle`}
    >
      {showLabel && (
        <span className="mr-2 text-sm">
          {theme === "system"
            ? "System"
            : resolvedTheme === "dark"
            ? "Dark"
            : "Light"}
        </span>
      )}

      {resolvedTheme === "dark" ? (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-blue-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

export default ThemeProvider;
