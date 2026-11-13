import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getCatalogStats } from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { PriceListForm } from "@/components/forms/price-list-form";
import {
  ArrowRightIcon,
  BoxIcon,
  CheckIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Compra al mayor: condiciones y lista de precios",
  description:
    "Solicita la lista de precios al mayor de VTR Import C.A. Atendemos repuesteras, talleres, concesionarios y distribuidores en toda Venezuela.",
  path: "/mayoristas",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Mayoristas" },
];

const benefits = [
  {
    icon: BoxIcon,
    title: "Surtido por líneas",
    description:
      "Repuestos, cauchos, cascos, accesorios, carrocería y baterías en un solo proveedor.",
  },
  {
    icon: SparkIcon,
    title: "Condiciones por volumen",
    description:
      "La cotización se ajusta al tamaño de tu compra y a la disponibilidad del momento.",
  },
  {
    icon: TruckIcon,
    title: "Despacho nacional",
    description:
      "Coordinamos el envío a tu ciudad según el volumen y las condiciones acordadas.",
  },
  {
    icon: ShieldIcon,
    title: "Acompañamiento B2B",
    description:
      "Un asesor te ayuda a priorizar productos de alta rotación para tu negocio.",
  },
];

const requirements = [
  "Ser comercio, taller, concesionario o distribuidor del sector motos.",
  "Indicar ciudad y tipo de negocio para orientar la cotización.",
  "Compartir un WhatsApp activo para el envío de la lista.",
  "Confirmar volumen estimado y forma de despacho con el asesor.",
];

const faqs = [
  {
    question: "¿Los precios se publican en el sitio?",
    answer:
      "No. El catálogo muestra los productos, pero los precios y condiciones de mayoreo se comparten por WhatsApp.",
  },
  {
    question: "¿Hay una compra mínima?",
    answer:
      "Las condiciones dependen de la línea y el volumen. Un asesor te indica el mínimo aplicable antes de confirmar el pedido.",
  },
  {
    question: "¿Puedo mezclar categorías en un mismo pedido?",
    answer:
      "Sí, puedes combinar líneas de producto. La disponibilidad y el despacho se coordinan según el pedido final.",
  },
  {
    question: "¿Atienden en toda Venezuela?",
    answer:
      "Sí, coordinamos envíos nacionales. Las condiciones y tiempos se confirman según tu ciudad y el tamaño de la compra.",
  },
];

const stats = getCatalogStats();

export default function MayoristasPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="tire-pattern relative overflow-hidden bg-vtr-black text-white">
        <div className="speed-lines absolute inset-0" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
                Programa mayorista
              </p>
              <h1 className="mt-3 text-5xl leading-[0.9] text-white sm:text-6xl">
                Compra al mayor con un solo proveedor
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Surtimos repuesteras, talleres, concesionarios y distribuidores
                en toda Venezuela. Solicita la lista de precios y recibe
                acompañamiento para tu reposición.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="#lista-de-precios"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRightIcon className="h-5 w-5" />}
                >
                  Solicitar lista de precios
                </Button>
                <Button
                  href={buildWhatsAppUrl(generalQuoteMessage())}
                  external
                  variant="ghost"
                  size="lg"
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                  analyticsEvent="whatsapp_click"
                  analyticsParams={{ source: "wholesale_hero" }}
                >
                  Hablar con un asesor
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="clip-corner-sm border border-white/10 bg-white/5 p-4">
                <p className="font-display text-4xl font-extrabold italic text-vtr-amber">
                  {stats.categories}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                  Categorías
                </p>
              </div>
              <div className="clip-corner-sm border border-white/10 bg-white/5 p-4">
                <p className="font-display text-4xl font-extrabold italic text-vtr-amber">
                  {stats.products}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                  Productos
                </p>
              </div>
              <div className="clip-corner-sm border border-white/10 bg-white/5 p-4">
                <p className="font-display text-4xl font-extrabold italic text-vtr-amber">
                  VE
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                  Cobertura
                </p>
              </div>
              <div className="clip-corner-sm border border-white/10 bg-white/5 p-4">
                <p className="font-display text-4xl font-extrabold italic text-vtr-amber">
                  B2B
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                  Enfoque
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Beneficios"
            title="Pensado para tu operación"
            description="Menos proveedores, más control sobre tu surtido y una ruta clara para cotizar."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="clip-corner border border-vtr-black/10 bg-white p-6"
                >
                  <span className="grid h-12 w-12 place-items-center bg-vtr-green text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl text-vtr-black">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-vtr-gray-dark">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="lista-de-precios"
        className="scroll-mt-28 border-y border-vtr-black/10 bg-white py-14 sm:py-20"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Solicitud"
                title="Recibe la lista de precios"
                description="Completa los datos y te llevaremos a WhatsApp con el mensaje listo para enviar. No publicamos precios en el sitio."
              />

              <div className="mt-8">
                <h3 className="text-xl text-vtr-black">¿Qué necesitas?</h3>
                <ul className="mt-4 space-y-3">
                  {requirements.map((requirement) => (
                    <li
                      key={requirement}
                      className="flex items-start gap-3 text-sm leading-relaxed text-vtr-gray-dark"
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-vtr-green" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border border-vtr-black/10 bg-vtr-gray-light p-5 text-sm text-vtr-gray-dark">
                <p className="font-semibold text-vtr-black">Contacto directo</p>
                <p className="mt-2">
                  WhatsApp:{" "}
                  <a
                    href={buildWhatsAppUrl(generalQuoteMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="whatsapp_click"
                    data-analytics-params={JSON.stringify({
                      source: "wholesale_aside",
                    })}
                    className="font-semibold text-vtr-green underline underline-offset-4"
                  >
                    {siteConfig.whatsappDisplay}
                  </a>
                </p>
                <p className="mt-1">
                  Correo:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-vtr-green underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p className="mt-1">Horario: {siteConfig.schedule}</p>
              </div>
            </div>

            <PriceListForm />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Antes de cotizar"
            description="Si tu duda no está aquí, escríbenos por WhatsApp y la resolvemos."
          />
          <div className="divide-y divide-vtr-black/10 border-y border-vtr-black/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-vtr-black">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-xl text-vtr-green transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-vtr-gray-dark">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-vtr-green py-12 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">¿Prefieres hablar ahora?</h2>
            <p className="mt-2 text-sm text-white/75">
              Escríbenos y te orientamos con las líneas de mayor rotación.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={buildWhatsAppUrl(generalQuoteMessage())}
              external
              variant="primary"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
              analyticsEvent="whatsapp_click"
              analyticsParams={{ source: "wholesale_final_cta" }}
            >
              WhatsApp mayorista
            </Button>
            <Button href="/catalogo" variant="ghost" size="lg">
              Ver catálogo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
