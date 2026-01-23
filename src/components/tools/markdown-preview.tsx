"use client";

import { useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const sanitizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "#";
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // Ignore parsing errors and block unsafe URLs.
  }
  return "#";
};

const renderMarkdown = (value: string) => {
  const escaped = escapeHtml(value);
  const lines = escaped.split(/\r?\n/);
  const rendered = lines
    .map((line) => {
      if (/^###\s+/.test(line)) return `<h3>${line.replace(/^###\s+/, "")}</h3>`;
      if (/^##\s+/.test(line)) return `<h2>${line.replace(/^##\s+/, "")}</h2>`;
      if (/^#\s+/.test(line)) return `<h1>${line.replace(/^#\s+/, "")}</h1>`;
      if (/^\s*[-*]\s+/.test(line)) {
        return `<li>${line.replace(/^\s*[-*]\s+/, "")}</li>`;
      }
      return `<p>${line}</p>`;
    })
    .join("\n");

  const withInline = rendered
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (match, label, url) => {
      const safeUrl = sanitizeUrl(url);
      return `<a href="${safeUrl}" target="_blank" rel="noreferrer">${label}</a>`;
    });

  return withInline.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");
};

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState("# Hello\n\nWrite **Markdown** here.");

  const output = useMemo(() => renderMarkdown(input), [input]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="markdown-input" className="text-sm font-medium text-[var(--text)]">
          Markdown
        </label>
        <Textarea
          id="markdown-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={10}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--text)]">Preview</p>
        <Card
          className="p-4 text-sm text-[var(--muted)]"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </div>
    </div>
  );
}
