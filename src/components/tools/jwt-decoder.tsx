"use client";

import { useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";

const decodeBase64Url = (value: string) => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = padded.length % 4;
  const base64 = padded + (padLength ? "=".repeat(4 - padLength) : "");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");

  const { decoded, error } = useMemo(() => {
    if (!token.trim()) return { decoded: null as null | { header: unknown; payload: any }, error: "" };
    const parts = token.split(".");
    if (parts.length < 2) {
      return { decoded: null, error: "JWTs need at least header and payload sections." };
    }
    try {
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      return { decoded: { header, payload }, error: "" };
    } catch {
      return { decoded: null, error: "Invalid token. Check the Base64URL sections." };
    }
  }, [token]);

  const expDate = useMemo(() => {
    if (!decoded?.payload?.exp) return null;
    const exp = Number(decoded.payload.exp);
    if (!Number.isFinite(exp)) return null;
    return new Date(exp * 1000);
  }, [decoded]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="jwt-input" className="text-sm font-medium text-[var(--ink)]">
          JWT token
        </label>
        <Textarea
          id="jwt-input"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          rows={5}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm font-medium text-[var(--ink)]">Header</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-[var(--muted)]">
            {decoded ? JSON.stringify(decoded.header, null, 2) : "-"}
          </pre>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-[var(--ink)]">Payload</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-[var(--muted)]">
            {decoded ? JSON.stringify(decoded.payload, null, 2) : "-"}
          </pre>
          {expDate ? (
            <p className="mt-3 text-xs text-[var(--muted)]">
              Expires: {expDate.toLocaleString()} (local)
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
