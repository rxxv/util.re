import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement>;

export default function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-12 sm:py-16", className)} {...props} />;
}
