import type { Metadata, Viewport } from 'next';
import './globals.css';

const description =
  'Marcello — websites and applications for fashion brands, labels, and the studios around them. New York.';

export const metadata: Metadata = {
  metadataBase: new URL('https://marcello.studio'),
  title: 'Marcello',
  description,
  openGraph: {
    title: 'Marcello',
    description,
    url: 'https://marcello.studio',
    siteName: 'Marcello',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
