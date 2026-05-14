import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)]">
        Privacy Policy
      </h1>
      <p className="text-[0.85rem] uppercase tracking-[0.1em] text-[var(--color-slate)] font-[family-name:var(--font-mono)] mt-3">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
      </p>

      <h2>Information we collect</h2>
      <p>
        Parish &amp; Company LLC (the &ldquo;Firm&rdquo;) collects only the information voluntarily
        provided to us by clients, prospective clients, and visitors to this website. This may
        include name, email address, phone number, and information necessary to provide investment
        advisory services.
      </p>

      <h2>How we use information</h2>
      <p>
        Information is used solely to respond to inquiries, deliver investment advisory services,
        and meet regulatory recordkeeping obligations under the Investment Advisers Act of 1940
        and Oregon state regulations. We do not sell client information to any third party.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website may use privacy-respecting analytics that do not set tracking cookies. We do
        not use advertising trackers.
      </p>

      <h2>Sharing</h2>
      <p>
        Information may be shared with custodians and service providers strictly as necessary to
        deliver services, and with regulators upon lawful request.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy may be directed to{' '}
        <a href="mailto:bill@billparish.com">bill@billparish.com</a>.
      </p>
    </>
  );
}
