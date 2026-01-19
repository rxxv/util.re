import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "soft";
};

export default function Badge({ className, tone = "soft", ...props }: BadgeProps) {
  const tones = {
    neutral: "bg-[var(--paper-surface)] text-[var(--ink)]",
    soft: "bg-[#e3ebdf] text-[var(--accent-green)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
