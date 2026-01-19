"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const rollDice = (count: number, sides: number) => {
  const values: number[] = [];
  const array = new Uint32Array(count);
  crypto.getRandomValues(array);
  for (let i = 0; i < count; i += 1) {
    values.push((array[i] % sides) + 1);
  }
  return values;
};

export default function DiceCoinTool() {
  const [mode, setMode] = useState<"coin" | "dice">("coin");
  const [diceCount, setDiceCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [result, setResult] = useState<string>("--");
  const [isAnimating, setIsAnimating] = useState(false);
  const [diceValues, setDiceValues] = useState<number[]>([]);

  const total = useMemo(() => {
    if (mode !== "dice" || result === "--") return null;
    const values = result.split(", ").map(Number);
    return values.reduce((sum, val) => sum + val, 0);
  }, [mode, result]);

  const handleFlip = () => {
    setIsAnimating(true);
    const byte = new Uint8Array(1);
    crypto.getRandomValues(byte);
    const next = byte[0] % 2 === 0 ? "Heads" : "Tails";
    setResult(next);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const handleRoll = () => {
    setIsAnimating(true);
    const count = Math.min(10, Math.max(1, Number(diceCount) || 1));
    const sideCount = Math.min(20, Math.max(2, Number(sides) || 6));
    const values = rollDice(count, sideCount);
    setDiceValues(values);
    setResult(values.join(", "));
    setTimeout(() => setIsAnimating(false), 450);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-2">
        <label htmlFor="randomizer-mode" className="text-sm font-medium text-[var(--ink)]">
          Mode
        </label>
        <select
          id="randomizer-mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as "coin" | "dice")}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          <option value="coin">Coin flip</option>
          <option value="dice">Dice roll</option>
        </select>
      </Card>

      {mode === "dice" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4 space-y-2">
            <label htmlFor="dice-count" className="text-sm font-medium text-[var(--ink)]">
              Dice count
            </label>
            <Input
              id="dice-count"
              type="number"
              min={1}
              max={10}
              value={diceCount}
              onChange={(event) => setDiceCount(event.target.value)}
            />
          </Card>
          <Card className="p-4 space-y-2">
            <label htmlFor="dice-sides" className="text-sm font-medium text-[var(--ink)]">
              Sides per die
            </label>
            <Input
              id="dice-sides"
              type="number"
              min={2}
              max={20}
              value={sides}
              onChange={(event) => setSides(event.target.value)}
            />
          </Card>
        </div>
      ) : null}

      <Button
        type="button"
        onClick={mode === "coin" ? handleFlip : handleRoll}
        disabled={isAnimating}
      >
        {mode === "coin" ? "Flip coin" : "Roll dice"}
      </Button>

      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          {mode === "coin" ? (
            <div className={`coin ${isAnimating ? "flip" : ""}`}>
              {result === "Tails" ? "T" : "H"}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {diceValues.slice(0, 6).map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className={`die ${isAnimating ? "roll" : ""}`}
                >
                  {Number(sides) > 6 ? value : (
                    <>
                      {Array.from({ length: value }).map((_, dotIndex) => (
                        <span key={dotIndex} className="die-dot" />
                      ))}
                    </>
                  )}
                </div>
              ))}
              {diceValues.length > 6 ? (
                <span className="text-xs text-[var(--muted)]">
                  +{diceValues.length - 6} more
                </span>
              ) : null}
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-[var(--ink)]">Result</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--accent-green)]">
          {result}
        </p>
        {total !== null ? (
          <p className="text-xs text-[var(--muted)]">Total: {total}</p>
        ) : null}
      </Card>
    </div>
  );
}
