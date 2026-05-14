import { PageFade } from '@/components/motion/PageFade';
import { readContent } from '@/lib/content';

export default function PhilosophyPage() {
  return (
    <PageFade>
      <main className="container page">
        <section className="section">
          <h1 className="h1">Investment Philosophy</h1>
          <p className="lead">{readContent('philosophy').trim()}</p>
        </section>

        <section className="section">
          <h2 className="h2">Four-environment framework</h2>
          <table className="table">
            <thead><tr><th>Environment</th><th>Objective</th><th>Primary Risk Control</th></tr></thead>
            <tbody>
              <tr><td>Growth</td><td>Compound capital through business quality and valuation discipline.</td><td>Position sizing and downside case underwriting.</td></tr>
              <tr><td>Balanced</td><td>Preserve flexibility while participating in selective opportunity.</td><td>Liquidity thresholds and balance-sheet screening.</td></tr>
              <tr><td>Conservative</td><td>Protect principal when risk premia are mispriced.</td><td>Cash-flow durability and credit quality limits.</td></tr>
              <tr><td>Wealth Preservation</td><td>Defend purchasing power through difficult market regimes.</td><td>Diversification, duration management, and cash reserves.</td></tr>
            </tbody>
          </table>
        </section>

        <section className="section">
          <h2 className="h2">Track record artifact (placeholder)</h2>
          <p className="lead">Historical forecast and recommendation data will be imported and reviewed in Phase 2 after migration QA.</p>
          <p className="callout">Past performance does not guarantee future results.</p>
        </section>
      </main>
    </PageFade>
  );
}
