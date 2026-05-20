import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Small section label with a moss-green map-marker icon, modeled on
 * Vista's blue-flag section labels. Sits in the top-left of a section
 * and signals what's coming below.
 */
export function SectionEyebrow({ children, className }: Props) {
  return (
    <div className={cn('flex items-center gap-2.5 text-[0.78rem] text-[var(--color-slate)] font-medium', className)}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="text-[var(--color-moss)] shrink-0">
        {/* Map-pin / flag mark */}
        <path d="M 2 2 L 8 2 L 8 9 L 5 7 L 2 9 Z" fill="currentColor" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
