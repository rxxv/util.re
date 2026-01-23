"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type SslResult = {
  host: string;
  issuer?: string;
  subject?: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
};

export default function SslCheckerTool() {
  const [host, setHost] = useState("");
  const [result, setResult] = useState<SslResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    setError("");
    setResult(null);
    const trimmed = host.trim();
    if (!trimmed) {
      setError("Enter a domain name.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/ssl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host: trimmed }),
      });
      const data = (await response.json()) as SslResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "SSL lookup failed.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "SSL lookup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="ssl-host">
          Domain
        </label>
        <Input
          id="ssl-host"
          placeholder="example.com"
          value={host}
          onChange={(event) => setHost(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handleCheck}>
        {isLoading ? "Checking..." : "Check certificate"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        Connects to the host and inspects the TLS certificate server-side.
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {result ? (
        <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
          <div>
            <p className="text-xs text-[var(--muted)]">Host</p>
            <p className="text-base font-semibold">{result.host}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Issuer</p>
            <p className="text-sm">{result.issuer || "Unknown"}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Subject</p>
            <p className="text-sm">{result.subject || "Unknown"}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-[var(--muted)]">Valid from</p>
              <p className="text-sm">{result.validFrom || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Valid to</p>
              <p className="text-sm">{result.validTo || "—"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Days remaining</p>
            <p className="text-base font-semibold">
              {result.daysRemaining ?? "—"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
