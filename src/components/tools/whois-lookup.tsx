"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type WhoisResult = {
  domain: string;
  registrar?: string;
  status?: string[];
  events?: { action: string; date: string }[];
  nameservers?: string[];
};

export default function WhoisLookupTool() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<WhoisResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    setError("");
    setResult(null);
    const trimmed = domain.trim();
    if (!trimmed) {
      setError("Enter a domain name.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/whois", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: trimmed }),
      });
      const data = (await response.json()) as WhoisResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Whois lookup failed.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Whois lookup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="whois-domain">
          Domain
        </label>
        <Input
          id="whois-domain"
          placeholder="example.com"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handleLookup}>
        {isLoading ? "Looking up..." : "Lookup Whois"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        Queries public RDAP services to retrieve domain registration data.
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {result ? (
        <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
          <div>
            <p className="text-xs text-[var(--muted)]">Domain</p>
            <p className="text-base font-semibold">{result.domain}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Registrar</p>
            <p className="text-base font-semibold">
              {result.registrar || "Unknown"}
            </p>
          </div>
          {result.status?.length ? (
            <div>
              <p className="text-xs text-[var(--muted)]">Status</p>
              <p className="text-sm">{result.status.join(", ")}</p>
            </div>
          ) : null}
          {result.events?.length ? (
            <div>
              <p className="text-xs text-[var(--muted)]">Events</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.events.map((event) => (
                  <li key={`${event.action}-${event.date}`}>
                    {event.action}: {event.date}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {result.nameservers?.length ? (
            <div>
              <p className="text-xs text-[var(--muted)]">Nameservers</p>
              <p className="text-sm">{result.nameservers.join(", ")}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
