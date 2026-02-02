import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_3kBUQqcV_NJqofQGVrfNL3YY6wMKV4kL9");

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['skniyaznoor23@gmail.com'],
            subject: `New Message from ${name}`,
            replyTo: email,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eee; }
            .header { background: linear-gradient(135deg, #f09433 0%, #dc2743 100%); padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #888; margin-bottom: 5px; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #111; background: #f4f6f8; padding: 12px 16px; border-radius: 8px; }
            .message-box { background: #f4f6f8; padding: 20px; border-radius: 12px; white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #111; }
            .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
            .highlight { color: #dc2743; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #dc2743; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Sent from your portfolio contact form via <span class="highlight">Resend</span>.</p>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { message: 'Email sent successfully', data },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
