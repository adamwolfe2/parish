import { readContent } from '@/lib/content';

export function ContactStrip() {
  const text = readContent('contact-strip').trim();
  return <section className="contact-strip"><div className="container">{text}</div></section>;
}
