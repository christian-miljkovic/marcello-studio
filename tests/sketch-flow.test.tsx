import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import SketchFlow from '@/components/SketchFlow';
import type { Sketch } from '@/lib/sketch';

const sketch: Sketch = {
  palette: 'gallery',
  typeface: 'sans',
  casing: 'sentence',
  heroLine: 'Salt-washed denim, cut in Brooklyn',
  subLine: 'Workwear built for a decade of wear.',
  products: [
    { name: 'Rigid Jean', price: '$210' },
    { name: 'Chore Coat', price: '$340' },
    { name: 'Duck Vest', price: '$190' },
    { name: 'Web Belt', price: '$60' },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
});

async function answerThreeQuestions() {
  const user = userEvent.setup();
  await user.type(screen.getByRole('textbox'), 'Harbor Denim');
  await user.click(screen.getByRole('button'));
  await user.type(screen.getByRole('textbox'), 'raw denim workwear');
  await user.click(screen.getByRole('button'));
  await user.type(screen.getByRole('textbox'), 'honest');
  await user.click(screen.getByRole('button'));
  return user;
}

describe('SketchFlow', () => {
  test('walks through three questions and renders the returned sketch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ sketch }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    render(<SketchFlow />);
    expect(screen.getByText(/name of the brand/i)).toBeVisible();

    await answerThreeQuestions();

    expect(
      await screen.findByText(/salt-washed denim, cut in brooklyn/i)
    ).toBeVisible();
    expect(screen.getByText(/harbor denim/i)).toBeVisible();

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/sketch');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual({
      brand: 'Harbor Denim',
      craft: 'raw denim workwear',
      mood: 'honest',
    });
  });

  test('offers the studio email when the sketch request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('network down'))
    );

    render(<SketchFlow />);
    await answerThreeQuestions();

    expect(
      await screen.findByText(/contact@marcello\.studio/i)
    ).toBeVisible();
  });
});
