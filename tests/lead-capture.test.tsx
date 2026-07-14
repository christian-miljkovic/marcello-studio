import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import LeadCapture from '@/components/LeadCapture';
import { decodeShare } from '@/lib/share';
import { answers, makeSketch } from './fixtures';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('LeadCapture', () => {
  test('sends the visitor email with the full brief and share link', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', 'test-key');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(
      <LeadCapture answers={answers} sketch={makeSketch({ artifact: 'landing' })} />
    );

    await user.type(screen.getByRole('textbox'), 'founder@meridian.nyc');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/within 48 hours/i)).toBeVisible();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.web3forms.com/submit');
    const body = JSON.parse(init.body as string);
    expect(body.access_key).toBe('test-key');
    expect(body.email).toBe('founder@meridian.nyc');
    expect(body.brand).toBe('Meridian');
    expect(body.craft).toBe('hand-loomed knitwear');
    expect(body.mood).toBe('quiet');
    expect(body.artifact).toBe('landing');
    const shared = decodeShare(
      new URL(body.share_url).searchParams.get('s') ?? ''
    );
    expect(shared?.sketch).toEqual(makeSketch({ artifact: 'landing' }));
    expect(shared?.answers).toEqual(answers);
  });

  test('falls back to the studio email when no form key is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', '');

    render(<LeadCapture answers={answers} sketch={makeSketch()} />);

    expect(
      screen.getByRole('link', { name: /contact@marcello\.studio/i })
    ).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:contact@marcello.studio')
    );
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('offers the studio email when the submission fails', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', 'test-key');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('network down'))
    );
    const user = userEvent.setup();

    render(<LeadCapture answers={answers} sketch={makeSketch()} />);

    await user.type(screen.getByRole('textbox'), 'founder@meridian.nyc');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(
      await screen.findByText(/contact@marcello\.studio/i)
    ).toBeVisible();
  });

  test('does not submit an empty email', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_KEY', 'test-key');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();

    render(<LeadCapture answers={answers} sketch={makeSketch()} />);
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.queryByText(/within 48 hours/i)).not.toBeInTheDocument();
  });
});
