"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";
import Textarea from "@/components/ui/Textarea";

const toWords = (input: string) => {
  const normalized = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ");
  return normalized
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
};

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export default function CaseConverterTool() {
  const [input, setInput] = useState("");

  const outputs = useMemo(() => {
    const words = toWords(input);
    if (words.length === 0) {
      return {
        lower: "",
        upper: "",
        snake: "",
        kebab: "",
        camel: "",
        pascal: "",
      };
    }
    const lower = words.map((w) => w.toLowerCase());
    return {
      lower: lower.join(" "),
      upper: lower.join(" ").toUpperCase(),
      snake: lower.join("_"),
      kebab: lower.join("-"),
      camel: lower[0] + lower.slice(1).map(capitalize).join(""),
      pascal: lower.map(capitalize).join(""),
    };
  }, [input]);

  const allOutput = [
    `lowercase: ${outputs.lower}`,
    `UPPERCASE: ${outputs.upper}`,
    `snake_case: ${outputs.snake}`,
    `kebab-case: ${outputs.kebab}`,
    `camelCase: ${outputs.camel}`,
    `PascalCase: ${outputs.pascal}`,
  ].join("\n");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="case-input" className="text-sm font-medium text-[var(--color-ink)]">
          Input text
        </label>
        <Textarea
          id="case-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={5}
        />
      </div>

      <div className="flex justify-end">
        <CopyButton text={allOutput} label="Copy all" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ["Lowercase", outputs.lower],
            ["UPPERCASE", outputs.upper],
            ["snake_case", outputs.snake],
            ["kebab-case", outputs.kebab],
            ["camelCase", outputs.camel],
            ["PascalCase", outputs.pascal],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
            <p className="text-xs uppercase tracking-wide text-[var(--color-muted-text)]">
              {label}
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-ink)] break-words">
              {value || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
