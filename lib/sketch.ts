import { z } from 'zod';

export const palettes = {
  gallery: { bg: '#FFFFFF', ink: '#111111', muted: '#767676' },
  bone: { bg: '#FAF8F4', ink: '#1A1714', muted: '#7A736A' },
  ecru: { bg: '#F4F1EA', ink: '#201D18', muted: '#837B6E' },
  ink: { bg: '#101010', ink: '#F5F5F2', muted: '#9B9B95' },
  celadon: { bg: '#EEF1EC', ink: '#17201B', muted: '#6E7A72' },
  blush: { bg: '#F7F0EC', ink: '#241A16', muted: '#8A7A70' },
} as const;

export const typefaces = {
  sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Didot, "Bodoni MT", "Didot LT STD", "Times New Roman", serif',
  mono: '"Courier New", Courier, monospace',
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
  heroLine: z.string().min(3).max(80),
  subLine: z.string().min(3).max(120),
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
