import type { Tool } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

type RelatedToolsGridProps = {
  tools: Tool[];
};

export default function RelatedToolsGrid({ tools }: RelatedToolsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
