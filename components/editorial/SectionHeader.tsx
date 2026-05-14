import { cn } from '@/lib/cn';
import { Kicker } from './Kicker';

type Props = {
  kicker?: string;
  title: string;
  dek?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ kicker, title, dek, align = 'left', className }: Props) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {kicker && <Kicker className="mb-4">{kicker}</Kicker>}
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-basalt)]">
        {title}
      </h2>
      {dek && (
        <p className="mt-5 text-[var(--text-lead)] leading-relaxed text-[var(--color-slate)] max-w-2xl">
          {dek}
        </p>
      )}
    </div>
  );
}
