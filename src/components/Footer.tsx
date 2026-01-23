import Link from "next/link";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col gap-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-[var(--text)]">{siteConfig.name}</p>
          <p>No logins. No tracking. Long live the handmade web.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/#directory"
            className="transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Browse tools
          </Link>
          <a
            href="https://github.com"
            className="transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
