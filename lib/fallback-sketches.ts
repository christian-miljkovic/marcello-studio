import type { Answers, Sketch } from './sketch';

// Served when no OPENROUTER_API_KEY is configured or generation fails,
// so the experience degrades to curated examples instead of an error.
const canned: Sketch[] = [
  {
    palette: 'bone',
    typeface: 'serif',
    casing: 'uppercase',
    heroLine: 'Made slowly, worn daily',
    subLine: 'A small collection, cut and finished by hand in New York.',
    products: [
      { name: 'Field Jacket', price: '$420' },
      { name: 'Bias Skirt', price: '$265' },
      { name: 'Poplin Shirt', price: '$180' },
      { name: 'Selvedge Tote', price: '$120' },
    ],
  },
  {
    palette: 'gallery',
    typeface: 'sans',
    casing: 'sentence',
    heroLine: 'Everything here earns its place',
    subLine: 'Considered pieces in natural fibers, released in editions.',
    products: [
      { name: 'Edition Knit', price: '$295' },
      { name: 'Paper Trouser', price: '$240' },
      { name: 'Studio Shirt', price: '$175' },
      { name: 'Wool Cap', price: '$85' },
    ],
  },
  {
    palette: 'ink',
    typeface: 'mono',
    casing: 'uppercase',
    heroLine: 'Archive open by appointment',
    subLine: 'One-of-one garments, documented and numbered.',
    products: [
      { name: 'No. 014 Coat', price: '$680' },
      { name: 'No. 021 Vest', price: '$310' },
      { name: 'No. 007 Shirt', price: '$225' },
      { name: 'No. 030 Scarf', price: '$140' },
    ],
  },
];

export function fallbackSketch(answers: Answers): Sketch {
  const seed = answers.brand.length + answers.mood.length + answers.craft.length;
  return canned[seed % canned.length];
}
