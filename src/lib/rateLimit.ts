type RateLimitOptions = {
  key: string;
  limit: number;
  burst: number;
  windowMs: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

const getStore = () => {
  const globalForRateLimit = globalThis as typeof globalThis & {
    __rateLimitStore?: Map<string, RateLimitState>;
  };
  if (!globalForRateLimit.__rateLimitStore) {
    globalForRateLimit.__rateLimitStore = new Map<string, RateLimitState>();
  }
  return globalForRateLimit.__rateLimitStore;
};

export const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
};

export const rateLimit = ({ key, limit, burst, windowMs }: RateLimitOptions) => {
  const store = getStore();
  const now = Date.now();
  const entry = store.get(key);
  const max = limit + burst;

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  if (entry.count >= max) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return { allowed: false, remaining: 0, retryAfter };
  }

  entry.count += 1;
  store.set(key, entry);
  return { allowed: true, remaining: max - entry.count, retryAfter: 0 };
};
