"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import CopyButton from "@/components/ui/CopyButton";

type Preview = {
  dataUrl: string;
  name: string;
  size: number;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

export default function Base64ImageTool() {
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [mime, setMime] = useState("image/png");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview?.dataUrl) URL.revokeObjectURL(preview.dataUrl);
    };
  }, [preview]);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setEncoded(result);
      setPreview({ dataUrl: result, name: file.name, size: file.size });
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleDecode = () => {
    if (!decoded.trim()) {
      setError("Paste a Base64 string or data URL to decode.");
      return;
    }
    const dataUrl = decoded.startsWith("data:")
      ? decoded
      : `data:${mime};base64,${decoded.trim()}`;
    setPreview({ dataUrl, name: "decoded-image", size: decoded.length });
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--paper-surface)] p-6">
        <label htmlFor="base64-image-input" className="text-sm font-medium text-[var(--ink)]">
          Upload image to encode
        </label>
        <input
          id="base64-image-input"
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent-green)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--paper-surface)] hover:file:opacity-90"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="base64-image-encoded" className="text-sm font-medium text-[var(--ink)]">
            Base64 output
          </label>
          <Textarea id="base64-image-encoded" value={encoded} readOnly rows={6} className="text-xs" />
          <CopyButton text={encoded} label="Copy Base64" />
        </div>
        <div className="space-y-2">
          <label htmlFor="base64-image-decoded" className="text-sm font-medium text-[var(--ink)]">
            Paste Base64 to preview
          </label>
          <Textarea
            id="base64-image-decoded"
            value={decoded}
            onChange={(event) => setDecoded(event.target.value)}
            rows={6}
            className="text-xs"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={mime}
              onChange={(event) => setMime(event.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2 text-xs font-medium text-[var(--ink)]"
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">image/webp</option>
            </select>
            <Button type="button" size="sm" onClick={handleDecode}>
              Preview image
            </Button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {preview ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] p-4">
          <p className="text-sm font-medium text-[var(--ink)]">Preview</p>
          <p className="text-xs text-[var(--muted)]">
            {preview.name} ({formatBytes(preview.size)})
          </p>
          <img
            src={preview.dataUrl}
            alt="Base64 preview"
            className="mt-3 max-h-64 w-full rounded-lg object-contain"
          />
          <a
            href={preview.dataUrl}
            download={`${preview.name}.png`}
            className="mt-3 inline-flex rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            Download image
          </a>
        </div>
      ) : null}
    </div>
  );
}
