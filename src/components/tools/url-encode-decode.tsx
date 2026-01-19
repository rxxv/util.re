"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

export default function UrlEncodeDecodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setError("");
      setOutput(decodeURIComponent(input));
    } catch {
      setError("That input cannot be decoded. Check for stray % symbols.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url-input" className="text-sm font-medium text-[var(--color-ink)]">
          URL or query
        </label>
        <Textarea
          id="url-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={6}
          placeholder="https://example.com/?q=hello world"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleEncode}>
          Encode
        </Button>
        <Button type="button" variant="outline" onClick={handleDecode}>
          Decode
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <div className="space-y-2">
        <label htmlFor="url-output" className="text-sm font-medium text-[var(--color-ink)]">
          Output
        </label>
        <Textarea id="url-output" value={output} readOnly rows={4} />
        <CopyButton text={output} label="Copy output" />
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
