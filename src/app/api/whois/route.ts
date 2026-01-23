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

const getRegistrarName = (entities?: any[]) => {
  if (!entities) return undefined;
  const registrar = entities.find((entity) =>
    entity?.roles?.includes("registrar")
  );
  const vcard = registrar?.vcardArray?.[1];
  const nameEntry = Array.isArray(vcard)
    ? vcard.find((entry: any[]) => entry[0] === "fn")
    : undefined;
  return nameEntry?.[3];
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `whois:${clientIp}`,
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
    const { domain } = (await request.json()) as { domain?: string };
    const target = cleanDomain(domain || "");
    const response = await fetchWithTimeout(
      `https://rdap.org/domain/${target}`,
      {
        cache: "no-store",
      },
      8000
    );
    if (!response.ok) {
      throw new Error("RDAP lookup failed.");
    }
    const data = (await response.json()) as any;

    const events =
      data.events?.map((event: any) => ({
        action: event.eventAction,
        date: event.eventDate,
      })) || [];

    const nameservers =
      data.nameservers?.map((ns: any) => ns.ldhName).filter(Boolean) || [];

    return NextResponse.json({
      domain: data.ldhName || target,
      registrar: getRegistrarName(data.entities),
      status: data.status || [],
      events,
      nameservers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Whois lookup failed." },
      { status: 400 }
    );
  }
}
