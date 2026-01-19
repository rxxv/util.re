"use client";

import { useEffect, useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";

export default function QrCodeTool() {
  const [text, setText] = useState("https://example.com");
  const [sizeInput, setSizeInput] = useState("240");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  const size = useMemo(() => {
    const parsed = Number(sizeInput);
    if (!Number.isFinite(parsed)) return 240;
    return Math.min(600, Math.max(120, Math.round(parsed)));
  }, [sizeInput]);

  useEffect(() => {
    let active = true;
    const generate = async () => {
      if (!text.trim()) {
        if (active) {
          setDataUrl("");
          setError("");
        }
        return;
      }
      try {
        const { toDataURL } = await import("qrcode");
        const url = await toDataURL(text.trim(), {
          width: size,
          margin: 1,
          color: { dark: "#111111", light: "#ffffff" },
          errorCorrectionLevel: "M",
        });
        if (active) {
          setDataUrl(url);
          setError("");
        }
      } catch {
        if (active) {
          setDataUrl("");
          setError("Could not generate QR code. Try shorter text.");
        }
      }
    };
    generate();
    return () => {
      active = false;
    };
  }, [text, size]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="qr-input" className="text-sm font-medium text-[var(--ink)]">
          Text or URL
        </label>
        <Textarea
          id="qr-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
        />
      </div>
      <Card className="p-4">
        <label htmlFor="qr-size" className="text-sm font-medium text-[var(--ink)]">
          Size (px)
        </label>
        <select
          id="qr-size"
          value={sizeInput}
          onChange={(event) => setSizeInput(event.target.value)}
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2.5 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
        >
          {["160", "200", "240", "280", "320", "400", "480", "600"].map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </Card>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {dataUrl ? (
        <Card className="p-4 text-center">
          <img src={dataUrl} alt="Generated QR code" className="mx-auto" />
          <a
            href={dataUrl}
            download="qr-code.png"
            className="mt-3 inline-flex rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
          >
            Download PNG
          </a>
        </Card>
      ) : null}
    </div>
  );
}
