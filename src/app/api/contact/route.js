import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request) {
  const { name, email, company, message } = (await request.json()) || {}

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

    await resend.emails.send({
      from: 'Formulario Web <contacto@aprendiendoando.com>',
      to: toEmail,
      reply_to: email,
      subject: `Nuevo mensaje de ${name} - AprendiendoAndo`,
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">Nuevo mensaje desde el formulario de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${
            company
              ? `<p><strong>Compañía:</strong> ${company}</p>`
              : '<p><strong>Compañía:</strong> (no especificada)</p>'
          }
          <hr style="margin: 20px 0;" />
          <p style="margin-bottom: 8px;"><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
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

