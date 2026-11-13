"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function ConsentAnalytics() {
  const consent = useCookieConsent();

  if (!siteConfig.gaId || consent?.analytics !== true) return null;

  return <GoogleAnalytics gaId={siteConfig.gaId} />;
}
