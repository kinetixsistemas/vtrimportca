"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  buildWhatsAppUrl,
  contactMessage,
  type ContactPayload,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  FormField,
  fieldInputClasses,
  fieldTextareaClasses,
} from "@/components/forms/form-field";

const subjects = [
  "Consulta de producto",
  "Compra al mayor",
  "Envíos nacionales",
  "Facturación",
  "Otro",
] as const;

type FormValues = ContactPayload;

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  contact: "",
  subject: "",
  message: "",
};

export function ContactForm() {
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
      next.name = "Indica tu nombre.";
    }
    if (values.contact.trim().length < 5) {
      next.contact = "Indica un WhatsApp o correo de contacto.";
    }
    if (!values.subject) {
      next.subject = "Selecciona un asunto.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Escribe un mensaje de al menos 10 caracteres.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    const href = buildWhatsAppUrl(contactMessage(values));
    trackEvent("contact_form_submit", {
      subject: values.subject,
    });
    window.open(href, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    const href = buildWhatsAppUrl(contactMessage(values));
    return (
      <div
        className="clip-corner border border-vtr-green/30 bg-white p-6 sm:p-8"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center bg-vtr-green text-white">
            <CheckIcon className="h-6 w-6" />
          </span>
          <h3 className="text-2xl text-vtr-black">Mensaje preparado</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-vtr-gray-dark">
          Abrimos WhatsApp con tu consulta. Si la ventana no se abrió, usa el
          botón de abajo para enviarla.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={href}
            external
            variant="whatsapp"
            icon={<WhatsAppIcon className="h-5 w-5" />}
            analyticsEvent="whatsapp_click"
            analyticsParams={{ source: "contact_success" }}
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
            Escribir otra consulta
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
          label="Nombre"
          htmlFor="contact-name"
          required
          error={errors.name}
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldInputClasses}
            placeholder="Tu nombre"
          />
        </FormField>

        <FormField
          label="WhatsApp o correo"
          htmlFor="contact-contact"
          required
          error={errors.contact}
        >
          <input
            id="contact-contact"
            name="contact"
            type="text"
            autoComplete="email"
            value={values.contact}
            onChange={(event) => update("contact", event.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={
              errors.contact ? "contact-contact-error" : undefined
            }
            className={fieldInputClasses}
            placeholder="Ej: +58 412 000 0000 o correo@ejemplo.com"
          />
        </FormField>

        <FormField
          label="Asunto"
          htmlFor="contact-subject"
          required
          error={errors.subject}
          className="sm:col-span-2"
        >
          <select
            id="contact-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            className={fieldInputClasses}
          >
            <option value="">Selecciona una opción</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Mensaje"
          htmlFor="contact-message"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={fieldTextareaClasses}
            placeholder="Escribe tu consulta con el mayor detalle posible."
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
          Enviar por WhatsApp
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-vtr-gray-dark/75">
          Respondemos en horario laboral. Tus datos solo se usan para atender
          la consulta.
        </p>
      </div>
    </form>
  );
}
