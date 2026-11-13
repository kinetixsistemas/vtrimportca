import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { CookiePreferencesButton } from "@/components/consent/cookie-preferences-button";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Términos legales, privacidad y cookies",
  description:
    "Términos y condiciones de uso, política de privacidad y política de cookies del sitio web de VTR Import C.A.",
  path: "/legales",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Términos legales" },
];

const sections = [
  { id: "terminos", label: "Términos de uso" },
  { id: "privacidad", label: "Uso de datos" },
  { id: "cookies", label: "Cookies" },
  { id: "contacto-legal", label: "Contacto" },
];

const lastUpdated = "12 de noviembre de 2026";

export default function LegalesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-vtr-black text-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
              Información legal
            </p>
            <h1 className="mt-3 text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              Términos legales
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
              Condiciones de uso del sitio, tratamiento de datos personales y
              política de cookies de {siteConfig.name}.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Última actualización: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="Contenido legal"
              className="border border-vtr-black/10 bg-white p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-green">
                Contenido
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-vtr-gray-dark underline-offset-4 hover:text-vtr-green hover:underline"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="prose prose-vtr max-w-none">
            <p>
              Este documento reúne las condiciones de uso del sitio web de{" "}
              {siteConfig.name}, la forma en que tratamos los datos personales
              que nos compartes y el uso de cookies y tecnologías similares.
              Al navegar o utilizar este sitio aceptas las condiciones aquí
              descritas.
            </p>

            <section id="terminos" className="scroll-mt-32">
              <h2>1. Términos y condiciones de uso</h2>

              <h3>1.1 Titular del sitio</h3>
              <ul>
                <li>
                  <strong>Titular:</strong> {siteConfig.legalName}
                </li>
                <li>
                  <strong>RIF:</strong> {siteConfig.rif}
                </li>
                <li>
                  <strong>Domicilio:</strong> {siteConfig.address},{" "}
                  {siteConfig.city}
                </li>
                <li>
                  <strong>Correo:</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
                <li>
                  <strong>WhatsApp:</strong> {siteConfig.whatsappDisplay}
                </li>
              </ul>

              <h3>1.2 Aceptación</h3>
              <p>
                El acceso y uso de este sitio implica la aceptación de estos
                términos. Si no estás de acuerdo con ellos, te pedimos no
                utilizar el sitio ni enviar información a través de sus
                formularios.
              </p>

              <h3>1.3 Uso permitido</h3>
              <p>
                Puedes utilizar el sitio para consultar el catálogo, solicitar
                información, cotizaciones y la lista de precios al mayor. No
                está permitido usar el sitio para fines ilícitos, intentar
                afectar su funcionamiento, extraer contenido de forma masiva o
                suplantar la identidad de terceros.
              </p>

              <h3>1.4 Catálogo, precios y disponibilidad</h3>
              <p>
                La información del catálogo es referencial. Las imágenes pueden
                no reflejar con exactitud el producto, sus colores o acabados.
                Los precios, la disponibilidad y las condiciones de venta se
                confirman por WhatsApp o con un asesor antes de cualquier
                despacho. Nos reservamos el derecho de corregir errores y
                actualizar la información sin previo aviso.
              </p>

              <h3>1.5 Cotizaciones y pedidos</h3>
              <p>
                El sitio no procesa pagos en línea ni cierra ventas de forma
                automática. Toda cotización es informativa y no constituye un
                contrato hasta que sea confirmada por {siteConfig.name}. Las
                condiciones de pago, entrega y envío se acuerdan directamente
                con cada cliente.
              </p>

              <h3>1.6 Propiedad intelectual</h3>
              <p>
                El nombre, los logotipos, los textos, las fotografías y demás
                contenidos de este sitio son propiedad de {siteConfig.name} o
                se utilizan con autorización. No pueden reproducirse,
                distribuirse ni modificarse sin consentimiento previo por
                escrito.
              </p>

              <h3>1.7 Enlaces a terceros</h3>
              <p>
                El sitio puede incluir enlaces a plataformas de terceros, como
                WhatsApp o Google Maps. No controlamos esos servicios ni sus
                políticas, por lo que su uso se rige por las condiciones de
                cada proveedor.
              </p>

              <h3>1.8 Limitación de responsabilidad</h3>
              <p>
                Trabajamos para mantener la información actualizada y el sitio
                disponible, pero no garantizamos que esté libre de errores o
                interrupciones. En la medida permitida por la ley, no somos
                responsables de daños derivados del uso del sitio o de la
                imposibilidad de acceder a él. Nada en estos términos limita
                los derechos irrenunciables que correspondan a los
                consumidores.
              </p>

              <h3>1.9 Modificaciones</h3>
              <p>
                Podemos actualizar estos términos para reflejar cambios en el
                sitio, en nuestros servicios o en la normativa aplicable. La
                versión vigente será la publicada en esta página.
              </p>

              <h3>1.10 Legislación aplicable</h3>
              <p>
                Estos términos se rigen por las leyes de la República
                Bolivariana de Venezuela.
              </p>
            </section>

            <section id="privacidad" className="scroll-mt-32">
              <h2>2. Uso de datos personales</h2>

              <h3>2.1 Responsable del tratamiento</h3>
              <p>
                El responsable del tratamiento de los datos personales
                recopilados a través de este sitio es {siteConfig.legalName},
                con domicilio en {siteConfig.address}, {siteConfig.city}. Puedes
                contactarnos en{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>

              <h3>2.2 Datos que tratamos</h3>
              <ul>
                <li>
                  Datos de identificación y contacto que envías mediante los
                  formularios: nombre, nombre del negocio, teléfono, correo
                  electrónico, ciudad y productos de interés.
                </li>
                <li>
                  Datos que compartes voluntariamente en las conversaciones de
                  WhatsApp cuando solicitas una cotización o la lista de
                  precios.
                </li>
                <li>
                  Datos técnicos de navegación, como dirección IP, tipo de
                  dispositivo, páginas visitadas y duración de la visita, que
                  solo se recopilan si aceptas las cookies analíticas.
                </li>
              </ul>

              <h3>2.3 Finalidades</h3>
              <ul>
                <li>Responder tus solicitudes y consultas.</li>
                <li>Elaborar cotizaciones y enviar la lista de precios.</li>
                <li>Coordinar pedidos y envíos nacionales.</li>
                <li>
                  Mejorar el contenido, la navegación y el funcionamiento del
                  sitio.
                </li>
                <li>Cumplir obligaciones legales y atender requerimientos.</li>
              </ul>

              <h3>2.4 Base de legitimación</h3>
              <p>
                Tratamos tus datos sobre la base de tu consentimiento al enviar
                los formularios o iniciar una conversación, del interés
                legítimo en mantener la seguridad del sitio y de las
                obligaciones legales que nos correspondan.
              </p>

              <h3>2.5 Conservación</h3>
              <p>
                Conservamos los datos mientras exista una relación comercial o
                mientras sean necesarios para atender tu solicitud. Cuando ya
                no sean necesarios, los eliminamos o los mantenemos bloqueados
                durante los plazos que exija la ley.
              </p>

              <h3>2.6 Destinatarios y transferencias</h3>
              <p>
                No vendemos ni alquilamos datos personales. Podemos compartirlos
                con proveedores tecnológicos que actúan como encargados del
                tratamiento, por ejemplo servicios de alojamiento, mensajería
                o analítica, únicamente para las finalidades indicadas. Si
                aceptas cookies analíticas, Google Analytics puede tratar datos
                de navegación conforme a sus propias políticas.
              </p>

              <h3>2.7 Derechos</h3>
              <p>
                Puedes solicitar el acceso, la rectificación, la actualización,
                la supresión o la oposición al tratamiento de tus datos
                personales. Para ejercer estos derechos escríbenos a{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                con el asunto &quot;Datos personales&quot;. Responderemos en un
                plazo razonable y podremos pedirte información adicional para
                verificar tu identidad.
              </p>

              <h3>2.8 Seguridad</h3>
              <p>
                Aplicamos medidas razonables de carácter técnico y
                organizativo para proteger la información. Ningún sistema es
                completamente infalible, por lo que te recomendamos no
                compartir datos sensibles por canales no seguros.
              </p>

              <h3>2.9 Menores de edad</h3>
              <p>
                El sitio está dirigido a personas mayores de edad y a
                representantes de negocios. No recopilamos conscientemente
                datos de menores. Si detectamos un caso, procederemos a
                eliminarlos.
              </p>

              <h3>2.10 Cambios en esta política</h3>
              <p>
                Podemos actualizar esta política cuando cambie la forma en que
                tratamos los datos o la normativa aplicable. Publicaremos la
                versión vigente en esta misma página.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <h2>3. Política de cookies</h2>

              <h3>3.1 Qué son las cookies</h3>
              <p>
                Las cookies son pequeños archivos o registros que se almacenan
                en tu dispositivo cuando visitas un sitio web. También usamos
                almacenamiento local del navegador para recordar tu elección
                sobre las cookies.
              </p>

              <h3>3.2 Tipos de cookies que usamos</h3>
              <ul>
                <li>
                  <strong>Necesarias:</strong> permiten el funcionamiento
                  básico del sitio y recordar tus preferencias de
                  consentimiento. No requieren autorización.
                </li>
                <li>
                  <strong>Analíticas:</strong> nos ayudan a entender cómo se
                  usa el sitio para mejorarlo. Solo se activan si das tu
                  consentimiento.
                </li>
              </ul>
              <p>
                No utilizamos cookies publicitarias ni de perfilado para
                mostrarte anuncios de terceros.
              </p>

              <h3>3.3 Cookies y almacenamiento que usamos</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Finalidad</th>
                      <th>Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>vtr-cookie-consent</code>
                      </td>
                      <td>Necesaria (almacenamiento local)</td>
                      <td>Guardar tu elección sobre las cookies.</td>
                      <td>Hasta que borres los datos del navegador.</td>
                    </tr>
                    <tr>
                      <td>
                        <code>_ga</code>
                      </td>
                      <td>Analítica (Google Analytics)</td>
                      <td>Distinguir usuarios de forma agregada.</td>
                      <td>Hasta 2 años.</td>
                    </tr>
                    <tr>
                      <td>
                        <code>_ga_&lt;ID&gt;</code>
                      </td>
                      <td>Analítica (Google Analytics)</td>
                      <td>Mantener el estado de la sesión de medición.</td>
                      <td>Hasta 2 años.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Las cookies analíticas solo se cargan después de que aceptas su
                uso. Si eliges solo las necesarias, Google Analytics no se
                activa.
              </p>

              <h3>3.4 Cómo aceptar o rechazar las cookies</h3>
              <p>
                Al ingresar al sitio verás un aviso donde puedes aceptar todas
                las cookies o continuar solo con las necesarias. Puedes cambiar
                tu elección en cualquier momento con el siguiente botón.
              </p>
              <p>
                <CookiePreferencesButton />
              </p>
              <p>
                También puedes gestionar o eliminar las cookies desde la
                configuración de tu navegador. Ten en cuenta que bloquear las
                cookies necesarias puede afectar el funcionamiento del sitio.
              </p>

              <h3>3.5 Cookies de terceros</h3>
              <p>
                Si aceptas las cookies analíticas, Google puede establecer las
                cookies descritas. Puedes consultar más información en la{" "}
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  política de cookies de Google
                </a>
                .
              </p>

              <h3>3.6 Actualizaciones</h3>
              <p>
                Podemos modificar esta política de cookies si cambiamos las
                herramientas que utilizamos o la normativa aplicable. La
                versión vigente estará siempre publicada en esta página.
              </p>
            </section>

            <section id="contacto-legal" className="scroll-mt-32">
              <h2>4. Contacto</h2>
              <p>
                Si tienes dudas sobre estos términos, el uso de tus datos o las
                cookies, escríbenos a{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>, a
                nuestro WhatsApp {siteConfig.whatsappDisplay} o a través de la{" "}
                <Link href="/contacto">página de contacto</Link>.
              </p>
              <p>
                {siteConfig.name} · RIF {siteConfig.rif} · {siteConfig.address},{" "}
                {siteConfig.city}.
              </p>
            </section>
          </article>
        </Container>
      </section>
    </>
  );
}
