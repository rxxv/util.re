import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-3 text-sm text-[var(--ink)] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]",
        className
      )}
      {...props}
    />
  );
}
