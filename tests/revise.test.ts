import { describe, expect, test } from 'vitest';
import { applyLocalRevision } from '@/lib/revise';
import type { Sketch } from '@/lib/sketch';

const base: Sketch = {
  palette: 'gallery',
  typeface: 'sans',
  casing: 'sentence',
  heroLine: 'A slow knit worn close to the skin',
  subLine: 'Hand-loomed in small batches.',
  products: [
    { name: 'Aran Cardigan', price: '$385' },
    { name: 'Rib Scarf', price: '$140' },
    { name: 'Seam Sweater', price: '$310' },
    { name: 'Wool Beanie', price: '$95' },
  ],
};

describe('applyLocalRevision', () => {
  test('resolves palette words without touching the copy', () => {
    const revised = applyLocalRevision(base, 'darker');
    expect(revised?.palette).toBe('ink');
    expect(revised?.heroLine).toBe(base.heroLine);
    expect(revised?.products).toEqual(base.products);
  });

  test('resolves warmth toward a warm palette', () => {
    expect(applyLocalRevision(base, 'warmer')?.palette).toBe('blush');
  });

  test('resolves typeface requests', () => {
    expect(applyLocalRevision(base, 'serif')?.typeface).toBe('serif');
    expect(applyLocalRevision(base, 'make it mono')?.typeface).toBe('mono');
  });

  test('resolves casing requests', () => {
    expect(applyLocalRevision(base, 'all caps')?.casing).toBe('uppercase');
  });

  test('combines multiple resolvable asks in one note', () => {
    const revised = applyLocalRevision(base, 'warmer and serif');
    expect(revised?.palette).toBe('blush');
    expect(revised?.typeface).toBe('serif');
  });

  test('returns null for notes that need the model', () => {
    expect(applyLocalRevision(base, 'more romantic copy')).toBeNull();
    expect(applyLocalRevision(base, 'rename the products')).toBeNull();
  });

  test('does not mutate the original sketch', () => {
    applyLocalRevision(base, 'darker');
    expect(base.palette).toBe('gallery');
  });
});
