"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const parseDate = (value: string) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
};

const diffYmd = (start: Date, end: Date) => {
  let from = new Date(start);
  let to = new Date(end);
  if (from > to) {
    [from, to] = [to, from];
  }

  let years = to.getUTCFullYear() - from.getUTCFullYear();
  let months = to.getUTCMonth() - from.getUTCMonth();
  let days = to.getUTCDate() - from.getUTCDate();

  if (days < 0) {
    const prevMonth = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));
    days += prevMonth.getUTCDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
};

export default function AgeDateDifferenceTool() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const summary = useMemo(() => {
    const startDate = parseDate(start);
    const endDate = parseDate(end);
    if (!startDate || !endDate) return null;
    const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const ymd = diffYmd(startDate, endDate);
    return { diffDays, ...ymd };
  }, [start, end]);

  const handleToday = () => {
    const today = new Date();
    const value = today.toISOString().slice(0, 10);
    setEnd(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <label htmlFor="date-start" className="text-sm font-medium text-[var(--ink)]">
            Start date
          </label>
          <Input
            id="date-start"
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </Card>
        <Card className="p-4 space-y-2">
          <label htmlFor="date-end" className="text-sm font-medium text-[var(--ink)]">
            End date
          </label>
          <Input
            id="date-end"
            type="date"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
          <Button type="button" size="sm" onClick={handleToday}>
            Use today
          </Button>
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--ink)]">Difference</p>
        {summary ? (
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <p>{summary.years} years, {summary.months} months, {summary.days} days</p>
            <p>{summary.diffDays} total days</p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-[var(--muted)]">Choose two dates to compare.</p>
        )}
      </Card>
    </div>
  );
}
