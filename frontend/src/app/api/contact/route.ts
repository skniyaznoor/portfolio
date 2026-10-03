import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Without a verified domain, Resend only delivers to the account owner's address
const TO = process.env.CONTACT_TO_EMAIL || 'niyazunveiled@gmail.com';
const FROM = process.env.CONTACT_FROM_EMAIL || 'Niyazion <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Source = 'messages' | 'create' | 'contact';
const sourceLabel: Record<Source, string> = {
    messages: 'New DM on your portfolio',
    create: 'New "Ask me anything" question',
    contact: 'New contact message',
};

// Best-effort rate limit (per server instance): 8 messages per IP per 10 minutes
const hits = new Map<string, number[]>();
function limited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > 8;
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function row(label: string, value: string) {
    return `<div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#737373;margin:20px 0 6px;">${label}</div><div style="font-size:15px;">${value}</div>`;
}

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not set');
        return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    try {
        // sendBeacon posts as text/plain, so parse the raw body ourselves
        const body = JSON.parse(await request.text());
        const name = String(body.name ?? '').trim() || 'Anonymous visitor';
        const email = String(body.email ?? '').trim();
        const message = String(body.message ?? '').trim();
        const about = String(body.about ?? '').trim();
        const partial = body.partial === true;
        const source: Source = ['messages', 'create', 'contact'].includes(body.source) ? body.source : 'contact';

        // Honeypot: bots fill every field, people never see this one
        if (body.website) return NextResponse.json({ ok: true });

        if (!message || (!partial && !email)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if ((email && !EMAIL_RE.test(email)) || name.length > 100 || email.length > 200 || message.length > 8000 || about.length > 200) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
        if (limited(ip)) {
            return NextResponse.json({ error: 'Too many messages. Please try again later' }, { status: 429 });
        }

        const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message), about: escapeHtml(about) };
        const title = partial ? 'Visitor left the chat before sharing an email' : sourceLabel[source];
        const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send({
            from: FROM,
            to: [TO],
            subject: `${partial ? '💬 Unfinished DM' : source === 'messages' ? '💬 New DM' : '✉️ New message'} from ${name.replace(/[\r\n]/g, ' ')}${about ? ` · ${about}` : ''}`,
            ...(email ? { replyTo: email } : {}),
            html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:24px;background:#fafafa;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#000;">
          <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #dbdbdb;border-radius:16px;overflow:hidden;">
            <div style="height:4px;background:linear-gradient(90deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);"></div>
            <div style="padding:28px 32px;">
              <div style="font-size:13px;color:#737373;">Niyazion · ${when} IST</div>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:600;">${title}</h1>
              ${row('From', safe.name)}
              ${row('Reply to', safe.email ? `<a href="mailto:${safe.email}" style="color:#0095f6;text-decoration:none;">${safe.email}</a>` : '<span style="color:#737373;">Not provided</span>')}
              ${safe.about ? row('About', safe.about) : ''}
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#737373;margin:20px 0 6px;">${source === 'messages' ? 'Conversation' : 'Message'}</div>
              <div style="white-space:pre-wrap;font-size:15px;line-height:1.6;background:#efefef;border-radius:18px;padding:16px 18px;">${safe.message}</div>
              ${safe.email ? `<a href="mailto:${safe.email}" style="display:inline-block;margin-top:24px;background:#0095f6;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:10px 18px;border-radius:8px;">Reply to ${safe.name}</a>` : ''}
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Could not send message' }, { status: 502 });
        }

        return NextResponse.json({ message: 'Email sent successfully', id: data?.id }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
