"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CopyButton from "@/components/ui/CopyButton";

type Options = {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const pickRandom = (set: string, count: number) => {
  const result: string[] = [];
  const array = new Uint32Array(count);
  crypto.getRandomValues(array);
  for (let i = 0; i < count; i += 1) {
    result.push(set[array[i] % set.length]);
  }
  return result;
};

const shuffle = (items: string[]) => {
  const array = [...items];
  const random = new Uint32Array(array.length);
  crypto.getRandomValues(random);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = random[i] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function PasswordGeneratorTool() {
  const [options, setOptions] = useState<Options>({
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const allowedSets = useMemo(() => {
    return Object.entries(options)
      .filter(([key, value]) => key !== "length" && value)
      .map(([key]) => key as keyof typeof CHARSETS);
  }, [options]);

  const handleGenerate = () => {
    if (allowedSets.length === 0) {
      setError("Select at least one character set.");
      return;
    }

    const length = clamp(options.length, 6, 64);
    const required = allowedSets.map((key) => pickRandom(CHARSETS[key], 1)[0]);
    const remainingLength = length - required.length;
    const pool = allowedSets.map((key) => CHARSETS[key]).join("");
    const remaining = pickRandom(pool, remainingLength);
    const nextPassword = shuffle([...required, ...remaining]).join("");

    setPassword(nextPassword);
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        <label htmlFor="password-output" className="text-sm font-medium text-[var(--color-ink)]">
          Generated password
        </label>
        <Input
          id="password-output"
          type="text"
          value={password}
          readOnly
          placeholder="Generate a password"
          className="mt-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <label htmlFor="password-length" className="text-sm font-medium text-[var(--color-ink)]">
            Length
          </label>
          <Input
            id="password-length"
            type="number"
            min={6}
            max={64}
            value={options.length}
            onChange={(event) =>
              setOptions((prev) => ({
                ...prev,
                length: clamp(Number(event.target.value) || 6, 6, 64),
              }))
            }
            className="mt-2"
          />
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <p className="text-sm font-medium text-[var(--color-ink)]">Character sets</p>
          <div className="mt-3 grid gap-2 text-sm text-[var(--color-muted-text)]">
            {(
              [
                ["lowercase", "Lowercase"],
                ["uppercase", "Uppercase"],
                ["numbers", "Numbers"],
                ["symbols", "Symbols"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(event) =>
                    setOptions((prev) => ({ ...prev, [key]: event.target.checked }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleGenerate}>
          Generate password
        </Button>
        <CopyButton text={password} label="Copy" />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
