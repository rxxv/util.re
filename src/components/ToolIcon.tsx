import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/cn";

const IconSvg = ({ children, className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-5 w-5", className)}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const icons: Record<string, ReactElement> = {
  "text-counter": (
    <IconSvg>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h7" />
    </IconSvg>
  ),
  "base64-encode-decode": (
    <IconSvg>
      <path d="M6 7h4" />
      <path d="M14 7h4" />
      <path d="M6 12h12" />
      <path d="M6 17h4" />
      <path d="M14 17h4" />
    </IconSvg>
  ),
  "json-formatter": (
    <IconSvg>
      <path d="M8 6c-2 0-2 3-2 6s0 6 2 6" />
      <path d="M16 6c2 0 2 3 2 6s0 6-2 6" />
    </IconSvg>
  ),
  "url-encode-decode": (
    <IconSvg>
      <path d="M9 7h3a3 3 0 0 1 0 6H9" />
      <path d="M15 11h-3a3 3 0 0 1 0-6h3" />
    </IconSvg>
  ),
  "unix-timestamp": (
    <IconSvg>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </IconSvg>
  ),
  "image-compressor": (
    <IconSvg>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 13l2-2 3 3 3-4 2 3" />
    </IconSvg>
  ),
  "password-generator": (
    <IconSvg>
      <rect x="5" y="11" width="14" height="8" rx="2" />
      <path d="M8 11V9a4 4 0 0 1 8 0v2" />
    </IconSvg>
  ),
  "password-strength": (
    <IconSvg>
      <path d="M12 4l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V7l7-3z" />
      <path d="M9 12h6" />
    </IconSvg>
  ),
  "uuid-generator": (
    <IconSvg>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </IconSvg>
  ),
  "jwt-decoder": (
    <IconSvg>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </IconSvg>
  ),
  "hash-generator": (
    <IconSvg>
      <path d="M8 4l-2 16" />
      <path d="M14 4l-2 16" />
      <path d="M4 9h16" />
      <path d="M3 15h16" />
    </IconSvg>
  ),
  "qr-code": (
    <IconSvg>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <path d="M14 14h2v2h-2z" />
      <path d="M18 14h2v2h-2z" />
      <path d="M14 18h2v2h-2z" />
    </IconSvg>
  ),
  "markdown-preview": (
    <IconSvg>
      <path d="M5 7h14v10H5z" />
      <path d="M7 15V9l2 2 2-2v6" />
      <path d="M13 11h2l1 2 1-2h2" />
    </IconSvg>
  ),
  "color-tools": (
    <IconSvg>
      <circle cx="12" cy="12" r="7" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
      <path d="M12 12h.01" />
    </IconSvg>
  ),
  "css-formatter": (
    <IconSvg>
      <path d="M8 5l-3 7 3 7" />
      <path d="M16 5l3 7-3 7" />
    </IconSvg>
  ),
  "html-entities": (
    <IconSvg>
      <path d="M6 8l-3 4 3 4" />
      <path d="M18 8l3 4-3 4" />
      <path d="M10 18l4-12" />
    </IconSvg>
  ),
  "regex-tester": (
    <IconSvg>
      <circle cx="8" cy="12" r="3" />
      <path d="M14 8l6 8" />
      <path d="M14 16l6-8" />
    </IconSvg>
  ),
  "lorem-ipsum": (
    <IconSvg>
      <path d="M5 7h14" />
      <path d="M5 12h10" />
      <path d="M5 17h7" />
    </IconSvg>
  ),
  "timezone-converter": (
    <IconSvg>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </IconSvg>
  ),
  "base64-image": (
    <IconSvg>
      <rect x="4" y="5" width="10" height="10" rx="2" />
      <path d="M15 9h5" />
      <path d="M15 13h5" />
    </IconSvg>
  ),
  "json-csv": (
    <IconSvg>
      <path d="M5 6h14" />
      <path d="M5 10h14" />
      <path d="M5 14h14" />
      <path d="M5 18h14" />
    </IconSvg>
  ),
  "case-converter": (
    <IconSvg>
      <path d="M6 16h5" />
      <path d="M6 8h8" />
      <path d="M14 16h4" />
    </IconSvg>
  ),
  "unit-converter": (
    <IconSvg>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
      <path d="M8 8v8" />
      <path d="M16 8v8" />
    </IconSvg>
  ),
  "age-date-difference": (
    <IconSvg>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M8 12h8" />
    </IconSvg>
  ),
  "date-diff-days": (
    <IconSvg>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M9 13h6" />
    </IconSvg>
  ),
  "bmi-calculator": (
    <IconSvg>
      <path d="M6 7h12" />
      <path d="M6 12h8" />
      <path d="M6 17h6" />
    </IconSvg>
  ),
  "dice-coin": (
    <IconSvg>
      <circle cx="8" cy="12" r="3" />
      <rect x="13" y="9" width="6" height="6" rx="1" />
    </IconSvg>
  ),
  "email-url-validator": (
    <IconSvg>
      <path d="M4 7h16v10H4z" />
      <path d="M4 7l8 6 8-6" />
    </IconSvg>
  ),
  "tiktok-profile": (
    <IconSvg>
      <path d="M12 5v8a3 3 0 1 1-2-2" />
      <path d="M12 5c1.5 2 3.5 3 6 3" />
    </IconSvg>
  ),
  "website-status": (
    <IconSvg>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </IconSvg>
  ),
  "ip-asn-lookup": (
    <IconSvg>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </IconSvg>
  ),
  "dns-lookup": (
    <IconSvg>
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="12" r="2" />
      <path d="M9 12h6" />
    </IconSvg>
  ),
  "whois-lookup": (
    <IconSvg>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c1.5-3 12.5-3 14 0" />
    </IconSvg>
  ),
  "opengraph-preview": (
    <IconSvg>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M7 9h10" />
      <path d="M7 13h6" />
    </IconSvg>
  ),
  "ssl-checker": (
    <IconSvg>
      <rect x="6" y="11" width="12" height="8" rx="2" />
      <path d="M9 11V9a3 3 0 0 1 6 0v2" />
    </IconSvg>
  ),
  "ping-latency": (
    <IconSvg>
      <path d="M4 12h4l2 4 3-8 2 4h5" />
    </IconSvg>
  ),
};

export default function ToolIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <span className={cn("text-[var(--accent)]", className)}>
      {icons[slug] ?? icons["text-counter"]}
    </span>
  );
}
