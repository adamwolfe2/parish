import type { Metadata } from 'next';
import Link from 'next/link';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { getAllCategories, loadAllPosts } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse the Parish & Company research archive by topic — corporate governance, pensions, tax policy, Oregon PERS, and more.',
};

export default function TopicsPage() {
  const categories = getAllCategories();
  const total = loadAllPosts().length;

  return (
    <>
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <Kicker>Research · Topics</Kicker>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)] max-w-3xl">
              The {total}-note archive, by subject.
            </h1>
            <p className="mt-7 max-w-2xl text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
              Topics are derived from the original publication categories. Select one to browse
              that thread of research from 1998 to today.
            </p>
          </FadeIn>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3 border-t border-[var(--color-hairline)]">
              {categories.map((c) => (
                <li key={c.name} className="border-b border-[var(--color-hairline)]">
                  <Link
                    href={`/research?topic=${encodeURIComponent(c.name)}`}
                    className="group flex items-baseline justify-between gap-3 py-4 transition-colors"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[1.15rem] text-[var(--color-basalt)] group-hover:text-[var(--color-moss)] transition-colors">
                      {c.name}
                    </span>
                    <span className="flex-1 mx-3 border-b border-dotted border-[var(--color-hairline-strong)]" />
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-[0.85rem] text-[var(--color-slate)] group-hover:text-[var(--color-basalt)] transition-colors">
                      {c.count.toString().padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
