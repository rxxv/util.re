import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  className,
  variant = "outline",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)] disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-200 motion-reduce:transition-none";
  const variants = {
    solid: "bg-[var(--accent-green)] text-[var(--paper-surface)] hover:bg-[#3b4f3e]",
    outline:
      "border border-[var(--border)] bg-[var(--paper-surface)] text-[var(--ink)] hover:bg-[var(--paper-bg)]",
    ghost: "text-[var(--ink)] hover:bg-[var(--paper-bg)]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
