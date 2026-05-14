import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Form CRS' };

export default function FormCrsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)]">
        Form CRS — Client Relationship Summary
      </h1>

      <p>
        Form CRS is a brief, plain-English summary that retail-investor-facing
        Registered Investment Advisers are required to provide. It explains the
        services we offer, the fees a client pays, the standard of conduct we are
        held to, and our disciplinary history at a glance.
      </p>

      <p>
        The most current Form CRS is filed with the SEC and published through the
        Investment Adviser Public Disclosure system alongside our Form ADV:
      </p>

      <p>
        <a
          href="https://adviserinfo.sec.gov/firm/summary/Parish+%26+Company+LLC"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Parish &amp; Company on SEC IAPD →
        </a>
      </p>

      <h2>Questions to ask any adviser</h2>
      <p>
        The SEC recommends every prospective client ask their adviser the following
        conversation starters:
      </p>
      <ul>
        <li>Given my financial situation, should I choose an investment advisory service? Why or why not?</li>
        <li>How will you choose investments to recommend to me?</li>
        <li>What is your relevant experience, including your licenses, education, and other qualifications? What do these qualifications mean?</li>
        <li>Help me understand how these fees and costs might affect my investments. If I give you $10,000 to invest, how much will go to fees and costs, and how much will be invested for me?</li>
        <li>How might your conflicts of interest affect me, and how will you address them?</li>
        <li>How do your financial professionals make money?</li>
        <li>Do you or your financial professionals have legal or disciplinary history? If yes, for what type of conduct?</li>
        <li>Who is my primary contact person? Is he or she a representative of an investment adviser or a broker-dealer? What can you do if I have concerns about how this person is treating me?</li>
      </ul>

      <p>
        To request the current Form CRS as a PDF, contact{' '}
        <a href="mailto:bill@billparish.com">bill@billparish.com</a> or{' '}
        <a href="tel:+15037265967">(503) 726-5967</a>.
      </p>
    </>
  );
}
