"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Tool } from "@/data/tools";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import ToolCard from "@/components/ToolCard";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

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

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-green)]">
              Handmade web tools
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
              A cozy toolbox for calm workdays.
            </h1>
            <p className="text-base text-[var(--muted)]">
              Simple utilities that stay on your device. No accounts, no tracking,
              just the quiet tools you reach for every day.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Privacy-first</Badge>
            <Badge>Runs locally</Badge>
            <Badge>No tracking</Badge>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Built for the handmade web: tidy, readable, and easy to share.
          </p>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search for a tool or keyword"
          />
        </div>
        <Card className="flex min-h-[220px] items-center justify-center border-dashed text-sm text-[var(--muted)]">
          Illustration placeholder
        </Card>
      </section>

      <section className="space-y-5" aria-live="polite">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-[var(--ink)]">Tools</h2>
          <CategoryChips
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        {filteredTools.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            No tools match that search. Try another keyword or category.
          </p>
        ) : null}
      </section>
    </div>
  );
}
