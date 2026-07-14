import type { Answers, Sketch } from '@/lib/sketch';

export const answers: Answers = {
  brand: 'Meridian',
  craft: 'hand-loomed knitwear',
  mood: 'quiet',
};

export function makeSketch(overrides: Partial<Sketch> = {}): Sketch {
  return {
    palette: 'bone',
    typeface: 'serif',
    casing: 'uppercase',
    layout: 'poster',
    artifact: 'storefront',
    heroLine: 'Knitwear for slow mornings',
    subLine: 'Hand-loomed in small batches, made to be kept.',
    aboutLine: 'A one-room studio making knitwear the long way.',
    products: [
      { name: 'Aran Cardigan', price: '$385' },
      { name: 'Rib Scarf', price: '$140' },
      { name: 'Seam Sweater', price: '$310' },
      { name: 'Wool Beanie', price: '$95' },
    ],
    ...overrides,
  };
}
