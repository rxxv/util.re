"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, minify ? 0 : 2);
      setOutput(formatted);
      setError("");
    } catch {
      setError("Invalid JSON. Check commas, quotes, and brackets.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium text-[var(--color-ink)]">
            JSON input
          </label>
          <Textarea
            id="json-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={8}
            placeholder='{"name":"Ava","role":"Designer"}'
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="json-output" className="text-sm font-medium text-[var(--color-ink)]">
            Output
          </label>
          <Textarea id="json-output" value={output} readOnly rows={8} />
          <CopyButton text={output} label="Copy output" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => formatJson(false)}>
          Pretty print
        </Button>
        <Button type="button" variant="outline" onClick={() => formatJson(true)}>
          Minify
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
