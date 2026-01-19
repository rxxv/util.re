import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] shadow-sm shadow-black/5",
        className
      )}
      {...props}
    />
  );
}
