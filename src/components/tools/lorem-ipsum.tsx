"use client";

import { useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
];

const generateParagraph = (length: number) => {
  const words: string[] = [];
  for (let i = 0; i < length; i += 1) {
    const word = WORDS[i % WORDS.length];
    words.push(word);
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
};

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);

  const output = useMemo(() => {
    return Array.from({ length: count }, () => generateParagraph(40)).join("\n\n");
  }, [count]);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <label htmlFor="lorem-count" className="text-sm font-medium text-[var(--ink)]">
          Paragraphs
        </label>
        <Input
          id="lorem-count"
          type="number"
          min={1}
          max={10}
          value={count}
          onChange={(event) => setCount(Math.min(10, Math.max(1, Number(event.target.value) || 1)))}
          className="mt-2"
        />
      </Card>
      <Card className="p-4">
        <label htmlFor="lorem-output" className="text-sm font-medium text-[var(--ink)]">
          Output
        </label>
        <Textarea id="lorem-output" value={output} readOnly rows={8} className="mt-2" />
      </Card>
    </div>
  );
}
