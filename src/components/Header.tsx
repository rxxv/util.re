"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { categories, sortedTools } from "@/data/tools";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import ToolIcon from "@/components/ToolIcon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const popularTools = useMemo(() => sortedTools.slice(0, 6), []);
  const menuCategories = useMemo(
    () => categories.filter((category) => category !== "All"),
    []
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleBrowseTools = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === "/") {
      const target = document.getElementById("directory");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push("/#directory");
  };

  return (
    <header
      className={cn(
        "sticky top-0 border-b border-[var(--border)] bg-[var(--bg)] backdrop-blur",
        open ? "z-40" : "z-50"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span className="text-lg font-semibold text-[var(--text)]">
            {siteConfig.name}
          </span>
          <span className="hidden text-xs text-[var(--muted)] sm:inline">
            Handmade web tools
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-4 text-sm text-[var(--muted)] lg:flex">
            <details className="group relative">
              <summary className="cursor-pointer list-none rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] [&::-webkit-details-marker]:hidden">
                Popular tools
              </summary>
              <div className="absolute right-0 mt-3 w-72 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-md)]">
                <div className="space-y-3">
                  {popularTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-2 text-sm text-[var(--text)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <ToolIcon slug={tool.slug} className="h-4 w-4" />
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            </details>

            <details className="group relative">
              <summary className="cursor-pointer list-none text-sm text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] [&::-webkit-details-marker]:hidden">
                All tools
              </summary>
              <div className="absolute right-0 mt-3 w-[520px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {menuCategories.map((category) => (
                    <div key={category} className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                        {category}
                      </p>
                      <div className="space-y-1">
                        {sortedTools
                          .filter((tool) => tool.category === category)
                          .map((tool) => (
                            <Link
                              key={tool.slug}
                              href={`/tools/${tool.slug}`}
                              className="flex items-center gap-2 text-sm text-[var(--text)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                            >
                              <ToolIcon slug={tool.slug} className="h-4 w-4" />
                              {tool.title}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </nav>

          <a
            href="/#directory"
            onClick={handleBrowseTools}
            className={cn(
              "hidden items-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black shadow-[var(--shadow-sm)] transition hover:brightness-110 lg:inline-flex"
            )}
          >
            Browse tools
          </a>

          <button
            type="button"
            className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-2 text-xs text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </Container>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      ) : null}
      <aside
        className={`fixed inset-0 z-50 flex h-full w-full flex-col border-l border-[var(--border)] bg-[var(--surface)] px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+16px)] transition duration-200 lg:hidden sm:inset-y-0 sm:right-0 sm:left-auto sm:w-96 sm:rounded-l-[var(--radius-lg)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              {siteConfig.name}
            </p>
            <p className="text-xs text-[var(--muted)]">Handmade web tools</p>
          </div>
          <button
            type="button"
            className="rounded-[var(--radius-sm)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="mt-6 min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
          <a
            href="/#directory"
            className="inline-flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onClick={(event) => {
              setOpen(false);
              handleBrowseTools(event);
            }}
          >
            Browse tools
          </a>
          {menuCategories.map((category) => (
            <div key={category} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {category}
              </p>
              <div className="space-y-1">
                {sortedTools
                  .filter((tool) => tool.category === category)
                  .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-2 text-sm text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                      onClick={() => setOpen(false)}
                    >
                      <ToolIcon slug={tool.slug} className="h-4 w-4" />
                      {tool.title}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </header>
  );
}
