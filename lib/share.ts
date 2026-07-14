import { z } from 'zod';
import { answersSchema, sketchSchema } from './sketch';

const sharedSchema = z.object({
  answers: answersSchema,
  sketch: sketchSchema,
});

export type Shared = z.infer<typeof sharedSchema>;

/** Encodes a finished sketch into a URL-safe base64 string; the link is the storage. */
export function encodeShare(shared: Shared): string {
  const bytes = new TextEncoder().encode(JSON.stringify(shared));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Decodes a share param back into a sketch; anything invalid becomes null, never a throw. */
export function decodeShare(encoded: string): Shared | null {
  // Real payloads are ~1KB; anything huge is not ours, refuse before parsing.
  if (!encoded || encoded.length > 8192) return null;
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    const result = sharedSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
