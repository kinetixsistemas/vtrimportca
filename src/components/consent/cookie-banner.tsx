"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { saveConsent } from "@/lib/consent";

export function CookieBanner() {
  const consent = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="motion-rise fixed inset-x-0 bottom-0 z-40 p-3 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[min(40rem,calc(100vw-12rem))] sm:p-0"
    >
      <div className="clip-corner border border-white/10 bg-vtr-black p-5 pr-20 text-white shadow-float sm:p-6 sm:pr-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
          Cookies
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          Usamos cookies necesarias para que el sitio funcione y, con tu
          permiso, cookies analíticas para entender cómo se usa. Puedes aceptar
          todas o continuar solo con las necesarias.{" "}
          <Link
            href="/legales#cookies"
            className="font-semibold text-white underline decoration-vtr-amber decoration-2 underline-offset-4 hover:text-vtr-amber"
          >
            Más información
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button variant="primary" size="sm" onClick={() => saveConsent(true)}>
            Aceptar todas
          </Button>
          <Button variant="ghost" size="sm" onClick={() => saveConsent(false)}>
            Solo necesarias
          </Button>
        </div>
      </div>
    </div>
  );
}
