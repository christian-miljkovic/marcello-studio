import { z } from 'zod';
import { answersSchema, sketchSchema, type Answers, type Sketch } from '@/lib/sketch';
import { generateSketch } from '@/lib/generate-sketch';
import { fallbackSketch } from '@/lib/fallback-sketches';
import { isQuotaError } from '@/lib/errors';

export const maxDuration = 30;

const requestSchema = answersSchema.extend({
  artifact: sketchSchema.shape.artifact,
  revision: z
    .object({
      sketch: sketchSchema,
      note: z.string().trim().min(1).max(60),
    })
    .optional(),
});

async function notifyStudio(answers: Answers, artifact: Sketch['artifact']) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) return;
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `Sketch generated: ${answers.brand}`,
        from_name: 'marcello.studio /sketch',
        brand: answers.brand,
        craft: answers.craft,
        mood: answers.mood,
        artifact,
      }),
      signal: AbortSignal.timeout(2000),
    });
  } catch (error) {
    // The notification is a courtesy to the studio, never a gate for the visitor.
    console.error('sketch notification failed:', error);
  }
}

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

  const { revision, artifact, ...answers } = parsed.data;

  let sketch: Sketch;
  let generated = true;
  try {
    sketch = await generateSketch(answers, artifact, revision);
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

  // The visitor chose the page type; the model never overrides it.
  sketch = { ...sketch, artifact };

  if (!revision) {
    // Raced against a timer so a stalled Web3Forms can never delay the visitor.
    await Promise.race([
      notifyStudio(answers, artifact),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  }

  return Response.json({ sketch, generated });
}
