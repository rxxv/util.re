import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm text-[var(--ink)] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]",
        className
      )}
      {...props}
    />
  );
}
