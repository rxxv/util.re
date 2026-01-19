"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean
        .split("")
        .map((char) => char + char)
        .join("")
    : clean;
  const numeric = parseInt(value, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((val) => Math.max(0, Math.min(255, Math.round(val))).toString(16).padStart(2, "0"))
    .join("")}`;

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case nr:
        h = (ng - nb) / d + (ng < nb ? 6 : 0);
        break;
      case ng:
        h = (nb - nr) / d + 2;
        break;
      default:
        h = (nr - ng) / d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hslToRgb = (h: number, s: number, l: number) => {
  if (s === 0) {
    const val = l * 255;
    return { r: val, g: val, b: val };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3) * 255;
  const g = hue2rgb(p, q, h) * 255;
  const b = hue2rgb(p, q, h - 1 / 3) * 255;
  return { r, g, b };
};

const luminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const normalize = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
};

const contrastRatio = (a: string, b: string) => {
  const lumA = luminance(a);
  const lumB = luminance(b);
  const light = Math.max(lumA, lumB);
  const dark = Math.min(lumA, lumB);
  return (light + 0.05) / (dark + 0.05);
};

export default function ColorTools() {
  const [baseColor, setBaseColor] = useState("#3b6b46");
  const [textColor, setTextColor] = useState("#2b2a24");

  const palette = useMemo(() => {
    const { h, s, l } = rgbToHsl(hexToRgb(baseColor));
    const steps = [-0.24, -0.12, 0, 0.12, 0.24];
    return steps.map((step) => {
      const next = hslToRgb(h, s, Math.max(0, Math.min(1, l + step)));
      return rgbToHex(next.r, next.g, next.b);
    });
  }, [baseColor]);

  const ratio = useMemo(() => contrastRatio(baseColor, textColor), [baseColor, textColor]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <label htmlFor="base-color" className="text-sm font-medium text-[var(--ink)]">
            Base color
          </label>
          <input
            id="base-color"
            type="color"
            value={baseColor}
            onChange={(event) => setBaseColor(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)]"
          />
        </Card>
        <Card className="p-4">
          <label htmlFor="text-color" className="text-sm font-medium text-[var(--ink)]">
            Text color
          </label>
          <input
            id="text-color"
            type="color"
            value={textColor}
            onChange={(event) => setTextColor(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)]"
          />
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-sm font-medium text-[var(--ink)]">Contrast ratio</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">{ratio.toFixed(2)}:1</p>
        <p className="text-xs text-[var(--muted)]">
          AA normal text requires 4.5:1. Large text requires 3:1.
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-5">
        {palette.map((color) => (
          <Card key={color} className="p-3">
            <div className="h-16 w-full rounded-lg" style={{ backgroundColor: color }} />
            <p className="mt-2 text-xs text-[var(--muted)]">{color}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
