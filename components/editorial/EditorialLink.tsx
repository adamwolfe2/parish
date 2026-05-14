import Link from 'next/link';
import { cn } from '@/lib/cn';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function EditorialLink({ href, children, className }: Props) {
  return (
    <Link href={href} className={cn('link-editorial', className)}>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">→</span>
    </Link>
  );
}
