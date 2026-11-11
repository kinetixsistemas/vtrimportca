import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/forms/contact-form";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contacto y atención mayorista",
  description:
    "Escríbenos por WhatsApp o correo para cotizar repuestos, cauchos y accesorios para motos al mayor. Atención a comercios y talleres en Venezuela.",
  path: "/contacto",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Contacto" },
];

const contactCards = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: siteConfig.whatsappDisplay,
    href: buildWhatsAppUrl(generalQuoteMessage()),
    external: true,
    note: "Canal principal para cotizaciones.",
  },
  {
    icon: MailIcon,
    label: "Correo",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
    note: "Para consultas administrativas.",
  },
  {
    icon: PhoneIcon,
    label: "RIF",
    value: siteConfig.rif,
    href: null,
    external: false,
    note: "Dato fiscal placeholder.",
  },
  {
    icon: MapPinIcon,
    label: "Ubicación",
    value: siteConfig.address,
    href: null,
    external: false,
    note: siteConfig.city,
  },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-green">
              Contacto
            </p>
            <h1 className="mt-3 text-5xl leading-[0.9] text-vtr-black sm:text-6xl">
              Hablemos de tu próxima compra
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-vtr-gray-dark sm:text-lg">
              Atendemos comercios, talleres, concesionarios y distribuidores.
              Escríbenos por WhatsApp para una respuesta más rápida o usa el
              formulario para dejar tu consulta preparada.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Canales"
              title="Datos de contacto"
              description="Los datos mostrados son placeholders de demostración."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="border border-vtr-black/10 bg-white p-4"
                  >
                    <Icon className="h-5 w-5 text-vtr-green" />
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark/70">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        {...(card.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        {...(card.label === "WhatsApp"
                          ? {
                              "data-analytics-event": "whatsapp_click",
                              "data-analytics-params": JSON.stringify({
                                source: "contact_card",
                              }),
                            }
                          : {})}
                        className="mt-1 block break-words text-sm font-semibold text-vtr-black underline-offset-4 hover:text-vtr-green hover:underline"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words text-sm font-semibold text-vtr-black">
                        {card.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-vtr-gray-dark/70">
                      {card.note}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-3 border border-vtr-black/10 bg-vtr-gray-light p-4">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-vtr-green" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark/70">
                  Horario
                </p>
                <p className="mt-1 text-sm font-semibold text-vtr-black">
                  {siteConfig.schedule}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={buildWhatsAppUrl(generalQuoteMessage())}
                external
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                analyticsEvent="whatsapp_click"
                analyticsParams={{ source: "contact_aside" }}
              >
                Escribir por WhatsApp
              </Button>
              <Button href="/mayoristas" variant="outline" size="lg">
                Lista de precios
              </Button>
            </div>

            <div className="clip-corner relative mt-6 overflow-hidden border border-vtr-black/10 bg-vtr-gray-light p-6">
              <div className="map-grid absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative">
                <MapPinIcon className="h-7 w-7 text-vtr-green" />
                <p className="mt-3 font-display text-2xl font-extrabold italic text-vtr-black">
                  Mapa no configurado
                </p>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-vtr-gray-dark">
                  La ubicación real se agregará cuando se confirmen los datos de
                  la empresa. Por ahora, {siteConfig.address}, {siteConfig.city}.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Formulario"
              title="Prepara tu consulta"
              description="Al enviar, abriremos WhatsApp con tus datos para que completes el mensaje."
            />
            <div className="mt-6">
              <ContactForm />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-vtr-gray-dark/70">
              No guardamos los datos en una base de datos. El formulario solo
              arma un mensaje de WhatsApp en tu dispositivo.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
