import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { sketchSchema, type Answers, type Artifact, type Sketch } from './sketch';
import { fallbackSketch } from './fallback-sketches';

// Vercel kills the whole route at maxDuration (30s), which would skip the
// fallback path entirely; two bounded attempts must always finish before that.
const ATTEMPT_TIMEOUT_MS = 10_000;

const SYSTEM = `You are the design director of Marcello Studio, a minimal, fashion-focused web studio in New York. Given a brand, what it makes, a mood, and which page is being sketched, choose restrained design tokens and write short retail copy in the brand's own voice.

Taste rules: no exclamation marks; no em dashes or hyphens in the hero line; never use the words "elevate", "timeless", "luxury" or "curated"; hero line reads like a lookbook caption, not an ad; the about line is one plain sentence about who makes this and how, in the brand's voice; product names sound like real garments from this brand; prices are plausible for the craft and consistent with each other. Layout: poster for one loud statement, editorial for quiet centered restraint, split when the copy carries tension. Page types: a shopping page sells the pieces; a landing page introduces a brand before launch; a showroom and press office page addresses editors and stylists (hero reads like an announcement, products read like pieces available to preview). When in doubt, choose the quieter option.`;

export async function generateSketch(
  answers: Answers,
  artifact: Artifact,
  revision?: { sketch: Sketch; note: string }
): Promise<Sketch> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return revision ? revision.sketch : fallbackSketch(answers);

  const openrouter = createOpenRouter({ apiKey });
  const model = process.env.OPENROUTER_MODEL ?? 'z-ai/glm-4.6';

  const brief = `Brand: ${answers.brand}\nThey make: ${answers.craft}\nMood, in their word: ${answers.mood}\nPage being sketched: ${artifact}`;
  const prompt = revision
    ? `${brief}\n\nCurrent sketch tokens:\n${JSON.stringify(revision.sketch)}\n\nThe client asks: "${revision.note}"\nReturn the full sketch with the minimal change that honors the request. Keep every other field identical unless the request forces it to change.`
    : brief;

  // Some models intermittently emit unparseable structured output or hang;
  // each attempt is bounded, and one retry runs before the caller falls back.
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
    try {
      const { object } = await generateObject({
        // Low reasoning effort: reasoning models otherwise spend the whole
        // output budget thinking and never emit the JSON object.
        model: openrouter.chat(model, { reasoning: { effort: 'low' } }),
        schema: sketchSchema,
        system: SYSTEM,
        prompt,
        maxOutputTokens: 4000,
        abortSignal: controller.signal,
      });
      return object;
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}
