import { siteConfig } from "@/config/site";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generalQuoteMessage(): string {
  return "Hola VTR Import C.A., quiero recibir información para comprar al mayor. ¿Me pueden enviar la lista de precios?";
}

export function productQuoteMessage({
  productName,
  categoryName,
}: {
  productName: string;
  categoryName: string;
}): string {
  return [
    "Hola VTR Import C.A., quiero cotizar al mayor:",
    `• Producto: ${productName}`,
    `• Categoría: ${categoryName}`,
    "",
    "¿Está disponible y cuál es el precio por volumen?",
  ].join("\n");
}

export type PriceListPayload = {
  name: string;
  city: string;
  businessType: string;
  whatsapp: string;
  message?: string;
};

export function priceListMessage(payload: PriceListPayload): string {
  return [
    "Hola VTR Import C.A., quiero solicitar la lista de precios al mayor.",
    `• Nombre: ${payload.name}`,
    `• Ciudad: ${payload.city}`,
    `• Tipo de negocio: ${payload.businessType}`,
    `• WhatsApp: ${payload.whatsapp}`,
    payload.message ? `• Comentario: ${payload.message}` : "",
    "",
    "Quedo atento a la información y condiciones de mayoreo.",
  ]
    .filter(Boolean)
    .join("\n");
}

export type ContactPayload = {
  name: string;
  contact: string;
  subject: string;
  message: string;
};

export function contactMessage(payload: ContactPayload): string {
  return [
    "Hola VTR Import C.A., quiero hacer una consulta desde el sitio web.",
    `• Nombre: ${payload.name}`,
    `• Contacto: ${payload.contact}`,
    `• Asunto: ${payload.subject}`,
    `• Mensaje: ${payload.message}`,
  ].join("\n");
}
