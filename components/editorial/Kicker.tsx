import { cn } from '@/lib/cn';

export function Kicker({ children, className, as: As = 'p' }: { children: React.ReactNode; className?: string; as?: 'p' | 'h2' | 'span' | 'div' }) {
  return (
    <As
      className={cn(
        'text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-moss)]',
        className,
      )}
    >
      {children}
    </As>
  );
}
