"use client";

import { useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";

export default function TextCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;

    return { words, characters, charactersNoSpaces, lines };
  }, [text]);

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-[var(--color-ink)]" htmlFor="text-counter">
        Your text
      </label>
      <Textarea
        id="text-counter"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={7}
        placeholder="Paste or type here..."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            ["Words", stats.words],
            ["Characters", stats.characters],
            ["No spaces", stats.charactersNoSpaces],
            ["Lines", stats.lines],
          ] as const
        ).map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-sm text-[var(--color-muted-text)]">{label}</p>
            <p className="text-2xl font-semibold text-[var(--color-ink)]">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
