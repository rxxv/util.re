"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const isValidEmail = (value: string) => {
  if (!value) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const isValidUrl = (value: string) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
};

export default function EmailUrlValidatorTool() {
  const [mode, setMode] = useState<"email" | "url">("email");
  const [value, setValue] = useState("");

  const { isValid, hint } = useMemo(() => {
    if (!value) return { isValid: null as null | boolean, hint: "Enter a value." };
    if (mode === "email") {
      return {
        isValid: isValidEmail(value),
        hint: "Valid emails look like name@example.com",
      };
    }
    return {
      isValid: isValidUrl(value),
      hint: "Valid URLs include https://example.com",
    };
  }, [mode, value]);

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-2">
        <label htmlFor="validator-mode" className="text-sm font-medium text-[var(--ink)]">
          Mode
        </label>
        <select
          id="validator-mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as "email" | "url")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          <option value="email">Email</option>
          <option value="url">URL</option>
        </select>
      </Card>

      <Card className="p-4 space-y-2">
        <label htmlFor="validator-input" className="text-sm font-medium text-[var(--ink)]">
          {mode === "email" ? "Email address" : "URL"}
        </label>
        <Input
          id="validator-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={mode === "email" ? "name@example.com" : "https://example.com"}
        />
        <p className="text-xs text-[var(--muted)]">{hint}</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--ink)]">Status</p>
        <p
          className={`mt-2 text-xl font-semibold ${
            isValid === null
              ? "text-[var(--muted)]"
              : isValid
              ? "text-[var(--accent-green)]"
              : "text-red-600"
          }`}
        >
          {isValid === null ? "--" : isValid ? "Valid" : "Invalid"}
        </p>
      </Card>
    </div>
  );
}
