"use client";

import { Button } from "@/components/ui/button";
import { clearConsent } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => clearConsent()}
    >
      Cambiar mi elección de cookies
    </Button>
  );
}
