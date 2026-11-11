import Link from "next/link";
import { mainNav } from "@/config/site";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-vtr-green text-white">
        <div className="container-vtr flex min-h-9 items-center justify-between gap-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]">
          <p className="truncate">
            Distribución al mayor en toda Venezuela
          </p>
          <Link
            href="/mayoristas"
            className="hidden shrink-0 text-white/90 underline decoration-vtr-amber decoration-2 underline-offset-4 hover:text-white sm:inline"
          >
            Solicitar lista de precios
          </Link>
        </div>
      </div>

      <div className="tire-pattern border-b border-white/10 bg-vtr-black text-white shadow-lg shadow-black/20">
        <div className="container-vtr flex h-20 items-center justify-between gap-4">
          <Logo />

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-6 lg:flex"
          >
            {mainNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={buildWhatsAppUrl(generalQuoteMessage())}
              external
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              analyticsEvent="whatsapp_click"
              analyticsParams={{ source: "header" }}
            >
              Cotizar
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
