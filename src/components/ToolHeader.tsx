import type { Tool } from "@/data/tools";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ToolIcon from "@/components/ToolIcon";
import AuroraBackground from "@/components/ui/AuroraBackground";

type ToolHeaderProps = {
  tool: Tool;
};

export default function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow-glow)] sm:px-10">
      <AuroraBackground />
      <div className="relative space-y-4">
        <Link
          href="/#directory"
          className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          Browse tools
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {tool.category}
          </span>
          <Badge tone="soft">Privacy-first</Badge>
          <Badge tone="soft">No tracking</Badge>
          <Badge tone="soft">Runs locally</Badge>
        </div>
        <div className="flex items-center gap-3">
          <ToolIcon slug={tool.slug} className="h-6 w-6 text-[var(--accent)]" />
          <h1 className="text-3xl font-semibold text-[var(--text)] sm:text-4xl">
            {tool.title}
          </h1>
        </div>
        <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          {tool.description}
        </p>
      </div>
    </div>
  );
}
