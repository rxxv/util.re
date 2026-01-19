"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const classifyBmi = (bmi: number) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

export default function BmiCalculatorTool() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bmi = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return null;

    if (unit === "metric") {
      const meters = h / 100;
      return w / (meters * meters);
    }
    return (w / (h * h)) * 703;
  }, [height, weight, unit]);

  const label = bmi ? classifyBmi(bmi) : "--";

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-2">
        <label htmlFor="bmi-unit" className="text-sm font-medium text-[var(--ink)]">
          Units
        </label>
        <select
          id="bmi-unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value as "metric" | "imperial")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          <option value="metric">Metric (cm, kg)</option>
          <option value="imperial">Imperial (in, lb)</option>
        </select>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4 space-y-2">
          <label htmlFor="bmi-height" className="text-sm font-medium text-[var(--ink)]">
            Height ({unit === "metric" ? "cm" : "in"})
          </label>
          <Input
            id="bmi-height"
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </Card>
        <Card className="p-4 space-y-2">
          <label htmlFor="bmi-weight" className="text-sm font-medium text-[var(--ink)]">
            Weight ({unit === "metric" ? "kg" : "lb"})
          </label>
          <Input
            id="bmi-weight"
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--ink)]">BMI</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--accent-green)]">
          {bmi ? bmi.toFixed(1) : "--"}
        </p>
        <p className="text-xs text-[var(--muted)]">Category: {label}</p>
      </Card>
    </div>
  );
}
