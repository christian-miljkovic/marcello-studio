import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SketchPage, { generateMetadata } from '@/app/sketch/page';
import { encodeShare } from '@/lib/share';
import { answers, makeSketch } from './fixtures';

function params(s?: string) {
  return Promise.resolve(s === undefined ? {} : { s });
}

describe('shared sketch page', () => {
  test('a valid share link renders the finished sketch, not the questions', async () => {
    const sketch = makeSketch();
    const s = encodeShare({ answers, sketch });

    render(await SketchPage({ searchParams: params(s) }));

    expect(screen.getByText(/knitwear for slow mornings/i)).toBeVisible();
    expect(screen.queryByText(/name of the brand/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start your own/i })
    ).toBeVisible();
  });

  test('an invalid share link falls back to the question flow', async () => {
    render(await SketchPage({ searchParams: params('broken-payload') }));
    expect(screen.getByText(/name of the brand/i)).toBeVisible();
  });

  test('no share param renders the question flow', async () => {
    render(await SketchPage({ searchParams: params() }));
    expect(screen.getByText(/name of the brand/i)).toBeVisible();
  });

  test('share links get their own preview image', async () => {
    const s = encodeShare({ answers, sketch: makeSketch() });
    const metadata = await generateMetadata({ searchParams: params(s) });
    const images = metadata.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : images;
    const url = typeof image === 'object' && image && 'url' in image ? image.url : image;
    expect(String(url)).toContain(`/api/og?s=${s}`);
  });
});
