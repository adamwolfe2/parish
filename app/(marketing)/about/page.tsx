import { PageFade } from '@/components/motion/PageFade';
import { readContent } from '@/lib/content';

export default function AboutPage() {
  return (
    <PageFade>
      <main className="container page">
        <section className="section two-col">
          <div>
            <h1 className="h1">About Parish & Company</h1>
            <p className="lead">{readContent('about').trim()}</p>
          </div>
          <div className="editorial-image" aria-hidden="true" />
        </section>

        <section className="section">
          <h2 className="h2">Services</h2>
          <div className="cards">
            <article className="card"><h3 className="h3">Individual Investors</h3><p>Discretionary management, risk calibration, and long-horizon portfolio stewardship.</p></article>
            <article className="card"><h3 className="h3">Trusts & Foundations</h3><p>Institutional process design with clear policy statements and disciplined monitoring.</p></article>
            <article className="card"><h3 className="h3">Retirement Plans</h3><p>401(k) and 403(b) investment architecture, fee scrutiny, and fiduciary oversight.</p></article>
          </div>
        </section>

        <section className="section">
          <h2 className="h2">Recognition</h2>
          <p className="lead">A dedicated media archive grid and the Donaldson association photo module will be integrated with sourced assets in the next pass.</p>
          <p className="callout">Fee structure: 0.75% per year with an annual minimum. No fees accepted from any investment company.</p>
        </section>
      </main>
    </PageFade>
  );
}
