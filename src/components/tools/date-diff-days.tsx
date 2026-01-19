"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const parseDate = (value: string) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
};

export default function DateDiffDaysTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const diffDays = useMemo(() => {
    const startDate = parseDate(start);
    const endDate = parseDate(end);
    if (!startDate || !endDate) return null;
    const diffMs = endDate.getTime() - startDate.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }, [start, end]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <label htmlFor="days-start" className="text-sm font-medium text-[var(--ink)]">
            Start date
          </label>
          <Input
            id="days-start"
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </Card>
        <Card className="p-4 space-y-2">
          <label htmlFor="days-end" className="text-sm font-medium text-[var(--ink)]">
            End date
          </label>
          <Input
            id="days-end"
            type="date"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--ink)]">Total days</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--accent-green)]">
          {diffDays === null ? "--" : diffDays}
        </p>
        <p className="text-xs text-[var(--muted)]">
          Negative means the end date is before the start date.
        </p>
      </Card>
    </div>
  );
}
