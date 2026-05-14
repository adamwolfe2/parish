import Link from 'next/link';
import { ContactStrip } from '@/components/layout/ContactStrip';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { PageFade } from '@/components/motion/PageFade';
import { readContent } from '@/lib/content';

const publications = readContent('home-featured').split('\n').map((line) => line.trim()).filter(Boolean);

export default function HomePage() {
  return (
    <PageFade>
      <main className="container page">
        <FadeInSection>
          <section className="section hero">
            <div>
              <p className="kicker">Parish & Company LLC</p>
              <h1 className="h1">{readContent('home-title').trim()}</h1>
              <p className="lead">{readContent('home-subhead').trim()}</p>
              <p><Link href="/research" className="text-link">Read the latest research →</Link></p>
            </div>
            <div className="editorial-image" aria-hidden="true" />
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="section">
            <p className="kicker">Original research featured in</p>
            <div className="wordmarks">
              {publications.map((publication) => (
                <div key={publication} className="wordmark-item">{publication}</div>
              ))}
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="section">
            <h2 className="h2">Latest research</h2>
            <div className="cards">
              <article className="card"><p className="meta">June 2026 · Corporate Governance</p><h3 className="h3">Policy structure and incentive leakage in large-cap governance.</h3></article>
              <article className="card"><p className="meta">May 2026 · Pensions & Retirement</p><h3 className="h3">Reading pension assumptions when discount rates and liabilities drift apart.</h3></article>
              <article className="card"><p className="meta">April 2026 · Tax Policy</p><h3 className="h3">How hidden tax mechanics shape shareholder outcomes over the cycle.</h3></article>
            </div>
            <p><Link href="/research" className="text-link">View all research →</Link></p>
          </section>
        </FadeInSection>
      </main>
      <ContactStrip />
    </PageFade>
  );
}
