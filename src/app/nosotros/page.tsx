import Image from "next/image";
import type { Metadata } from "next";
import { getCatalogStats } from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ArrowRightIcon,
  BoxIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros: distribución mayorista de repuestos para motos",
  description:
    "Conoce a VTR Import C.A., distribuidor mayorista de repuestos, cauchos, cascos, accesorios, carrocería y baterías para motos en Venezuela.",
  path: "/nosotros",
  image: "/images/nosotros.webp",
  imageAlt: "Equipo y operación de VTR Import — imagen de demostración",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros" },
];

const values = [
  {
    icon: BoxIcon,
    title: "Surtido completo",
    description:
      "Reunimos las líneas que tu negocio necesita para reducir la cantidad de proveedores y simplificar la reposición.",
  },
  {
    icon: ShieldIcon,
    title: "Trato claro",
    description:
      "Sin precios escondidos ni promesas vagas: la cotización se explica por WhatsApp antes de confirmar.",
  },
  {
    icon: TruckIcon,
    title: "Logística coordinada",
    description:
      "Pensamos el despacho según el volumen y el destino para que el pedido llegue en las mejores condiciones.",
  },
  {
    icon: SparkIcon,
    title: "Enfoque en tu rotación",
    description:
      "Te ayudamos a priorizar referencias de alta demanda para que tu inventario trabaje a tu favor.",
  },
];

const stats = getCatalogStats();

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="relative isolate overflow-hidden bg-vtr-black text-white">
        <Image
          src="/images/nosotros.webp"
          alt="Operación de VTR Import — imagen de demostración"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vtr-black via-vtr-black/85 to-vtr-black/40" />
        <Container className="relative py-12 sm:py-16">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
              Nosotros
            </p>
            <h1 className="mt-3 text-5xl leading-[0.9] text-white sm:text-6xl">
              Un socio mayorista para el mercado de motos
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              VTR Import C.A. nace para conectar a repuesteras, talleres y
              distribuidores con un surtido organizado y una atención directa.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/catalogo"
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Explorar catálogo
              </Button>
              <Button
                href={buildWhatsAppUrl(generalQuoteMessage())}
                external
                variant="ghost"
                size="lg"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                analyticsEvent="whatsapp_click"
                analyticsParams={{ source: "about_hero" }}
              >
                Hablar con un asesor
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Nuestra historia"
              title="Mayoreo con mirada de operación"
            />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-vtr-gray-dark sm:text-base">
              <p>
                El mercado de motos en Venezuela se mueve rápido. Una repuestera
                necesita surtido, referencias claras y un canal directo para
                resolver dudas. VTR Import C.A. se organiza alrededor de esa
                necesidad: catálogo por líneas, compatibilidad visible y
                cotización por WhatsApp.
              </p>
              <p>
                Trabajamos con un enfoque mayorista: entendemos el volumen, la
                rotación y la importancia de mantener una relación comercial
                estable. Por eso priorizamos la claridad en las condiciones y el
                acompañamiento antes y después del despacho.
              </p>
              <p>
                Nuestro objetivo es que cada compra sea fácil de repetir: mismo
                canal, misma atención y un surtido que puedas planificar.
              </p>
            </div>

            <div className="mt-8 border-l-4 border-vtr-amber bg-vtr-gray-light p-5 text-sm leading-relaxed text-vtr-gray-dark">
              <p className="font-semibold text-vtr-black">
                Nota de demostración
              </p>
              <p className="mt-1">
                Este sitio usa contenido, imágenes y datos de producto de
                ejemplo. La historia, las cifras y los datos de contacto deben
                reemplazarse por información real antes de publicar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            <div className="clip-corner border border-vtr-black/10 bg-white p-6">
              <p className="font-display text-5xl font-extrabold italic text-vtr-green">
                {stats.categories}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-gray-dark/70">
                Categorías
              </p>
            </div>
            <div className="clip-corner border border-vtr-black/10 bg-white p-6">
              <p className="font-display text-5xl font-extrabold italic text-vtr-green">
                {stats.products}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-gray-dark/70">
                Referencias
              </p>
            </div>
            <div className="clip-corner border border-vtr-black/10 bg-white p-6">
              <p className="font-display text-5xl font-extrabold italic text-vtr-green">
                {stats.brands}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-gray-dark/70">
                Marcas
              </p>
            </div>
            <div className="clip-corner border border-vtr-black/10 bg-white p-6">
              <p className="font-display text-5xl font-extrabold italic text-vtr-green">
                VE
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-gray-dark/70">
                Cobertura
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-vtr-black/10 bg-white py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Principios que sostienen la relación"
            description="No se trata solo de vender: se trata de que tu negocio pueda reponer con confianza."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="border border-vtr-black/10 bg-vtr-gray-light p-6"
                >
                  <span className="grid h-12 w-12 place-items-center bg-vtr-green text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl text-vtr-black">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-vtr-gray-dark">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="clip-corner relative aspect-[4/3] overflow-hidden bg-vtr-gray-light">
            <Image
              src="/images/nosotros.webp"
              alt="Imagen de demostración de la operación mayorista"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Nuestro compromiso"
              title="Atención directa, decisiones claras"
              description="Cada consulta pasa por una persona que entiende el negocio mayorista."
            />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-vtr-gray-dark sm:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 bg-vtr-amber" />
                Catálogo organizado por categoría y compatibilidad.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 bg-vtr-amber" />
                Cotización por WhatsApp, sin formularios que se pierden.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 bg-vtr-amber" />
                Condiciones de mayoreo explicadas antes de confirmar.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 bg-vtr-amber" />
                Coordinación de despacho según destino y volumen.
              </li>
            </ul>
            <div className="mt-8">
              <Button
                href="/mayoristas"
                variant="secondary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Ver programa mayorista
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-vtr-green py-12 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Construyamos una relación duradera</h2>
            <p className="mt-2 text-sm text-white/75">
              Cuéntanos qué líneas necesitas y armamos una propuesta.
            </p>
          </div>
          <Button
            href={buildWhatsAppUrl(generalQuoteMessage())}
            external
            variant="primary"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
            analyticsEvent="whatsapp_click"
            analyticsParams={{ source: "about_final_cta" }}
          >
            Escribir por WhatsApp
          </Button>
        </Container>
      </section>
    </>
  );
}
