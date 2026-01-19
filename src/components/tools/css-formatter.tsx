"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const minifyCss = (input: string) => {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([:;{},])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
};

const formatCss = (input: string) => {
  const cleaned = input.replace(/\/\*[\s\S]*?\*\//g, "");
  let indent = 0;
  return cleaned
    .split(/(?<=[{};])/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("}")) indent = Math.max(0, indent - 1);
      const line = `${"  ".repeat(indent)}${chunk}`;
      if (chunk.endsWith("{")) indent += 1;
      return line;
    })
    .join("\n");
};

export default function CssFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="css-input" className="text-sm font-medium text-[var(--color-ink)]">
            CSS input
          </label>
          <Textarea
            id="css-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={8}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="css-output" className="text-sm font-medium text-[var(--color-ink)]">
            Output
          </label>
          <Textarea id="css-output" value={output} readOnly rows={8} />
          <CopyButton text={output} label="Copy output" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => setOutput(formatCss(input))}>
          Format
        </Button>
        <Button type="button" variant="outline" onClick={() => setOutput(minifyCss(input))}>
          Minify
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
