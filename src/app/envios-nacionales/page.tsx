import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import {
  BoxIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Envíos nacionales de repuestos para motos",
  description:
    "Coordinamos envíos nacionales de repuestos, cauchos y accesorios para motos en toda Venezuela. Consulta condiciones por WhatsApp.",
  path: "/envios-nacionales",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Envíos nacionales" },
];

const shippingMessage =
  "Hola VTR Import C.A., quiero cotizar un envío nacional. ¿Me pueden indicar las condiciones para mi ciudad?";

const steps = [
  {
    number: "01",
    title: "Confirma tu pedido y ciudad",
    description:
      "Indica los productos que necesitas y la ciudad de destino para revisar disponibilidad y condiciones.",
  },
  {
    number: "02",
    title: "Coordinamos el despacho",
    description:
      "Definimos embalaje, volumen y la opción de transporte más conveniente para tu compra.",
  },
  {
    number: "03",
    title: "Recibes el seguimiento",
    description:
      "Te compartimos la información de despacho disponible para que puedas hacer seguimiento.",
  },
  {
    number: "04",
    title: "Recibe y confirma",
    description:
      "Al recibir, revisa el pedido y confirma con tu asesor para cerrar la reposición.",
  },
];

const considerations = [
  {
    icon: BoxIcon,
    title: "Embalaje por volumen",
    description:
      "Preparamos el pedido según el tipo de producto y el volumen para reducir riesgos en el traslado.",
  },
  {
    icon: MapPinIcon,
    title: "Cobertura nacional",
    description:
      "Coordinamos el envío a las principales ciudades del país. La disponibilidad se confirma por destino.",
  },
  {
    icon: ClockIcon,
    title: "Tiempos por confirmar",
    description:
      "Los tiempos dependen del transportista y del destino. Tu asesor te informa antes de despachar.",
  },
  {
    icon: ShieldIcon,
    title: "Seguimiento coordinado",
    description:
      "Mantenemos comunicación durante el despacho para que sepas el estado de tu pedido.",
  },
];

const faqs = [
  {
    question: "¿Envían a todo el país?",
    answer:
      "Coordinamos envíos nacionales. La disponibilidad, el transportista y las condiciones se confirman según tu ciudad y el volumen del pedido.",
  },
  {
    question: "¿Puedo retirar en tienda?",
    answer:
      "El punto de retiro y los horarios se confirman con tu asesor según la disponibilidad del pedido.",
  },
  {
    question: "¿Cómo se calcula el costo de envío?",
    answer:
      "Depende del destino, el peso y el volumen. El costo se incluye en la cotización que recibes por WhatsApp.",
  },
  {
    question: "¿Puedo combinar productos en un solo envío?",
    answer:
      "Sí. Podemos consolidar varias líneas en un mismo despacho, siempre que el embalaje y el volumen lo permitan.",
  },
];

export default function EnviosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="relative isolate overflow-hidden bg-vtr-green text-white">
        <div className="speed-lines absolute inset-0" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
                Logística
              </p>
              <h1 className="mt-3 text-5xl leading-[0.9] text-white sm:text-6xl">
                Envíos nacionales
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Llevamos tu pedido mayorista a tu ciudad con coordinación
                directa. Confirma condiciones, transportista y tiempos con un
                asesor.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={buildWhatsAppUrl(shippingMessage)}
                  external
                  variant="primary"
                  size="lg"
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                  analyticsEvent="whatsapp_click"
                  analyticsParams={{ source: "shipping_hero" }}
                >
                  Cotizar envío
                </Button>
                <Button href="/catalogo" variant="ghost" size="lg">
                  Ver catálogo
                </Button>
              </div>
            </div>

            <div className="clip-corner border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <TruckIcon className="h-8 w-8 text-vtr-amber" />
              <p className="mt-4 font-display text-3xl font-extrabold italic text-white">
                Cobertura nacional
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Despachos coordinados según destino y volumen. Sin promesas de
                plazos fijos hasta confirmar con el transportista.
              </p>
              <p className="mt-4 border-t border-white/15 pt-4 text-xs text-white/60">
                Coordinamos con transportistas de cobertura nacional según tu
                destino y volumen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="De la cotización a tu negocio"
            description="Un proceso simple, con confirmación humana en cada paso."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="clip-corner border border-vtr-black/10 bg-white p-6"
              >
                <p className="font-display text-4xl font-extrabold italic text-vtr-green/25">
                  {step.number}
                </p>
                <h3 className="mt-3 text-2xl text-vtr-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-vtr-gray-dark">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-vtr-black/10 bg-white py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Condiciones"
            title="Lo que debes saber"
            description="Información general. Las condiciones finales se confirman en la cotización."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {considerations.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-vtr-black/10 bg-vtr-gray-light p-6"
                >
                  <Icon className="h-7 w-7 text-vtr-green" />
                  <h3 className="mt-4 text-xl text-vtr-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-vtr-gray-dark">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Sobre los envíos"
              description="Si necesitas confirmar tu caso, escríbenos por WhatsApp."
            />
            <div className="mt-6 border border-vtr-black/10 bg-vtr-gray-light p-5 text-sm text-vtr-gray-dark">
              <p className="font-semibold text-vtr-black">Atención directa</p>
              <p className="mt-2">
                WhatsApp:{" "}
                <a
                  href={buildWhatsAppUrl(shippingMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="whatsapp_click"
                  data-analytics-params={JSON.stringify({
                    source: "shipping_aside",
                  })}
                  className="font-semibold text-vtr-green underline underline-offset-4"
                >
                  {siteConfig.whatsappDisplay}
                </a>
              </p>
              <p className="mt-1">Horario: {siteConfig.schedule}</p>
            </div>
          </div>

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

      <section className="bg-vtr-black py-12 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">¿Listo para despachar?</h2>
            <p className="mt-2 text-sm text-white/70">
              Envíanos tu ciudad y los productos que necesitas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={buildWhatsAppUrl(shippingMessage)}
              external
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
              analyticsEvent="whatsapp_click"
              analyticsParams={{ source: "shipping_final_cta" }}
            >
              Coordinar envío
            </Button>
            <Button
              href="/contacto"
              variant="ghost"
              size="lg"
              icon={<CheckIcon className="h-5 w-5" />}
            >
              Contacto
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
