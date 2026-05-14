import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Code of Ethics' };

export default function CodeOfEthicsPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[var(--color-basalt)]">
        Code of Ethics
      </h1>

      <p>
        Parish &amp; Company LLC maintains a written Code of Ethics consistent with Rule 204A-1
        under the Investment Advisers Act of 1940 and Oregon state regulations. The Code
        addresses standards of conduct, the fiduciary duty owed to clients, personal trading,
        gifts and entertainment, and the protection of material non-public information.
      </p>

      <p>
        A central commitment of the Firm: no fees are accepted from any investment company,
        either directly or indirectly, on any client. A written guarantee of this commitment
        is provided to every client.
      </p>

      <p>
        A copy of the current Code of Ethics is available upon request to{' '}
        <a href="mailto:bill@billparish.com">bill@billparish.com</a>.
      </p>
    </>
  );
}
