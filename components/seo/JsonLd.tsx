type Json = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      // The schema.org JSON-LD format intentionally embeds JSON in the page;
      // values are server-controlled. Escape </script> defensively in case
      // any field ever contains user content (e.g., post titles from CMS).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${siteUrl}#organization`,
  name: 'Parish & Company LLC',
  legalName: 'Parish & Company LLC',
  url: siteUrl,
  email: 'bill@billparish.com',
  telephone: '+1-503-726-5967',
  description:
    'Independent Registered Investment Adviser offering investment research and portfolio management since 1998.',
  founder: { '@id': `${siteUrl}#bill-parish` },
  foundingDate: '1998',
  areaServed: { '@type': 'Country', name: 'United States' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4949 Meadows Road, Suite 600',
    addressLocality: 'Lake Oswego',
    addressRegion: 'OR',
    postalCode: '97035',
    addressCountry: 'US',
  },
  sameAs: [],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}#bill-parish`,
  name: 'Bill Parish',
  jobTitle: 'President & CEO',
  worksFor: { '@id': `${siteUrl}#organization` },
  description:
    'Independent Registered Investment Adviser, CPA, and former CFO. Original financial research quoted in The New York Times, Wall Street Journal, Bloomberg, Barron’s, Financial Times, and The Guardian.',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Portland State University' },
    { '@type': 'CollegeOrUniversity', name: 'University of Oregon' },
  ],
  knowsLanguage: ['English', 'Spanish', 'French', 'Italian', 'Russian', 'Mandarin'],
  knowsAbout: [
    'Corporate Governance',
    'Pension Plan Analysis',
    'Tax Policy',
    'Investment Management',
    'Capital Markets',
  ],
};
