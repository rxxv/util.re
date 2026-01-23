const isPrivateIpv4 = (ip: string) => {
  const parts = ip.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
};

const isPrivateIpv6 = (ip: string) => {
  const normalized = ip.toLowerCase();
  return (
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80")
  );
};

export const isBlockedHost = (hostname: string) => {
  const lower = hostname.toLowerCase();
  if (lower === "localhost") return true;
  if (lower === "metadata.google.internal") return true;
  if (lower === "169.254.169.254" || lower === "169.254.170.2") return true;
  if (lower.includes(":")) {
    return isPrivateIpv6(lower);
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(lower)) {
    return isPrivateIpv4(lower);
  }
  return false;
};
