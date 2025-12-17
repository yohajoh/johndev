"use client";

import { useState, useEffect } from "react";

export const useLoading = (initialDelay: number = 1500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 10;
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [initialDelay]);

  return { isLoading, progress };
};
