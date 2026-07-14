import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import SketchFlow from '@/components/SketchFlow';
import { decodeShare } from '@/lib/share';
import { makeSketch } from './fixtures';

const sketch = makeSketch({
  palette: 'gallery',
  typeface: 'sans',
  casing: 'sentence',
  heroLine: 'Salt-washed denim, cut in Brooklyn',
  subLine: 'Workwear built for a decade of wear.',
  aboutLine: 'Cut, sewn and rivetted in a Brooklyn workroom.',
  products: [
    { name: 'Rigid Jean', price: '$210' },
    { name: 'Chore Coat', price: '$340' },
    { name: 'Duck Vest', price: '$190' },
    { name: 'Web Belt', price: '$60' },
  ],
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function stubSketchResponse(body: unknown = { sketch }) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

async function answerThreeQuestions() {
  const user = userEvent.setup();
  await user.type(
    screen.getByRole('textbox', { name: /name of the brand/i }),
    'Harbor Denim'
  );
  await user.click(screen.getByRole('button', { name: /next/i }));
  await user.type(
    screen.getByRole('textbox', { name: /what do you make/i }),
    'raw denim workwear'
  );
  await user.click(screen.getByRole('button', { name: /next/i }));
  await user.type(
    screen.getByRole('textbox', { name: /one word for the mood/i }),
    'honest'
  );
  await user.click(screen.getByRole('button', { name: /next/i }));
  return user;
}

async function answerAllQuestions(artifact = /shopping page/i) {
  const user = await answerThreeQuestions();
  await user.click(screen.getByRole('button', { name: artifact }));
  return user;
}

describe('SketchFlow', () => {
  test('walks through the questions and renders the returned sketch', async () => {
    const fetchMock = stubSketchResponse();

    render(<SketchFlow />);
    expect(screen.getByText(/name of the brand/i)).toBeVisible();

    await answerAllQuestions();

    expect(
      await screen.findByText(/salt-washed denim, cut in brooklyn/i)
    ).toBeVisible();
    expect(screen.getAllByText(/harbor denim/i).length).toBeGreaterThan(0);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/sketch');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual({
      brand: 'Harbor Denim',
      craft: 'raw denim workwear',
      mood: 'honest',
      artifact: 'storefront',
    });
  });

  test('offers three page types and sends the chosen one', async () => {
    const fetchMock = stubSketchResponse({
      sketch: { ...sketch, artifact: 'press' },
    });

    render(<SketchFlow />);
    await answerThreeQuestions();

    expect(screen.getByText(/what should we sketch/i)).toBeVisible();
    expect(
      screen.getByRole('button', { name: /shopping page/i })
    ).toBeVisible();
    expect(screen.getByRole('button', { name: /landing page/i })).toBeVisible();

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: /showroom & press office/i })
    );

    await screen.findByText(/salt-washed denim, cut in brooklyn/i);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.artifact).toBe('press');
  });

  test('applies palette and type notes locally without another API call', async () => {
    const fetchMock = stubSketchResponse();

    render(<SketchFlow />);
    const user = await answerAllQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    await user.click(screen.getByRole('button', { name: /ask for a change/i }));
    await user.type(
      screen.getByRole('textbox', { name: /ask for a change/i }),
      'warmer and serif'
    );
    await user.click(screen.getByRole('button', { name: /revise/i }));

    expect(await screen.findByText(/revision 1 of 3/i)).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(/salt-washed denim, cut in brooklyn/i)
    ).toBeVisible();

    // The note must actually change the sketch, observable via the share link.
    const write = vi.spyOn(navigator.clipboard, 'writeText');
    await user.click(screen.getByRole('button', { name: /copy link/i }));
    const decoded = decodeShare(
      new URL(write.mock.calls[0][0]).searchParams.get('s') ?? ''
    );
    expect(decoded?.sketch.palette).toBe('blush');
    expect(decoded?.sketch.typeface).toBe('serif');
  });

  test('sends unresolvable notes to the API as a revision request', async () => {
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
    const user = await answerAllQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    await user.click(screen.getByRole('button', { name: /ask for a change/i }));
    await user.type(
      screen.getByRole('textbox', { name: /ask for a change/i }),
      'more romantic copy'
    );
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
    stubSketchResponse();

    render(<SketchFlow />);
    const user = await answerAllQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    for (const note of ['darker', 'lighter', 'serif']) {
      await user.click(
        screen.getByRole('button', { name: /ask for a change/i })
      );
      await user.type(
        screen.getByRole('textbox', { name: /ask for a change/i }),
        note
      );
      await user.click(screen.getByRole('button', { name: /revise/i }));
    }

    expect(
      await screen.findByText(/the rest happens over email/i)
    ).toBeVisible();
    expect(
      screen.queryByRole('button', { name: /ask for a change/i })
    ).not.toBeInTheDocument();
  });

  test('copies a link that reproduces the sketch', async () => {
    stubSketchResponse();

    render(<SketchFlow />);
    const user = await answerAllQuestions();
    await screen.findByText(/salt-washed denim, cut in brooklyn/i);

    const write = vi.spyOn(navigator.clipboard, 'writeText');
    await user.click(screen.getByRole('button', { name: /copy link/i }));

    expect(write).toHaveBeenCalledTimes(1);
    const copied = write.mock.calls[0][0];
    expect(copied).toContain('/sketch?s=');
    const decoded = decodeShare(new URL(copied).searchParams.get('s') ?? '');
    expect(decoded?.sketch).toEqual(sketch);
    expect(decoded?.answers.brand).toBe('Harbor Denim');
  });

  test('a shared sketch renders immediately and offers a fresh start', async () => {
    stubSketchResponse();
    const user = userEvent.setup();

    render(
      <SketchFlow
        initial={{
          answers: {
            brand: 'Harbor Denim',
            craft: 'raw denim workwear',
            mood: 'honest',
          },
          sketch,
        }}
      />
    );

    expect(
      screen.getByText(/salt-washed denim, cut in brooklyn/i)
    ).toBeVisible();
    expect(screen.queryByText(/name of the brand/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /start your own/i }));
    expect(screen.getByText(/name of the brand/i)).toBeVisible();
  });

  test('explains when the sketch limit is reached instead of faking a sketch', async () => {
    stubSketchResponse({ limited: true });

    render(<SketchFlow />);
    await answerAllQuestions();

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
    await answerAllQuestions();

    expect(
      await screen.findByText(/contact@marcello\.studio/i)
    ).toBeVisible();
  });
});
