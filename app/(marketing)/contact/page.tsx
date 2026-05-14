import { InquiryForm } from '@/components/editorial/InquiryForm';
import { PageFade } from '@/components/motion/PageFade';
import { readContent } from '@/lib/content';

export default function ContactPage() {
  return (
    <PageFade>
      <main className="container page">
        <h1 className="h1">Contact</h1>
        <div className="contact-layout section">
          <section>
            <p className="lead">{readContent('contact').trim()}</p>
            <p>{readContent('contact-strip').trim()}</p>
            <p className="callout">Parish & Company LLC is a Registered Investment Adviser firm in the State of Oregon.</p>
          </section>
          <section>
            <InquiryForm />
          </section>
        </div>
      </main>
    </PageFade>
  );
}
