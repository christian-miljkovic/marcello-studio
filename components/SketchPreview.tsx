import type { CSSProperties } from 'react';
import { palettes, typefaces, type Answers, type Sketch } from '@/lib/sketch';
import styles from './SketchPreview.module.css';

export default function SketchPreview({
  sketch,
  answers,
}: {
  sketch: Sketch;
  answers: Answers;
}) {
  const palette = palettes[sketch.palette];
  const vars = {
    '--sketch-bg': palette.bg,
    '--sketch-ink': palette.ink,
    '--sketch-muted': palette.muted,
    '--sketch-type': typefaces[sketch.typeface],
  } as CSSProperties;

  return (
    <div className={styles.wrap}>
      <div className={`${styles.frame} ${styles[sketch.casing]}`} style={vars}>
        <header className={styles.header}>
          <span className={styles.brand}>{answers.brand}</span>
          <nav className={styles.nav} aria-hidden="true">
            <span>Shop</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </header>
        <section className={styles.hero}>
          <h3 className={styles.heroLine}>{sketch.heroLine}</h3>
          <p className={styles.subLine}>{sketch.subLine}</p>
        </section>
        <ul className={styles.products}>
          {sketch.products.map((product) => (
            <li key={product.name}>
              <div className={styles.swatch} aria-hidden="true" />
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.price}>{product.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.note}>A sketch, not a website.</p>
    </div>
  );
}
