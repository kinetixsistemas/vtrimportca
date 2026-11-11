const fallbackUrl = "https://vtr-import.example.com";

export const siteConfig = {
  name: "VTR Import C.A.",
  shortName: "VTR Import",
  legalName: "VTR Import C.A.",
  description:
    "Distribuidor al mayor de repuestos, cauchos, cascos, accesorios, carrocería y baterías para motos en Venezuela. Cotiza por WhatsApp con atención B2B.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  locale: "es-VE",
  language: "es-VE",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "584000000000",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+58 400-000-0000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ventas@example.com",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "[Dirección pendiente]",
  city: process.env.NEXT_PUBLIC_CITY ?? "[Ciudad pendiente]",
  rif: process.env.NEXT_PUBLIC_RIF ?? "J-00000000-0",
  schedule:
    process.env.NEXT_PUBLIC_SCHEDULE ??
    "[Horario pendiente] · Lunes a viernes",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  isDemo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
} as const;

export const mainNav = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/mayoristas", label: "Mayoristas" },
  { href: "/envios-nacionales", label: "Envíos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const businessTypes = [
  "Repuestera",
  "Taller mecánico",
  "Concesionario",
  "Distribuidor",
  "Tienda de accesorios",
  "Otro",
] as const;
