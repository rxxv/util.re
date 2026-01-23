import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/serverFetch";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const isValidIp = (value: string) => {
  if (!value) return false;
  return (
    /^(\d{1,3}\.){3}\d{1,3}$/.test(value) ||
    /^[a-fA-F0-9:]+$/.test(value)
  );
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `ip:${clientIp}`,
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
    const { ip } = (await request.json()) as { ip?: string };
    const trimmed = ip?.trim();
    if (trimmed && !isValidIp(trimmed)) {
      throw new Error("Enter a valid IP address.");
    }

    const target = trimmed ? `https://ipwho.is/${trimmed}` : "https://ipwho.is/";
    const response = await fetchWithTimeout(
      target,
      { cache: "no-store" },
      8000
    );
    const data = (await response.json()) as {
      success?: boolean;
      message?: string;
      ip?: string;
      city?: string;
      region?: string;
      country?: string;
      isp?: string;
      asn?: string;
      org?: string;
    };

    if (data.success === false) {
      throw new Error(data.message || "Lookup failed.");
    }

    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.isp,
      asn: data.asn,
      org: data.org,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lookup failed." },
      { status: 400 }
    );
  }
}
