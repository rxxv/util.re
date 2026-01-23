"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type StatusResult = {
  ok: boolean;
  status: number;
  statusText: string;
  finalUrl: string;
  durationMs: number;
  contentType: string | null;
};

export default function WebsiteStatusTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    setError("");
    setResult(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter a URL to check.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await response.json()) as StatusResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to check the URL.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to check the URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="status-url">
          Website URL
        </label>
        <Input
          id="status-url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handleCheck}>
        {isLoading ? "Checking..." : "Check status"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        This tool performs a server-side request to retrieve status and timing.
      </p>
      {error ? (
        <p className="text-sm text-[var(--accent)]">{error}</p>
      ) : null}
      {result ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-base font-semibold">
                {result.status} {result.statusText}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Response time</p>
              <p className="text-base font-semibold">{result.durationMs} ms</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Content type</p>
              <p className="text-base font-semibold">
                {result.contentType || "Unknown"}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Final URL: {result.finalUrl}
          </p>
        </div>
      ) : null}
    </div>
  );
}
