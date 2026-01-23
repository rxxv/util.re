import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({ className, ...props }: ButtonPrimaryProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-base font-semibold text-black shadow-[var(--shadow-sm)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className
      )}
      {...props}
    />
  );
}
