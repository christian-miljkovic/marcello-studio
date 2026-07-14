import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { generateObject } from 'ai';
import { POST } from '@/app/api/sketch/route';
import { sketchSchema } from '@/lib/sketch';
import { makeSketch } from './fixtures';

vi.mock('ai', () => ({ generateObject: vi.fn() }));

function post(body: unknown): Request {
  return new Request('http://localhost/api/sketch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const baseRequest = {
  brand: 'Meridian',
  craft: 'knitwear',
  mood: 'quiet',
  artifact: 'storefront',
};

beforeEach(() => {
  vi.stubEnv('OPENROUTER_API_KEY', '');
  vi.stubEnv('WEB3FORMS_KEY', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.mocked(generateObject).mockReset();
});

describe('POST /api/sketch', () => {
  test('rejects requests with missing or invalid answers', async () => {
    const res = await POST(post({ brand: 'X' }));
    expect(res.status).toBe(400);
  });

  test('rejects unparseable bodies', async () => {
    const res = await POST(
      new Request('http://localhost/api/sketch', {
        method: 'POST',
        body: 'not json',
      })
    );
    expect(res.status).toBe(400);
  });

  test('returns a schema-valid sketch without an API key configured', async () => {
    const res = await POST(post(baseRequest));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(() => sketchSchema.parse(data.sketch)).not.toThrow();
    expect(data.sketch.artifact).toBe('storefront');
  });

  test('a responsive model produces the sketch in the response', async () => {
    vi.stubEnv('OPENROUTER_API_KEY', 'test-key');
    const modelSketch = makeSketch({ heroLine: 'From the model, quietly' });
    vi.mocked(generateObject).mockResolvedValue({ object: modelSketch } as never);

    const res = await POST(post(baseRequest));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.sketch.heroLine).toBe('From the model, quietly');
  });

  test('a keyed revision returns the revised sketch from the model', async () => {
    vi.stubEnv('OPENROUTER_API_KEY', 'test-key');
    const current = makeSketch();
    const revised = makeSketch({ heroLine: 'Revised for a colder season' });
    vi.mocked(generateObject).mockResolvedValue({ object: revised } as never);

    const res = await POST(
      post({
        ...baseRequest,
        revision: { sketch: current, note: 'colder, more austere copy' },
      })
    );
    const data = await res.json();
    expect(data.sketch.heroLine).toBe('Revised for a colder season');
  });

  test('the sketch carries the page type the visitor chose', async () => {
    const res = await POST(post({ ...baseRequest, artifact: 'press' }));
    const data = await res.json();
    expect(data.sketch.artifact).toBe('press');
  });

  test('keyless revision requests return the current sketch unchanged', async () => {
    const current = makeSketch();
    const res = await POST(
      post({
        ...baseRequest,
        revision: { sketch: current, note: 'more romantic copy' },
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.sketch).toEqual(current);
  });

  test('rejects malformed revision payloads', async () => {
    const res = await POST(
      post({ ...baseRequest, revision: { note: 'x' } })
    );
    expect(res.status).toBe(400);
  });

  test('a hanging model still yields a sketch within the route budget', async () => {
    vi.stubEnv('OPENROUTER_API_KEY', 'test-key');
    vi.useFakeTimers();
    vi.mocked(generateObject).mockImplementation(
      (options: { abortSignal?: AbortSignal }) =>
        new Promise((_, reject) => {
          options.abortSignal?.addEventListener('abort', () =>
            reject(new Error('aborted'))
          );
        }) as never
    );

    // Both bounded attempts must finish well inside the route's 30s
    // maxDuration; if this advance doesn't settle the response, the test
    // hangs until vitest's own timeout kills it.
    const resPromise = POST(post(baseRequest));
    await vi.advanceTimersByTimeAsync(29_000);
    const res = await resPromise;

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(() => sketchSchema.parse(data.sketch)).not.toThrow();
  });

  test('notifies the studio of each sketch when a form key is set', async () => {
    vi.stubEnv('WEB3FORMS_KEY', 'server-key');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const res = await POST(post(baseRequest));
    expect(res.status).toBe(200);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.web3forms.com/submit');
    const body = JSON.parse(init.body as string);
    expect(body.access_key).toBe('server-key');
    expect(body.brand).toBe('Meridian');
    expect(body.craft).toBe('knitwear');
    expect(body.mood).toBe('quiet');
  });

  test('a notification that never settles cannot hold the sketch hostage', async () => {
    vi.stubEnv('WEB3FORMS_KEY', 'server-key');
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})) // ignores its abort signal, never settles
    );

    const resPromise = POST(post(baseRequest));
    await vi.advanceTimersByTimeAsync(5_000);
    const res = await resPromise;
    expect(res.status).toBe(200);
  });

  test('a failing notification never blocks the sketch', async () => {
    vi.stubEnv('WEB3FORMS_KEY', 'server-key');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('network down'))
    );

    const res = await POST(post(baseRequest));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(() => sketchSchema.parse(data.sketch)).not.toThrow();
  });

  test('no notification is attempted without a form key', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await POST(post(baseRequest));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
