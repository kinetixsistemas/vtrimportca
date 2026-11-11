# VTR Import C.A. — Sitio web mayorista

Sitio web para **VTR Import C.A.**, distribuidor mayorista de repuestos, cauchos, cascos, accesorios, carrocería y baterías para motos en Venezuela.

El objetivo del sitio es presentar el catálogo y captar leads B2B. No hay carrito, pagos, precios públicos ni base de datos: las cotizaciones se envían por WhatsApp con mensajes prellenados.

> **Importante:** el catálogo ya incluye productos e imágenes de New Yuber y Nitron. Cascos, baterías, artículos del blog y datos de contacto siguen siendo contenido de muestra y deben validarse antes de publicar.

## Stack

- Next.js 16.4.6 (App Router, Turbopack, Cache Components)
- React 19.3
- TypeScript
- Tailwind CSS 4.3.3 + `@tailwindcss/typography`
- `next-mdx-remote` + `gray-matter` para el blog
- `zod` para validar datos del catálogo y frontmatter
- `sharp` para generar imágenes placeholder locales
- `@next/third-parties` para GA4

## Requisitos

- Node.js 20 o superior
- npm

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar los datos reales.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública sin barra final. Se usa en canonical, sitemap, robots y JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número internacional sin `+` ni espacios. Ej: `584121234567`. |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | Número visible en el sitio. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo de contacto. |
| `NEXT_PUBLIC_ADDRESS` | Dirección física. |
| `NEXT_PUBLIC_CITY` | Ciudad. |
| `NEXT_PUBLIC_RIF` | RIF de la empresa. |
| `NEXT_PUBLIC_SCHEDULE` | Horario de atención. |
| `NEXT_PUBLIC_GA_ID` | Measurement ID de GA4 (`G-XXXXXXXXXX`). Si está vacío, no se carga analítica. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL de Instagram (opcional). |
| `NEXT_PUBLIC_FACEBOOK_URL` | URL de Facebook (opcional). |
| `NEXT_PUBLIC_DEMO_MODE` | `true` muestra el aviso de datos ficticios y badges “Muestra”. |

