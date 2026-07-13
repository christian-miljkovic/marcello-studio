import type { Metadata, Viewport } from 'next';
import './globals.css';

const description =
  'Marcello Studio, a creative technology and design studio for fashion brands, labels, and the studios around them. New York.';

export const metadata: Metadata = {
  metadataBase: new URL('https://marcello.studio'),
  title: 'Marcello Studio',
  description,
  openGraph: {
    title: 'Marcello Studio',
    description,
    url: 'https://marcello.studio',
    siteName: 'Marcello Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcello Studio',
    description,
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
