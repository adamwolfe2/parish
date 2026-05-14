import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ContactStrip } from '@/components/layout/ContactStrip';
import { JsonLd, organizationSchema, personSchema } from '@/components/seo/JsonLd';
import { Plausible } from '@/components/analytics/Plausible';

const display = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parishinvestments.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Parish & Company — Independent Investment Research and Management Since 1998',
    template: '%s · Parish & Company',
  },
  description:
    'Parish & Company LLC is an independent Registered Investment Adviser in Portland, Oregon. Original research featured in The New York Times, Wall Street Journal, Bloomberg, and Barron\'s.',
  keywords: [
    'Parish & Company',
    'Bill Parish',
    'Registered Investment Adviser',
    'Portland Oregon',
    'investment research',
    'corporate governance',
    'pension research',
  ],
  openGraph: {
    title: 'Parish & Company — Independent Investment Research and Management',
    description:
      'A 27-year record of original analysis across governance, tax structure, pensions, and capital markets.',
    url: siteUrl,
    siteName: 'Parish & Company',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parish & Company',
    description: 'Independent investment research and management. Since 1998.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Stop iOS/Chrome from auto-decorating phone/email/addresses */}
        <meta name="format-detection" content="telephone=no, address=no, email=no, date=no" />
        <JsonLd data={[organizationSchema, personSchema]} />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-basalt)] focus:text-[var(--color-bone)] focus:px-4 focus:py-2 focus:text-[0.9rem] focus:font-medium"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <ContactStrip />
        <Footer />
        <Plausible />
      </body>
    </html>
  );
}
