import { z } from 'zod';
import { answersSchema, sketchSchema, type Sketch } from '@/lib/sketch';
import { generateSketch } from '@/lib/generate-sketch';
import { fallbackSketch } from '@/lib/fallback-sketches';
import { isQuotaError } from '@/lib/errors';

export const maxDuration = 30;

const requestSchema = answersSchema.extend({
  revision: z
    .object({
      sketch: sketchSchema,
      note: z.string().trim().min(1).max(60),
    })
    .optional(),
});

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { revision, ...answers } = parsed.data;

  let sketch: Sketch;
  let generated = true;
  try {
    sketch = await generateSketch(answers, revision);
  } catch (error) {
    if (isQuotaError(error)) {
      console.error('sketch quota reached:', error);
      return Response.json({ limited: true });
    }
    console.error('sketch generation failed, serving fallback:', error);
    // A failed revision degrades to the unchanged sketch, never a reset.
    sketch = revision ? revision.sketch : fallbackSketch(answers);
    generated = false;
  }

  return Response.json({ sketch, generated });
}
