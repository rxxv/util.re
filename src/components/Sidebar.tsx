"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { sortedTools } from "@/data/tools";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import ToolIcon from "@/components/ToolIcon";

const groupTools = () => {
  const grouped = new Map<string, typeof sortedTools>();
  sortedTools.forEach((tool) => {
    const current = grouped.get(tool.category) || [];
    current.push(tool);
    grouped.set(tool.category, current);
  });
  return Array.from(grouped.entries()).sort((a, b) => {
    const aPriority = Math.max(...a[1].map((tool) => tool.priority || 0));
    const bPriority = Math.max(...b[1].map((tool) => tool.priority || 0));
    return bPriority - aPriority || a[0].localeCompare(b[0]);
  });
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const groups = useMemo(() => groupTools(), []);

  const renderLinks = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg border border-[var(--border)] bg-[var(--paper-surface)]" />
          <div>
            <p className="text-sm font-semibold text-[var(--accent-green)]">
              {siteConfig.name}
            </p>
            <p className="text-xs text-[var(--muted)]">Handmade web tools</p>
          </div>
        </div>
      </div>

      <nav className="space-y-5">
        {groups.map(([category, items]) => (
          <div key={category} className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
              {category}
            </p>
            <div className="space-y-1">
              {items.map((tool) => {
                const isActive = pathname === `/tools/${tool.slug}`;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                      isActive
                        ? "bg-[var(--paper-surface)] text-[var(--accent-green)]"
                        : "text-[var(--ink)] hover:bg-[var(--paper-surface)]"
                    )}
                  >
                    <ToolIcon slug={tool.slug} className="h-4 w-4" />
                    {tool.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="text-xs text-[var(--muted)]">
        No logins. No tracking. Long live the handmade web.
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[var(--border)] bg-[var(--paper-bg)] px-4 py-3 lg:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--accent-green)]"
        >
          {siteConfig.name}
        </Link>
        <button
          type="button"
          className="rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-3 py-1 text-xs text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-80 lg:border-r lg:border-[var(--border)] lg:bg-[var(--paper-bg)] lg:px-6 lg:py-8 lg:overflow-y-auto">
        {renderLinks()}
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--border)] bg-[var(--paper-bg)] px-5 py-6 transition motion-safe:duration-200 motion-reduce:transition-none lg:hidden overflow-y-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between pb-4">
          <p className="text-sm font-semibold text-[var(--accent-green)]">
            {siteConfig.name}
          </p>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-3 py-1 text-xs text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
        {renderLinks()}
      </aside>
    </>
  );
}
