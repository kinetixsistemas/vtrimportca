import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  categories,
  getCatalogStats,
  getFeaturedProducts,
} from "@/lib/catalog";
import { getAllPosts, formatDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpeedDivider } from "@/components/ui/speed-divider";
import { CategoryCard } from "@/components/catalog/category-card";
import { ProductCard } from "@/components/catalog/product-card";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import {
  ArrowRightIcon,
  BoxIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Repuestos, cauchos y accesorios para motos al mayor",
  description:
    "VTR Import C.A. distribuye al mayor repuestos, cauchos, cascos, accesorios, carrocería y baterías para motos en toda Venezuela. Cotiza por WhatsApp.",
  path: "/",
});

const stats = getCatalogStats();

const valueProps = [
  {
    icon: BoxIcon,
    title: "Surtido para tu negocio",
    description:
      "Seis líneas de producto para abastecer repuesteras, talleres y tiendas de accesorios.",
  },
  {
    icon: TruckIcon,
    title: "Despacho nacional",
    description:
      "Coordinamos envíos a toda Venezuela.",
  },
  {
    icon: ShieldIcon,
    title: "Atención B2B",
    description:
      "Condiciones de mayoreo, productos claros y acompañamiento para tu reposición.",
  },
  {
    icon: SparkIcon,
    title: "Cotización ágil",
    description:
      "Listas de precios actualizadas para agilizar tu proceso de compra.",
  },
];

const steps = [
  {
    number: "01",
    title: "Elige tus líneas",
    description:
      "Explora el catálogo por categoría o busca el producto que necesitas.",
  },
  {
    number: "02",
    title: "Cotiza por WhatsApp",
    description:
      "Envía el nombre del producto o solicita la lista de precios al mayor.",
  },
  {
    number: "03",
    title: "Confirma tu pedido",
    description:
      "Definimos disponibilidad, volumen y forma de despacho con un asesor.",
  },
  {
    number: "04",
    title: "Recibe tu mercancía",
    description:
      "Coordinamos el envío nacional según tu ciudad y el tamaño de tu compra.",
  },
];

