import type { CSSProperties } from 'react';
import { palettes, typefaces, type Answers, type Sketch } from '@/lib/sketch';
import styles from './SketchPreview.module.css';

const NARRATION = [
  'Reading the brief',
  'Mixing the palette',
  'Setting the type',
  'Cutting the collection',
];

const NAV: Record<Sketch['artifact'], string[]> = {
  storefront: ['Shop', 'About', 'Contact'],
  landing: ['About', 'Contact'],
  press: ['Showroom', 'Press', 'Contact'],
};

const LAYOUT_CLASS: Record<Sketch['layout'], string> = {
  poster: 'layoutPoster',
  editorial: 'layoutEditorial',
  split: 'layoutSplit',
};

function Collection({ sketch, answers }: { sketch: Sketch; answers: Answers }) {
  if (sketch.artifact === 'press') {
    const slug = answers.brand.toLowerCase().replace(/[^a-z0-9]/g, '');
    return (
      <section className={`${styles.pressBlock} ${styles.enter}`}>
        <p className={styles.kicker}>Available to preview</p>
        <ul className={styles.pressList}>
          {sketch.products.map((product, i) => (
            <li key={product.name} className={styles.pressItem}>
              <span className={styles.pressIndex}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.productName}>{product.name}</span>
            </li>
          ))}
        </ul>
        <div className={styles.pressOffice}>
          <p className={styles.kicker}>Press office</p>
          <p className={styles.pressLine}>Samples by appointment, New York.</p>
          <p className={styles.pressLine}>press@{slug || 'studio'}.com</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.collection}>
      {sketch.artifact === 'landing' && (
        <p className={`${styles.kicker} ${styles.enter}`}>
          The first pieces — arriving soon
        </p>
      )}
      <ul className={styles.products}>
        {sketch.products.map((product, i) => (
          <li
            key={product.name}
            className={`${styles[`tile${i}`]} ${styles.enter} ${styles[`enterTile${i}`]}`}
          >
            <div className={styles.swatch} aria-hidden="true" />
            <span className={styles.productName}>{product.name}</span>
            {sketch.artifact === 'storefront' && (
              <span className={styles.price}>{product.price}</span>
            )}
          </li>
        ))}
      </ul>
      {sketch.artifact === 'landing' && (
        <div className={`${styles.notify} ${styles.enter}`} aria-hidden="true">
          <span className={styles.notifyField}>Your email</span>
          <span className={styles.notifyButton}>Notify me</span>
        </div>
      )}
    </section>
  );
}

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
        <div className={`${styles.ghost} ${styles.ghostHero}`}>
          <p className={styles.narration} aria-live="polite">
            {NARRATION.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        <div className={styles.ghostTiles}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${styles.ghost} ${styles.ghostTile}`} />
          ))}
        </div>
      </div>
    );
  }

  const palette = palettes[sketch.palette];
  const vars = {
    '--sketch-bg': palette.bg,
    '--sketch-ink': palette.ink,
    '--sketch-muted': palette.muted,
    '--sketch-accent': palette.accent,
    '--sketch-type': typefaces[sketch.typeface],
  } as CSSProperties;

  const casing = sketch.casing === 'uppercase' ? styles.uppercase : '';
  const layout = styles[LAYOUT_CLASS[sketch.layout]];

  return (
    <div className={`${styles.concept} ${casing} ${layout}`} style={vars}>
      <header className={`${styles.bar} ${styles.enter} ${styles.enterBar}`}>
        <span className={styles.brand}>{answers.brand}</span>
        <nav className={styles.nav} aria-hidden="true">
          {NAV[sketch.artifact].map((item) => (
            <span key={item}>{item}</span>
          ))}
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
      <Collection sketch={sketch} answers={answers} />
      <section className={`${styles.editorial} ${styles.enter}`}>
        <p className={styles.kicker}>From the studio</p>
        <p className={styles.aboutLine}>{sketch.aboutLine}</p>
      </section>
      <footer className={`${styles.conceptFooter} ${styles.enter}`}>
        <span className={styles.brand}>{answers.brand}</span>
        <p className={`${styles.note} ${styles.enterNote}`}>
          A sketch, not a website.
        </p>
      </footer>
    </div>
  );
}
