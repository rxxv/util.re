"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const parseTimestamp = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) return null;
  return Math.trunc(numeric);
};

export default function UnixTimestampTool() {
  const [seconds, setSeconds] = useState("");
  const [milliseconds, setMilliseconds] = useState("");
  const [error, setError] = useState("");

  const handleSecondsChange = (value: string) => {
    setSeconds(value);
    if (!value.trim()) {
      setMilliseconds("");
      setError("");
      return;
    }
    const parsed = parseTimestamp(value);
    if (parsed === null) {
      setError("Enter a valid number of seconds.");
      return;
    }
    setError("");
    setMilliseconds(String(parsed * 1000));
  };

  const handleMillisecondsChange = (value: string) => {
    setMilliseconds(value);
    if (!value.trim()) {
      setSeconds("");
      setError("");
      return;
    }
    const parsed = parseTimestamp(value);
    if (parsed === null) {
      setError("Enter a valid number of milliseconds.");
      return;
    }
    setError("");
    setSeconds(String(Math.trunc(parsed / 1000)));
  };

  const handleNow = () => {
    const nowMs = Date.now();
    setSeconds(String(Math.trunc(nowMs / 1000)));
    setMilliseconds(String(nowMs));
    setError("");
  };

  const date = useMemo(() => {
    const msValue = parseTimestamp(milliseconds);
    if (msValue !== null) {
      return new Date(msValue);
    }
    const secValue = parseTimestamp(seconds);
    if (secValue !== null) {
      return new Date(secValue * 1000);
    }
    return null;
  }, [milliseconds, seconds]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="timestamp-seconds" className="text-sm font-medium text-[var(--color-ink)]">
            Seconds
          </label>
          <Input
            id="timestamp-seconds"
            type="text"
            inputMode="numeric"
            value={seconds}
            onChange={(event) => handleSecondsChange(event.target.value)}
            placeholder="1700000000"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="timestamp-milliseconds"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Milliseconds
          </label>
          <Input
            id="timestamp-milliseconds"
            type="text"
            inputMode="numeric"
            value={milliseconds}
            onChange={(event) => handleMillisecondsChange(event.target.value)}
            placeholder="1700000000000"
          />
        </div>
      </div>

      <Button type="button" onClick={handleNow}>
        Use current time
      </Button>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm text-[var(--color-muted-text)]">Local time</p>
          <p className="text-base font-medium text-[var(--color-ink)]">
            {date ? date.toLocaleString() : "Enter a timestamp to convert"}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-[var(--color-muted-text)]">UTC</p>
          <p className="text-base font-medium text-[var(--color-ink)]">
            {date ? date.toUTCString() : "Enter a timestamp to convert"}
          </p>
        </Card>
      </div>
    </div>
  );
}
