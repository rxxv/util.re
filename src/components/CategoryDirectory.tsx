import Link from "next/link";
import type { Tool } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

type CategoryDirectoryProps = {
  tools: Tool[];
  categories: string[];
  showAllLinks?: boolean;
};

export default function CategoryDirectory({
  tools,
  categories,
  showAllLinks = false,
}: CategoryDirectoryProps) {
  return (
    <div className="space-y-8 scroll-mt-24" id="directory">
      {categories.filter((category) => category !== "All").map((category) => {
        const items = tools.filter((tool) => tool.category === category);
        if (!items.length) return null;
        const limitedItems = showAllLinks ? items.slice(0, 6) : items;
        return (
          <div
            key={category}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {category}
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  {items.length} tools
                </p>
              </div>
              {showAllLinks && items.length > limitedItems.length ? (
                <Link
                  href={`/?q=${encodeURIComponent(category)}`}
                  className="text-xs font-semibold text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  View all
                </Link>
              ) : null}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {limitedItems.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <div className="flex items-center gap-3">
                    <ToolIcon
                      slug={tool.slug}
                      className="h-5 w-5 text-[var(--accent)]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">
                        {tool.title}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
