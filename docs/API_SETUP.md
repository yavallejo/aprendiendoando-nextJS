# Configuración de APIs

## 1. YouTube Data API v3

### Pasos para obtener la API Key:

1. **Ir a Google Cloud Console**
   - Visita: https://console.cloud.google.com/
   - Inicia sesión con tu cuenta de Google

2. **Crear un nuevo proyecto (o seleccionar uno existente)**
   - Click en el selector de proyectos (arriba)
   - Click en "Nuevo proyecto"
   - Nombre: "AprendiendoAndo Website" (o el que prefieras)
   - Click en "Crear"

3. **Habilitar YouTube Data API v3**
   - En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
   - Busca "YouTube Data API v3"
   - Click en "Habilitar"

4. **Crear credenciales (API Key)**
   - Ve a "APIs y servicios" > "Credenciales"
   - Click en "+ CREAR CREDENCIALES" > "Clave de API"
   - Se generará una API Key
   - **IMPORTANTE**: Copia la API Key inmediatamente (solo se muestra una vez)

5. **Configurar restricciones (Recomendado)**
   - Click en la API Key creada para editarla
   - En "Restricciones de aplicación":
     - Selecciona "Direcciones IP" o "Sitios web HTTP"
     - Agrega tu dominio (ej: `localhost:3000` para desarrollo, tu dominio para producción)
   - En "Restricciones de API":
     - Selecciona "Restringir clave"
     - Selecciona "YouTube Data API v3"
   - Click en "Guardar"

6. **Agregar la API Key al proyecto**
   - Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
   - Agrega:
     ```
     YOUTUBE_API_KEY=tu_api_key_aqui
     ```
   - **IMPORTANTE**: Nunca subas este archivo a Git (ya está en .gitignore)

### Información que se obtiene:

- **Subscriber Count**: Cantidad de suscriptores del canal
- **Videos**: Últimos 6 videos publicados con:
  - ID del video
  - Título
  - Thumbnail
  - Fecha de publicación

### Endpoints utilizados:

1. **Buscar canal por handle**: `@AprendiendoAndo`
2. **Obtener estadísticas**: Subscriber count
3. **Obtener videos**: Últimos videos ordenados por fecha

---

## 2. Udemy API

### Respuesta corta:
**No, Udemy no tiene una API pública oficial** para obtener los cursos de un instructor de forma directa.

### Alternativas:

#### Opción 1: **Udemy Instructor API (Requiere ser Partner)**
- Solo disponible para instructores que son "Udemy Partners"
- Requiere solicitud y aprobación de Udemy
- Documentación: https://www.udemy.com/developers/instructor/
- **Proceso**:
  1. Contactar a Udemy Partner Support
  2. Solicitar acceso a la API
  3. Obtener credenciales OAuth2
  4. Usar endpoints para obtener cursos

#### Opción 2: **Web Scraping (No recomendado)**
- Técnicamente posible pero viola términos de servicio
- Puede ser bloqueado
- No es confiable

#### Opción 3: **Datos estáticos (Recomendado para tu caso)**
- Mantener los datos de cursos en `src/data/courses.js`
- Actualizar manualmente cuando agregues nuevos cursos
- **Ventajas**:
  - Simple y confiable
  - Control total sobre qué mostrar
  - No depende de APIs externas
  - Más rápido

### Estructura recomendada para cursos:

```javascript
// src/data/courses.js
export const courses = [
  {
    id: 1,
    title: "React desde Cero hasta Avanzado",
    description: "Aprende React con proyectos reales y las mejores prácticas del mercado.",
    image: "/images/courses/react-course.jpg", // Imagen local o URL
    students: 2500,
    rating: 4.8,
    positiveReviews: 95, // Porcentaje
    udemyLink: "https://www.udemy.com/course/tu-curso/?couponCode=CODIGO_CUPON",
  },
  // ... más cursos
]
```

### Recomendación:
Para tu caso, **mantener los datos estáticos** es la mejor opción porque:
- Es más simple de mantener
- No requiere aprobación de Udemy
- Tienes control total
- Puedes actualizar fácilmente cuando agregues cursos

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# YouTube API
YOUTUBE_API_KEY=tu_api_key_de_youtube_aqui

# Opcional: Si quieres especificar el canal
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@AprendiendoAndo
```

**IMPORTANTE**:
- El archivo `.env.local` ya está en `.gitignore`
- Nunca subas tu API key a Git
- Para producción, configura las variables en tu plataforma de hosting (Vercel, Netlify, etc.)
