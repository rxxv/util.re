import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/serverFetch";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isBlockedHost } from "@/lib/ssrf";

const normalizeUrl = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("URL is required.");
  if (trimmed.length > 2048) throw new Error("URL is too long.");
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }
  if (isBlockedHost(parsed.hostname)) {
    throw new Error("That host is not allowed.");
  }
  return parsed.toString();
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `ping:${clientIp}`,
      limit: 10,
      burst: 5,
      windowMs: 60_000,
    });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        {
          status: 429,
          headers: { "Retry-After": rate.retryAfter.toString() },
        }
      );
    }
    const { url } = (await request.json()) as { url?: string };
    const target = normalizeUrl(url || "");
    const start = Date.now();
    const response = await fetchWithTimeout(
      target,
      {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      },
      8000
    );
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      url: response.url,
      latencyMs,
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ping failed." },
      { status: 400 }
    );
  }
}
