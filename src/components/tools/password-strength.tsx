"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const scorePassword = (value: string) => {
  let score = 0;
  const length = value.length;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(value);
  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean)
    .length;
  const common = /(password|1234|qwerty|letmein|admin)/i.test(value);

  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (variety >= 2) score += 1;
  if (variety >= 3) score += 1;
  if (common) score = Math.max(0, score - 2);

  return Math.min(4, score);
};

const getLabel = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    default:
      return "Strong";
  }
};

export default function PasswordStrengthTool() {
  const [value, setValue] = useState("");

  const { score, tips, crackTime } = useMemo(() => {
    const scoreValue = scorePassword(value);
    const suggestions: string[] = [];
    if (value.length < 12) suggestions.push("Use at least 12 characters.");
    if (!/[A-Z]/.test(value)) suggestions.push("Add an uppercase letter.");
    if (!/[a-z]/.test(value)) suggestions.push("Add a lowercase letter.");
    if (!/\d/.test(value)) suggestions.push("Add a number.");
    if (!/[^a-zA-Z0-9]/.test(value)) suggestions.push("Add a symbol.");
    if (/(password|1234|qwerty|letmein|admin)/i.test(value)) {
      suggestions.push("Avoid common words and patterns.");
    }
    const poolSize =
      (/[a-z]/.test(value) ? 26 : 0) +
      (/[A-Z]/.test(value) ? 26 : 0) +
      (/\d/.test(value) ? 10 : 0) +
      (/[^a-zA-Z0-9]/.test(value) ? 32 : 0);
    const entropy = value.length && poolSize ? value.length * Math.log2(poolSize) : 0;
    const guessesPerSecond = 1e9;
    const seconds = entropy ? Math.pow(2, entropy) / guessesPerSecond : 0;
    const formatTime = (totalSeconds: number) => {
      if (!Number.isFinite(totalSeconds) || totalSeconds <= 1) return "instant";
      const units = [
        { label: "year", seconds: 60 * 60 * 24 * 365 },
        { label: "day", seconds: 60 * 60 * 24 },
        { label: "hour", seconds: 60 * 60 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
      ];
      let remaining = totalSeconds;
      const parts: string[] = [];
      for (const unit of units) {
        const value = Math.floor(remaining / unit.seconds);
        if (value > 0) {
          parts.push(`${value} ${unit.label}${value === 1 ? "" : "s"}`);
          remaining -= value * unit.seconds;
        }
        if (parts.length === 2) break;
      }
      return parts.length ? parts.join(" ") : "seconds";
    };
    const crackEstimate = value ? formatTime(seconds) : "enter a password";

    return { score: scoreValue, tips: suggestions, crackTime: crackEstimate };
  }, [value]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password-strength" className="text-sm font-medium text-[var(--ink)]">
          Password
        </label>
        <Input
          id="password-strength"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter a password to check"
        />
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted)]">Strength</span>
          <span className="text-[var(--accent-green)]">{getLabel(score)}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--paper-bg)]">
          <div
            className="h-2 rounded-full bg-[var(--accent-green)] transition"
            style={{ width: `${(score / 4) * 100}%` }}
          />
        </div>
        <p className="text-sm font-semibold text-[var(--accent-green)]">
          Estimated time to crack: {crackTime}
        </p>
        {value ? (
          <ul className="space-y-1 text-xs text-[var(--muted)]">
            {tips.length === 0 ? (
              <li>Looks solid. Keep it unique.</li>
            ) : (
              tips.map((tip) => <li key={tip}>{tip}</li>)
            )}
          </ul>
        ) : (
          <p className="text-xs text-[var(--muted)]">
            Start typing to see feedback.
          </p>
        )}
      </Card>
    </div>
  );
}
