import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[var(--color-muted-text)] lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-[var(--color-ink)]">{siteConfig.name}</p>
          <p>No logins, no tracking, no cookies.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            Home
          </Link>
          <a
            href="https://github.com"
            className="hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
