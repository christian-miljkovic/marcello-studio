import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SketchPreview from '@/components/SketchPreview';
import type { Answers, Sketch } from '@/lib/sketch';

const answers: Answers = {
  brand: 'Meridian',
  craft: 'hand-loomed knitwear',
  mood: 'quiet',
};

const sketch: Sketch = {
  palette: 'bone',
  typeface: 'serif',
  casing: 'uppercase',
  heroLine: 'Knitwear for slow mornings',
  subLine: 'Hand-loomed in small batches, made to be kept.',
  products: [
    { name: 'Aran Cardigan', price: '$385' },
    { name: 'Rib Scarf', price: '$140' },
    { name: 'Seam Sweater', price: '$310' },
    { name: 'Wool Beanie', price: '$95' },
  ],
};

describe('SketchPreview', () => {
  test('shows the brand name from the visitor answers', () => {
    render(<SketchPreview sketch={sketch} answers={answers} />);
    expect(screen.getByText(/meridian/i)).toBeVisible();
  });

  test('shows the generated hero and sub lines', () => {
    render(<SketchPreview sketch={sketch} answers={answers} />);
    expect(screen.getByText(/knitwear for slow mornings/i)).toBeVisible();
    expect(
      screen.getByText(/hand-loomed in small batches, made to be kept/i)
    ).toBeVisible();
  });

  test('shows all four products with prices', () => {
    render(<SketchPreview sketch={sketch} answers={answers} />);
    for (const product of sketch.products) {
      expect(screen.getByText(new RegExp(product.name, 'i'))).toBeVisible();
      expect(screen.getByText(product.price)).toBeVisible();
    }
  });

  test('frames the output as a sketch, not a website', () => {
    render(<SketchPreview sketch={sketch} answers={answers} />);
    expect(screen.getByText(/a sketch, not a website/i)).toBeVisible();
  });
});
