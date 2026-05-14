import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ContactStrip } from '@/components/layout/ContactStrip';

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
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <ContactStrip />
        <Footer />
      </body>
    </html>
  );
}
