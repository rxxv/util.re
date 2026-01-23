"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type DnsAnswer = {
  name: string;
  type: string;
  ttl: number;
  data: string;
};

const recordTypes = ["A", "AAAA", "CNAME", "MX", "TXT"];

export default function DnsLookupTool() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [answers, setAnswers] = useState<DnsAnswer[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    setError("");
    setAnswers([]);
    const trimmed = domain.trim();
    if (!trimmed) {
      setError("Enter a domain to lookup.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: trimmed, type: recordType }),
      });
      const data = (await response.json()) as { answers: DnsAnswer[]; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "DNS lookup failed.");
      }
      setAnswers(data.answers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "DNS lookup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px]">
        <div className="space-y-2">
          <label className="text-sm text-[var(--muted)]" htmlFor="dns-domain">
            Domain
          </label>
          <Input
            id="dns-domain"
            placeholder="example.com"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[var(--muted)]" htmlFor="dns-type">
            Record type
          </label>
          <select
            id="dns-type"
            value={recordType}
            onChange={(event) => setRecordType(event.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text)] shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {recordTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="button" variant="primary" onClick={handleLookup}>
        {isLoading ? "Looking up..." : "Lookup DNS"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        Uses Google DNS over HTTPS for reliable public DNS results.
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {answers.length ? (
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div
              key={`${answer.name}-${index}`}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-3 text-sm text-[var(--text)]"
            >
              <p className="text-xs text-[var(--muted)]">{answer.name}</p>
              <p className="mt-1 font-semibold">{answer.data}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {answer.type} • TTL {answer.ttl}s
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
