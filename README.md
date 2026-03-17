## Proyecto AprendiendoAndo

Este es el repositorio de la web [`aprendiendoando.com`](https://www.aprendiendoando.com/), construido con Next.js y desplegado en Vercel.

## Formularios de contacto (Resend)

El formulario de contacto ubicado en la landing envía los mensajes a través de [Resend](https://resend.com) usando una API Route de Next.js.

### Variables de entorno necesarias

Configura estas variables tanto en desarrollo (archivo `.env.local`) como en Vercel (Project Settings → Environment Variables):

- `RESEND_API_KEY`: API key generada en el panel de Resend.
- `CONTACT_EMAIL`: Email donde quieres recibir los mensajes (por ejemplo, tu Gmail personal).

Ejemplo de `.env.local`:

```bash
RESEND_API_KEY=tu_clave_de_resend
CONTACT_EMAIL=tu-correo@gmail.com
```

### Flujo de envío

- El componente `ContactSection` hace un `POST` a `/api/contact` con los campos `name`, `email`, `company` y `message`.
- La ruta [`src/pages/api/contact.js`](src/pages/api/contact.js) valida los datos y usa el SDK de Resend para enviar un correo:
  - **From**: `Formulario Web <contacto@aprendiendoando.com>`
  - **To**: `CONTACT_EMAIL`
  - **Reply-To**: email que escribe la persona en el formulario

Para que `contacto@aprendiendoando.com` funcione como remitente autorizado, debes verificar el dominio `aprendiendoando.com` en el panel de Resend añadiendo los registros DNS que te indiquen (normalmente TXT y/o MX) en el proveedor de DNS que uses para el dominio.
