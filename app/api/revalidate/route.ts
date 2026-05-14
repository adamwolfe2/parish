import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Sanity webhook target. When Bill publishes/updates/deletes a research
 * note in Studio, Sanity fires a POST here with the document slug. We
 * revalidate the relevant ISR tags and paths so the change appears on
 * the live site within seconds.
 *
 * Configure the webhook in sanity.io/manage:
 *   - URL: https://parishinvestments.vercel.app/api/revalidate
 *   - Dataset: production
 *   - Trigger: Create + Update + Delete on post documents
 *   - Secret: set SANITY_REVALIDATE_SECRET in Vercel env
 *   - HTTP method: POST
 *   - API version: 2025-01-01
 *   - Filter: _type == "post"
 *   - Projection: { "slug": slug.current, "_type": _type }
 */
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  // Reject if not configured — better than silently accepting unsigned POSTs.
  if (!secret) {
    return NextResponse.json(
      { error: 'Server is not configured to accept revalidation' },
      { status: 503 },
    );
  }

  // Sanity sends the secret as a query param (or as a header for newer flows).
  const provided = req.nextUrl.searchParams.get('secret') || req.headers.get('x-sanity-secret');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  let body: { slug?: string; _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Empty body is acceptable — falls through to a full revalidate.
  }

  const tagsToInvalidate: string[] = ['posts'];
  if (body.slug) tagsToInvalidate.push(`post:${body.slug}`);

  for (const tag of tagsToInvalidate) {
    revalidateTag(tag, 'default');
  }

  revalidatePath('/research');
  revalidatePath('/research/topics');
  revalidatePath('/');
  if (body.slug) revalidatePath(`/research/${body.slug}`);

  return NextResponse.json({
    revalidated: true,
    tags: tagsToInvalidate,
    slug: body.slug,
    at: new Date().toISOString(),
  });
}
