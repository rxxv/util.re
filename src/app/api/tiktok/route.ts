import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/serverFetch";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const formatNumber = (value: number) => {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return `${Math.floor(value)}`;
};

const parseSigiState = (html: string) => {
  const match = html.match(
    /<script id="SIGI_STATE" type="application\/json">([^<]+)<\/script>/
  );
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
};

const parseUniversalData = (html: string) => {
  const match = html.match(
    /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([^<]+)<\/script>/
  );
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
};

export async function GET(request: Request) {
  const clientIp = getClientIp(request);
  const rate = rateLimit({
    key: `tiktok:${clientIp}`,
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

  const { searchParams } = new URL(request.url);
  const username = (searchParams.get("username") || "")
    .trim()
    .replace(/^@/, "");

  if (!username || !/^[a-zA-Z0-9._]+$/.test(username)) {
    return NextResponse.json(
      { error: "Enter a valid TikTok username." },
      { status: 400 }
    );
  }

  const url = `https://www.tiktok.com/@${username}`;

  try {
    const response = await fetchWithTimeout(
      url,
      {
        headers: {
          host: "www.tiktok.com",
          "sec-ch-ua":
            "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 8.0.0; Plume L2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
        },
        cache: "no-store",
      },
      10_000
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "TikTok did not return a profile page." },
        { status: 404 }
      );
    }

    const html = await response.text();
    const sigi = parseSigiState(html);
    const universal = parseUniversalData(html);

    const userModule = sigi?.UserModule?.users?.[username];
    const userStats = sigi?.UserModule?.stats?.[username];

    const universalUser =
      universal?.__DEFAULT_SCOPE__?.["webapp.user-detail"]?.userInfo;

    const user = userModule || universalUser?.user || null;
    const stats = userStats || universalUser?.stats || null;

    if (!user) {
      return NextResponse.json(
        { error: "Profile data not found." },
        { status: 404 }
      );
    }

    const created =
      user.createTime && Number.isFinite(Number(user.createTime))
        ? new Date(Number(user.createTime) * 1000).toISOString()
        : "";

    return NextResponse.json({
      username: user.uniqueId || username,
      displayName: user.nickname || "",
      avatar: user.avatarLarger || user.avatarThumb || "",
      signature: user.signature || "",
      verified: Boolean(user.verified),
      region: user.region || "",
      userId: user.id || "",
      createdAt: created,
      stats: stats
        ? {
            followers: formatNumber(stats.followerCount),
            following: formatNumber(stats.followingCount),
            likes: formatNumber(stats.heartCount || stats.diggCount),
            videos: formatNumber(stats.videoCount),
          }
        : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Lookup failed. TikTok may be blocking requests." },
      { status: 500 }
    );
  }
}
