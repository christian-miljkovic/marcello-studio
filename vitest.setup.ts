import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Analytics is a Vercel-runtime concern; tests observe app behavior only.
vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));

afterEach(() => {
  cleanup();
});
