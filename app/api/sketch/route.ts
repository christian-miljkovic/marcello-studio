import { answersSchema, type Sketch } from '@/lib/sketch';
import { generateSketch } from '@/lib/generate-sketch';
import { fallbackSketch } from '@/lib/fallback-sketches';
import { isQuotaError } from '@/lib/errors';

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = answersSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  let sketch: Sketch;
  let generated = true;
  try {
    sketch = await generateSketch(parsed.data);
  } catch (error) {
    if (isQuotaError(error)) {
      console.error('sketch quota reached:', error);
      return Response.json({ limited: true });
    }
    console.error('sketch generation failed, serving fallback:', error);
    sketch = fallbackSketch(parsed.data);
    generated = false;
  }

  return Response.json({ sketch, generated });
}
