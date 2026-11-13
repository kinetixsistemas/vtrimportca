import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { categories, getCategoryPath } from "@/lib/catalog";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { SpeedDivider } from "@/components/ui/speed-divider";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const currentYear = new Date().getFullYear();

const companyLinks = [
  { href: "/mayoristas", label: "Mayoristas" },
  { href: "/envios-nacionales", label: "Envíos nacionales" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
  { href: "/legales", label: "Términos legales" },
];

export function Footer() {
  return (
    <footer className="tire-pattern relative overflow-hidden bg-vtr-black text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-vtr-green" />
      <div className="container-vtr py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Distribuidor al mayor de repuestos, cauchos, cascos, accesorios,
              carrocería y baterías para motos. Despachos a toda Venezuela.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={buildWhatsAppUrl(generalQuoteMessage())}
                external
                variant="whatsapp"
                size="sm"
                icon={<WhatsAppIcon className="h-4 w-4" />}
                analyticsEvent="whatsapp_click"
                analyticsParams={{ source: "footer" }}
              >
                Cotizar por WhatsApp
              </Button>
            </div>
            {siteConfig.social.instagram || siteConfig.social.facebook ? (
              <div className="mt-6 flex items-center gap-3">
                {siteConfig.social.instagram ? (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de VTR Import"
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 hover:border-vtr-amber hover:text-vtr-amber"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                ) : null}
                {siteConfig.social.facebook ? (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de VTR Import"
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 hover:border-vtr-amber hover:text-vtr-amber"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <nav aria-label="Categorías">
            <h2 className="font-display text-xl italic text-white">Catálogo</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={getCategoryPath(category)}
                    className="text-white/65 transition-colors hover:text-vtr-amber"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h2 className="font-display text-xl italic text-white">Empresa</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 transition-colors hover:text-vtr-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xl italic text-white">Contacto</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={buildWhatsAppUrl(generalQuoteMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="whatsapp_click"
                  data-analytics-params={JSON.stringify({ source: "footer_contact" })}
                  className="flex items-start gap-3 transition-colors hover:text-vtr-amber"
                >
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-vtr-green-light" />
                  <span>
                    {siteConfig.whatsappDisplay}
                    <span className="block text-xs text-white/40">
                      Cotizaciones y lista de precios
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-vtr-amber"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-vtr-green-light" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-vtr-green-light" />
                <span>
                  {siteConfig.address}
                  <span className="block text-xs text-white/40">
                    {siteConfig.city}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-vtr-green-light" />
                {siteConfig.schedule}
              </li>
            </ul>
          </div>
        </div>

        <SpeedDivider className="mt-12" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. RIF {siteConfig.rif}.
          </p>
          <p>
            Distribución al mayor de repuestos, cauchos y accesorios para motos
            en toda Venezuela.
          </p>
          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
            aria-label={`Creado por ${siteConfig.developer.name}`}
          >
            <span>Creado por</span>
            <span className="inline-flex items-center bg-white/45 px-2 py-1 rounded rounded-2xl">
              <Image
                src={siteConfig.developer.logo}
                alt={siteConfig.developer.name}
                width={500}
                height={500}
                className="h-7 w-auto"
              />
            </span>
            <span className="font-medium text-white/70">
              www.kinetixsistemas.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
