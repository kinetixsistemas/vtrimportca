# SEO Checklist — VTR Import C.A.

Lista de verificación para el lanzamiento del sitio. Marcar cada punto antes de publicar en el dominio final.

## 1. Datos reales y configuración

- [ ] Reemplazar `NEXT_PUBLIC_SITE_URL` por el dominio final, sin barra final.
- [ ] Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número real (formato internacional, sin `+`).
- [ ] Configurar `NEXT_PUBLIC_WHATSAPP_DISPLAY` con el número visible.
- [ ] Configurar correo, dirección, ciudad, RIF y horario reales.
- [ ] Configurar Instagram y Facebook si aplica.
- [ ] Cambiar `NEXT_PUBLIC_DEMO_MODE=false` cuando todo el contenido sea real.
- [ ] Confirmar que no queden textos “placeholder”, “pendiente” o “demo” visibles.

## 2. Contenido y catálogo

- [ ] Verificar las marcas de motos y completar los años marcados como “Consultar”.
- [ ] Reemplazar los 5 productos de muestra de cascos y baterías por catálogo real.
- [ ] Verificar que cada producto tenga nombre, referencia, descripción y especificaciones correctas.
- [ ] Revisar que los `slug` sean estables (cambiarlos después afecta URLs indexadas).
- [ ] Revisar que las referencias sean únicas.
- [ ] Validar la compatibilidad referencial con el equipo comercial.
- [ ] Reemplazar las imágenes placeholder de cascos, baterías, blog y páginas institucionales por fotografías reales en WebP.
- [ ] Verificar que cada imagen tenga texto alternativo descriptivo.
- [ ] Revisar ortografía y tono de todos los textos.
- [ ] Reemplazar o eliminar los artículos demo del blog.

## 3. Metadata y datos estructurados

- [ ] Verificar `<title>` y `<meta name="description">` en todas las rutas.
- [ ] Verificar canonical en `/`, `/catalogo`, categorías, productos, blog y páginas institucionales.
- [ ] Confirmar que las categorías usen `/{categoria}-motos` y los productos `/productos/{slug}`.
- [ ] Confirmar que las URLs antiguas `/catalogo/{categoria}/...` redirijan con 301.
- [ ] Verificar Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`).
- [ ] Verificar Twitter Card (`summary_large_image`).
- [ ] Validar JSON-LD de `Organization`, `LocalBusiness` y `WebSite`.
- [ ] Validar JSON-LD de `BreadcrumbList` en catálogo y blog.
- [ ] Validar JSON-LD de `Product` en fichas de producto (sin precios).
- [ ] Validar JSON-LD de `BlogPosting` en artículos.
- [ ] Usar el validador de Google Rich Results.
- [ ] Confirmar que las páginas 404 tengan `noindex`.

## 4. Rastreo e indexación

- [ ] Verificar que `robots.txt` apunte al sitemap correcto.
- [ ] Verificar que `sitemap.xml` incluya todas las rutas públicas.
- [ ] Confirmar que no haya rutas demo o privadas en el sitemap.
- [ ] Enviar el sitemap en Google Search Console.
- [ ] Enviar el sitemap en Bing Webmaster Tools (opcional).
- [ ] Revisar cobertura e indexación después de 48–72 horas.
- [ ] Configurar la propiedad de dominio en Search Console.
- [ ] Verificar que no existan cadenas de redirecciones ni enlaces rotos.
- [ ] Confirmar que las URLs usen el dominio definitivo (http → https, sin `www` o con `www`, pero una sola versión).

## 5. SEO local

- [ ] Crear o reclamar el perfil de Google Business Profile.
- [ ] Usar el mismo nombre, dirección y teléfono (NAP) en el sitio y en Google.
- [ ] Agregar categoría y área de servicio correctas.
- [ ] Cargar fotos reales del negocio.
- [ ] Solicitar reseñas a clientes reales.
- [ ] Verificar consistencia de NAP en directorios y redes sociales.
- [ ] Agregar el mapa real en `/contacto` cuando la dirección esté confirmada.

## 6. Analítica

- [ ] Configurar `NEXT_PUBLIC_GA_ID` con el Measurement ID real.
- [ ] Verificar que GA4 reciba pageviews.
- [ ] Probar eventos: `whatsapp_click`, `quote_click`, `price_list_submit`, `contact_form_submit`, `search_submit`, `filter_apply`.
- [ ] Marcar conversiones principales en GA4 (WhatsApp, solicitud de lista, contacto).
- [ ] Configurar Google Tag Manager solo si se necesita; evitar duplicar GA4.
- [ ] Revisar que no se envíen datos personales en eventos.

## 7. Rendimiento

- [ ] Ejecutar Lighthouse en móvil y escritorio.
- [ ] Confirmar LCP menor a 2.5 s en móvil.
- [ ] Confirmar CLS menor a 0.1.
- [ ] Confirmar INP menor a 200 ms.
- [ ] Revisar que las imágenes usen `next/image` y tamaños adecuados.
- [ ] Confirmar que las imágenes críticas tengan `priority` y las demás carga diferida.
- [ ] Revisar peso de JavaScript y fuentes.
- [ ] Probar en conexión móvil lenta.

## 8. Accesibilidad

- [ ] Navegar todo el sitio solo con teclado.
- [ ] Verificar foco visible en enlaces, botones y campos.
- [ ] Verificar contraste de texto y botones.
- [ ] Confirmar que los formularios tengan labels asociados y errores anunciados.
- [ ] Verificar jerarquía de encabezados (un `h1` por página).
- [ ] Confirmar textos alternativos en imágenes informativas.
- [ ] Probar el menú móvil y el cierre con teclado/Escape.
- [ ] Ejecutar axe DevTools o Lighthouse Accessibility.

## 9. Formularios y WhatsApp

- [ ] Probar el formulario de lista de precios en móvil y escritorio.
- [ ] Probar el formulario de contacto en móvil y escritorio.
- [ ] Verificar que el mensaje de WhatsApp llegue con todos los campos.
- [ ] Confirmar que el número de WhatsApp abra el chat correcto.
- [ ] Probar el botón flotante de WhatsApp en todas las páginas.
- [ ] Verificar el comportamiento cuando el navegador bloquea la ventana emergente.
- [ ] Revisar que no se solicite información innecesaria.

## 10. Seguridad y privacidad

- [ ] Revisar que no haya secretos en el repositorio.
- [ ] Confirmar que solo se usen variables `NEXT_PUBLIC_*` para datos públicos.
- [ ] Agregar aviso de privacidad si se incorpora analítica o formularios con backend.
- [ ] Revisar cabeceras de seguridad en Vercel.
- [ ] Confirmar que los enlaces externos usen `rel="noopener noreferrer"`.

## 11. Post-lanzamiento

- [ ] Monitorear errores 404 en Search Console.
- [ ] Revisar consultas de búsqueda y CTR a los 30 días.
- [ ] Revisar páginas con mejor y peor rendimiento.
- [ ] Actualizar el catálogo y el blog de forma periódica.
- [ ] Revisar enlaces internos y externos cada trimestre.
- [ ] Renovar contenido demo si aún queda alguno.
