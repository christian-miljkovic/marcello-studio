import type { Metadata } from 'next';
import Link from 'next/link';
import SketchFlow from '@/components/SketchFlow';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'See how we think — Marcello Studio',
  description:
    'Three questions, one sketch. Tell us about the brand and we set a first visual direction, live.',
};

export default function SketchPage() {
  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <p className={styles.back}>
          <Link href="/">Marcello Studio</Link>
        </p>
        <div>
          <h1 className={styles.title}>See how we think</h1>
          <p className={styles.intro}>
            Three questions, one sketch. Tell us about the brand and we set a
            first visual direction, live.
          </p>
        </div>
        <SketchFlow />
      </div>
    </main>
  );
}
