"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const getOffsetMs = (timeZone: string, date: Date) => {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const lookup: Record<string, string> = {};
  parts.forEach((part) => {
    lookup[part.type] = part.value;
  });
  const asUtc = Date.UTC(
    Number(lookup.year),
    Number(lookup.month) - 1,
    Number(lookup.day),
    Number(lookup.hour),
    Number(lookup.minute),
    Number(lookup.second)
  );
  return asUtc - date.getTime();
};

const formatInZone = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

export default function TimezoneConverterTool() {
  const [sourceZone, setSourceZone] = useState("UTC");
  const [targetZone, setTargetZone] = useState("America/New_York");
  const [input, setInput] = useState("");

  const converted = useMemo(() => {
    if (!input) return null;
    const [datePart, timePart] = input.split("T");
    if (!datePart || !timePart) return null;
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    if (!year || !month || !day) return null;
    const assumedUtc = new Date(Date.UTC(year, month - 1, day, hour || 0, minute || 0));
    const offset = getOffsetMs(sourceZone, assumedUtc);
    return new Date(assumedUtc.getTime() - offset);
  }, [input, sourceZone]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="tz-input" className="text-sm font-medium text-[var(--ink)]">
            Source date and time
          </label>
          <Input
            id="tz-input"
            type="datetime-local"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tz-source" className="text-sm font-medium text-[var(--ink)]">
            Source timezone
          </label>
          <select
            id="tz-source"
            value={sourceZone}
            onChange={(event) => setSourceZone(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            {TIMEZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="tz-target" className="text-sm font-medium text-[var(--ink)]">
          Target timezone
        </label>
        <select
          id="tz-target"
          value={targetZone}
          onChange={(event) => setTargetZone(event.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          {TIMEZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm text-[var(--muted)]">Source time</p>
          <p className="text-base font-medium text-[var(--ink)]">
            {converted ? formatInZone(converted, sourceZone) : "Select a date"}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-[var(--muted)]">Converted time</p>
          <p className="text-base font-medium text-[var(--ink)]">
            {converted ? formatInZone(converted, targetZone) : "Select a date"}
          </p>
        </Card>
      </div>
    </div>
  );
}
