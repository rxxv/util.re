"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const md5 = (input: string) => {
  const rotateLeft = (x: number, c: number) => (x << c) | (x >>> (32 - c));
  const toWordArray = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    const words: number[] = [];
    for (let i = 0; i < bytes.length; i += 1) {
      words[i >> 2] |= bytes[i] << ((i % 4) * 8);
    }
    const bitLen = bytes.length * 8;
    words[bitLen >> 5] |= 0x80 << (bitLen % 32);
    words[(((bitLen + 64) >>> 9) << 4) + 14] = bitLen;
    return words;
  };
  const words = toWordArray(input);
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const add = (x: number, y: number) => (x + y) >>> 0;
  const ff = (a1: number, b1: number, c1: number, d1: number, x: number, s: number, t: number) =>
    add(rotateLeft(add(add(a1, (b1 & c1) | (~b1 & d1)), add(x, t)), s), b1);
  const gg = (a1: number, b1: number, c1: number, d1: number, x: number, s: number, t: number) =>
    add(rotateLeft(add(add(a1, (b1 & d1) | (c1 & ~d1)), add(x, t)), s), b1);
  const hh = (a1: number, b1: number, c1: number, d1: number, x: number, s: number, t: number) =>
    add(rotateLeft(add(add(a1, b1 ^ c1 ^ d1), add(x, t)), s), b1);
  const ii = (a1: number, b1: number, c1: number, d1: number, x: number, s: number, t: number) =>
    add(rotateLeft(add(add(a1, c1 ^ (b1 | ~d1)), add(x, t)), s), b1);

  for (let i = 0; i < words.length; i += 16) {
    const oa = a;
    const ob = b;
    const oc = c;
    const od = d;

    a = ff(a, b, c, d, words[i + 0] || 0, 7, 0xd76aa478);
    d = ff(d, a, b, c, words[i + 1] || 0, 12, 0xe8c7b756);
    c = ff(c, d, a, b, words[i + 2] || 0, 17, 0x242070db);
    b = ff(b, c, d, a, words[i + 3] || 0, 22, 0xc1bdceee);
    a = ff(a, b, c, d, words[i + 4] || 0, 7, 0xf57c0faf);
    d = ff(d, a, b, c, words[i + 5] || 0, 12, 0x4787c62a);
    c = ff(c, d, a, b, words[i + 6] || 0, 17, 0xa8304613);
    b = ff(b, c, d, a, words[i + 7] || 0, 22, 0xfd469501);
    a = ff(a, b, c, d, words[i + 8] || 0, 7, 0x698098d8);
    d = ff(d, a, b, c, words[i + 9] || 0, 12, 0x8b44f7af);
    c = ff(c, d, a, b, words[i + 10] || 0, 17, 0xffff5bb1);
    b = ff(b, c, d, a, words[i + 11] || 0, 22, 0x895cd7be);
    a = ff(a, b, c, d, words[i + 12] || 0, 7, 0x6b901122);
    d = ff(d, a, b, c, words[i + 13] || 0, 12, 0xfd987193);
    c = ff(c, d, a, b, words[i + 14] || 0, 17, 0xa679438e);
    b = ff(b, c, d, a, words[i + 15] || 0, 22, 0x49b40821);

    a = gg(a, b, c, d, words[i + 1] || 0, 5, 0xf61e2562);
    d = gg(d, a, b, c, words[i + 6] || 0, 9, 0xc040b340);
    c = gg(c, d, a, b, words[i + 11] || 0, 14, 0x265e5a51);
    b = gg(b, c, d, a, words[i + 0] || 0, 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, words[i + 5] || 0, 5, 0xd62f105d);
    d = gg(d, a, b, c, words[i + 10] || 0, 9, 0x02441453);
    c = gg(c, d, a, b, words[i + 15] || 0, 14, 0xd8a1e681);
    b = gg(b, c, d, a, words[i + 4] || 0, 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, words[i + 9] || 0, 5, 0x21e1cde6);
    d = gg(d, a, b, c, words[i + 14] || 0, 9, 0xc33707d6);
    c = gg(c, d, a, b, words[i + 3] || 0, 14, 0xf4d50d87);
    b = gg(b, c, d, a, words[i + 8] || 0, 20, 0x455a14ed);
    a = gg(a, b, c, d, words[i + 13] || 0, 5, 0xa9e3e905);
    d = gg(d, a, b, c, words[i + 2] || 0, 9, 0xfcefa3f8);
    c = gg(c, d, a, b, words[i + 7] || 0, 14, 0x676f02d9);
    b = gg(b, c, d, a, words[i + 12] || 0, 20, 0x8d2a4c8a);

    a = hh(a, b, c, d, words[i + 5] || 0, 4, 0xfffa3942);
    d = hh(d, a, b, c, words[i + 8] || 0, 11, 0x8771f681);
    c = hh(c, d, a, b, words[i + 11] || 0, 16, 0x6d9d6122);
    b = hh(b, c, d, a, words[i + 14] || 0, 23, 0xfde5380c);
    a = hh(a, b, c, d, words[i + 1] || 0, 4, 0xa4beea44);
    d = hh(d, a, b, c, words[i + 4] || 0, 11, 0x4bdecfa9);
    c = hh(c, d, a, b, words[i + 7] || 0, 16, 0xf6bb4b60);
    b = hh(b, c, d, a, words[i + 10] || 0, 23, 0xbebfbc70);
    a = hh(a, b, c, d, words[i + 13] || 0, 4, 0x289b7ec6);
    d = hh(d, a, b, c, words[i + 0] || 0, 11, 0xeaa127fa);
    c = hh(c, d, a, b, words[i + 3] || 0, 16, 0xd4ef3085);
    b = hh(b, c, d, a, words[i + 6] || 0, 23, 0x04881d05);
    a = hh(a, b, c, d, words[i + 9] || 0, 4, 0xd9d4d039);
    d = hh(d, a, b, c, words[i + 12] || 0, 11, 0xe6db99e5);
    c = hh(c, d, a, b, words[i + 15] || 0, 16, 0x1fa27cf8);
    b = hh(b, c, d, a, words[i + 2] || 0, 23, 0xc4ac5665);

    a = ii(a, b, c, d, words[i + 0] || 0, 6, 0xf4292244);
    d = ii(d, a, b, c, words[i + 7] || 0, 10, 0x432aff97);
    c = ii(c, d, a, b, words[i + 14] || 0, 15, 0xab9423a7);
    b = ii(b, c, d, a, words[i + 5] || 0, 21, 0xfc93a039);
    a = ii(a, b, c, d, words[i + 12] || 0, 6, 0x655b59c3);
    d = ii(d, a, b, c, words[i + 3] || 0, 10, 0x8f0ccc92);
    c = ii(c, d, a, b, words[i + 10] || 0, 15, 0xffeff47d);
    b = ii(b, c, d, a, words[i + 1] || 0, 21, 0x85845dd1);
    a = ii(a, b, c, d, words[i + 8] || 0, 6, 0x6fa87e4f);
    d = ii(d, a, b, c, words[i + 15] || 0, 10, 0xfe2ce6e0);
    c = ii(c, d, a, b, words[i + 6] || 0, 15, 0xa3014314);
    b = ii(b, c, d, a, words[i + 13] || 0, 21, 0x4e0811a1);
    a = ii(a, b, c, d, words[i + 4] || 0, 6, 0xf7537e82);
    d = ii(d, a, b, c, words[i + 11] || 0, 10, 0xbd3af235);
    c = ii(c, d, a, b, words[i + 2] || 0, 15, 0x2ad7d2bb);
    b = ii(b, c, d, a, words[i + 9] || 0, 21, 0xeb86d391);

    a = add(a, oa);
    b = add(b, ob);
    c = add(c, oc);
    d = add(d, od);
  }

  const toHexWord = (value: number) =>
    [value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return `${toHexWord(a)}${toHexWord(b)}${toHexWord(c)}${toHexWord(d)}`;
};

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Enter text to hash.");
      return;
    }
    setError("");

    if (algorithm === "MD5") {
      setOutput(md5(input));
      return;
    }

    try {
      const buffer = new TextEncoder().encode(input);
      const result = await crypto.subtle.digest(algorithm, buffer);
      setOutput(toHex(result));
    } catch {
      setError("Hashing failed. Try again.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="hash-input" className="text-sm font-medium text-[var(--color-ink)]">
          Input text
        </label>
        <Textarea
          id="hash-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <label htmlFor="hash-algorithm" className="text-sm font-medium text-[var(--color-ink)]">
            Algorithm
          </label>
          <select
            id="hash-algorithm"
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            <option value="MD5">MD5</option>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
          </select>
        </div>
        <div className="flex items-end gap-3">
          <Button type="button" onClick={handleGenerate}>
            Generate hash
          </Button>
          <Button type="button" variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 space-y-2">
        <label htmlFor="hash-output" className="text-sm font-medium text-[var(--color-ink)]">
          Output
        </label>
        <Textarea id="hash-output" value={output} readOnly rows={3} />
        <CopyButton text={output} label="Copy hash" />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
