import type { Answers, Sketch } from './sketch';

// Served when no OPENROUTER_API_KEY is configured or generation fails,
// so the experience degrades to curated examples instead of an error.
const canned: Sketch[] = [
  {
    palette: 'bone',
    typeface: 'serif',
    casing: 'uppercase',
    layout: 'poster',
    artifact: 'storefront',
    heroLine: 'Made slowly, worn daily',
    subLine: 'A small collection, cut and finished by hand in New York.',
    aboutLine: 'One maker, one room, and cloth that earns its keep.',
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
    layout: 'editorial',
    artifact: 'storefront',
    heroLine: 'Everything here earns its place',
    subLine: 'Considered pieces in natural fibers, released in editions.',
    aboutLine: 'We release in editions and never repeat a run.',
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
    layout: 'split',
    artifact: 'storefront',
    heroLine: 'Archive open by appointment',
    subLine: 'One-of-one garments, documented and numbered.',
    aboutLine: 'Every garment is documented, numbered and kept on record.',
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
