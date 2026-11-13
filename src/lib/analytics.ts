"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";
import { readConsent } from "@/lib/consent";
import type { AnalyticsEvent, AnalyticsParams } from "@/types/analytics";

export function trackEvent(
  event: AnalyticsEvent,
  params: AnalyticsParams = {},
) {
  if (!siteConfig.gaId) return;
  if (!readConsent()?.analytics) return;
  sendGAEvent("event", event, params);
}
