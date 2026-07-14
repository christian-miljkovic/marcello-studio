import type { Sketch } from './sketch';

const PALETTE_ASKS: [RegExp, Sketch['palette']][] = [
  [/\b(darker|dark|black|moodier|moody|night)\b/, 'ink'],
  [/\b(warmer|warm|blush|rose|pink)\b/, 'blush'],
  [/\b(cooler|cool|sage|green|celadon)\b/, 'celadon'],
  [/\b(lighter|light|white|whiter|brighter|bright)\b/, 'gallery'],
  [/\b(cream|bone|softer|soft|ivory)\b/, 'bone'],
  [/\b(earthy|earth|sand|beige|tan|ecru)\b/, 'ecru'],
];

const TYPEFACE_ASKS: [RegExp, Sketch['typeface']][] = [
  [/\b(serif|didot|editorial|elegant)\b/, 'serif'],
  [/\b(mono|monospace|courier|typewriter)\b/, 'mono'],
  [/\b(sans|helvetica|grotesk)\b/, 'sans'],
];

const CASING_ASKS: [RegExp, Sketch['casing']][] = [
  [/\b(uppercase|caps)\b/, 'uppercase'],
  [/\b(lowercase|sentence)\b/, 'sentence'],
];

const LAYOUT_ASKS: [RegExp, Sketch['layout']][] = [
  [/\b(centered|center|editorial)\b/, 'editorial'],
  [/\b(split|offset)\b/, 'split'],
  [/\b(poster|oversized)\b/, 'poster'],
];

function match<T>(asks: [RegExp, T][], note: string): T | null {
  for (const [pattern, value] of asks) {
    if (pattern.test(note)) return value;
  }
  return null;
}

/**
 * Resolves palette/typeface/casing notes instantly without a model call.
 * Returns null when the note needs the model (copy, products, anything else).
 */
export function applyLocalRevision(sketch: Sketch, note: string): Sketch | null {
  const lower = note.toLowerCase();
  const palette = match(PALETTE_ASKS, lower);
  const typeface = match(TYPEFACE_ASKS, lower);
  const casing = match(CASING_ASKS, lower);
  const layout = match(LAYOUT_ASKS, lower);
  if (!palette && !typeface && !casing && !layout) return null;

  // Only fully token-level notes resolve locally; a note that also carries
  // unmatched words (beyond connectives) still goes to the model.
  const residue = lower
    .replace(/\b(and|the|it|a|all|bit|more|much|very|make|please|little|everything)\b/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(
      (word) =>
        ![
          ...PALETTE_ASKS,
          ...TYPEFACE_ASKS,
          ...CASING_ASKS,
          ...LAYOUT_ASKS,
        ].some(([p]) => p.test(word))
    );
  if (residue.length > 0) return null;

  return {
    ...sketch,
    palette: palette ?? sketch.palette,
    typeface: typeface ?? sketch.typeface,
    casing: casing ?? sketch.casing,
    layout: layout ?? sketch.layout,
    products: sketch.products.map((p) => ({ ...p })),
  };
}
