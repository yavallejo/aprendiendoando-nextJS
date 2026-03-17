import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' })
  }

  try {
    const toEmail = process.env.CONTACT_EMAIL

    if (!process.env.RESEND_API_KEY || !toEmail) {
      return res.status(500).json({
        error:
          'Configuración del servidor incompleta. Falta RESEND_API_KEY o CONTACT_EMAIL.',
      })
    }

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

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Error enviando email de contacto:', error)
    return res.status(500).json({ error: 'Error al enviar el mensaje.' })
  }
}

