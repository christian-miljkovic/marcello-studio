const QUOTA_STATUS = new Set([402, 429]);
const QUOTA_MESSAGE = /credit|quota|payment|insufficient|limit exceeded|rate limit/i;

export function isQuotaError(error: unknown): boolean {
  let current: unknown = error;
  const seen = new Set<unknown>();
  while (current instanceof Error && !seen.has(current)) {
    seen.add(current);
    const status = (current as { statusCode?: unknown }).statusCode;
    if (typeof status === 'number' && QUOTA_STATUS.has(status)) return true;
    if (QUOTA_MESSAGE.test(current.message)) return true;
    current = current.cause;
  }
  return false;
}
