'use client';

import { useState, type FormEvent } from 'react';
import SketchPreview from './SketchPreview';
import { applyLocalRevision } from '@/lib/revise';
import type { Answers, Sketch } from '@/lib/sketch';
import styles from './SketchFlow.module.css';

const MAX_REVISIONS = 3;

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
  const [revisionsUsed, setRevisionsUsed] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [revising, setRevising] = useState(false);

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
    setRevisionsUsed(0);
    setNoteOpen(false);
    setNote('');
    setRevising(false);
  }

  async function handleRevision(event: FormEvent) {
    event.preventDefault();
    const trimmed = note.trim();
    if (!trimmed || !sketch || revising) return;

    const local = applyLocalRevision(sketch, trimmed);
    if (local) {
      setSketch(local);
      setRevisionsUsed(revisionsUsed + 1);
      setNote('');
      setNoteOpen(false);
      return;
    }

    setRevising(true);
    try {
      const res = await fetch('/api/sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(answers as Answers),
          revision: { sketch, note: trimmed },
        }),
      });
      if (!res.ok) throw new Error(`revision failed: ${res.status}`);
      const data = (await res.json()) as { sketch?: Sketch; limited?: boolean };
      if (data.limited) {
        setStatus('limited');
        return;
      }
      if (data.sketch) setSketch(data.sketch);
      setRevisionsUsed((used) => used + 1);
      setNote('');
      setNoteOpen(false);
    } catch {
      // keep the current sketch; the note simply didn't take
      setNote('');
      setNoteOpen(false);
    } finally {
      setRevising(false);
    }
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
            {noteOpen && revisionsUsed < MAX_REVISIONS ? (
              <form className={styles.noteForm} onSubmit={handleRevision}>
                <label className={styles.noteLabel} htmlFor="revision-note">
                  Ask for a change
                </label>
                <input
                  id="revision-note"
                  className={styles.noteInput}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={'"warmer", "all serif", "moodier"'}
                  maxLength={60}
                  autoComplete="off"
                  autoFocus
                />
                <button
                  type="submit"
                  className={styles.button}
                  disabled={revising}
                >
                  {revising ? 'Revising…' : 'Revise'}
                </button>
              </form>
            ) : (
              <>
                <p className={styles.cta}>
                  Like the direction?{' '}
                  <a href="mailto:contact@marcello.studio">
                    contact@marcello.studio
                  </a>
                </p>
                {revisionsUsed < MAX_REVISIONS ? (
                  <>
                    {revisionsUsed > 0 && (
                      <span className={styles.revCount}>
                        Revision {revisionsUsed} of {MAX_REVISIONS}
                      </span>
                    )}
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => setNoteOpen(true)}
                    >
                      Ask for a change
                    </button>
                  </>
                ) : (
                  <span className={styles.revCount}>
                    That&apos;s three revisions — the rest happens over email.
                  </span>
                )}
                <button
                  type="button"
                  className={styles.button}
                  onClick={restart}
                >
                  Start over
                </button>
              </>
            )}
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
