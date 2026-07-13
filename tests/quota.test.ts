import { describe, expect, test } from 'vitest';
import { isQuotaError } from '@/lib/errors';

describe('isQuotaError', () => {
  test('recognizes HTTP 402 payment/credit failures from the provider', () => {
    const err = Object.assign(new Error('Payment Required'), {
      statusCode: 402,
    });
    expect(isQuotaError(err)).toBe(true);
  });

  test('recognizes rate-limit responses', () => {
    const err = Object.assign(new Error('Too Many Requests'), {
      statusCode: 429,
    });
    expect(isQuotaError(err)).toBe(true);
  });

  test('recognizes credit-exhaustion messages regardless of shape', () => {
    expect(
      isQuotaError(new Error('Insufficient credits to complete request'))
    ).toBe(true);
    expect(isQuotaError(new Error('key limit exceeded'))).toBe(true);
  });

  test('ignores unrelated failures so they still get a fallback sketch', () => {
    expect(isQuotaError(new Error('could not parse the response'))).toBe(false);
    expect(isQuotaError(undefined)).toBe(false);
  });

  test('finds the quota signal on wrapped errors', () => {
    const inner = Object.assign(new Error('Payment Required'), {
      statusCode: 402,
    });
    const outer = new Error('No object generated', { cause: inner });
    expect(isQuotaError(outer)).toBe(true);
  });
});
