import { describe, expect, test } from 'vitest';
import { decodeShare, encodeShare } from '@/lib/share';
import { answers, makeSketch } from './fixtures';

describe('share links', () => {
  test('a sketch survives the encode/decode round trip', () => {
    const sketch = makeSketch({ artifact: 'press', layout: 'split' });
    const encoded = encodeShare({ answers, sketch });
    expect(decodeShare(encoded)).toEqual({ answers, sketch });
  });

  test('round trip preserves non-ascii brand copy', () => {
    const sketch = makeSketch({ heroLine: 'Séance — velours après-midi' });
    const shared = {
      answers: { ...answers, brand: 'Añjali Ateliér' },
      sketch,
    };
    expect(decodeShare(encodeShare(shared))).toEqual(shared);
  });

  test('the encoded form is URL-safe', () => {
    const encoded = encodeShare({ answers, sketch: makeSketch() });
    expect(encoded).toBe(encodeURIComponent(encoded));
  });

  test('garbage input decodes to null instead of throwing', () => {
    expect(decodeShare('not-a-payload')).toBeNull();
    expect(decodeShare('')).toBeNull();
    expect(decodeShare('%%%')).toBeNull();
  });

  test('an oversized payload is rejected before parsing', () => {
    expect(decodeShare('A'.repeat(20_000))).toBeNull();
  });

  test('a truncated payload decodes to null', () => {
    const encoded = encodeShare({ answers, sketch: makeSketch() });
    expect(decodeShare(encoded.slice(0, encoded.length / 2))).toBeNull();
  });

  test('valid encoding of schema-invalid data decodes to null', () => {
    const tampered = { answers, sketch: { ...makeSketch(), palette: 'neon' } };
    const encoded = encodeShare(tampered as never);
    expect(decodeShare(encoded)).toBeNull();
  });
});
