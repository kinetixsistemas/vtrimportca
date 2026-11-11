import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, SearchIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o cambió de dirección. Vuelve al catálogo o contáctanos por WhatsApp.",
  path: "/404",
  noIndex: true,
});

const links = [
  { href: "/catalogo", label: "Catálogo mayorista" },
  { href: "/mayoristas", label: "Compra al mayor" },
  { href: "/envios-nacionales", label: "Envíos nacionales" },
  { href: "/contacto", label: "Contacto" },
];

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-8xl font-extrabold italic leading-none text-vtr-green/15 sm:text-9xl">
            404
          </p>
          <div className="mx-auto mt-6 grid h-14 w-14 place-items-center bg-vtr-gray-light text-vtr-green">
            <SearchIcon className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-4xl leading-tight text-vtr-black sm:text-5xl">
            No encontramos esa página
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-vtr-gray-dark">
            Puede que el enlace esté roto o que el producto haya cambiado de
            dirección. Prueba desde el catálogo o escríbenos y te ayudamos.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/catalogo"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
            >
              Ir al catálogo
            </Button>
            <Button
              href={buildWhatsAppUrl(generalQuoteMessage())}
              external
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
              analyticsEvent="whatsapp_click"
              analyticsParams={{ source: "not_found" }}
            >
              Escribir por WhatsApp
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-vtr-black/10 pt-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-vtr-gray-dark underline-offset-4 hover:text-vtr-green hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
