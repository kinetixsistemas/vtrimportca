import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(generalQuoteMessage());

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp con VTR Import"
      data-analytics-event="whatsapp_click"
      data-analytics-params={JSON.stringify({ source: "floating_button" })}
      className="group fixed bottom-4 right-4 z-50 inline-flex focus-visible:outline-offset-4 sm:bottom-6 sm:right-6"
    >
      <span className="clip-corner-sm flex items-center gap-2 bg-whatsapp px-4 py-3 text-vtr-black shadow-float transition-transform group-hover:-translate-y-0.5">
        <WhatsAppIcon className="h-6 w-6 shrink-0" />
        <span className="hidden text-xs font-extrabold uppercase tracking-[0.14em] sm:inline">
          Cotizar
        </span>
      </span>
    </a>
  );
}

export function WhatsAppInlineLink({
  message,
  source,
  children,
  className,
}: {
  message: string;
  source: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      data-analytics-params={JSON.stringify({ source })}
      className={className}
    >
      {children}
    </a>
  );
}

export function WhatsAppNumberLink({ className }: { className?: string }) {
  return (
    <a
      href={buildWhatsAppUrl(generalQuoteMessage())}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      data-analytics-params={JSON.stringify({ source: "contact_number" })}
      className={className}
    >
      {siteConfig.whatsappDisplay}
    </a>
  );
}