const heroSlides: HeroSlide[] = [
  {
    src: "/images/carrucel/new-yuver-t-barras.webp",
    alt: "T barras New Yuber disponible al mayor",
    href: "/accesorios/new-yuber",
    label: "Novedad New Yuber",
    title: "T Barras New Yuber",
  },
  {
    src: "/images/carrucel/siruis-parts-caucho-carrucel.webp",
    alt: "Caucho Siruis Parts disponible al mayor",
    href: "/cauchos/siruis-parts",
    label: "Cauchos Siruis Parts",
    title: "Agarre para tu moto",
  },
  {
    src: "/images/carrucel/new-yuver-cadenas-reforzada-moto.webp",
    alt: "Cadena reforzada New Yuber para motos",
    href: "/repuestos/new-yuber",
    label: "Novedad New Yuber",
    title: "Cadenas reforzadas",
  },
  {
    src: "/images/carrucel/new-yuver-bomba-aceite.webp",
    alt: "Bomba de aceite New Yuber disponible al mayor",
    href: "/repuestos/new-yuber",
    label: "Repuestos New Yuber",
    title: "Bomba de aceite",
  },
  {
    src: "/images/carrucel/new-yuver-manzana-trasera-enduro.webp",
    alt: "Manzana trasera enduro New Yuber",
    href: "/repuestos/new-yuber",
    label: "Línea enduro",
    title: "Manzana trasera",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(6);
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-vtr-black text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(30,107,30,0.4),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="tire-pattern absolute inset-0" aria-hidden="true" />
        <div className="speed-lines absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="motion-sweep pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-transparent via-vtr-amber/20 to-transparent"
        />

        <Container className="relative py-10 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="max-w-3xl">
              <p className="motion-rise flex flex-wrap items-center gap-3 text-[15px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
                <span aria-hidden="true" className="h-0.5 w-8 bg-vtr-amber" />
                Distribuidor mayorista · Venezuela
              </p>
              <h1
                className="motion-rise mt-5 text-5xl leading-[0.9] text-white sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "80ms" }}
              >
                Surtimos tu negocio de Repuestos para motos
                <span className="block text-vtr-amber">Al mayor.</span>
              </h1>
              <p
                className="motion-rise mt-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg"
                style={{ animationDelay: "160ms" }}
              >
                Cauchos, cascos, accesorios, carrocería y baterías
                para motos.
              </p>

              <div
                className="motion-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "240ms" }}
              >
                <Button
                  href={buildWhatsAppUrl(generalQuoteMessage())}
                  external
                  variant="primary"
                  size="lg"
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                  analyticsEvent="whatsapp_click"
                  analyticsParams={{ source: "home_hero" }}
                >
                  Cotizar por WhatsApp
                </Button>
                <Button
                  href="/catalogo"
                  variant="ghost"
                  size="lg"
                  icon={<ArrowRightIcon className="h-5 w-5" />}
                >
                  Explorar catálogo
                </Button>
              </div>

              <div
                className="motion-rise mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/60"
                style={{ animationDelay: "320ms" }}
              >
         
                <span>Repuestos de alta rotacion </span>
                <span aria-hidden="true" className="text-vtr-amber">
                  /
                </span>
                <span>Despacho a nivel nacional en toda Venezuela</span>
              </div>
            </div>

            <div className="motion-rise" style={{ animationDelay: "140ms" }}>
              <HeroCarousel slides={heroSlides} />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-vtr-black/10 bg-vtr-green text-white">
        <Container className="grid grid-cols-2 gap-6 py-5 sm:grid-cols-4">
          {[
            { value: stats.categories, label: "Categorías" },
            { value: stats.products, label: "Productos" },
            { value: stats.brands, label: "Marcas" },
            { value: "VE", label: "Cobertura nacional" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold italic leading-none text-vtr-amber">
                {item.value}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/75">
                {item.label}
              </span>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-vtr-black/10 bg-black/90 py-10">
        <Container className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div data-reveal className="max-w-ld">
            <p className="text-[17px] font-bold uppercase tracking-[0.2em] text-vtr-green">
              Marcas aliadas
            </p>
            <h2 className="mt-2 text-5xl text-vtr-amber sm:text-6xl lg:text-6xl">
              Marcas que distribuimos
            </h2>
            <p className="mt-2 text-m leading-relaxed text-white/75 sm:text-base">
              Trabajamos con marcas de repuestos y cauchos para surtir tu
              negocio.
            </p>
          </div>
          <div
            data-reveal
            className="flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Link
              href="/repuestos/new-yuber"
              aria-label="Ver productos New Yuber"
              className="block opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/marcas/new-yuber.webp"
                alt="New Yuber"
                width={443}
                height={243}
                className="h-20 w-auto object-contain sm:h-12 rounded-md"
              />
            </Link>
            <Link
              href="/cauchos/nitron"
              aria-label="Ver cauchos Nitron"
              className="block opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/marcas/nitron.webp"
                alt="Nitron"
                width={206}
                height={62}
                className="h-20 w-auto object-contain sm:h-9 rounded-md"
              />
            </Link>
            <Link
              href="/cauchos/siruis-parts"
              aria-label="Ver cauchos Siruis Parts"
              className="block opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/marcas/siruis-parts.webp"
                alt="Siruis Parts"
                width={211}
                height={86}
                className="h-20 w-auto object-contain sm:h-10 rounded-md"
              />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <SectionHeading
              eyebrow="Catálogo mayorista"
              title="Seis líneas para surtir tu negocio"
              description="Selecciona una categoría y encuentra los productos que necesitas."
            />
            <Button
              href="/catalogo"
              variant="secondary"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              Ver todo el catálogo
            </Button>
          </div>

          <div data-reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.slug}
                category={category}
                priority={index < 3}
              />
            ))}
          </div>
        </Container>
      </section>

      <SpeedDivider className="container-vtr" />

      <section className="py-16 sm:py-20 bg-vtr-gray/35">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Selección destacada"
              title="Repuestos listos para tu despacho"
              description="Repuestos con ficha técnica. Descuentos aplicados en compras por mayor."
            />
            <Button
              href="/catalogo"
              variant="secondary"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              Más productos
            </Button>
          </div>

          <div data-reveal className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((product) => {
              const category = categories.find(
                (item) => item.slug === product.categorySlug,
              );
              if (!category) return null;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="tire-pattern relative overflow-hidden bg-vtr-black py-16 text-white sm:py-20">
        <div className="speed-lines absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Por qué comprar al mayor"
            title="Un proveedor, todas tus líneas"
            description="Diseñado para  tiendas minoristas, talleres, concesionarios y distribuidores que necesitan reposición constante."
            tone="dark"
          />
          <div data-reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="clip-corner border border-white/10 bg-white p-6"
                >
                  <span className="grid h-12 w-12 place-items-center bg-vtr-green text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-2xl text-black">{item.title}</h3>
                  <p className="mt-2 text-m leading-relaxed text-vtr-green-dark">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Cómo comprar"
                title="Del catálogo al despacho"
                description="Un proceso simple, pensado para que tu reposición no se detenga."
              />
              <div className="mt-8">
                <Button
                  href="/mayoristas"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRightIcon className="h-5 w-5" />}
                >
                  Quiero ser mayorista
                </Button>
              </div>
            </div>
            <ol data-reveal className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="clip-corner-sm border border-vtr-black/10 bg-white p-5"
                >
                  <span className="font-display text-4xl font-extrabold italic leading-none text-vtr-green/70">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-xl text-vtr-black">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-vtr-gray-dark">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-vtr-green text-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div data-reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
              Lista de precios al mayor
            </p>
            <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
              Recibe condiciones por volumen para tu negocio
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
              Envíanos tu nombre, ciudad, tipo de negocio y WhatsApp. Un asesor
              te comparte la lista y la disponibilidad actual.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button
              href="/mayoristas"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
            >
              Solicitar lista
            </Button>
            <Button
              href={buildWhatsAppUrl(generalQuoteMessage())}
              external
              variant="ghost"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
              analyticsEvent="whatsapp_click"
              analyticsParams={{ source: "home_wholesale_band" }}
            >
              WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Blog"
              title="Ideas para vender más repuestos"
              description="Guías sobre surtido, rotación y operación para negocios de motos."
            />
            <Button
              href="/blog"
              variant="outline"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              Ver blog
            </Button>
          </div>

          <div data-reveal className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="clip-corner group overflow-hidden border border-vtr-black/10 bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="grid h-full sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative aspect-[16/10] sm:aspect-auto">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-vtr-green">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                    <h3 className="mt-2 text-2xl leading-tight text-vtr-black">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-vtr-gray-dark">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-green">
                      Leer artículo
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-vtr-black/10 bg-vtr-gray-light py-14">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div data-reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-vtr-green">
              ¿Listo para surtir tu negocio?
            </p>
            <h2 className="mt-2 text-3xl text-vtr-black sm:text-4xl">
              Cotiza hoy con un asesor mayorista
            </h2>
            <p className="mt-2 text-sm text-vtr-gray-dark">
              {siteConfig.whatsappDisplay} · {siteConfig.email}
            </p>
          </div>
          <Button
            href={buildWhatsAppUrl(generalQuoteMessage())}
            external
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
            analyticsEvent="whatsapp_click"
            analyticsParams={{ source: "home_final_cta" }}
          >
            Hablar por WhatsApp
          </Button>
        </Container>
      </section>
    </>
  );
}
