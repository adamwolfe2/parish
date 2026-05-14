'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inquiryTypes = [
  'Prospective client',
  'Media inquiry',
  'Research / academic',
  'Other',
];

export function InquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          type: data.get('type'),
          message: data.get('message'),
          // honeypot
          website: data.get('website'),
        }),
        headers: { 'content-type': 'application/json' },
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Submission failed');
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
        className="border border-[var(--color-hairline-strong)] bg-[var(--color-mist)]/50 p-8"
      >
        <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
          Message received
        </p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-[1.35rem] leading-snug text-[var(--color-basalt)]">
          Thank you. We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const disabled = status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Field label="Name" id="name">
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="form-input"
          disabled={disabled}
        />
      </Field>

      <Field label="Email" id="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-input"
          disabled={disabled}
        />
      </Field>

      <Field label="Type of inquiry" id="type">
        <select id="type" name="type" required defaultValue="" className="form-input" disabled={disabled}>
          <option value="" disabled>
            Select one
          </option>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          className="form-input resize-y"
          disabled={disabled}
        />
      </Field>

      {error && (
        <p role="alert" className="text-[0.9rem] text-red-700">
          {error}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            'inline-flex items-center gap-2 bg-[var(--color-basalt)] text-[var(--color-bone)] px-6 py-3 text-[0.95rem] font-medium tracking-tight',
            'hover:bg-[var(--color-moss)] transition-colors',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        >
          {disabled ? 'Sending…' : 'Send inquiry'}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: var(--color-bone);
          color: var(--color-basalt);
          border: 1px solid var(--color-hairline-strong);
          padding: 0.75rem 0.9rem;
          font: inherit;
          font-size: 0.98rem;
          line-height: 1.5;
          transition: border-color 0.2s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-moss);
          box-shadow: 0 0 0 2px rgba(74, 107, 79, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
