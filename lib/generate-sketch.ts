import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { sketchSchema, type Answers, type Sketch } from './sketch';
import { fallbackSketch } from './fallback-sketches';

const SYSTEM = `You are the design director of Marcello Studio, a minimal, fashion-focused web studio in New York. Given a brand, what it makes, and a mood, choose restrained design tokens and write short retail copy in the brand's own voice.

Taste rules: no exclamation marks; no em dashes or hyphens in the hero line; never use the words "elevate", "timeless", "luxury" or "curated"; hero line reads like a lookbook caption, not an ad; product names sound like real garments from this brand; prices are plausible for the craft and consistent with each other. When in doubt, choose the quieter option.`;

export async function generateSketch(answers: Answers): Promise<Sketch> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return fallbackSketch(answers);

  const openrouter = createOpenRouter({ apiKey });
  const model = process.env.OPENROUTER_MODEL ?? 'z-ai/glm-4.6';

  // Some models intermittently emit unparseable structured output;
  // one retry before the caller falls back to a canned sketch.
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { object } = await generateObject({
        // Low reasoning effort: reasoning models otherwise spend the whole
        // output budget thinking and never emit the JSON object.
        model: openrouter.chat(model, { reasoning: { effort: 'low' } }),
        schema: sketchSchema,
        system: SYSTEM,
        prompt: `Brand: ${answers.brand}\nThey make: ${answers.craft}\nMood, in their word: ${answers.mood}`,
        maxOutputTokens: 4000,
      });
      return object;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
