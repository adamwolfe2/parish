import type { Metadata } from 'next';
import Image from 'next/image';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';
import pressCitations from '@/content/press-citations.json';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Bill Parish is an independent Registered Investment Adviser based in Lake Oswego, Oregon. CPA, MBA, and former CFO with more than two decades of portfolio and financial research experience.',
};

type Citation = { publication: string; title: string; author?: string; date?: string; excerpt?: string; url?: string | null };
const citations = pressCitations as Citation[];

const background = [
  'Manage investment portfolios for individuals, pensions, and trusts.',
  'Provide key planning advice on all financial matters.',
  'Publish financial, economic, and corporate governance related research.',
  'Advance key corporate-governance initiatives to increase market transparency.',
  'Internationally recognized as a leader in evaluating interest rate trends, mergers, technology developments, stock options and other compensation programs, accounting and regulatory rules, and corporate governance matters.',
  'Widely quoted in the NY Times, Bloomberg, Barron’s, USA Today, LA Times, Oregonian, and other leading publications.',
];

const education = [
  'MBA, Finance — Portland State University',
  'BA, Finance / Accounting (minor Journalism) — University of Oregon',
  'Certified Public Accountant (CPA)',
];

const languages = ['English', 'Spanish', 'French', 'Italian', 'Russian (basic)', 'Mandarin (basic)'];

const previousExperience = [
  'Chief Financial Officer',
  'Senior Analyst and Portfolio Manager',
  'Financial Analyst and Business Planner',
  'Certified Public Accountant, Auditor and Systems Consultant',
  'Rural Bank Consultant — Peace Corps Volunteer, Paraguay',
];

