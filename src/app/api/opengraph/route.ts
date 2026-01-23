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

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const extractMeta = (html: string, key: string) => {
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${key}["'][^>]*content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+name=["']${key}["'][^>]*content=["']([^"']+)["']`,
      "i"
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeHtml(match[1]);
    }
  }
  return undefined;
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `opengraph:${clientIp}`,
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

    const response = await fetchWithTimeout(
      target,
      {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      },
      10_000
    );
    const html = await response.text();
    const slice = html.slice(0, 200_000);

    const titleMatch = slice.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch?.[1] ? decodeHtml(titleMatch[1]) : undefined;

    return NextResponse.json({
      title: extractMeta(slice, "og:title") || title,
      description: extractMeta(slice, "og:description"),
      image: extractMeta(slice, "og:image"),
      url: extractMeta(slice, "og:url"),
      siteName: extractMeta(slice, "og:site_name"),
      twitterTitle: extractMeta(slice, "twitter:title"),
      twitterDescription: extractMeta(slice, "twitter:description"),
      twitterImage: extractMeta(slice, "twitter:image"),
      fetchedUrl: response.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : "Unable to fetch OpenGraph data.",
      },
      { status: 400 }
    );
  }
}
