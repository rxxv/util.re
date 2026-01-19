"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const parseCsv = (input: string) => {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  row.push(current);
  rows.push(row);
  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
};

const toCsv = (data: Record<string, string>[]) => {
  if (data.length === 0) return "";
  const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
  const escapeCell = (value: string) => {
    if (/[",\n]/.test(value)) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };
  const lines = [headers.join(",")];
  data.forEach((row) => {
    lines.push(headers.map((header) => escapeCell(row[header] ?? "")).join(","));
  });
  return lines.join("\n");
};

export default function JsonCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleJsonToCsv = () => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        setError("JSON must be an array of objects.");
        return;
      }
      const normalized = parsed.map((item) => {
        const row: Record<string, string> = {};
        Object.entries(item ?? {}).forEach(([key, value]) => {
          row[key] = value === null || value === undefined ? "" : String(value);
        });
        return row;
      });
      setOutput(toCsv(normalized));
      setError("");
    } catch {
      setError("Invalid JSON input.");
    }
  };

  const handleCsvToJson = () => {
    try {
      const rows = parseCsv(input.trim());
      if (rows.length === 0) {
        setError("CSV input is empty.");
        return;
      }
      const headers = rows[0];
      const records = rows.slice(1).map((row) => {
        const record: Record<string, string> = {};
        headers.forEach((header, index) => {
          record[header] = row[index] ?? "";
        });
        return record;
      });
      setOutput(JSON.stringify(records, null, 2));
      setError("");
    } catch {
      setError("Could not parse CSV input.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="jsoncsv-input" className="text-sm font-medium text-[var(--color-ink)]">
            Input
          </label>
          <Textarea
            id="jsoncsv-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={8}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="jsoncsv-output" className="text-sm font-medium text-[var(--color-ink)]">
            Output
          </label>
          <Textarea id="jsoncsv-output" value={output} readOnly rows={8} />
          <CopyButton text={output} label="Copy output" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleJsonToCsv}>
          JSON to CSV
        </Button>
        <Button type="button" variant="outline" onClick={handleCsvToJson}>
          CSV to JSON
        </Button>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
