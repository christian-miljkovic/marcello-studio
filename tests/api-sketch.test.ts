import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { POST } from '@/app/api/sketch/route';
import { sketchSchema } from '@/lib/sketch';

function post(body: unknown): Request {
  return new Request('http://localhost/api/sketch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const savedKey = process.env.OPENROUTER_API_KEY;

beforeEach(() => {
  delete process.env.OPENROUTER_API_KEY;
});

afterEach(() => {
  if (savedKey === undefined) delete process.env.OPENROUTER_API_KEY;
  else process.env.OPENROUTER_API_KEY = savedKey;
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
    const res = await POST(
      post({ brand: 'Meridian', craft: 'knitwear', mood: 'quiet' })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(() => sketchSchema.parse(data.sketch)).not.toThrow();
  });

  test('keyless revision requests return the current sketch unchanged', async () => {
    const current = {
      palette: 'bone',
      typeface: 'serif',
      casing: 'uppercase',
      heroLine: 'Made slowly, worn daily',
      subLine: 'A small collection, cut and finished by hand.',
      products: [
        { name: 'Field Jacket', price: '$420' },
        { name: 'Bias Skirt', price: '$265' },
        { name: 'Poplin Shirt', price: '$180' },
        { name: 'Selvedge Tote', price: '$120' },
      ],
    };
    const res = await POST(
      post({
        brand: 'Meridian',
        craft: 'knitwear',
        mood: 'quiet',
        revision: { sketch: current, note: 'more romantic copy' },
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.sketch).toEqual(current);
  });

  test('rejects malformed revision payloads', async () => {
    const res = await POST(
      post({
        brand: 'Meridian',
        craft: 'knitwear',
        mood: 'quiet',
        revision: { note: 'x' },
      })
    );
    expect(res.status).toBe(400);
  });
});
