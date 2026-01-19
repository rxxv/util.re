"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const encodeHtml = (value: string) => {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
};

const decodeHtml = (value: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
};

export default function HtmlEntitiesTool() {
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
          <label htmlFor="html-input" className="text-sm font-medium text-[var(--color-ink)]">
            Input
          </label>
          <Textarea
            id="html-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={6}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="html-output" className="text-sm font-medium text-[var(--color-ink)]">
            Output
          </label>
          <Textarea id="html-output" value={output} readOnly rows={6} />
          <CopyButton text={output} label="Copy output" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => setOutput(encodeHtml(input))}>
          Encode
        </Button>
        <Button type="button" variant="outline" onClick={() => setOutput(decodeHtml(input))}>
          Decode
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
