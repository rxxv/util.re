# Security Hardening Notes

This document describes the security controls implemented in the app and how to tune them for production.

## App-level protections (Next.js)

### Rate limiting
Server routes are rate limited in-process (per IP, per route).

- Light endpoints: 60 req/min/IP, burst 20
- Heavy endpoints (external fetches / TLS): 10 req/min/IP, burst 5
- 429 responses include `Retry-After`

Implementation: `src/lib/rateLimit.ts` and usage in:
`src/app/api/status/route.ts`, `src/app/api/ip/route.ts`,
`src/app/api/dns/route.ts`, `src/app/api/whois/route.ts`,
`src/app/api/opengraph/route.ts`, `src/app/api/ssl/route.ts`,
`src/app/api/ping/route.ts`, `src/app/api/tiktok/route.ts`.

Note: in-memory rate limiting is per-instance. For multi-server setups, enforce limits at the CDN/WAF or Nginx layer.

### SSRF guard (basic)
`src/lib/ssrf.ts` blocks obvious internal/metadata hosts (localhost, RFC1918, link-local, loopback).
Applied to URL and domain input validators for remote fetch routes.

### Request timeouts
`src/lib/serverFetch.ts` adds timeouts to external fetches to prevent hanging requests.

### XSS hardening
The Markdown preview sanitizes link URLs to avoid `javascript:`/unsafe schemes.
(`src/components/tools/markdown-preview.tsx`)

### Security headers
Configured in `next.config.ts`:
- Content-Security-Policy
- HSTS
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Resource-Policy

If you need stricter CSP (no `unsafe-inline`), add nonces via middleware and remove it.

## Anti-spam (forms)
There are no public form submit endpoints at the moment. If you add forms:
- Add a hidden honeypot field (reject if filled).
- Add a minimum submit time (reject if <2s).
- Add length/charset validation.
- Optionally gate with Turnstile when rate limit triggers.

## File uploads / heavy processing
Uploads are client-side only. If you add server uploads:
- Limit request size at Nginx/CDN.
- Validate MIME and file signature.
- Enforce size/dimension caps and timeouts.

## CDN / WAF (Cloudflare)
Suggested rules:
- Enable Bot Fight Mode (or Super Bot Fight if available).
- WAF Managed Ruleset (OWASP + Cloudflare Managed).
- Rate limit `/api/*`:
  - 60 req/min/IP (general)
  - 10 req/min/IP for `/api/opengraph`, `/api/ssl`, `/api/ping`, `/api/status`
- Firewall rule to block known bad bots and countries if needed.
- Allow verified SEO bots (Googlebot, Bingbot) by ASN / verified bot setting.

## Nginx hardening (if self-hosted)
Add these to your Nginx config:

```nginx
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=api_light:10m rate=60r/m;
limit_req_zone $binary_remote_addr zone=api_heavy:10m rate=10r/m;

# Basic limits
client_max_body_size 2m;
client_body_timeout 10s;
client_header_timeout 10s;
send_timeout 10s;

# Apply limits
location /api/opengraph { limit_req zone=api_heavy burst=5 nodelay; }
location /api/ssl { limit_req zone=api_heavy burst=5 nodelay; }
location /api/ping { limit_req zone=api_heavy burst=5 nodelay; }
location /api/status { limit_req zone=api_heavy burst=5 nodelay; }
location /api/ { limit_req zone=api_light burst=20 nodelay; }

# Cache static assets aggressively
location /_next/static/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## Logging + monitoring basics
Ensure access logs include IP, path, status, UA, response time:

```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" $request_time';
access_log /var/log/nginx/access.log main;
```

Quick investigation commands:

```bash
# Top IPs
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head

# Top paths
awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head
```

## Incident response (quick steps)
1) Tighten CDN/WAF rate limits temporarily.
2) Add stricter Nginx `limit_req` for the targeted route.
3) Block abusive IPs/ASNs at CDN.
4) Review logs and revert after traffic normalizes.
