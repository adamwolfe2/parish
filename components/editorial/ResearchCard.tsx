import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ResearchPost } from '@/lib/research';
import { formatPostDate } from '@/lib/research';

type Props = {
  post: ResearchPost;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function ResearchCard({ post, size = 'md', className }: Props) {
  return (
    <Link
      href={`/research/${post.slug}`}
      className={cn(
        'group relative block py-7 border-t border-[var(--color-hairline)] transition-colors',
        'hover:bg-[var(--color-mist)]/40',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-medium font-[family-name:var(--font-mono)]">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        {post.categories.length > 0 && (
          <>
            <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
            <span className="text-[var(--color-moss)]">{post.categories[0]}</span>
          </>
        )}
      </div>
      <h3
        className={cn(
          'mt-3 font-[family-name:var(--font-display)] tracking-[-0.01em] text-[var(--color-basalt)] leading-[1.2]',
          size === 'sm' && 'text-[1.1rem]',
          size === 'md' && 'text-[1.35rem]',
          size === 'lg' && 'text-[1.65rem] md:text-[1.85rem]',
        )}
      >
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[0%_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-500 ease-out">
          {post.title}
        </span>
      </h3>
      {post.excerpt && (
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--color-slate)] line-clamp-2">
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}