const services = [
  {
    title: 'Individual Investors',
    items: [
      'Evaluate current portfolio and mix of investments',
      'Provide guidance in defining and setting investment goals',
      'Recommend overall asset allocation based on stated objectives',
      'Select stocks, mutual funds, bonds, and other instruments',
      'Provide model portfolios for investors wanting simplicity',
      'Review of insurance, real estate, credit, and new-business decisions',
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
    title: 'Retirement Plans · 401K, 403B',
    items: [
      'Plan design and evaluation',
      'Risk analysis, enrollment, and education for participants',
      'Model portfolios for employees wanting simplicity',
      'Trustee development and education',
      'ERISA compliance reviews to reduce 404C fiduciary risk',
      'Quarterly performance briefings to management',
      'Ongoing GAP analysis to improve performance',
      'Constant focus on overall fee reduction',
      'Interface with key vendors to improve and simplify the plan',
      'Employee and manager meetings as requested',
    ],
  },
];

export default function AboutPage() {
  return (
    <article>
      {/* Header — centered */}
      <header className="relative bg-[var(--color-bone)] overflow-hidden border-b border-[var(--color-hairline)]">
        <MountainSilhouette
          variant="ridge"
          stretch
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 md:h-14 text-[var(--color-moss)] opacity-[0.12]"
        />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block">About Parish &amp; Company</Kicker>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-basalt)]">
                A 27-year independent practice in Lake Oswego, Oregon.
              </h1>
              <p className="mt-7 mx-auto max-w-2xl text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
                Bill Parish founded Parish &amp; Company LLC in 1998. The firm manages
                investment portfolios for individuals, families, trusts, foundations, and
                retirement plans. Its original research has been quoted in tier-one
                business journalism on every major corporate-governance and tax-policy
                story of the past two decades.
              </p>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Background — Registered Investment Adviser */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Kicker className="inline-block mb-4">Background</Kicker>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                  Registered Investment Adviser.
                </h2>
              </div>
              <ul className="mt-10 space-y-4 text-[1.02rem] leading-[1.65] text-[var(--color-basalt)]">
                {background.map((line) => (
                  <li key={line} className="flex gap-4">
                    <span aria-hidden="true" className="text-[var(--color-moss)] mt-1 shrink-0">▸</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Personalized service */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/45">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Kicker className="inline-block mb-4">A different practice</Kicker>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                  Personalized service and level of support.
                </h2>
              </div>
              <p className="mt-9 text-[1.1rem] leading-[1.75] text-[var(--color-basalt)]">
                Choosing Parish &amp; Company provides a more personalized service and level
                of support. The firm focuses upon investment selection and client relations —
                providing long-term continuity and stability, especially in this age of
                mergers.
              </p>
              <p className="mt-5 text-[1.05rem] leading-[1.75] text-[var(--color-slate)]">
                Clients include exceptionally large portfolios in addition to smaller
                portfolios, although smaller portfolios are only accepted based upon a strong
                personal connection or relationship with an existing client.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Kicker className="inline-block mb-4">Through every market</Kicker>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                  Experience with both strong and weak markets.
                </h2>
              </div>
              <p className="mt-9 text-[1.1rem] leading-[1.75] text-[var(--color-basalt)]">
                Parish &amp; Company has been in business for more than 25 years and has
                provided good results in both strong and weak investment markets. Due to
                concern over key corporate-governance and accounting issues, client stock
                exposure was greatly reduced in late 1999 and in fact no equities were
                recommended again until August of 2003.
              </p>
              <p className="mt-5 text-[1.05rem] leading-[1.75] text-[var(--color-slate)]">
                Avoiding the large losses most investors incurred has made a significant
                difference in clients&apos; total assets. Of course there are no guarantees
                with respect to future returns, yet it is exactly this type of long-term
                oriented thinking that investors should expect.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Complex transactions */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/45">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Kicker className="inline-block mb-4">In the press</Kicker>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                  Recognized as a leader in complex financial transactions.
                </h2>
              </div>
              <p className="mt-9 text-[1.1rem] leading-[1.75] text-[var(--color-basalt)]">
                Parish &amp; Company is recognized as a leader in understanding complex
                financial transactions, including mergers and other issues. Work in this
                area has generated hundreds of news stories and television and radio
                interviews.
              </p>
              <p className="mt-5 text-[1.05rem] leading-[1.75] text-[var(--color-slate)]">
                Too much of the investment industry is sales driven today. With Parish
                &amp; Company you get an advisor with a genuine portfolio management — rather
                than sales — orientation.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Credentials — centered grid */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block mb-4">Credentials</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                Education, languages, and experience.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-12">
            <div className="mx-auto max-w-4xl grid gap-px bg-[var(--color-hairline-strong)] border border-[var(--color-hairline-strong)] md:grid-cols-3">
              <CredentialCell label="Education" items={education} />
              <CredentialCell label="Languages" items={languages} />
              <CredentialCell label="Previous experience" items={previousExperience} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services — centered cards */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/45">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block mb-4">Services</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                Three categories of clients. One disciplined process.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-12">
            <div className="grid gap-px bg-[var(--color-hairline-strong)] md:grid-cols-3 border border-[var(--color-hairline-strong)]">
              {services.map((s, i) => (
                <article key={s.title} className="group bg-[var(--color-bone)] p-8 md:p-10 transition-colors hover:bg-white">
                  <p className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.15em] text-[var(--color-moss)] font-medium">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.35rem] leading-[1.15] tracking-[-0.01em] text-[var(--color-basalt)]">
                    {s.title}
                  </h3>
                  <ul className="mt-7 pt-6 border-t border-[var(--color-hairline)] space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-[var(--color-basalt)]">
                        <span aria-hidden="true" className="text-[var(--color-moss)] mt-1 text-[0.7rem]">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Donaldson — centered */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block mb-4">Recognition</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.2] tracking-[-0.01em] text-[var(--color-basalt)]">
                A meeting with the SEC Chairman who tried to regulate the hedge funds that triggered 2008.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-12">
            <div className="mx-auto max-w-3xl">
              <div className="relative aspect-[5/4] w-full max-w-md mx-auto overflow-hidden bg-[var(--color-mist)] border border-[var(--color-hairline)]">
                <Image
                  src="/images/donaldson-parish.webp"
                  alt="Bill Donaldson (left) and Bill Parish (right)"
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-slate)] font-medium">
                Bill Donaldson (left) &nbsp;·&nbsp; Bill Parish (right)
              </p>
              <p className="mt-8 text-[1.05rem] leading-[1.75] text-[var(--color-basalt)]">
                Bill Donaldson was the SEC Chairman who voted in favor of requiring private
                equity firms and hedge funds to register with the SEC for the first time.
                President Bush fired Donaldson and the vote was later overturned. The same
                funds would trigger the financial crisis of 2008 less than eighteen months
                later.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Selected media */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/45">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block mb-4">Selected media</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                Original research featured in tier-one publications.
              </h2>
              <p className="mt-6 mx-auto max-w-xl text-[1rem] leading-[1.6] text-[var(--color-slate)]">
                A selected archive of stories drawing on Parish &amp; Company research. The
                full archive lives in{' '}
                <a href="/research" className="text-[var(--color-moss)] underline decoration-[var(--color-moss)]/40 underline-offset-[6px] hover:decoration-[var(--color-moss)]">
                  research
                </a>
                .
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-12">
            <ul className="mx-auto max-w-3xl border-t border-[var(--color-hairline)]">
              {citations.map((c, i) => (
                <li key={`${c.publication}-${i}`} className="border-b border-[var(--color-hairline)] py-7">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.74rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">
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
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.2rem] md:text-[1.35rem] leading-[1.25] tracking-[-0.01em] text-[var(--color-basalt)]">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-moss)] transition-colors inline-flex items-baseline gap-2"
                      >
                        <span>{c.title}</span>
                        <span aria-hidden="true" className="text-[0.7em] text-[var(--color-slate)]">↗</span>
                      </a>
                    ) : (
                      c.title
                    )}
                  </h3>
                  {c.excerpt && (
                    <p className="mt-2.5 text-[0.95rem] leading-[1.55] text-[var(--color-slate)] line-clamp-3">
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

function CredentialCell({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="bg-[var(--color-bone)] p-7 md:p-8">
      <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-moss)] font-medium">
        {label}
      </p>
      <ul className="mt-5 space-y-2 text-[0.95rem] leading-[1.55] text-[var(--color-basalt)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="text-[var(--color-moss)] mt-1 text-[0.65rem]">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
