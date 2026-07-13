import type { CSSProperties } from 'react';
import { palettes, typefaces, type Answers, type Sketch } from '@/lib/sketch';
import styles from './SketchPreview.module.css';

const NARRATION = [
  'Reading the brief',
  'Mixing the palette',
  'Setting the type',
  'Cutting the collection',
];

export default function SketchPreview({
  sketch,
  answers,
}: {
  sketch: Sketch | null;
  answers: Answers;
}) {
  if (!sketch) {
    return (
      <div className={styles.concept} aria-busy="true">
        <div className={`${styles.ghost} ${styles.ghostBar}`} />
        <div className={`${styles.ghost} ${styles.ghostHero}`} />
        <div className={styles.ghostTiles}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.ghost} ${styles.ghostTile}`} />
          ))}
        </div>
        <p className={styles.narration} aria-live="polite">
          {NARRATION.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    );
  }

  const palette = palettes[sketch.palette];
  const vars = {
    '--sketch-bg': palette.bg,
    '--sketch-ink': palette.ink,
    '--sketch-muted': palette.muted,
    '--sketch-type': typefaces[sketch.typeface],
  } as CSSProperties;

  const casing = sketch.casing === 'uppercase' ? styles.uppercase : '';

  return (
    <div className={`${styles.concept} ${casing}`} style={vars}>
      <header className={`${styles.bar} ${styles.enter} ${styles.enterBar}`}>
        <span className={styles.brand}>{answers.brand}</span>
        <nav className={styles.nav} aria-hidden="true">
          <span>Shop</span>
          <span>About</span>
          <span>Contact</span>
        </nav>
      </header>
      <section className={styles.hero}>
        <h3 className={`${styles.heroLine} ${styles.enter} ${styles.enterHero}`}>
          {sketch.heroLine}
        </h3>
        <p className={`${styles.subLine} ${styles.enter} ${styles.enterSub}`}>
          {sketch.subLine}
        </p>
      </section>
      <ul className={styles.products}>
        {sketch.products.map((product, i) => (
          <li
            key={product.name}
            className={`${styles[`tile${i}`]} ${styles.enter} ${styles[`enterTile${i}`]}`}
          >
            <div className={styles.swatch} aria-hidden="true" />
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.price}>{product.price}</span>
          </li>
        ))}
      </ul>
      <p className={`${styles.note} ${styles.enter} ${styles.enterNote}`}>
        A sketch, not a website.
      </p>
    </div>
  );
}
