"use client";

import { useEffect, useRef, useState } from "react";
import { mainNav, siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Logo } from "@/components/brand/logo";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import {
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Abrir menú de navegación"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
      >
        <MenuIcon className="h-7 w-7" />
      </button>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-vtr-black lg:hidden"
        >
          <div className="tire-pattern border-b border-white/10">
            <div className="container-vtr flex h-20 items-center justify-between">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Cerrar menú de navegación"
                className="inline-flex h-11 w-11 items-center justify-center text-white"
              >
                <CloseIcon className="h-7 w-7" />
              </button>
            </div>
          </div>

          <nav aria-label="Navegación principal" className="container-vtr py-8">
            <ul className="flex flex-col divide-y divide-white/10">
              <li>
                <NavLink href="/" label="Inicio" onNavigate={close} />
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    onNavigate={close}
                  />
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <Button
                href={buildWhatsAppUrl(generalQuoteMessage())}
                external
                variant="whatsapp"
                size="lg"
                className="w-full"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                analyticsEvent="whatsapp_click"
                analyticsParams={{ source: "mobile_menu" }}
              >
                Cotizar por WhatsApp
              </Button>
              <p className="text-center text-xs text-white/50">
                Atención mayorista en toda Venezuela
              </p>
            </div>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-white/65">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <MailIcon className="h-5 w-5 text-vtr-green-light" />
                {siteConfig.email}
              </a>
              <p className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-vtr-green-light" />
                {siteConfig.whatsappDisplay}
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
