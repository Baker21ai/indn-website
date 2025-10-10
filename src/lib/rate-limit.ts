import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create a rate limiter that allows 5 requests per 15 minutes for login
export const loginRateLimiter = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
      prefix: '@upstash/ratelimit/login',
    })
  : null

// Create a rate limiter that allows 3 requests per hour for password reset
export const passwordResetRateLimiter = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, '60 m'),
      analytics: true,
      prefix: '@upstash/ratelimit/password-reset',
    })
  : null

// Create a rate limiter that allows 5 requests per hour for registration
export const registrationRateLimiter = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '60 m'),
      analytics: true,
      prefix: '@upstash/ratelimit/registration',
    })
  : null

// In-memory fallback for development (when Upstash is not configured)
const inMemoryCache = new Map<string, { count: number; resetAt: number }>()

function cleanupInMemoryCache() {
  const now = Date.now()
  for (const [key, value] of inMemoryCache.entries()) {
    if (value.resetAt < now) {
      inMemoryCache.delete(key)
    }
  }
}

export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining?: number }> {
  // If Upstash is configured, use it
  if (process.env.UPSTASH_REDIS_REST_URL) {
    return { success: true } // Let Upstash ratelimiters handle it
  }

  // Fallback to in-memory rate limiting for development
  cleanupInMemoryCache()

  const now = Date.now()
  const key = identifier
  const cached = inMemoryCache.get(key)

  if (!cached || cached.resetAt < now) {
    inMemoryCache.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (cached.count >= limit) {
    return { success: false, remaining: 0 }
  }

  cached.count++
  return { success: true, remaining: limit - cached.count }
}

export async function checkRateLimit(
  identifier: string,
  type: 'login' | 'password-reset' | 'registration'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  let limiter

  switch (type) {
    case 'login':
      limiter = loginRateLimiter
      break
    case 'password-reset':
      limiter = passwordResetRateLimiter
      break
    case 'registration':
      limiter = registrationRateLimiter
      break
  }

  if (!limiter) {
    // Fallback to in-memory rate limiting
    const limits = {
      login: { limit: 5, window: 15 * 60 * 1000 },
      'password-reset': { limit: 3, window: 60 * 60 * 1000 },
      registration: { limit: 5, window: 60 * 60 * 1000 },
    }
    const config = limits[type]
    return rateLimit(identifier, config.limit, config.window)
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}
