import { ImageResponse } from 'next/og';
import { decodeShare } from '@/lib/share';
import { palettes } from '@/lib/sketch';

export const runtime = 'nodejs';

const SIZE = { width: 1200, height: 630 };

export async function GET(req: Request): Promise<Response> {
  const s = new URL(req.url).searchParams.get('s') ?? '';
  const shared = decodeShare(s);

  if (!shared) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            backgroundColor: '#FAF8F4',
          }}
        >
          <div style={{ fontSize: 54, letterSpacing: '0.3em', color: '#111' }}>
            MARCELLO STUDIO
          </div>
          <div style={{ fontSize: 19, letterSpacing: '0.18em', color: '#767676' }}>
            THREE QUESTIONS, ONE SKETCH
          </div>
        </div>
      ),
      SIZE
    );
  }

  const palette = palettes[shared.sketch.palette];
  const uppercase = shared.sketch.casing === 'uppercase';
  const serifLook = shared.sketch.typeface === 'serif';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          backgroundColor: palette.bg,
          color: palette.ink,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            letterSpacing: '0.32em',
          }}
        >
          <span>{shared.answers.brand.toUpperCase()}</span>
          <span style={{ color: palette.muted }}>A SKETCH</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            lineHeight: 1.05,
            maxWidth: 980,
            fontFamily: serifLook ? 'Georgia, serif' : 'Helvetica, sans-serif',
            textTransform: uppercase ? 'uppercase' : 'none',
          }}
        >
          {shared.sketch.heroLine}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: '0.2em',
            color: palette.muted,
          }}
        >
          <span>MARCELLO STUDIO</span>
          <span>A SKETCH, NOT A WEBSITE</span>
        </div>
      </div>
    ),
    SIZE
  );
}
