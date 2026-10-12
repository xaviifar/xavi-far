import { NextRequest } from "next/server";

interface RateLimitEntry {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
}

// Global in-memory store persisted across hot-reloads in dev & warm serverless instances
const globalStore = globalThis as unknown as {
  __rateLimitStores?: Map<string, Map<string, RateLimitEntry>>;
};

if (!globalStore.__rateLimitStores) {
  globalStore.__rateLimitStores = new Map();
}

function getNamespaceStore(namespace: string): Map<string, RateLimitEntry> {
  let store = globalStore.__rateLimitStores!.get(namespace);
  if (!store) {
    store = new Map();
    globalStore.__rateLimitStores!.set(namespace, store);
  }
  return store;
}

/**
 * Extract client IP address from NextRequest headers
 */
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;
  return "127.0.0.1";
}

/**
 * Sliding window rate limiter
 */
export function checkRateLimit(options: {
  namespace: string;
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const { namespace, key, limit, windowMs } = options;
  const store = getNamespaceStore(namespace);
  const now = Date.now();
  const windowStart = now - windowMs;

  // Periodic cleanup if map grows large
  if (store.size > 2000) {
    for (const [k, v] of store.entries()) {
      const active = v.timestamps.filter((t) => t > windowStart);
      if (active.length === 0) {
        store.delete(k);
      } else {
        v.timestamps = active;
      }
    }
  }

  const entry = store.get(key) ?? { timestamps: [] };
  // Filter out expired timestamps outside current sliding window
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= limit) {
    const oldestInWindow = entry.timestamps[0] ?? now;
    const resetAt = oldestInWindow + windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
    store.set(key, entry);
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfterSeconds,
      resetAt,
    };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  const remaining = Math.max(0, limit - entry.timestamps.length);
  const oldestInWindow = entry.timestamps[0] ?? now;
  const resetAt = oldestInWindow + windowMs;

  return {
    allowed: true,
    limit,
    remaining,
    retryAfterSeconds: 0,
    resetAt,
  };
}
