"use client";

import Link from "next/link";
import type { Tool } from "@/data/tools";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ToolIcon from "@/components/ToolIcon";

type ToolCardProps = {
  tool: Tool;
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <Card className="flex h-full flex-col justify-between p-5 transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-[var(--accent)]">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ToolIcon slug={tool.slug} className="h-5 w-5 text-[var(--accent)]" />
            <Badge tone="soft">{tool.category}</Badge>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--text)]">
              {tool.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {tool.description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}
