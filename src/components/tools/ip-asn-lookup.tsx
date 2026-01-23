"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type IpResult = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  isp?: string;
  asn?: string;
  org?: string;
};

export default function IpAsnLookupTool() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<IpResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    setError("");
    setResult(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: ip.trim() }),
      });
      const data = (await response.json()) as IpResult & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to lookup the IP.");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to lookup the IP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[var(--muted)]" htmlFor="ip-input">
          IP address (optional)
        </label>
        <Input
          id="ip-input"
          placeholder="Leave empty for your public IP"
          value={ip}
          onChange={(event) => setIp(event.target.value)}
        />
      </div>
      <Button type="button" variant="primary" onClick={handleLookup}>
        {isLoading ? "Looking up..." : "Lookup IP"}
      </Button>
      <p className="text-xs text-[var(--muted)]">
        This tool queries a public IP API. Your IP or input will be sent to the service.
      </p>
      {error ? <p className="text-sm text-[var(--accent)]">{error}</p> : null}
      {result ? (
        <div className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)] sm:grid-cols-2">
          <div>
            <p className="text-xs text-[var(--muted)]">IP</p>
            <p className="text-base font-semibold">{result.ip}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">ASN</p>
            <p className="text-base font-semibold">{result.asn || "Unknown"}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Organization</p>
            <p className="text-base font-semibold">
              {result.org || result.isp || "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Location</p>
            <p className="text-base font-semibold">
              {[result.city, result.region, result.country]
                .filter(Boolean)
                .join(", ") || "Unknown"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
