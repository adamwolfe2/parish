import type { Metadata } from 'next';
import Image from 'next/image';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import pressCitations from '@/content/press-citations.json';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Bill Parish is an independent Registered Investment Adviser based in Lake Oswego, Oregon. CPA, MBA, and former CFO with more than two decades of portfolio and financial research experience.',
};

const credentials = [
  'Registered Investment Adviser (RIA)',
  'Certified Public Accountant (CPA)',
  'MBA, Finance — Portland State University',
  'BA, Finance / Accounting (minor Journalism) — University of Oregon',
];

const previousExperience = [
  'Chief Financial Officer',
  'Senior Analyst and Portfolio Manager',
  'Financial Analyst and Business Planner',
  'Certified Public Accountant, Auditor and Systems Consultant',
  'Rural Bank Consultant — Peace Corps Volunteer, Paraguay',
];

const languages = ['English', 'Spanish', 'French', 'Italian', 'Russian (basic)', 'Mandarin (basic)'];

const services = [
  {
    title: 'Individual Investors',
    items: [
      'Evaluate current portfolio and mix of investments',
      'Provide guidance in defining and setting investment goals',
      'Recommend overall asset allocation based on stated objectives',
      'Select stocks, mutual funds, bonds, and other instruments',
      'Provide model portfolios for investors wanting simplicity',
      'Review decisions involving insurance, real estate, credit, and new business opportunities',
    ],
  },
  {
    title: 'Trusts & Foundations',
    items: [
      'Evaluate stated goals and objectives',
      'Recommend a mix of high-quality investment alternatives',
      'Conduct proprietary GAP analysis designed to monitor performance',
      'Evaluate outside money managers, if applicable',
      'Monitor all key aspects of the plan for fiduciary implications',
      'Prepare simplified performance reports to supplement brokerage statements',
      'Meet with management and trustees as requested',
    ],
  },
  {
    title: 'Retirement Plans (401K, 403B)',
    items: [
      'Plan design and evaluation',
      'Risk analysis, enrollment, and education for participants',
      'Model portfolios for employees wanting simplicity',
      'Trustee development and education',
      'ERISA compliance reviews to reduce 404C fiduciary risk',
      'Quarterly performance briefings to management',
      'Ongoing GAP analysis to improve performance',
      'Constant focus on overall fee reduction',
      'Interface with key vendors to continually improve and simplify the plan',
      'Employee and manager meetings as requested',
    ],
  },
];

type Citation = { publication: string; title: string; author?: string; date?: string; excerpt?: string };
const citations = pressCitations as Citation[];

