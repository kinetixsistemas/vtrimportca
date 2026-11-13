export const CONSENT_STORAGE_KEY = "vtr-cookie-consent";
export const CONSENT_EVENT = "vtr:cookie-consent";
export const CONSENT_VERSION = 1;

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  version: number;
  updatedAt: string;
};

let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null = null;
let memoryConsent: CookieConsent | null = null;

function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent> | null;
    if (
      !parsed ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      version: CONSENT_VERSION,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function getConsentSnapshot(): CookieConsent | null | undefined {
  if (typeof window === "undefined") return undefined;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return memoryConsent;
  }

  if (raw === null && memoryConsent !== null) return memoryConsent;

  if (raw === cachedRaw) return cachedConsent;

  cachedRaw = raw;
  cachedConsent = parseConsent(raw) ?? memoryConsent;
  return cachedConsent;
}

export function getConsentServerSnapshot(): CookieConsent | null | undefined {
  return undefined;
}

export function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  function handleEvent() {
    callback();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) {
      callback();
    }
  }

  window.addEventListener(CONSENT_EVENT, handleEvent);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CONSENT_EVENT, handleEvent);
    window.removeEventListener("storage", handleStorage);
  };
}

export function readConsent(): CookieConsent | null {
  return getConsentSnapshot() ?? null;
}

export function saveConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  memoryConsent = consent;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage can be unavailable (private mode). The choice still applies to this visit.
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsent>(CONSENT_EVENT, { detail: consent }),
  );

  return consent;
}

export function clearConsent() {
  if (typeof window === "undefined") return;

  memoryConsent = null;

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsent | null>(CONSENT_EVENT, { detail: null }),
  );
}
