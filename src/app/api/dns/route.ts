import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/serverFetch";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isBlockedHost } from "@/lib/ssrf";

const cleanDomain = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Domain is required.");
  if (trimmed.length > 253) throw new Error("Domain is too long.");
  if (/^https?:\/\//i.test(trimmed)) {
    const hostname = new URL(trimmed).hostname;
    if (isBlockedHost(hostname)) {
      throw new Error("That host is not allowed.");
    }
    return hostname;
  }
  if (isBlockedHost(trimmed)) {
    throw new Error("That host is not allowed.");
  }
  return trimmed;
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `dns:${clientIp}`,
      limit: 60,
      burst: 20,
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
    const { domain, type } = (await request.json()) as {
      domain?: string;
      type?: string;
    };
    const targetDomain = cleanDomain(domain || "");
    const recordType = (type || "A").toUpperCase();
    const response = await fetchWithTimeout(
      `https://dns.google/resolve?name=${encodeURIComponent(
        targetDomain
      )}&type=${encodeURIComponent(recordType)}`,
      { cache: "no-store" },
      8000
    );
    const data = (await response.json()) as {
      Answer?: { name: string; type: number; TTL: number; data: string }[];
      Status?: number;
    };

    if (data.Status !== 0 && !data.Answer?.length) {
      return NextResponse.json({ answers: [] });
    }

    const answers =
      data.Answer?.map((answer) => ({
        name: answer.name,
        type: recordType,
        ttl: answer.TTL,
        data: answer.data,
      })) || [];

    return NextResponse.json({ answers });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "DNS lookup failed." },
      { status: 400 }
    );
  }
}
