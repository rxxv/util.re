"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Tool } from "@/data/tools";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import ToolCard from "@/components/ToolCard";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import AuroraBackground from "@/components/ui/AuroraBackground";
import CategoryDirectory from "@/components/CategoryDirectory";

type HomeClientProps = {
  tools: Tool[];
  categories: string[];
};

const matchesQuery = (tool: Tool, query: string) => {
  if (!query) return true;
  const haystack = [
    tool.title,
    tool.description,
    tool.category,
    ...tool.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

export default function HomeClient({ tools, categories }: HomeClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      return matchesCategory && matchesQuery(tool, query);
    });
  }, [tools, activeCategory, query]);
  const popularTools = useMemo(() => tools.slice(0, 8), [tools]);
  const showAllLinks = !query && activeCategory === "All";

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.hash = id;
  };

  return (
    <div className="space-y-16">
      <Section className="relative overflow-hidden">
        <AuroraBackground />
        <Container className="relative space-y-8">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Privacy-first
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                No tracking
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Runs locally
              </span>
            </div>
            <h1 className="max-w-3xl text-[clamp(2.1rem,6vw,3.2rem)] font-semibold leading-tight text-[var(--text)]">
              A privacy-first toolbox with the calm, premium feel of a studio app.
            </h1>
            <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              Fast, local utilities for developers, creators, and curious builders.
              No accounts, no tracking, just the tools you actually need.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("directory")}
                className="inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-base font-semibold text-black shadow-[var(--shadow-sm)] transition hover:brightness-110"
              >
                Browse tools
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("popular-tools")}
                className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-base text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                Popular tools
              </button>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[var(--muted)]">
            <p className="text-base text-[var(--text)]">
              One toolbox. All the quick utilities.
            </p>
            <p>
              Built to stay light, fast, and accessible. Everything runs in your
              browser and keeps your data on-device.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="soft">Zero cookies</Badge>
              <Badge tone="soft">Instant results</Badge>
              <Badge tone="soft">Minimal UI</Badge>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold text-[var(--text)]">
              The problem
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Most utility sites are bloated, noisy, and loaded with trackers.
              You jump between tabs, sign in, and still worry about where your data goes.
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold text-[var(--text)]">
              The solution
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              xxxx.re keeps everything local, fast, and predictable. Clean tools,
              no noise, and a directory that’s easy to scan and share.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <div className="space-y-2" id="popular-tools">
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              Popular tools
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Quick access to the most used utilities.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Why xxxx.re
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-base font-semibold text-[var(--text)]">
                Fast, local-first
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tools run in your browser with instant feedback and no uploads.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-base font-semibold text-[var(--text)]">
                No tracking
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                No logins, cookies, or analytics. Your data stays yours.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-base font-semibold text-[var(--text)]">
                Clean output
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Export-ready results without bloated interfaces or clutter.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-live="polite">
        <Container className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                Tool directory
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Search and filter the full catalog. Every tool runs locally.
              </p>
            </div>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search for a tool or keyword"
            />
          </div>

          <CategoryChips
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
          />

          {filteredTools.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              No tools match that search. Try another keyword or category.
            </p>
          ) : (
            <CategoryDirectory
              tools={filteredTools}
              categories={categories}
              showAllLinks={showAllLinks}
            />
          )}
        </Container>
      </Section>
    </div>
  );
}
