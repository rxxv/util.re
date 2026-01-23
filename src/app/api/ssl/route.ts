import { NextResponse } from "next/server";
import tls from "node:tls";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isBlockedHost } from "@/lib/ssrf";

export const runtime = "nodejs";

const cleanHost = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Host is required.");
  if (trimmed.length > 253) throw new Error("Host is too long.");
  if (/^https?:\/\//i.test(trimmed)) {
    return new URL(trimmed).hostname;
  }
  if (isBlockedHost(trimmed)) {
    throw new Error("That host is not allowed.");
  }
  return trimmed;
};

const getCertificate = (host: string) =>
  new Promise<tls.PeerCertificate>((resolve, reject) => {
    const socket = tls.connect(
      {
        host,
        port: 443,
        servername: host,
        timeout: 8000,
      },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        resolve(cert);
      }
    );
    socket.on("error", (error) => {
      socket.destroy();
      reject(error);
    });
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("Connection timed out."));
    });
  });

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `ssl:${clientIp}`,
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
    const { host } = (await request.json()) as { host?: string };
    const target = cleanHost(host || "");
    const cert = await getCertificate(target);

    const validTo = cert.valid_to ? new Date(cert.valid_to) : undefined;
    const daysRemaining = validTo
      ? Math.round((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : undefined;

    return NextResponse.json({
      host: target,
      issuer: cert.issuer?.O || cert.issuer?.CN,
      subject: cert.subject?.CN,
      validFrom: cert.valid_from,
      validTo: cert.valid_to,
      daysRemaining,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "SSL lookup failed." },
      { status: 400 }
    );
  }
}
