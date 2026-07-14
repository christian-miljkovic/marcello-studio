import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SketchPreview from '@/components/SketchPreview';
import { answers, makeSketch } from './fixtures';

describe('SketchPreview', () => {
  test('shows the brand name from the visitor answers', () => {
    render(<SketchPreview sketch={makeSketch()} answers={answers} />);
    expect(screen.getAllByText(/meridian/i).length).toBeGreaterThan(0);
  });

  test('shows the generated hero and sub lines', () => {
    render(<SketchPreview sketch={makeSketch()} answers={answers} />);
    expect(screen.getByText(/knitwear for slow mornings/i)).toBeVisible();
    expect(
      screen.getByText(/hand-loomed in small batches, made to be kept/i)
    ).toBeVisible();
  });

  test('shows the about line in its own section', () => {
    render(<SketchPreview sketch={makeSketch()} answers={answers} />);
    expect(
      screen.getByText(/a one-room studio making knitwear the long way/i)
    ).toBeVisible();
  });

  test('frames the output as a sketch, not a website', () => {
    render(<SketchPreview sketch={makeSketch()} answers={answers} />);
    expect(screen.getByText(/a sketch, not a website/i)).toBeVisible();
  });

  test('a shopping page shows all four products with prices', () => {
    const sketch = makeSketch({ artifact: 'storefront' });
    render(<SketchPreview sketch={sketch} answers={answers} />);
    for (const product of sketch.products) {
      expect(screen.getByText(new RegExp(product.name, 'i'))).toBeVisible();
      expect(screen.getByText(product.price)).toBeVisible();
    }
  });

  test('a landing page teases the pieces without prices', () => {
    const sketch = makeSketch({ artifact: 'landing' });
    render(<SketchPreview sketch={sketch} answers={answers} />);
    for (const product of sketch.products) {
      expect(screen.getByText(new RegExp(product.name, 'i'))).toBeVisible();
      expect(screen.queryByText(product.price)).not.toBeInTheDocument();
    }
    expect(screen.getByText(/notify/i)).toBeVisible();
  });

  test('a press page offers previews instead of a shop', () => {
    const sketch = makeSketch({ artifact: 'press' });
    render(<SketchPreview sketch={sketch} answers={answers} />);
    expect(screen.getByText(/press office/i)).toBeVisible();
    expect(screen.getByText(/by appointment/i)).toBeVisible();
    for (const product of sketch.products) {
      expect(screen.getByText(new RegExp(product.name, 'i'))).toBeVisible();
      expect(screen.queryByText(product.price)).not.toBeInTheDocument();
    }
  });
});
