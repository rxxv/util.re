"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type OgResult = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  fetchedUrl?: string;
};

export default function OpenGraphPreviewTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<OgResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = async () => {
    setError("");
    setResult(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter a URL to preview.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/opengraph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await response.json()) as OgResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch OpenGraph data.");
      }
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to fetch OpenGraph data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="og-url">
          Page URL
        </label>
        <Input
          id="og-url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handlePreview}>
        {isLoading ? "Fetching..." : "Preview OpenGraph"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        This tool fetches the page HTML server-side to read OG/Twitter tags.
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {result ? (
        <div className="space-y-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
          <div>
            <p className="text-xs text-[var(--muted)]">Title</p>
            <p className="text-base font-semibold">{result.title || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Description</p>
            <p className="text-sm">{result.description || "—"}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-[var(--muted)]">OG Image</p>
              <p className="text-sm break-all">{result.image || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Twitter Image</p>
              <p className="text-sm break-all">{result.twitterImage || "—"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Resolved URL</p>
            <p className="text-sm break-all">
              {result.fetchedUrl || result.url || "—"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
