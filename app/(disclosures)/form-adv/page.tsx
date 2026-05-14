import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Form ADV' };

export default function FormAdvPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)]">
        Form ADV
      </h1>

      <p>
        Form ADV is the uniform form used by investment advisers to register with the U.S.
        Securities and Exchange Commission and state securities authorities. Parish &amp; Company
        LLC&apos;s current Form ADV brochure (Part 2A) and brochure supplement (Part 2B) describe
        our business practices, fee schedule, conflicts of interest, and the qualifications of
        our principal.
      </p>

      <p>
        To request the current Form ADV brochure, please contact{' '}
        <a href="mailto:bill@billparish.com">bill@billparish.com</a> or call{' '}
        <a href="tel:+15037265967">(503) 726-5967</a>.
      </p>

      <p>
        Form ADV is also available through the SEC&apos;s Investment Adviser Public Disclosure
        system at{' '}
        <a href="https://adviserinfo.sec.gov" target="_blank" rel="noopener noreferrer">
          adviserinfo.sec.gov
        </a>
        .
      </p>
    </>
  );
}
