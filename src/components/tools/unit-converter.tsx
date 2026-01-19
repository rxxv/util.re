"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const lengthUnits = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
  mi: 1609.344,
};

const weightUnits = {
  g: 1,
  kg: 1000,
  lb: 453.59237,
  oz: 28.349523125,
};

type Category = "length" | "weight" | "temperature";

const formatValue = (value: number) => {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(6)).toString();
};

export default function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length");
  const [input, setInput] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  const output = useMemo(() => {
    const value = Number(input);
    if (!Number.isFinite(value)) return "";

    if (category === "length") {
      const meters = value * lengthUnits[from as keyof typeof lengthUnits];
      return formatValue(meters / lengthUnits[to as keyof typeof lengthUnits]);
    }

    if (category === "weight") {
      const grams = value * weightUnits[from as keyof typeof weightUnits];
      return formatValue(grams / weightUnits[to as keyof typeof weightUnits]);
    }

    if (category === "temperature") {
      const toCelsius = (val: number, unit: string) => {
        if (unit === "C") return val;
        if (unit === "F") return (val - 32) * (5 / 9);
        return val - 273.15;
      };
      const fromCelsius = (val: number, unit: string) => {
        if (unit === "C") return val;
        if (unit === "F") return val * (9 / 5) + 32;
        return val + 273.15;
      };
      const celsius = toCelsius(value, from);
      return formatValue(fromCelsius(celsius, to));
    }

    return "";
  }, [category, input, from, to]);

  const options = useMemo(() => {
    if (category === "length") {
      return [
        { value: "m", label: "Meters" },
        { value: "km", label: "Kilometers" },
        { value: "cm", label: "Centimeters" },
        { value: "mm", label: "Millimeters" },
        { value: "ft", label: "Feet" },
        { value: "in", label: "Inches" },
        { value: "mi", label: "Miles" },
      ];
    }
    if (category === "weight") {
      return [
        { value: "g", label: "Grams" },
        { value: "kg", label: "Kilograms" },
        { value: "lb", label: "Pounds" },
        { value: "oz", label: "Ounces" },
      ];
    }
    return [
      { value: "C", label: "Celsius" },
      { value: "F", label: "Fahrenheit" },
      { value: "K", label: "Kelvin" },
    ];
  }, [category]);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <label htmlFor="unit-category" className="text-sm font-medium text-[var(--ink)]">
          Category
        </label>
        <select
          id="unit-category"
          value={category}
          onChange={(event) => {
            const next = event.target.value as Category;
            setCategory(next);
            if (next === "length") {
              setFrom("m");
              setTo("ft");
            } else if (next === "weight") {
              setFrom("g");
              setTo("kg");
            } else {
              setFrom("C");
              setTo("F");
            }
          }}
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <label htmlFor="unit-input" className="text-sm font-medium text-[var(--ink)]">
            Value
          </label>
          <Input
            id="unit-input"
            type="number"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </Card>
        <Card className="p-4 space-y-2">
          <label htmlFor="unit-output" className="text-sm font-medium text-[var(--ink)]">
            Output
          </label>
          <Input id="unit-output" type="text" value={output} readOnly />
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <label htmlFor="unit-from" className="text-sm font-medium text-[var(--ink)]">
            From
          </label>
          <select
            id="unit-from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Card>
        <Card className="p-4 space-y-2">
          <label htmlFor="unit-to" className="text-sm font-medium text-[var(--ink)]">
            To
          </label>
          <select
            id="unit-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Card>
      </div>
    </div>
  );
}