export default function AboutPage() {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-end">
            <FadeIn className="md:col-span-7">
              <Kicker>About Parish &amp; Company</Kicker>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)]">
                A 27-year independent practice in Lake Oswego, Oregon.
              </h1>
              <p className="mt-7 text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
                Bill Parish founded Parish &amp; Company LLC in 1998. The firm manages investment
                portfolios for individuals, families, trusts, foundations, and retirement plans.
                Its original research has been quoted in tier-one business journalism on every
                major corporate-governance and tax-policy story of the past two decades.
              </p>
            </FadeIn>

            <FadeIn className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-sm mx-auto md:ml-auto md:mr-0 overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-mist)]">
                <Image
                  src="/images/bill-parish-portrait.webp"
                  alt="Bill Parish, founder of Parish & Company LLC"
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className="object-cover grayscale"
                  priority
                />
              </div>
              <p className="mt-3 text-center md:text-right text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                Bill Parish · President &amp; CEO
              </p>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* Background narrative */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <Kicker>Background</Kicker>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)]">
                  Registered Investment Adviser.
                </h2>
              </div>
              <div className="md:col-span-8 prose-editorial">
                <p>
                  Parish &amp; Company manages investment portfolios for individuals, pensions, and trusts.
                  The firm provides key planning advice on all financial matters and publishes financial,
                  economic, and corporate governance research.
                </p>
                <p>
                  The practice advances key corporate-governance initiatives to increase market transparency
                  and is internationally recognized as a leader in evaluating interest rate trends, mergers,
                  technology developments, stock options and other compensation programs, and accounting and
                  regulatory rules.
                </p>
                <p>
                  Bill is widely quoted in the New York Times, Bloomberg, Barron&apos;s, USA Today,
                  Los Angeles Times, The Oregonian, and other leading publications.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Credentials & experience */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/40">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <Kicker>Credentials</Kicker>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)]">
                  Education &amp; experience.
                </h2>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-[var(--color-slate)] max-w-sm">
                  More than 20 years of portfolio and financial-research experience across strong
                  and weak markets.
                </p>
              </div>
              <div className="md:col-span-8 grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="text-[0.72rem] uppercase tracking-[0.12em] font-medium text-[var(--color-moss)]">
                    Education
                  </h3>
                  <ul className="mt-4 space-y-2 text-[0.98rem] text-[var(--color-basalt)] leading-relaxed">
                    {credentials.map((c) => (
                      <li key={c}>· {c}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[0.72rem] uppercase tracking-[0.12em] font-medium text-[var(--color-moss)]">
                    Languages
                  </h3>
                  <ul className="mt-4 space-y-2 text-[0.98rem] text-[var(--color-basalt)] leading-relaxed">
                    {languages.map((l) => (
                      <li key={l}>· {l}</li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-2">
                  <h3 className="text-[0.72rem] uppercase tracking-[0.12em] font-medium text-[var(--color-moss)]">
                    Previous professional experience
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-[0.98rem] text-[var(--color-basalt)] leading-relaxed">
                    {previousExperience.map((e) => (
                      <li key={e}>· {e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <Kicker>Services</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)] max-w-2xl">
              Three categories of clients. One disciplined process.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
              Fees are charged at 0.75% per year with an annual minimum. No fees are accepted
              from any investment company, either directly or indirectly.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {services.map((s) => (
                <div key={s.title} className="pt-8 border-t border-[var(--color-hairline-strong)]">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] leading-tight text-[var(--color-basalt)]">
                    {s.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-[1.55] text-[var(--color-slate)]">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-[var(--color-moss)] mt-0.5">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Donaldson */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/50">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="grid gap-10 md:grid-cols-12 md:gap-14 md:items-center">
              <div className="md:col-span-5">
                <div className="relative aspect-[5/4] w-full overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-bone)]">
                  <Image
                    src="/images/donaldson-parish.webp"
                    alt="Bill Donaldson (left) and Bill Parish (right)"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                  Bill Donaldson (left) and Bill Parish (right)
                </p>
              </div>
              <div className="md:col-span-7">
                <Kicker>Recognition</Kicker>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.2] tracking-tight text-[var(--color-basalt)]">
                  A meeting with the SEC Chairman who tried to regulate the hedge funds that triggered 2008.
                </h2>
                <p className="mt-6 text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
                  Bill Donaldson was the SEC Chairman who voted in favor of requiring private equity firms
                  and hedge funds to register with the SEC for the first time. President Bush fired
                  Donaldson and the vote was later overturned. The same funds would trigger the financial
                  crisis of 2008 less than eighteen months later.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Press archive */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <Kicker>Selected media</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)] max-w-2xl">
              Original research featured in tier-one publications.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
              A selected archive of stories drawing on Parish &amp; Company research. The full
              archive lives in <a href="/research" className="underline decoration-[var(--color-moss)] underline-offset-4 hover:text-[var(--color-moss)]">research</a>.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <ul className="border-t border-[var(--color-hairline)]">
              {citations.map((c, i) => (
                <li
                  key={`${c.publication}-${i}`}
                  className="border-b border-[var(--color-hairline)] py-7"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">
                    <span className="text-[var(--color-moss)]">{c.publication}</span>
                    {c.date && (
                      <>
                        <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
                        <span>{c.date}</span>
                      </>
                    )}
                    {c.author && (
                      <>
                        <span aria-hidden="true" className="text-[var(--color-hairline-strong)]">·</span>
                        <span className="lowercase tracking-wide">by {c.author}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] md:text-[1.45rem] leading-[1.2] tracking-[-0.01em] text-[var(--color-basalt)]">
                    {c.title}
                  </h3>
                  {c.excerpt && (
                    <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--color-slate)] line-clamp-3">
                      {c.excerpt}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
