import Card from "@/components/ui/Card";

const rows = [
  { title: "JSON Formatter", detail: "Pretty print/minify", stat: "98%" },
  { title: "Password Generator", detail: "Strong, local", stat: "92%" },
  { title: "QR Code", detail: "Instant export", stat: "95%" },
  { title: "Base64 Encode", detail: "Fast conversions", stat: "90%" },
  { title: "Image Compressor", detail: "Smaller files", stat: "87%" },
  { title: "Timestamp Converter", detail: "UTC + local", stat: "93%" },
];

export default function DemoFeedCard() {
  return (
    <Card className="w-full max-w-xl space-y-4 bg-[var(--surface-2)] p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        <span>Live tools</span>
        <span>Quality</span>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.title}
            className="flex items-center justify-between border-b border-dashed border-[var(--border)] pb-2 text-sm text-[var(--text)] last:border-b-0 last:pb-0"
          >
            <div>
              <p className="font-semibold">{row.title}</p>
              <p className="text-xs text-[var(--muted)]">{row.detail}</p>
            </div>
            <span className="text-xs text-[var(--accent)]">{row.stat}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
