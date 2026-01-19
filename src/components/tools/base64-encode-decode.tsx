"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

const encodeUtf8 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const decodeUtf8 = (value: string) => {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export default function Base64Tool() {
  const [plainText, setPlainText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setError("");
      setBase64Text(encodeUtf8(plainText));
    } catch {
      setError("Could not encode this text.");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      setPlainText(decodeUtf8(base64Text.trim()));
    } catch {
      setError("That does not look like valid Base64.");
    }
  };

  const handleClear = () => {
    setPlainText("");
    setBase64Text("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="base64-plain" className="text-sm font-medium text-[var(--color-ink)]">
            Text to encode
          </label>
          <Textarea
            id="base64-plain"
            value={plainText}
            onChange={(event) => setPlainText(event.target.value)}
            rows={6}
            placeholder="Hello world"
          />
          <CopyButton text={plainText} label="Copy text" />
        </div>
        <div className="space-y-2">
          <label htmlFor="base64-encoded" className="text-sm font-medium text-[var(--color-ink)]">
            Base64 to decode
          </label>
          <Textarea
            id="base64-encoded"
            value={base64Text}
            onChange={(event) => setBase64Text(event.target.value)}
            rows={6}
            placeholder="SGVsbG8gd29ybGQ="
          />
          <CopyButton text={base64Text} label="Copy Base64" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleEncode}>
          Encode to Base64
        </Button>
        <Button type="button" variant="outline" onClick={handleDecode}>
          Decode from Base64
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
