import { cn } from '@/lib/cn';

/**
 * A small editorial chapter mark used between sections of the home page.
 * Three-letter Roman numerals + section title in mono caps. Lets the page
 * read like a quarterly publication.
 */
export function SectionDivider({ numeral, label, className }: { numeral: string; label: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.18em] text-[var(--color-moss)] font-medium">
        {numeral}
      </span>
      <span className="h-px flex-none w-12 bg-[var(--color-hairline-strong)]" />
      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-slate)] font-medium">
        {label}
      </span>
    </div>
  );
}
