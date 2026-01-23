import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonSecondaryProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonSecondary({
  className,
  ...props
}: ButtonSecondaryProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-base text-[var(--text)] transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
      {...props}
    />
  );
}
