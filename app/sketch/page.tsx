import type { Metadata } from 'next';
import Link from 'next/link';
import SketchFlow from '@/components/SketchFlow';
import { decodeShare } from '@/lib/share';
import styles from './page.module.css';

type Props = {
  searchParams: Promise<{ s?: string }>;
};

const baseMetadata: Metadata = {
  title: 'See how we think — Marcello Studio',
  description:
    'Three questions, one sketch. Tell us about the brand and we set a first visual direction, live.',
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { s } = await searchParams;
  const shared = s ? decodeShare(s) : null;
  if (!shared) return baseMetadata;
  return {
    ...baseMetadata,
    title: `A sketch for ${shared.answers.brand} — Marcello Studio`,
    description: shared.sketch.heroLine,
    openGraph: {
      images: [{ url: `/api/og?s=${s}`, width: 1200, height: 630 }],
    },
  };
}

export default async function SketchPage({ searchParams }: Props) {
  const { s } = await searchParams;
  const shared = s ? decodeShare(s) : null;

  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <p className={styles.back}>
          <Link href="/">Marcello Studio</Link>
        </p>
        <div>
          <h1 className={styles.title}>See how we think</h1>
          <p className={styles.intro}>
            {shared
              ? `A first visual direction for ${shared.answers.brand}, sketched from three answers. Start your own below.`
              : 'Three questions, one sketch. Tell us about the brand and we set a first visual direction, live.'}
          </p>
        </div>
        <SketchFlow initial={shared ?? undefined} key={s ?? 'fresh'} />
      </div>
    </main>
  );
}
