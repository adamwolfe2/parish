import type { Metadata } from 'next';
import { Kicker } from '@/components/editorial/Kicker';
import { FadeIn } from '@/components/motion/FadeIn';
import { InquiryForm } from '@/components/editorial/InquiryForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Parish & Company LLC — phone, email, and address. Inquiries from prospective clients, media, and academic researchers are welcomed.',
};

export default function ContactPage() {
  return (
    <article>
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-28">
          <FadeIn>
            <Kicker>Contact</Kicker>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-basalt)] max-w-3xl">
              Inquiries from prospective clients, media, and academic researchers are welcomed.
            </h1>
          </FadeIn>
        </div>
      </header>

      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <Kicker>By phone or email</Kicker>
              <div className="mt-8 space-y-10">
                <div>
                  <h3 className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Phone
                  </h3>
                  <a
                    href="tel:+15037265967"
                    className="mt-2 block font-[family-name:var(--font-display)] text-[1.85rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
                  >
                    (503) 726-5967
                  </a>
                </div>

                <div>
                  <h3 className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Email
                  </h3>
                  <a
                    href="mailto:bill@billparish.com"
                    className="mt-2 block font-[family-name:var(--font-display)] text-[1.5rem] md:text-[1.65rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors break-all"
                  >
                    bill@billparish.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Office
                  </h3>
                  <address className="mt-2 not-italic text-[1.05rem] leading-relaxed text-[var(--color-basalt)]">
                    Parish &amp; Company LLC<br />
                    4949 Meadows Road, Suite 600<br />
                    Lake Oswego, Oregon 97035
                  </address>
                </div>
              </div>

              <p className="mt-12 max-w-md text-[0.9rem] leading-relaxed text-[var(--color-slate)] italic">
                Parish &amp; Company LLC is a Registered Investment Adviser firm in the State of
                Oregon. Prior to any advisory work conducted outside Oregon, the firm would
                become registered in that jurisdiction or qualify for an exemption.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-7">
              <Kicker>Send a message</Kicker>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--color-slate)]">
                Brief notes on the nature of your inquiry are appreciated. Replies typically
                arrive within one business day.
              </p>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </article>
  );
}
