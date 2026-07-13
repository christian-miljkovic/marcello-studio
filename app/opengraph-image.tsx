import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  'Marcello Studio — a creative technology and design studio for fashion';

export default async function OpengraphImage() {
  const poster = await readFile(
    join(process.cwd(), 'public', 'background-poster.jpg')
  );
  const silk = `data:image/jpeg;base64,${poster.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#ffffff',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={silk}
          alt=""
          width={1200}
          height={675}
          style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.84)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <div style={{ fontSize: 54, letterSpacing: '0.3em', color: '#111' }}>
            MARCELLO STUDIO
          </div>
          <div
            style={{ fontSize: 19, letterSpacing: '0.18em', color: '#767676' }}
          >
            A CREATIVE TECHNOLOGY AND DESIGN STUDIO FOR FASHION
          </div>
        </div>
      </div>
    ),
    size
  );
}
