import Script from 'next/script';

/**
 * Privacy-respecting analytics. Cookieless. No PII collected.
 * Enabled only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 */
export function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';
  if (!domain) return null;
  return (
    <Script
      strategy="afterInteractive"
      data-domain={domain}
      src={src}
      defer
    />
  );
}
