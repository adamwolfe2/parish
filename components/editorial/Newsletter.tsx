'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Variant = 'inline' | 'card';

type Props = {
  variant?: Variant;
  /** Optional override copy. */
  heading?: string;
  dek?: string;
};

/**
 * Newsletter signup. POSTs to /api/subscribe — when the user wires up
 * Resend Audiences or a third-party (Buttondown, etc.), the route handler
 * is the only file to update.
 *
 * Visual variants:
 *   - inline (default): label + input + button on a single line
 *   - card: vertical layout for use in a sidebar or hero footer band
 */
export function Newsletter({ variant = 'inline', heading, dek }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), website: data.get('website') }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Submission failed');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'border border-[var(--color-hairline-strong)] bg-[var(--color-mist)]/40 p-6',
          variant === 'card' ? '' : 'inline-block',
        )}
      >
        <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
          Subscribed
        </p>
        <p className="mt-2 text-[0.95rem] text-[var(--color-basalt)]">
          You&apos;ll receive new research notes as they&apos;re published.
        </p>
      </div>
    );
  }

  const disabled = status === 'submitting';

  if (variant === 'card') {
    return (
      <div className="border border-[var(--color-hairline)] bg-[var(--color-bone)] p-6 md:p-8">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-[var(--color-moss)]">
          {heading || 'Receive new research'}
        </p>
        <p className="mt-3 text-[0.98rem] leading-[1.55] text-[var(--color-basalt)] max-w-md">
          {dek ||
            'New research notes delivered by email. No marketing, no third-party data sharing. Unsubscribe with one click.'}
        </p>
        <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            disabled={disabled}
            className="flex-1 bg-[var(--color-bone)] border border-[var(--color-hairline-strong)] px-3 py-2.5 text-[0.95rem] focus:outline-none focus:border-[var(--color-moss)] transition-colors"
          />
          <button
            type="submit"
            disabled={disabled}
            className="bg-[var(--color-basalt)] hover:bg-[var(--color-moss)] text-[var(--color-bone)] px-5 py-2.5 text-[0.9rem] font-medium tracking-tight transition-colors disabled:opacity-60"
          >
            {disabled ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-3 text-[0.85rem] text-red-700">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 max-w-md">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      {heading && (
        <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-slate)]">
          {heading}
        </p>
      )}
      <div className="flex gap-2">
        <label htmlFor="nl-inline-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-inline-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={disabled}
          className="flex-1 bg-transparent border-b border-[var(--color-hairline-strong)] py-2 text-[0.95rem] focus:outline-none focus:border-[var(--color-moss)] transition-colors"
        />
        <button
          type="submit"
          disabled={disabled}
          className="text-[0.9rem] font-medium text-[var(--color-moss)] hover:text-[var(--color-moss-deep)] transition-colors disabled:opacity-60"
        >
          {disabled ? 'Subscribing…' : 'Subscribe →'}
        </button>
      </div>
      {error && (
        <p role="alert" className="text-[0.85rem] text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
