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

  const { object } = await generateObject({
    model: openrouter.chat(model),
    schema: sketchSchema,
    system: SYSTEM,
    prompt: `Brand: ${answers.brand}\nThey make: ${answers.craft}\nMood, in their word: ${answers.mood}`,
    maxOutputTokens: 700,
  });

  return object;
}
