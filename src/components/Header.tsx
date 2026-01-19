import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderSearch from "@/components/HeaderSearch";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
        >
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-sm text-[var(--color-muted-text)] md:flex">
            <Link
              href="/"
              className="transition hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              Tools
            </Link>
            <a
              href="https://github.com"
              className="transition hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              GitHub
            </a>
          </nav>
          <Suspense fallback={null}>
            <HeaderSearch />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
