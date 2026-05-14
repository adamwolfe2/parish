import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().trim().email().max(320),
  website: z.string().max(0).optional(), // honeypot
});

export const runtime = 'nodejs';

/**
 * Newsletter subscription. Stub until a list provider is wired.
 *
 * Wiring options for production:
 *   - Resend Audiences: POST /audiences/{id}/contacts via the Resend SDK
 *   - Buttondown: POST https://api.buttondown.email/v1/subscribers
 *   - ConvertKit: POST /v3/forms/{form_id}/subscribe
 *
 * For now the route validates input, refuses honeypot submissions, logs
 * the email server-side, and returns success so the UI can render the
 * confirmation state.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  const { email } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (apiKey && audienceId) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
      return NextResponse.json({ ok: true, subscribed: true });
    } catch (err) {
      console.error('[subscribe] Resend error', err);
      return NextResponse.json({ error: 'Could not subscribe' }, { status: 502 });
    }
  }

  console.warn('[subscribe] No RESEND_AUDIENCE_ID configured — accepted without persistence:', email);
  return NextResponse.json({ ok: true, subscribed: false });
}
