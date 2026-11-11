"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEvent, AnalyticsParams } from "@/types/analytics";

export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics-event]");
      if (!element) return;

      const eventName = element.dataset.analyticsEvent as
        | AnalyticsEvent
        | undefined;
      if (!eventName) return;

      let params: AnalyticsParams = {};
      try {
        params = element.dataset.analyticsParams
          ? (JSON.parse(element.dataset.analyticsParams) as AnalyticsParams)
          : {};
      } catch {
        params = {};
      }

      trackEvent(eventName, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
