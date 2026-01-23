import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export default function Surface({ className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    />
  );
}
