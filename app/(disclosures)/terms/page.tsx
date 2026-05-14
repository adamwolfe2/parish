import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)]">
        Terms of Use
      </h1>
      <p className="text-[0.85rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] mt-3">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
      </p>

      <h2>No investment advice</h2>
      <p>
        The content on this website is provided for general informational purposes only and does
        not constitute investment, tax, legal, or accounting advice. Past performance does not
        guarantee future results.
      </p>

      <h2>Jurisdiction</h2>
      <p>
        Parish &amp; Company LLC is a Registered Investment Adviser firm in the State of Oregon.
        Prior to any advisory work conducted outside Oregon, the firm would become registered in
        that jurisdiction or qualify for an exemption or exclusion.
      </p>

      <h2>Third-party links</h2>
      <p>
        Links to third-party websites are provided as a convenience. The Firm does not endorse and
        is not responsible for the content of any third-party sites.
      </p>

      <h2>Copyright</h2>
      <p>
        All original research and other content is © Parish &amp; Company LLC, all rights reserved.
        Republication or quotation with attribution is permitted for journalistic and academic
        purposes.
      </p>
    </>
  );
}
