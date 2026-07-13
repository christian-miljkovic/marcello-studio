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

  test('applies palette and type notes locally without another API call', async () => {
    const user = userEvent.setup();
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
    await answerThreeQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    await user.click(screen.getByRole('button', { name: /ask for a change/i }));
    await user.type(screen.getByRole('textbox'), 'warmer and serif');
    await user.click(screen.getByRole('button', { name: /revise/i }));

    expect(await screen.findByText(/revision 1 of 3/i)).toBeVisible();
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(/salt-washed denim, cut in brooklyn/i)
    ).toBeVisible();
  });

  test('sends unresolvable notes to the API as a revision request', async () => {
    const user = userEvent.setup();
    const revised = { ...sketch, heroLine: 'Denim cut for long weathering' };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ sketch }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ sketch: revised }), { status: 200 })
      );
    vi.stubGlobal('fetch', fetchMock);

    render(<SketchFlow />);
    await answerThreeQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    await user.click(screen.getByRole('button', { name: /ask for a change/i }));
    await user.type(screen.getByRole('textbox'), 'more romantic copy');
    await user.click(screen.getByRole('button', { name: /revise/i }));

    expect(
      await screen.findByText(/denim cut for long weathering/i)
    ).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const body = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(body.revision.note).toBe('more romantic copy');
    expect(body.revision.sketch.heroLine).toBe(sketch.heroLine);
  });

  test('stops offering changes after three revisions', async () => {
    const user = userEvent.setup();
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
    await answerThreeQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    for (const note of ['darker', 'lighter', 'serif']) {
      await user.click(
        screen.getByRole('button', { name: /ask for a change/i })
      );
      await user.type(screen.getByRole('textbox'), note);
      await user.click(screen.getByRole('button', { name: /revise/i }));
    }

    expect(
      await screen.findByText(/the rest happens over email/i)
    ).toBeVisible();
    expect(
      screen.queryByRole('button', { name: /ask for a change/i })
    ).not.toBeInTheDocument();
  });

  test('explains when the sketch limit is reached instead of faking a sketch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ limited: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    render(<SketchFlow />);
    await answerThreeQuestions();

    expect(
      await screen.findByText(/reached our limit of sketches/i)
    ).toBeVisible();
    expect(screen.getByText(/contact@marcello\.studio/i)).toBeVisible();
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
