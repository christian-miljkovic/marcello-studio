'use client';

import { useState, type FormEvent } from 'react';
import SketchPreview from './SketchPreview';
import type { Answers, Sketch } from '@/lib/sketch';
import styles from './SketchFlow.module.css';

const QUESTIONS: { key: keyof Answers; label: string }[] = [
  { key: 'brand', label: 'Name of the brand' },
  { key: 'craft', label: 'What do you make?' },
  { key: 'mood', label: 'One word for the mood' },
];

type Status = 'asking' | 'sketching' | 'done' | 'error' | 'limited';

export default function SketchFlow() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [status, setStatus] = useState<Status>('asking');

  async function requestSketch(complete: Answers) {
    setStatus('sketching');
    try {
      const res = await fetch('/api/sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complete),
      });
      if (!res.ok) throw new Error(`sketch request failed: ${res.status}`);
      const data = (await res.json()) as { sketch?: Sketch; limited?: boolean };
      if (data.limited || !data.sketch) {
        setStatus('limited');
        return;
      }
      setSketch(data.sketch);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    const next = { ...answers, [QUESTIONS[step].key]: trimmed };
    setAnswers(next);
    setValue('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      void requestSketch(next as Answers);
    }
  }

  function restart() {
    setStep(0);
    setValue('');
    setAnswers({});
    setSketch(null);
    setStatus('asking');
  }

  if (status === 'limited') {
    return (
      <div className={styles.flow}>
        <p className={styles.status}>
          We have reached our limit of sketches for now. Come back later, or
          write to{' '}
          <a href="mailto:contact@marcello.studio">contact@marcello.studio</a>{' '}
          and we will draw yours by hand.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.flow}>
        <p className={styles.status}>
          The pencil broke. Email{' '}
          <a href="mailto:contact@marcello.studio">contact@marcello.studio</a>{' '}
          and we will sketch it by hand.
        </p>
        <button type="button" className={styles.button} onClick={restart}>
          Try again
        </button>
      </div>
    );
  }

  if (status === 'sketching' || status === 'done') {
    return (
      <div className={styles.takeover}>
        <SketchPreview
          sketch={status === 'done' ? sketch : null}
          answers={answers as Answers}
        />
        {status === 'done' && (
          <div className={styles.takeoverFooter}>
            <p className={styles.cta}>
              Like the direction?{' '}
              <a href="mailto:contact@marcello.studio">
                contact@marcello.studio
              </a>
            </p>
            <button type="button" className={styles.button} onClick={restart}>
              Start over
            </button>
          </div>
        )}
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <form className={styles.flow} onSubmit={handleSubmit}>
      <div>
        <p className={styles.counter}>
          {String(step + 1).padStart(2, '0')} — 03
        </p>
        <label className={styles.label} htmlFor="sketch-answer">
          {question.label}
        </label>
        <input
          id="sketch-answer"
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          maxLength={80}
          autoFocus
        />
      </div>
      <button type="submit" className={styles.button}>
        {step < QUESTIONS.length - 1 ? 'Next' : 'Sketch it'}
      </button>
    </form>
  );
}
