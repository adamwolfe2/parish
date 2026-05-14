import type { Metadata } from 'next';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { MountainSilhouette } from '@/components/editorial/MountainSilhouette';

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
  { years: '2024 – present', allocation: 'Balanced / Conservative' },
];

export default function PhilosophyPage() {
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
              <Kicker className="inline-block">Philosophy</Kicker>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-basalt)]">
                A disciplined process across four economic environments.
              </h1>
              <p className="mt-7 mx-auto max-w-2xl text-[var(--text-lead)] leading-[1.6] text-[var(--color-slate)]">
                Parish &amp; Company manages client wealth in a fundamentally different way
                than the average investor. The obligation to make prudent decisions on
                behalf of our clients requires a disciplined investment process designed to
                achieve competitive long-term returns while controlling risk.
              </p>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Narrative — column centered, body left-aligned */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-[680px]">
              <p className="text-[1.15rem] leading-[1.7] text-[var(--color-basalt)]">
                We replace emotion with the fundamental logic needed to make careful,
                rational choices. Our investment philosophy is based on diligent research,
                quality long-term investments, tax efficiency, and direct client
                communication. This disciplined investment strategy can be successfully
                executed through various market cycles.
              </p>
              <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--color-slate)]">
                Four economic environments and asset allocation strategies are recognized
                by Parish &amp; Company. The current environment is defined as{' '}
                <span className="text-[var(--color-basalt)] font-medium italic">
                  balanced &#x2F; conservative
                </span>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Allocation framework table — centered */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-mist)]/50">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Kicker className="inline-block mb-4">The framework</Kicker>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                Four environments. Four allocations.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-12">
            <div className="mx-auto max-w-3xl bg-[var(--color-bone)] border border-[var(--color-hairline)] overflow-hidden">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                </colgroup>
                <thead>
                  <tr className="bg-[var(--color-mist)]/60 border-b border-[var(--color-hairline-strong)]">
                    <th className="text-left font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium px-5 md:px-6 py-3.5">
                      Environment
                    </th>
                    <th className="text-right font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium px-5 md:px-6 py-3.5">
                      Stocks
                    </th>
                    <th className="text-right font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium px-5 md:px-6 py-3.5">
                      Fixed Income
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((a) => (
                    <tr key={a.env} className="border-b border-[var(--color-hairline)] last:border-b-0">
                      <td className="font-[family-name:var(--font-display)] text-[1rem] md:text-[1.05rem] text-[var(--color-basalt)] px-5 md:px-6 py-3.5">
                        {a.env}
                      </td>
                      <td className="text-right font-[family-name:var(--font-mono)] tabular-nums text-[0.95rem] text-[var(--color-basalt)] px-5 md:px-6 py-3.5">
                        {a.stocks}%
                      </td>
                      <td className="text-right font-[family-name:var(--font-mono)] tabular-nums text-[0.95rem] text-[var(--color-basalt)] px-5 md:px-6 py-3.5">
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

      {/* Track record — centered */}
      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <Kicker className="inline-block mb-4">Track record · 1994 to present</Kicker>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                  A public record of allocations through every cycle.
                </h2>
              </div>
              <p className="mt-7 text-[1.05rem] leading-[1.7] text-[var(--color-slate)]">
                The following summary is a matter of public record openly communicated to
                leading members of the financial community and the business press. It was
                the foundation for all client decisions over each period.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-12">
            <div className="mx-auto max-w-3xl bg-[var(--color-bone)] border border-[var(--color-hairline)] overflow-hidden">
              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-2/5" />
                  <col className="w-3/5" />
                </colgroup>
                <thead>
                  <tr className="bg-[var(--color-mist)]/60 border-b border-[var(--color-hairline-strong)]">
                    <th className="text-left font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium px-5 md:px-6 py-3.5">
                      Period
                    </th>
                    <th className="text-left font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-slate)] font-medium px-5 md:px-6 py-3.5">
                      Overall Allocation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.years} className="border-b border-[var(--color-hairline)] last:border-b-0">
                      <td className="font-[family-name:var(--font-mono)] tabular-nums text-[0.92rem] text-[var(--color-basalt)] px-5 md:px-6 py-3.5 whitespace-nowrap">
                        {row.years}
                      </td>
                      <td className="font-[family-name:var(--font-display)] text-[1rem] text-[var(--color-basalt)] px-5 md:px-6 py-3.5">
                        {row.allocation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 mx-auto max-w-3xl text-[0.9rem] text-[var(--color-slate)] italic leading-relaxed">
              Note that not all clients have the same goals; some may desire a conservative
              portfolio during a period defined by Parish &amp; Company as &ldquo;growth.&rdquo;
              Past recommendations do not in any way guarantee the success of future
              recommendations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Fiduciary callout — centered */}
      <section className="relative bg-[var(--color-moss)] text-white overflow-hidden">
        <MountainSilhouette
          variant="range"
          stretch
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 md:h-20 text-white opacity-[0.10]"
        />
        <div className="relative mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] font-medium text-[var(--color-brass)]">
                No conflicts of interest
              </p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.3] italic">
                &ldquo;A written guarantee is provided that no fees are accepted, either
                directly or indirectly, from any investment company on any client. Removing
                such conflicts of interest is a key ingredient to successful long-term
                oriented investment.&rdquo;
              </p>
              <p className="mt-8 text-[0.9rem] text-white/65">
                Past performance does not guarantee future results.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
