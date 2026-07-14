'use client';

import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';
import SketchPreview from './SketchPreview';
import LeadCapture from './LeadCapture';
import { applyLocalRevision } from '@/lib/revise';
import { encodeShare, type Shared } from '@/lib/share';
import { artifacts, type Answers, type Artifact, type Sketch } from '@/lib/sketch';
import styles from './SketchFlow.module.css';

const MAX_REVISIONS = 3;

const QUESTIONS: { key: keyof Answers; label: string }[] = [
  { key: 'brand', label: 'Name of the brand' },
  { key: 'craft', label: 'What do you make?' },
  { key: 'mood', label: 'One word for the mood' },
];

const STEP_COUNT = QUESTIONS.length + 1;

type Status = 'asking' | 'sketching' | 'done' | 'error' | 'limited';

export default function SketchFlow({ initial }: { initial?: Shared }) {
  const [step, setStep] = useState(initial ? STEP_COUNT : 0);
  const [value, setValue] = useState('');
  const [answers, setAnswers] = useState<Partial<Answers>>(
    initial ? initial.answers : {}
  );
  const [sketch, setSketch] = useState<Sketch | null>(initial?.sketch ?? null);
  const [status, setStatus] = useState<Status>(initial ? 'done' : 'asking');
  const [shared, setShared] = useState(Boolean(initial));
  const [revisionsUsed, setRevisionsUsed] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [revising, setRevising] = useState(false);
  const [copied, setCopied] = useState(false);

  async function requestSketch(complete: Answers, artifact: Artifact) {
    setStatus('sketching');
    try {
      const res = await fetch('/api/sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...complete, artifact }),
      });
      if (!res.ok) throw new Error(`sketch request failed: ${res.status}`);
      const data = (await res.json()) as { sketch?: Sketch; limited?: boolean };
      if (data.limited || !data.sketch) {
        setStatus('limited');
        return;
      }
      track('sketch_generated', { brand: complete.brand, artifact });
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
    setAnswers({ ...answers, [QUESTIONS[step].key]: trimmed });
    setValue('');
    setStep(step + 1);
  }

  function handleArtifact(artifact: Artifact) {
    void requestSketch(answers as Answers, artifact);
  }

  function restart() {
    setStep(0);
    setValue('');
    setAnswers({});
    setSketch(null);
    setStatus('asking');
    setShared(false);
    setRevisionsUsed(0);
    setNoteOpen(false);
    setNote('');
    setRevising(false);
    setCopied(false);
  }

  async function copyLink() {
    if (!sketch) return;
    const url = `${window.location.origin}/sketch?s=${encodeShare({
      answers: answers as Answers,
      sketch,
    })}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', url);
    }
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
          artifact: sketch.artifact,
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
        {status === 'done' && sketch && (
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
                  placeholder={'"warmer", "all serif", "centered"'}
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
                {shared && (
                  <p className={styles.cta}>
                    Sketched for {(answers as Answers).brand}.
                  </p>
                )}
                <LeadCapture answers={answers as Answers} sketch={sketch} />
                {!shared && revisionsUsed < MAX_REVISIONS && (
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
                )}
                {!shared && revisionsUsed >= MAX_REVISIONS && (
                  <span className={styles.revCount}>
                    That&apos;s three revisions — the rest happens over email.
                  </span>
                )}
                <button
                  type="button"
                  className={styles.button}
                  onClick={copyLink}
                >
                  {copied ? 'Copied' : 'Copy link'}
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={restart}
                >
                  {shared ? 'Start your own' : 'Start over'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  if (step === QUESTIONS.length) {
    return (
      <div className={styles.flow}>
        <div>
          <p className={styles.counter}>
            {String(step + 1).padStart(2, '0')} — {String(STEP_COUNT).padStart(2, '0')}
          </p>
          <p className={styles.label}>What should we sketch?</p>
          <div className={styles.artifacts}>
            {(Object.keys(artifacts) as Artifact[]).map((key) => (
              <button
                key={key}
                type="button"
                className={styles.artifactButton}
                onClick={() => handleArtifact(key)}
              >
                {artifacts[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <form className={styles.flow} onSubmit={handleSubmit}>
      <div>
        <p className={styles.counter}>
          {String(step + 1).padStart(2, '0')} — {String(STEP_COUNT).padStart(2, '0')}
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
        Next
      </button>
    </form>
  );
}
