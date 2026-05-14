import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  type: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const { name, email, type, message } = parsed.data;
  const to = process.env.CONTACT_FORM_TO || 'bill@billparish.com';
  const apiKey = process.env.RESEND_API_KEY;

  // If Resend isn't configured, accept the message but log it server-side.
  // (Bill will still get inquiries by email once RESEND_API_KEY is set.)
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not set — accepted submission without forwarding.', {
      from: email,
      type,
    });
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#1a1f2b">
        <h2 style="font-family:'Source Serif 4',Georgia,serif;margin:0 0 12px;">New inquiry — Parish & Company</h2>
        <p style="margin:0 0 6px"><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
        <p style="margin:0 0 6px"><strong>Type:</strong> ${escape(type)}</p>
        <hr style="border:none;border-top:1px solid #ebe6dd;margin:18px 0" />
        <pre style="font-family:Inter,Arial,sans-serif;font-size:15px;white-space:pre-wrap;margin:0">${escape(message)}</pre>
      </div>
    `;
    await resend.emails.send({
      from: 'Parish & Company <inquiries@parishinvestments.com>',
      to: [to],
      replyTo: email,
      subject: `[Parish] ${type} — ${name}`,
      html,
    });
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error('[contact] Resend failure', err);
    return NextResponse.json({ error: 'Could not deliver message' }, { status: 502 });
  }
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return c;
    }
  });
}
