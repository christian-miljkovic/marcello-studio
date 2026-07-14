'use client';

import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';
import { encodeShare } from '@/lib/share';
import type { Answers, Sketch } from '@/lib/sketch';
import styles from './LeadCapture.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function LeadCapture({
  answers,
  sketch,
}: {
  answers: Answers;
  sketch: Sketch;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey || status === 'failed') {
    return (
      <p className={styles.fallback}>
        {status === 'failed' ? 'That didn’t send — write to us instead: ' : 'Like the direction? '}
        <a href="mailto:contact@marcello.studio">contact@marcello.studio</a>
      </p>
    );
  }

  if (status === 'sent') {
    return (
      <p className={styles.sent}>
        Received. We’ll write back within 48 hours with a hand-made take.
      </p>
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === 'sending') return;

    setStatus('sending');
    const shareUrl = `${window.location.origin}/sketch?s=${encodeShare({ answers, sketch })}`;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Sketch lead: ${answers.brand}`,
          from_name: 'marcello.studio /sketch',
          email: trimmed,
          brand: answers.brand,
          craft: answers.craft,
          mood: answers.mood,
          artifact: sketch.artifact,
          share_url: shareUrl,
        }),
      });
      if (!res.ok) throw new Error(`lead submission failed: ${res.status}`);
      track('lead_submitted', { brand: answers.brand });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="lead-email">
        Like the direction? We’ll send it over and take it further.
      </label>
      <div className={styles.row}>
        <input
          id="lead-email"
          type="email"
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@brand.com"
          autoComplete="email"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
