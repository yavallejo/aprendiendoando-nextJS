---
name: AprendiendoAndo Website
overview: Crear un sitio web SPA moderno y elegante para "AprendiendoAndo" con diseño dark mode first, integración con YouTube API, secciones de cursos premium y formulario de contacto, usando Next.js 16.1.4, ShadCN UI y GSAP para animaciones suaves.
todos:
  - id: setup-dependencies
    content: "Instalar dependencias: ShadCN UI, GSAP, next-themes, y librerías necesarias"
    status: pending
  - id: setup-shadcn
    content: "Configurar ShadCN UI: tailwind.config.js, components.json, y crear lib/utils.js"
    status: pending
  - id: theme-provider
    content: Crear ThemeProvider y configurar dark/light mode con next-themes
    status: pending
  - id: header-component
    content: Crear Header con logo, navegación (Sobre mi, Videos, Cursos Premium, Contacto) y theme toggle
    status: pending
  - id: youtube-api
    content: Crear API route /api/youtube.js para obtener videos y estadísticas del canal
    status: pending
  - id: about-section
    content: Crear AboutSection con texto profesional mejorado
    status: pending
  - id: youtube-section
    content: Crear YouTubeSection mostrando suscriptores, botón de suscripción y grid de videos
    status: pending
  - id: courses-section
    content: Crear CoursesSection con cards de cursos premium (imagen, título, alumnos, reviews)
    status: pending
  - id: contact-section
    content: Crear ContactSection con formulario (nombre, email, empresa, mensaje)
    status: pending
  - id: gsap-scroll
    content: Implementar smooth scroll con GSAP para anchor links y animaciones de entrada
    status: pending
  - id: styling
    content: Aplicar estilos dark mode first consistentes con el diseño de referencia
    status: pending
  - id: integrate-sections
    content: Integrar todas las secciones en index.js con navegación por anchor links
    status: pending
isProject: false
---

# Plan: Sitio Web AprendiendoAndo

## ⚠️ REGLA NO NEGOCIABLE - Next.js 16.1.4

**ANTES de usar CUALQUIER función crítica de Next.js, DEBE consultarse Context7 para verificar que es la forma más actual y viable para la versión 16.1.4.**

Esto incluye pero no se limita a:

- `getServerSideProps` / `getStaticProps` / `getStaticPaths`
- API Routes (`pages/api/`)
- `_app.js` y `_document.js`
- `next/head`, `next/link`, `next/image`
- Configuración de `next.config.js`
- Manejo de variables de entorno
- Cualquier patrón de data fetching
- Cualquier feature de Next.js que se vaya a implementar

**Proceso obligatorio:**

1. Identificar la función/feature de Next.js a usar
2. Consultar `user-Context7` con `resolve-library-id` para "next.js" versión 16.1.4
3. Usar `query-docs` para obtener documentación actualizada específica de esa función
4. Verificar compatibilidad y mejores prácticas para 16.1.4
5. Implementar siguiendo la documentación actualizada

**NO asumir que métodos antiguos funcionan en 16.1.4. SIEMPRE verificar con Context7.**

## Arquitectura General

El sitio será una SPA (Single Page Application) con navegación por anchor links con smooth scroll usando GSAP. Diseño dark mode first inspirado en la imagen proporcionada, con componentes ShadCN UI.

## Estructura de Componentes

### 1. Layout y Navegación

- **Header Component** (`src/components/Header.js`)
  - Logo "AprendiendoAndo" como texto estilizado a la izquierda (usando fuente Rethink Sans)
  - Menú de navegación a la derecha: Sobre mi, Videos, Cursos Premium, Contacto
  - Toggle de tema (light/dark) con icono
  - Sticky header con transparencia
  - Responsive con menú hamburguesa en mobile

### 2. Secciones Principales

- **Hero/About Section** (`src/components/AboutSection.js`)
  - Texto profesional sobre ti (versión mejorada del texto proporcionado)
  - Diseño centrado con tipografía clara

- **YouTube Section** (`src/components/YouTubeSection.js`)
  - Contador de suscriptores destacado
  - Botón/link para suscribirse al canal
  - Grid de últimos videos publicados
  - Cada video: thumbnail, título, fecha

- **Premium Courses Section** (`src/components/CoursesSection.js`)
  - Grid de cards de cursos
  - Cada card: imagen, título, cantidad de alumnos, reviews positivas
  - Link a cupón de Udemy

- **Contact Section** (`src/components/ContactSection.js`)
  - Formulario con: nombre, email, empresa, mensaje
  - Validación de campos
  - Funcionalidad de envío por email directo
  - Estilo dark mode consistente

## Dependencias a Instalar

```json
{
  "gsap": "^3.12.5",
  "@radix-ui/react-icons": "^1.3.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.2.1",
  "lucide-react": "^0.344.0"
}
```

