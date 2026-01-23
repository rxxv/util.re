"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type PingResult = {
  url: string;
  latencyMs: number;
  status: number;
};

export default function PingLatencyTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PingResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePing = async () => {
    setError("");
    setResult(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter a URL or hostname.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await response.json()) as PingResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Ping failed.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ping failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="ping-url">
          Host or URL
        </label>
        <Input
          id="ping-url"
          placeholder="example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handlePing}>
        {isLoading ? "Pinging..." : "Run ping test"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        Measures HTTP latency from the server (not ICMP).
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {result ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
          <p className="text-xs text-[var(--muted)]">Target</p>
          <p className="text-base font-semibold">{result.url}</p>
          <p className="mt-3 text-xs text-[var(--muted)]">Latency</p>
          <p className="text-2xl font-semibold">{result.latencyMs} ms</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            HTTP status: {result.status}
          </p>
        </div>
      ) : null}
    </div>
  );
}
