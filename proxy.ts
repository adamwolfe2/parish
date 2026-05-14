import { NextResponse, type NextRequest } from 'next/server';

/**
 * Preserve SEO equity from the legacy WordPress URL pattern.
 * /YYYY/MM/DD/<slug>/  →  /research/<slug>
 */
const WP_PERMALINK = /^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/?$/;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const match = pathname.match(WP_PERMALINK);
  if (match) {
    const slug = match[4];
    const url = req.nextUrl.clone();
    url.pathname = `/research/${slug}`;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon|sitemap|robots).*)'],
};
