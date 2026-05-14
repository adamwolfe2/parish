import type { Metadata } from 'next';
import Image from 'next/image';
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
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-14 md:py-16">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <Kicker className="inline-block">Contact</Kicker>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.15] tracking-[-0.015em] text-[var(--color-basalt)]">
                Get in touch.
              </h1>
              <p className="mt-5 mx-auto max-w-xl text-[1rem] leading-[1.65] text-[var(--color-slate)]">
                Inquiries from prospective clients, media, and academic researchers are welcomed.
                Replies typically arrive within one business day.
              </p>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Office establishing shot */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-12 md:py-16">
          <FadeIn>
            <figure className="relative w-full overflow-hidden border border-[var(--color-hairline)]">
              <div className="relative aspect-[16/7]">
                <Image
                  src="/images/office.webp"
                  alt="Parish & Company office, 4949 Meadows Road, Lake Oswego, Oregon"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  quality={88}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] font-medium text-[var(--color-brass)]">
                  Office
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-[1.05rem] md:text-[1.2rem] tracking-tight">
                  4949 Meadows Road, Suite 600 &nbsp;·&nbsp; Lake Oswego, Oregon
                </p>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <FadeIn className="md:col-span-5">
              <Kicker>By phone or email</Kicker>
              <div className="mt-8 space-y-10">
                <div>
                  <p className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Phone
                  </p>
                  <a
                    href="tel:+15037265967"
                    className="mt-2 block font-[family-name:var(--font-display)] text-[1.85rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors"
                  >
                    (503) 726-5967
                  </a>
                </div>

                <div>
                  <p className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Email
                  </p>
                  <a
                    href="mailto:bill@billparish.com"
                    className="mt-2 block font-[family-name:var(--font-display)] text-[1.5rem] md:text-[1.65rem] tracking-tight text-[var(--color-basalt)] hover:text-[var(--color-moss)] transition-colors break-all"
                  >
                    bill@billparish.com
                  </a>
                </div>

                <div>
                  <p className="text-[0.78rem] uppercase tracking-[0.12em] font-medium text-[var(--color-slate)]">
                    Office
                  </p>
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
              <div className="mt-6">
                <InquiryForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </article>
  );
}
