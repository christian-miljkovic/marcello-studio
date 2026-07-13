import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Home from '@/app/page';

describe('Marcello portfolio page', () => {
  test('shows the studio name as the page heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /marcello studio/i })
    ).toBeVisible();
  });

  test('tells visitors what the studio does', () => {
    render(<Home />);
    expect(
      screen.getByText(/creative technology and design studio/i)
    ).toBeVisible();
  });

  test('lists HAITCH as a client linking to their live site', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /haitch/i });
    expect(link).toHaveAttribute('href', 'https://haitch-usa.com');
  });

  test('lists Non Grata as a client linking to the magazine site', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /non grata/i });
    expect(link).toHaveAttribute('href', 'https://www.magazinenongrata.com/');
  });

  test('client links open in a new tab without leaking the opener', () => {
    render(<Home />);
    for (const name of [/haitch/i, /non grata/i]) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  test('links to the See how we think sketch page', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /see how we think/i });
    expect(link).toHaveAttribute('href', '/sketch');
  });

  test('offers a working email contact', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /contact@marcello\.studio/i });
    expect(link).toHaveAttribute('href', 'mailto:contact@marcello.studio');
  });
});
