"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as RegExpExecArray[], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const result: RegExpExecArray[] = [];
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        result.push(match);
        if (!regex.global) break;
        if (match.index === regex.lastIndex) regex.lastIndex += 1;
      }
      return { matches: result, error: "" };
    } catch {
      return { matches: [] as RegExpExecArray[], error: "Invalid regex pattern or flags." };
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="regex-pattern" className="text-sm font-medium text-[var(--color-ink)]">
            Pattern
          </label>
          <Input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            placeholder="\\b\\w+\\b"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="regex-flags" className="text-sm font-medium text-[var(--color-ink)]">
            Flags
          </label>
          <Input
            id="regex-flags"
            type="text"
            value={flags}
            onChange={(event) => setFlags(event.target.value)}
            placeholder="gim"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="regex-text" className="text-sm font-medium text-[var(--color-ink)]">
          Text to test
        </label>
        <Textarea
          id="regex-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={6}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--color-ink)]">Matches ({matches.length})</p>
        <ul className="mt-2 space-y-2 text-xs text-[var(--color-muted-text)]">
          {matches.length === 0 ? (
            <li>No matches yet.</li>
          ) : (
            matches.map((match, index) => (
              <li key={`${match.index}-${index}`}>
                {`#${index + 1} at ${match.index}: ${match[0]}`}
              </li>
            ))
          )}
        </ul>
      </Card>
    </div>
  );
}
