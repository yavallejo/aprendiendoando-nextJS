import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildContactEmailHtml(isEnglish, { safeName, safeEmail, safeCompany, safeMessage }) {
  const copy = isEnglish
    ? {
        kicker: 'New message from the website contact form',
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        footer:
          'This email was generated automatically from the contact form at aprendiendoando.com',
      }
    : {
        kicker: 'Nuevo mensaje desde el formulario web',
        name: 'Nombre',
        email: 'Email',
        company: 'Compañía',
        message: 'Mensaje',
        footer:
          'Este correo se generó automáticamente desde el formulario de contacto de aprendiendoando.com',
      }

  return `
        <div style="margin:0;padding:24px;background:#f3f4f6;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px 24px 18px 24px;background:linear-gradient(135deg,#111827 0%,#1f2937 100%);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <span style="display:inline-flex;vertical-align:middle;align-items:center;justify-content:center;width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.18);margin-right:12px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-linecap="round" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="16" rx="3" stroke-width="1.5" opacity="0.9"></rect>
                          <path d="M7 9l3 3-3 3" stroke-width="1.5" opacity="0.95"></path>
                          <path d="M11 15h4" stroke-width="1.5" opacity="0.95"></path>
                        </svg>
                      </span>
                      <span style="display:inline-block;vertical-align:middle;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
                        AprendiendoAndo
                      </span>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0 0;font-size:13px;color:#d1d5db;letter-spacing:0.06em;text-transform:uppercase;">
                  ${copy.kicker}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;">
                  <tr>
                    <td style="padding:16px 18px;border-bottom:1px solid #e5e7eb;">
                      <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">${copy.name}</p>
                      <p style="margin:6px 0 0 0;font-size:15px;color:#111827;font-weight:600;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;border-bottom:1px solid #e5e7eb;">
                      <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">${copy.email}</p>
                      <p style="margin:6px 0 0 0;font-size:15px;color:#111827;">
                        <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 18px;">
                      <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">${copy.company}</p>
                      <p style="margin:6px 0 0 0;font-size:15px;color:#111827;">${safeCompany}</p>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:20px;padding:18px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">
                  <p style="margin:0 0 10px 0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">${copy.message}</p>
                  <p style="margin:0;font-size:15px;line-height:1.7;color:#111827;">${safeMessage}</p>
                </div>
              </td>
            </tr>
          </table>

          <p style="max-width:640px;margin:14px auto 0 auto;font-size:12px;line-height:1.5;color:#6b7280;text-align:center;">
            ${copy.footer}
          </p>
        </div>
      `
}

export async function POST(request) {
  const body = (await request.json()) || {}
  const { name, email, company, message, lang } = body

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    )
  }

  try {
    const toEmail = process.env.CONTACT_EMAIL

    if (!process.env.RESEND_API_KEY || !toEmail) {
      return NextResponse.json(
        {
          error:
            'Incomplete server configuration. RESEND_API_KEY or CONTACT_EMAIL is missing.',
        },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const isEnglish = lang === 'en'
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = company
      ? escapeHtml(company)
      : isEnglish
        ? 'Not provided'
        : 'No especificada'
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

    const subject = isEnglish
      ? `New message from ${name} - AprendiendoAndo`
      : `Nuevo mensaje de ${name} - AprendiendoAndo`

    const html = buildContactEmailHtml(isEnglish, {
      safeName,
      safeEmail,
      safeCompany,
      safeMessage,
    })

    await resend.emails.send({
      from: 'Formulario Web <contacto@aprendiendoando.com>',
      to: toEmail,
      cc: email,
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Error sending message.' },
      { status: 500 }
    )
  }
}
