import { z } from 'zod';

export const palettes = {
  gallery: { bg: '#FFFFFF', ink: '#111111', muted: '#767676', accent: '#EDEDED' },
  bone: { bg: '#FAF8F4', ink: '#1A1714', muted: '#7A736A', accent: '#EDE7DB' },
  ecru: { bg: '#F4F1EA', ink: '#201D18', muted: '#837B6E', accent: '#E5DFCF' },
  ink: { bg: '#101010', ink: '#F5F5F2', muted: '#9B9B95', accent: '#232323' },
  celadon: { bg: '#EEF1EC', ink: '#17201B', muted: '#6E7A72', accent: '#DDE5DC' },
  blush: { bg: '#F7F0EC', ink: '#241A16', muted: '#8A7A70', accent: '#EEDFD6' },
} as const;

export const typefaces = {
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Didot, "Bodoni MT", "Didot LT STD", "Times New Roman", serif',
  mono: '"Courier New", Courier, monospace',
} as const;

export const artifacts = {
  storefront: 'Shopping page',
  landing: 'Landing page',
  press: 'Showroom & press office',
} as const;

export const answersSchema = z.object({
  brand: z.string().trim().min(1).max(40),
  craft: z.string().trim().min(2).max(80),
  mood: z.string().trim().min(1).max(24),
});

export type Answers = z.infer<typeof answersSchema>;

export const sketchSchema = z.object({
  palette: z.enum(['gallery', 'bone', 'ecru', 'ink', 'celadon', 'blush']),
  typeface: z.enum(['sans', 'serif', 'mono']),
  casing: z.enum(['uppercase', 'sentence']),
  layout: z.enum(['poster', 'editorial', 'split']),
  artifact: z.enum(['storefront', 'landing', 'press']),
  heroLine: z.string().min(3).max(80),
  subLine: z.string().min(3).max(120),
  aboutLine: z.string().min(3).max(160),
  products: z
    .array(
      z.object({
        name: z.string().min(2).max(28),
        price: z.string().min(1).max(12),
      })
    )
    .length(4),
});

export type Sketch = z.infer<typeof sketchSchema>;
export type Artifact = Sketch['artifact'];