## Scripts

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # ESLint
npm run typecheck  # TypeScript sin emitir
npm run assets     # Regenera las imágenes placeholder en public/images
```

## Estrategia de URLs

El catálogo genera URLs individuales y estables para SEO:

- `/catalogo`: listado general con búsqueda y filtros.
- `/repuestos-motos`, `/cauchos-motos`, `/cascos-motos`, `/accesorios-motos`, `/carroceria-motos`, `/baterias-motos`: páginas de categoría en la raíz.
- `/repuestos/bera`: página de una marca dentro de una categoría (se genera automáticamente desde `productBrand`).
- `/productos/new-yuber-cdi-cg-150`: ficha individual de producto.

Las URLs antiguas `/catalogo/{categoria}` y `/catalogo/{categoria}/{producto}` redirigen con **301** a las nuevas rutas. Los helpers de rutas están en `src/lib/catalog.ts` (`getCategoryPath`, `getProductPath`, `getProductBrandPath`).

## Contenido y datos

### Catálogo

El catálogo vive en archivos JSON y se valida con Zod al importarse:

- `src/data/categories.json`: categorías y orden de aparición.
- `src/data/brands.json`: marcas de motos y modelos compatibles.
- `src/data/products.json`: productos, referencias, especificaciones, compatibilidad y etiquetas.

Reglas importantes:

- Cada producto debe apuntar a una categoría existente (`categorySlug`).
- Cada grupo de compatibilidad debe usar una marca y modelos existentes.
- Los `slug` y las `reference` deben ser únicos.
- No existe campo de precio: los precios se cotizan por WhatsApp.

Para agregar un producto, duplica un objeto de `products.json`, cambia `id`, `slug`, `reference`, textos, imagen y compatibilidad. El build falla con un mensaje claro si los datos no son válidos.

### Blog

Los artículos están en `src/content/blog/*.mdx`. El frontmatter requerido es:

```yaml
---
title: "Título del artículo"
description: "Descripción para SEO y listados."
date: "2026-01-15"
author: "Equipo VTR Import"
cover: "/images/blog/articulo-1.webp"
coverAlt: "Descripción de la imagen"
tags:
  - "Mayoreo"
readingTime: "5 min"
isSample: true
---
```

El contenido se renderiza con MDX. El componente `<Callout>` está disponible para destacar notas.

### Imágenes

Las imágenes actuales son placeholders generados localmente con `sharp`:

```bash
npm run assets
```

Para reemplazarlas, coloca las imágenes reales en `public/images/` conservando las rutas usadas en los JSON o actualiza las rutas correspondientes. Formatos recomendados: WebP, buena calidad y dimensiones consistentes.

## Formularios y WhatsApp

Los formularios de “lista de precios” y “contacto” no envían datos a un servidor. Validan en el cliente, construyen un mensaje y abren `wa.me` con el texto prellenado.

Esto significa que:

- No se almacenan datos personales.
- No se requiere backend ni base de datos.
- El usuario debe pulsar “enviar” dentro de WhatsApp.
- Si el navegador bloquea la ventana, el sitio ofrece un botón alternativo.

Los mensajes se construyen en `src/lib/whatsapp.ts`.

## SEO y analítica

- Metadata, canonical, Open Graph y Twitter Card por página en `src/lib/seo.ts`.
- JSON-LD de `Organization`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `ItemList`, `Product` y `BlogPosting`.
- `sitemap.xml` y `robots.txt` generados desde rutas, categorías, productos y blog.
- GA4 se carga solo si `NEXT_PUBLIC_GA_ID` está definido.
- Eventos: `whatsapp_click`, `quote_click`, `price_list_submit`, `contact_form_submit`, `search_submit`, `filter_apply`.

Ver `SEO-CHECKLIST.md` para las tareas previas al lanzamiento.

## Estructura

```text
src/
  app/                 Rutas y layouts (App Router)
    catalogo/          Listado general del catálogo
    [categoria]/       Categorías en raíz y marcas por categoría
    productos/[slug]/  Ficha individual de producto
    blog/              Listado y artículo MDX
    mayoristas/        Programa mayorista y formulario
    envios-nacionales/ Información de logística
    nosotros/          Página institucional
    contacto/          Datos de contacto y formulario
  components/
    blog/              Tarjetas y componentes MDX
    brand/             Logo
    catalog/           Filtros, tarjetas, resultados, compatibilidad
    forms/             Formularios y campos
    layout/            Header, navegación móvil, footer, WhatsApp flotante
    seo/               JSON-LD
    ui/                Primitivas y utilidades visuales
  config/site.ts       Configuración global y navegación
  content/blog/        Artículos MDX
  data/                Catálogo JSON (productos reales y muestras)
  lib/                 Catálogo, blog, SEO, WhatsApp, analítica
  types/               Tipos compartidos
scripts/               Generador de placeholders
public/                Imágenes, logo e iconos
```

## Despliegue en Vercel

1. Subir el repositorio a GitHub/GitLab/Bitbucket.
2. Importar el proyecto en Vercel.
3. Configurar las variables de entorno de `.env.example` con los datos reales.
4. Definir `NEXT_PUBLIC_SITE_URL` con el dominio final.
5. Desplegar. Vercel detecta Next.js automáticamente.
6. Verificar `sitemap.xml`, `robots.txt`, metadata y formularios en el dominio final.

## Antes de publicar

- Completar la compatibilidad real y reemplazar los productos de muestra de cascos y baterías.
- Reemplazar las imágenes placeholder de cascos, baterías, blog y páginas institucionales.
- Cambiar datos de contacto, RIF, dirección y horario.
- Cambiar `NEXT_PUBLIC_DEMO_MODE=false` cuando todo el contenido esté validado.
- Configurar `NEXT_PUBLIC_GA_ID` si se usará analítica.
- Revisar `SEO-CHECKLIST.md`.
