import type { ReactNode } from "react";
import type { Tool } from "@/data/tools";
import Card from "@/components/ui/Card";
import Surface from "@/components/ui/Surface";

type ToolShellLayoutProps = {
  tool: Tool;
  children: ReactNode;
};

export default function ToolShellLayout({ tool, children }: ToolShellLayoutProps) {
  const tips = tool.howItWorks.slice(0, 3);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="p-6 sm:p-8">{children}</Card>
      <Card className="h-fit space-y-4 p-5 text-sm text-[var(--muted)]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Quick tips
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text)]">
            {tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="text-[var(--accent)]">*</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <Surface className="px-3 py-3 text-xs text-[var(--muted)]">
          Everything runs locally in your browser. No uploads or tracking.
        </Surface>
      </Card>
    </div>
  );
}