## Configuración Inicial

### 1. ShadCN UI Setup (usando MCP user-shadcnui)

**IMPORTANTE**: Usar el MCP `user-shadcnui` para obtener la documentación más actualizada y comandos correctos.

- Consultar `list_items_in_registries` para ver componentes disponibles
- Usar `get_add_command_for_items` para obtener comandos CLI exactos de instalación
- Usar `view_items_in_registries` para ver detalles y estructura de componentes necesarios
- Usar `get_item_examples_from_registries` para ejemplos de uso actualizados
- Consultar `search_items_in_registries` para encontrar componentes específicos (Button, Card, Input, etc.)
- Configurar `tailwind.config.js` y `components.json` según documentación actualizada del MCP
- Crear archivo de utilidades `src/lib/utils.js` para `cn()` helper

### 1.1. Configuración de Fuentes Google Fonts

**⚠️ CONSULTAR Context7 ANTES de implementar:**

- Consultar Context7 para Next.js 16.1.4 sobre `next/font/google` y mejores prácticas

- Crear `src/lib/fonts.js` usando `next/font/google`
  - Importar y configurar Rethink Sans para headings
  - Importar y configurar Geist para body text
  - Aplicar en `_app.js` según documentación de Context7 para Next.js 16.1.4
- Configurar en `tailwind.config.js` para usar las fuentes en las clases de Tailwind

### 2. Theme Provider

**⚠️ CONSULTAR Context7 ANTES de implementar:**

- Consultar Context7 para Next.js 16.1.4 sobre `_app.js` y configuración de providers
- Verificar la forma correcta de integrar next-themes con Next.js 16.1.4

- Crear `src/components/ThemeProvider.js` usando next-themes (siguiendo documentación de Context7)
- Configurar en `_app.js` según mejores prácticas de Next.js 16.1.4
- Persistir preferencia en localStorage

### 3. YouTube API Integration

**⚠️ CONSULTAR Context7 ANTES de implementar:**

- Consultar Context7 para Next.js 16.1.4 sobre API Routes y data fetching patterns
- Verificar la forma correcta de crear API routes en Next.js 16.1.4
- Verificar si `getServerSideProps` / `getStaticProps` son la mejor opción o si hay alternativas más modernas

- Crear API route `src/pages/api/youtube.js` (siguiendo documentación de Context7)
  - Obtener channel ID desde `@AprendiendoAndo`
  - Fetch de últimos videos (máx 6-8)
  - Fetch de estadísticas del canal (subscriber count)
- Usar el método de data fetching recomendado por Context7 para Next.js 16.1.4
- Manejar errores y estados de carga

### 4. GSAP Scroll Configuration

**⚠️ CONSULTAR Context7 ANTES de implementar:**

- Consultar Context7 para Next.js 16.1.4 sobre uso de librerías externas en `_app.js`
- Verificar mejores prácticas para integrar GSAP con Next.js 16.1.4

- Configurar smooth scroll en `_app.js` o componente principal (siguiendo documentación de Context7)
- Implementar animaciones de entrada para secciones
- Configurar anchor links con smooth scroll behavior

## Archivos a Crear/Modificar

### Nuevos Componentes

- `src/components/Header.js` - Header con navegación y theme toggle
- `src/components/AboutSection.js` - Sección sobre ti
- `src/components/YouTubeSection.js` - Videos y suscriptores
- `src/components/CoursesSection.js` - Cursos premium
- `src/components/ContactSection.js` - Formulario de contacto
- `src/components/ThemeToggle.js` - Botón toggle de tema
- `src/components/ui/` - Componentes ShadCN instalados usando MCP (Button, Card, Input, Textarea, Label, etc.)

### API Routes

- `src/pages/api/youtube.js` - Endpoint para datos de YouTube

### Configuración

- `tailwind.config.js` - Configuración de Tailwind para ShadCN (incluir fuentes Rethink Sans y Geist)
- `components.json` - Configuración de ShadCN
- `src/lib/utils.js` - Utilidades (cn helper)
- `src/lib/fonts.js` - Configuración de fuentes Google Fonts (Rethink Sans para headings, Geist para body)
- `.env.local` - Variables de entorno (YOUTUBE_API_KEY)

### Estilos

- `src/styles/globals.css` - Actualizar con variables de tema y estilos base
- Crear archivos de estilos por componente si es necesario

### Página Principal

- `src/pages/index.js` - Reemplazar con todas las secciones
- Implementar smooth scroll con GSAP
- Integrar todos los componentes

## Datos Estáticos

### Premium Courses

Crear archivo `src/data/courses.js` con estructura:

