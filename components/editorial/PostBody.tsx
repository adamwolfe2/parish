import { sanitizePostHtml } from '@/lib/post-body';

export function PostBody({ html }: { html: string }) {
  const safe = sanitizePostHtml(html);
  return (
    <div
      className="prose-editorial"
      // sanitizePostHtml strips scripts/iframes/styles and allow-lists tags+attributes
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
