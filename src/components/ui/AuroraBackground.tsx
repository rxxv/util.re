import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type AuroraBackgroundProps = HTMLAttributes<HTMLDivElement>;

export default function AuroraBackground({
  className,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--halo-1),transparent_70%)] blur-3xl opacity-70" />
      <div className="absolute -top-20 left-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,var(--halo-2),transparent_70%)] blur-[110px] opacity-60" />
      <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,var(--halo-3),transparent_70%)] blur-[120px] opacity-55" />
    </div>
  );
}
