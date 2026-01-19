"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setIsDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleToggle}
      aria-label="Toggle dark mode"
    >
      {isDark ? "Light" : "Dark"}
    </Button>
  );
}
