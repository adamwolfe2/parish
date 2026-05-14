import type { Metadata } from 'next';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Investment Philosophy',
  description:
    'Parish & Company manages client wealth through a disciplined investment process across four economic environments — Growth, Balanced, Conservative, and Wealth Preservation.',
};

const allocations = [
  { env: 'Growth', stocks: 75, fixed: 25 },
  { env: 'Balanced', stocks: 50, fixed: 50 },
  { env: 'Conservative', stocks: 25, fixed: 75 },
  { env: 'Wealth Preservation', stocks: 0, fixed: 100 },
];

const history: { years: string; allocation: string }[] = [
  { years: '1994 – 1999', allocation: 'Growth' },
  { years: '2000', allocation: 'Balanced' },
  { years: '2001', allocation: 'Wealth Preservation' },
  { years: '2002', allocation: 'Wealth Preservation' },
  { years: '2003', allocation: 'Balanced as of August 1, 2003' },
  { years: '2004 – 2007', allocation: 'Balanced' },
  { years: '2008 – 2009', allocation: 'Conservative / Wealth Preservation' },
  { years: '2010 – 2018', allocation: 'Balanced / Growth' },
  { years: '2019 – 2023', allocation: 'Balanced / Growth' },
  { years: '2024 – present', allocation: 'Balanced / Growth' },
];

export default function PhilosophyPage() {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <Kicker>Philosophy</Kicker>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)] max-w-3xl">
              A disciplined process across four economic environments.
            </h1>
            <p className="mt-7 max-w-2xl text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
              Parish &amp; Company manages client wealth in a fundamentally different way
              than the average investor. The obligation to make prudent decisions on behalf
              of our clients requires a disciplined investment process designed to achieve
              competitive long-term returns while controlling risk.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Narrative */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="max-w-[680px] prose-editorial">
              <p>
                We replace emotion with the fundamental logic needed to make careful, rational
                choices. Our investment philosophy is based on diligent research, quality
                long-term investments, tax efficiency, and direct client communication. This
                disciplined investment strategy can be successfully executed through various
                market cycles.
              </p>
              <p>
                Four economic environments and asset allocation strategies are recognized by
                Parish &amp; Company. The current environment is defined as <em>balanced / growth</em>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Allocation framework table */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/50">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <Kicker className="mb-4">The framework</Kicker>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)]">
              Four environments. Four allocations.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-hairline-strong)]">
                    <th className="py-4 pr-6 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">Environment</th>
                    <th className="py-4 px-6 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium text-right">Stocks &amp; Stock Funds</th>
                    <th className="py-4 pl-6 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium text-right">Low-Risk Fixed Income</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((a) => (
                    <tr key={a.env} className="border-b border-[var(--color-hairline)]">
                      <td className="py-5 pr-6 font-[family-name:var(--font-display)] text-[1.1rem] text-[var(--color-basalt)]">
                        {a.env}
                      </td>
                      <td className="py-5 px-6 text-right font-[family-name:var(--font-mono)] text-[0.95rem] text-[var(--color-basalt)] tabular-nums">
                        {a.stocks}%
                      </td>
                      <td className="py-5 pl-6 text-right font-[family-name:var(--font-mono)] text-[0.95rem] text-[var(--color-basalt)] tabular-nums">
                        {a.fixed}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Track record */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <Kicker className="mb-4">Track record · 1994 to present</Kicker>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--color-basalt)]">
              A public record of allocations through every cycle.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--text-lead)] leading-[1.55] text-[var(--color-slate)]">
              The following summary is a matter of public record openly communicated to leading
              members of the financial community and the business press. It was the foundation
              for all client decisions over each period.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-hairline-strong)]">
                    <th className="py-4 pr-6 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">Period</th>
                    <th className="py-4 pl-6 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] font-medium">Overall Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.years} className="border-b border-[var(--color-hairline)]">
                      <td className="py-4 pr-6 font-[family-name:var(--font-mono)] text-[0.95rem] text-[var(--color-basalt)] tabular-nums whitespace-nowrap">
                        {row.years}
                      </td>
                      <td className="py-4 pl-6 text-[0.98rem] text-[var(--color-basalt)]">
                        {row.allocation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 max-w-2xl text-[0.9rem] text-[var(--color-slate)] italic leading-relaxed">
              Note that not all clients have the same goals; some may desire a conservative portfolio
              during a period defined by Parish Investments as &ldquo;growth.&rdquo; Past recommendations
              do not in any way guarantee the success of future recommendations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Fiduciary callout */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-basalt)] text-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[0.72rem] uppercase tracking-[0.15em] font-medium text-[var(--color-brass)]">
                No conflicts of interest
              </p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.8vw,2.25rem)] leading-[1.25] italic">
                &ldquo;A written guarantee is provided that no fees are accepted, either directly or
                indirectly, from any investment company on any client. Removing such conflicts of
                interest is a key ingredient to successful long-term oriented investment.&rdquo;
              </p>
              <p className="mt-6 text-[0.95rem] text-white/70 max-w-xl">
                Past performance does not guarantee future results.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
