import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO = 'skniyaznoor23@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not set');
        return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const name = String(body.name ?? '').trim();
        const email = String(body.email ?? '').trim();
        const message = String(body.message ?? '').trim();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if (!EMAIL_RE.test(email) || name.length > 100 || email.length > 200 || message.length > 5000) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) };
        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [TO],
            subject: `New message from ${name.replace(/[\r\n]/g, ' ')}`,
            replyTo: email,
            html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:24px;background:#f4f1ec;font-family:Helvetica,Arial,sans-serif;color:#141210;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4ded6;border-radius:16px;overflow:hidden;">
            <div style="background:#0b0a09;padding:28px 32px;">
              <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#e8b07a;">Portfolio · Contact</div>
              <h1 style="margin:8px 0 0;font-size:24px;font-weight:600;color:#f3eee7;">New message from ${safe.name}</h1>
            </div>
            <div style="padding:28px 32px;">
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b645c;margin-bottom:6px;">Reply to</div>
              <a href="mailto:${safe.email}" style="font-size:16px;color:#a85a1c;text-decoration:none;">${safe.email}</a>
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b645c;margin:24px 0 6px;">Message</div>
              <div style="white-space:pre-wrap;font-size:16px;line-height:1.6;background:#faf8f5;border:1px solid #e4ded6;border-radius:12px;padding:18px;">${safe.message}</div>
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
