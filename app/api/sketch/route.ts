import { answersSchema, type Sketch } from '@/lib/sketch';
import { generateSketch } from '@/lib/generate-sketch';
import { fallbackSketch } from '@/lib/fallback-sketches';

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
  try {
    sketch = await generateSketch(parsed.data);
  } catch {
    sketch = fallbackSketch(parsed.data);
  }

  return Response.json({ sketch });
}