```javascript
export const courses = [
  {
    id: 1,
    title: "Curso 1",
    image: "/images/course1.jpg",
    students: 1000,
    positiveReviews: 95,
    udemyLink: "https://...",
  },
  // ...
];
```

## Estilo y Diseño

### Paleta de Colores (Dark Mode First)

- Background: `#000000` o `#0a0a0a`
- Texto principal: `#ffffff`
- Texto secundario: `#a0a0a0`
- Acentos: Colores sutiles (verde, azul, púrpura) para elementos destacados
- Cards: Fondo oscuro con bordes sutiles y sombras

### Tipografía

**⚠️ CONSULTAR Context7 ANTES de implementar:**

- Consultar Context7 para Next.js 16.1.4 sobre `next/font` y Google Fonts integration

**Fuentes de Google Fonts:**

- **Headings (títulos)**: Rethink Sans
- **Body text y demás textos**: Geist
- Configurar usando `next/font/google` según documentación de Context7 para Next.js 16.1.4
- Jerarquía clara con tamaños y pesos diferenciados

### Animaciones GSAP

- Fade in y slide up para secciones al hacer scroll
- Smooth scroll para anchor links
- Transiciones suaves en hover states

## Variables de Entorno Necesarias

```env
YOUTUBE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@AprendiendoAndo
```

## Uso de MCPs para Documentación Actualizada

### MCP user-shadcnui

- **Antes de instalar componentes**: Usar `list_items_in_registries` y `search_items_in_registries` para encontrar componentes necesarios
- **Componentes a buscar e instalar**:
  - `button` - Para botones de suscripción y CTA
  - `card` - Para cards de cursos premium y videos
  - `input` - Para formulario de contacto
  - `textarea` - Para campo de mensaje
  - `label` - Para labels del formulario
  - `separator` - Para separadores visuales (opcional)
  - `switch` o `toggle` - Para theme toggle (verificar cuál está disponible)
- **Para instalar**: Usar `get_add_command_for_items` con los componentes identificados (ej: `['@shadcn/button', '@shadcn/card', '@shadcn/input']`)
- **Para implementar**: Usar `view_items_in_registries` para ver código fuente y estructura completa de cada componente
- **Para ejemplos**: Usar `get_item_examples_from_registries` para obtener ejemplos de uso actualizados

### MCP user-Context7

**⚠️ REGLA NO NEGOCIABLE**: Consultar Context7 ANTES de usar cualquier función crítica de Next.js 16.1.4

- **Para Next.js 16.1.4 (PRIORITARIO)**:
  - **SIEMPRE** usar `resolve-library-id` con "next.js" y especificar versión 16.1.4
  - **SIEMPRE** usar `query-docs` antes de implementar:
    - API Routes (`pages/api/`)
    - `getServerSideProps` / `getStaticProps` / `getStaticPaths`
    - `_app.js` y `_document.js`
    - `next/head`, `next/link`, `next/image`
    - Configuración de `next.config.js`
    - Variables de entorno
    - Cualquier patrón de data fetching
  - Verificar que el método usado es compatible y recomendado para 16.1.4
- **Para ShadCN/UI**: Usar `resolve-library-id` con "shadcn/ui" y luego `query-docs` para documentación actualizada sobre configuración, temas, y mejores prácticas
- **Para GSAP**: Consultar documentación de GSAP para ScrollToPlugin y animaciones de scroll
- **Para next-themes**: Consultar documentación para integración correcta con Next.js 16.1.4 (verificar con Context7)

## Pasos de Implementación

1. **Consultar MCPs**: Usar `user-shadcnui` y `user-Context7` para obtener documentación actualizada antes de comenzar
2. **Consultar Context7 para Next.js 16.1.4**: Verificar configuración base, `_app.js`, y estructura de proyecto
3. **Consultar Context7 para Google Fonts**: Verificar forma correcta de usar `next/font/google` en Next.js 16.1.4
4. Configurar fuentes Google Fonts (Rethink Sans para headings, Geist para body) siguiendo documentación de Context7
5. Instalar dependencias (ShadCN, GSAP, next-themes) usando comandos del MCP
6. Configurar ShadCN UI y Tailwind usando información del MCP `user-shadcnui` (incluir fuentes en tailwind.config.js)
7. **Consultar Context7 para `_app.js`**: Verificar forma correcta de configurar providers y fuentes en Next.js 16.1.4
8. Crear Theme Provider y configurar dark/light mode consultando `user-Context7` para next-themes y Next.js 16.1.4
9. Crear componentes base (Header, ThemeToggle) usando componentes ShadCN del MCP
10. **Consultar Context7 para API Routes**: Verificar forma correcta de crear API routes en Next.js 16.1.4
11. Implementar API route para YouTube siguiendo documentación de Context7
12. Crear sección About con texto profesional
13. Crear sección YouTube con videos y suscriptores usando componentes ShadCN
14. Crear sección Cursos Premium con datos estáticos usando Card components del MCP
15. Crear formulario de contacto usando Input y Textarea del MCP
16. **Consultar Context7 para GSAP**: Verificar integración de librerías externas con Next.js 16.1.4
17. Integrar GSAP para smooth scroll y animaciones siguiendo mejores prácticas de Context7
18. Aplicar estilos dark mode consistentes con fuentes configuradas
19. Testing responsive y ajustes finales

