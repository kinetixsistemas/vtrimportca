"use client";

import { useState } from "react";
import { businessTypes } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import {
  buildWhatsAppUrl,
  priceListMessage,
  type PriceListPayload,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import {
  FormField,
  fieldInputClasses,
  fieldTextareaClasses,
} from "@/components/forms/form-field";

type FormValues = PriceListPayload;

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  city: "",
  businessType: "",
  whatsapp: "",
  message: "",
};

export function PriceListForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) {
      next.name = "Indica tu nombre y apellido.";
    }
    if (values.city.trim().length < 2) {
      next.city = "Indica la ciudad donde operas.";
    }
    if (!values.businessType) {
      next.businessType = "Selecciona el tipo de negocio.";
    }
    const digits = values.whatsapp.replace(/\D/g, "");
    if (digits.length < 7) {
      next.whatsapp = "Ingresa un número de WhatsApp válido.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`price-${firstError}`)?.focus();
      return;
    }

    const href = buildWhatsAppUrl(priceListMessage(values));
    trackEvent("price_list_submit", {
      city: values.city.trim(),
      business_type: values.businessType,
    });
    window.open(href, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    const href = buildWhatsAppUrl(priceListMessage(values));
    return (
      <div
        className="clip-corner border border-vtr-green/30 bg-white p-6 sm:p-8"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center bg-vtr-green text-white">
            <CheckIcon className="h-6 w-6" />
          </span>
          <h3 className="text-2xl text-vtr-black">Solicitud preparada</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-vtr-gray-dark">
          Abrimos WhatsApp con tus datos para que envíes la solicitud. Si la
          ventana no se abrió, usa el botón de abajo.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={href}
            external
            variant="whatsapp"
            icon={<WhatsAppIcon className="h-5 w-5" />}
            analyticsEvent="whatsapp_click"
            analyticsParams={{ source: "price_list_success" }}
          >
            Abrir WhatsApp
          </Button>
          <button
            type="button"
            onClick={() => {
              setValues(initialValues);
              setSubmitted(false);
            }}
            className="text-xs font-bold uppercase tracking-[0.12em] text-vtr-gray-dark underline underline-offset-4 hover:text-vtr-green"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="clip-corner border border-vtr-black/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Nombre y apellido"
          htmlFor="price-name"
          required
          error={errors.name}
        >
          <input
            id="price-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "price-name-error" : undefined}
            className={fieldInputClasses}
            placeholder="Tu nombre"
          />
        </FormField>

        <FormField
          label="Ciudad"
          htmlFor="price-city"
          required
          error={errors.city}
        >
          <input
            id="price-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "price-city-error" : undefined}
            className={fieldInputClasses}
            placeholder="Ej: Caracas"
          />
        </FormField>

        <FormField
          label="Tipo de negocio"
          htmlFor="price-businessType"
          required
          error={errors.businessType}
        >
          <select
            id="price-businessType"
            name="businessType"
            value={values.businessType}
            onChange={(event) => update("businessType", event.target.value)}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={
              errors.businessType ? "price-businessType-error" : undefined
            }
            className={fieldInputClasses}
          >
            <option value="">Selecciona una opción</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="WhatsApp"
          htmlFor="price-whatsapp"
          required
          error={errors.whatsapp}
          hint="Incluye el código de país si estás fuera de Venezuela."
        >
          <input
            id="price-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={
              errors.whatsapp
                ? "price-whatsapp-error"
                : "price-whatsapp-hint"
            }
            className={fieldInputClasses}
            placeholder="Ej: +58 412 000 0000"
          />
        </FormField>

        <FormField
          label="Comentario (opcional)"
          htmlFor="price-message"
          className="sm:col-span-2"
        >
          <textarea
            id="price-message"
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            className={fieldTextareaClasses}
            placeholder="Cuéntanos qué líneas de producto te interesan."
          />
        </FormField>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={<WhatsAppIcon className="h-5 w-5" />}
        >
          Solicitar lista de precios
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-vtr-gray-dark/75">
          Al continuar se abrirá WhatsApp con tus datos. No publicamos precios
          en el sitio.
        </p>
      </div>
    </form>
  );
}
