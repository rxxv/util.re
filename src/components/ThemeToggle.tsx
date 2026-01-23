"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      const light = stored === "light";
      setIsLight(light);
      document.documentElement.classList.toggle("light", light);
      return;
    }
    setIsLight(false);
    document.documentElement.classList.remove("light");
  }, []);

  const handleToggle = () => {
    setIsLight((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
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
      <span className="flex items-center gap-2">
        {isLight ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2" />
            <path d="M12 19v2" />
            <path d="M4.5 4.5l1.4 1.4" />
            <path d="M18.1 18.1l1.4 1.4" />
            <path d="M3 12h2" />
            <path d="M19 12h2" />
            <path d="M4.5 19.5l1.4-1.4" />
            <path d="M18.1 5.9l1.4-1.4" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
        <span className="text-xs">{isLight ? "Light" : "Dark"}</span>
      </span>
    </Button>
  );
}
