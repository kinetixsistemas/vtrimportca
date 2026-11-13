const fallbackUrl = "https://vtr-import.example.com";

export const siteConfig = {
  name: "VTR Import C.A.",
  shortName: "VTR Import",
  legalName: "VTR Import C.A.",
  description:
    "Distribuidor al mayor de repuestos, cauchos, cascos, accesorios, carrocería y baterías para motos en Venezuela. Cotiza por WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  locale: "es-VE",
  language: "es-VE",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "584145174722",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+58 414-517-4722",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "vtr27import@gmail.com",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Andres Eloy, Lara, Venezuela",
  city: process.env.NEXT_PUBLIC_CITY ?? "Barquisimeto",
  rif: process.env.NEXT_PUBLIC_RIF ?? "J-00000000-0",
  schedule:
    process.env.NEXT_PUBLIC_SCHEDULE ??
    "[08:00 - 18:00] · Lunes a viernes",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  isDemo: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
  developer: {
    name: "Kinetix Sistemas",
    url: "https://www.kinetixsistemas.com",
    logo: "/images/logokinetix.png",
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
  "Tiendas de motos",
  "Venta de cauchos",
  "Taller mecánico",
  "Concesionario",
  "Distribuidor",
  "Tienda de accesorios",
  "Otro",
] as const;
