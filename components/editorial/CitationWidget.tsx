'use client';

import { useState } from 'react';

type Props = {
  title: string;
  publishedAt: string;
  url: string;
};

/**
 * One-click citation widget — generates a plain-text citation a journalist
 * or researcher can paste into their copy. Three formats; copy-to-clipboard
 * with confirmation toast.
 */
export function CitationWidget({ title, publishedAt, url }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const date = new Date(publishedAt);
  const year = date.getFullYear();
  const accessed = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateLong = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const formats: { id: string; label: string; text: string }[] = [
    {
      id: 'apa',
      label: 'APA',
      text: `Parish, B. (${year}, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}). ${title}. Parish & Company LLC. ${url}`,
    },
    {
      id: 'chicago',
      label: 'Chicago',
      text: `Bill Parish, "${title}," Parish & Company LLC, ${dateLong}, ${url}.`,
    },
    {
      id: 'inline',
      label: 'Inline',
      text: `${title}, Bill Parish, Parish & Company (${dateLong}). Available at ${url} (accessed ${accessed}).`,
    },
  ];

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 2000);
    } catch {
      // Clipboard API can fail in non-secure contexts; user can still select manually.
    }
  }

  return (
    <details className="border border-[var(--color-hairline)] bg-[var(--color-mist)]/40 group open:bg-[var(--color-bone)]">
      <summary className="cursor-pointer list-none flex items-center justify-between px-5 py-3.5 text-[0.85rem] text-[var(--color-slate)] hover:text-[var(--color-basalt)] transition-colors">
        <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]">
          Cite this analysis
        </span>
        <span aria-hidden="true" className="text-[var(--color-slate)] group-open:rotate-180 transition-transform">
          ⌄
        </span>
      </summary>
      <div className="px-5 pb-5 pt-1 space-y-4">
        {formats.map((f) => (
          <div key={f.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-slate)]">
                {f.label}
              </p>
              <button
                type="button"
                onClick={() => copy(f.id, f.text)}
                className="text-[0.78rem] text-[var(--color-moss)] hover:text-[var(--color-moss-deep)] transition-colors font-medium min-h-[28px]"
              >
                {copied === f.id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[0.85rem] leading-[1.55] text-[var(--color-basalt)] font-[family-name:var(--font-mono)] break-all">
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}