## Notas Importantes

- **⚠️ REGLA NO NEGOCIABLE**: Consultar Context7 para Next.js 16.1.4 ANTES de usar cualquier función crítica de Next.js. NO asumir que métodos antiguos funcionan.
- **Usar MCPs durante toda la implementación**: Consultar `user-shadcnui` para componentes y `user-Context7` para documentación actualizada antes de implementar cada sección
- **Versión específica**: Estamos trabajando con Next.js 16.1.4 - SIEMPRE verificar compatibilidad con esta versión
- **Commits con Conventional Commits**: Hacer commit después de cada feature importante usando [Conventional Commits](https://www.conventionalcommits.org/) (ej: `feat: add header component`, `config: setup shadcn ui`, `style: apply dark mode theme`)
- **Actualizar plan**: Después de cada feature completada, actualizar la sección "Seguimiento de Progreso" marcando como completado y moviendo a la sección correspondiente
- El sitio será completamente estático excepto por la integración con YouTube API
- Los datos de cursos premium serán hardcodeados en un archivo de datos
- El formulario de contacto enviará por email directo (implementar funcionalidad de envío)
- Los datos de cursos premium se agregarán después (crear estructura de datos lista)
- YouTube API key se configurará después (crear estructura lista para recibirla)
- Smooth scroll implementado con GSAP ScrollToPlugin (consultar Context7 para configuración óptima con Next.js 16.1.4)
- Diseño mobile-first y responsive
- Todos los componentes ShadCN deben instalarse usando los comandos obtenidos del MCP `get_add_command_for_items`

---

## 📋 Información Adicional Confirmada

- **Logo**: Solo texto estilizado "AprendiendoAndo" (no imagen)
- **YouTube API Key**: Se configurará después (crear estructura lista para recibirla)
- **Datos de Cursos Premium**: Se agregarán después (crear estructura de datos lista)
- **Formulario de Contacto**: Enviar por email directo (implementar funcionalidad de envío por email)

## 📊 Seguimiento de Progreso

> **Nota**: Esta sección se actualizará durante la implementación para trackear qué se ha completado y qué falta por hacer.

### ✅ Completado

1. ✅ Consultar MCPs para documentación actualizada
2. ✅ Consultar Context7 para Next.js 16.1.4 - configuración base
3. ✅ Consultar Context7 para Google Fonts - `next/font/google`
4. ✅ Configurar fuentes Google Fonts (Rethink Sans y Geist)
5. ✅ Instalar dependencias (ShadCN, GSAP, next-themes)
6. ✅ Configurar ShadCN UI y Tailwind
7. ✅ Consultar Context7 para `_app.js` - providers y fuentes
8. ✅ Crear Theme Provider y configurar dark/light mode
9. ✅ Crear componentes base (Header, ThemeToggle)
10. ✅ Consultar Context7 para API Routes
11. ✅ Implementar API route para YouTube
12. ✅ Crear sección About
13. ✅ Crear sección YouTube
14. ✅ Crear sección Cursos Premium
15. ✅ Crear formulario de contacto
16. ✅ Consultar Context7 para GSAP
17. ✅ Integrar GSAP para smooth scroll y animaciones
18. ✅ Aplicar estilos dark mode consistentes

### 🚧 En Progreso

_Ninguna tarea en progreso actualmente_

### ⏳ Pendiente

19. Testing responsive y ajustes finales
20. Configurar YouTube API Key (cuando esté disponible)
21. Agregar datos de cursos premium
22. Implementar funcionalidad de envío de email en formulario de contacto

### 📝 Notas de Implementación

- **Fuentes**: Geist está disponible en Google Fonts, se configuró correctamente con `next/font/google`
- **ShadCN UI**: Componentes instalados correctamente (button, card, input, textarea, label)
- **Theme Provider**: Configurado con next-themes, default theme es 'dark'
- **Tailwind**: Configurado con variables CSS para ShadCN y fuentes personalizadas

### 🔄 Historial de Commits

- `feat: setup project with Tailwind, ShadCN UI, fonts and theme provider` - Configuración inicial del proyecto
- `feat: add header, sections and GSAP scroll animations` - Creación de todas las secciones principales y animaciones
- `style: enhance dark mode styling with darker background` - Mejora de estilos dark mode
