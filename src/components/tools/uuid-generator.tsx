"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const generateUuid = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
};

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState(0);

  const uuids = useMemo(() => {
    return Array.from({ length: count }, () => generateUuid());
  }, [count, seed]);

  const handleGenerate = () => {
    setSeed((value) => value + 1);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <label htmlFor="uuid-count" className="text-sm font-medium text-[var(--color-ink)]">
            Count
          </label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(Math.min(100, Math.max(1, Number(event.target.value) || 1)))}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          />
        </div>
        <div className="flex items-end gap-3">
          <Button type="button" onClick={handleGenerate}>
            Generate UUIDs
          </Button>
          <CopyButton text={uuids.join("\n")} label="Copy" />
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <label htmlFor="uuid-output" className="text-sm font-medium text-[var(--color-ink)]">
          Results
        </label>
        <Textarea id="uuid-output" value={uuids.join("\n")} readOnly rows={8} />
      </div>
    </div>
  );
}
