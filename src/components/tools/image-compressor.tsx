"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type CompressionResult = {
  url: string;
  size: number;
  width: number;
  height: number;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [previewUrl, result]);

  const originalSize = useMemo(() => (file ? formatBytes(file.size) : "-"), [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setResult(null);
    setError("");
  };

  const handleCompress = () => {
    if (!file || !previewUrl) {
      setError("Choose an image before compressing.");
      return;
    }

    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxWidth / image.width);
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas is not supported in this browser.");
        setIsProcessing(false);
        return;
      }
      ctx.drawImage(image, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Compression failed. Try a different image.");
            setIsProcessing(false);
            return;
          }
          if (result?.url) URL.revokeObjectURL(result.url);
          const url = URL.createObjectURL(blob);
          setResult({ url, size: blob.size, width, height });
          setError("");
          setIsProcessing(false);
        },
        "image/jpeg",
        quality
      );
    };
    image.onerror = () => {
      setError("Could not load that image.");
      setIsProcessing(false);
    };
    setIsProcessing(true);
    image.src = previewUrl;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--paper-surface)] p-6">
        <label htmlFor="image-input" className="text-sm font-medium text-[var(--ink)]">
          Upload image
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent-green)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--paper-surface)] hover:file:opacity-90"
        />
        <p className="mt-2 text-xs text-[var(--muted)]">
          Works best with JPEG, PNG, or WebP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <label className="text-sm font-medium text-[var(--ink)]" htmlFor="quality">
            Quality ({Math.round(quality * 100)}%)
          </label>
          <input
            id="quality"
            type="range"
            min={0.2}
            max={0.95}
            step={0.05}
            value={quality}
            onChange={(event) => setQuality(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </Card>
        <Card className="p-4">
          <label className="text-sm font-medium text-[var(--ink)]" htmlFor="max-width">
            Max width (px)
          </label>
          <Input
            id="max-width"
            type="number"
            min={300}
            max={4000}
            value={maxWidth}
            onChange={(event) => setMaxWidth(Number(event.target.value) || 0)}
            className="mt-2"
          />
        </Card>
      </div>

      <Button type="button" onClick={handleCompress} disabled={isProcessing}>
        {isProcessing ? "Compressing..." : "Compress image"}
      </Button>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm text-[var(--muted)]">Original</p>
          <p className="text-base font-medium text-[var(--ink)]">{originalSize}</p>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Original upload preview"
              className="mt-3 max-h-64 w-full rounded-lg object-contain"
            />
          ) : null}
        </Card>
        <Card className="p-4">
          <p className="text-sm text-[var(--muted)]">Compressed</p>
          <p className="text-base font-medium text-[var(--ink)]">
            {result ? formatBytes(result.size) : "-"}
          </p>
          {result ? (
            <div className="mt-3 space-y-3">
              <img
                src={result.url}
                alt="Compressed preview"
                className="max-h-64 w-full rounded-lg object-contain"
              />
              <p className="text-xs text-[var(--muted)]">
                {result.width} x {result.height} px
              </p>
              <a
                href={result.url}
                download={`compressed-${file?.name.replace(/\.[^/.]+$/, "")}.jpg`}
                className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
              >
                Download compressed image
              </a>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
