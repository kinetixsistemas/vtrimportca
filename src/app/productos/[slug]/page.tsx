import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategory,
  getCategoryPath,
  getProductBrandPath,
  getProductBrandSlug,
  getProductBySlugAny,
  getProductPath,
  getRelatedProducts,
  products,
} from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import {
  buildWhatsAppUrl,
  generalQuoteMessage,
  productQuoteMessage,
} from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/catalog/product-card";
import {
  ArrowRightIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlugAny(slug);
  const category = product ? getCategory(product.categorySlug) : undefined;

  if (!product || !category) {
    return pageMetadata({
      title: "Producto no encontrado",
      description: "El producto solicitado no existe en el catálogo.",
      path: `/productos/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: product.name,
    description: `${product.shortDescription} Cotiza al mayor por WhatsApp.`,
    path: getProductPath(product),
    image: product.image,
    imageAlt: `${product.name} — ${product.productBrand}`,
  });
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlugAny(slug);
  const category = product ? getCategory(product.categorySlug) : undefined;

  if (!product || !category) notFound();

  const quoteHref = buildWhatsAppUrl(
    productQuoteMessage({
      productName: product.name,
      categoryName: category.name,
    }),
  );
  const related = getRelatedProducts(product, 3);
  const productBrandSlug = getProductBrandSlug(product);
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: category.name, href: getCategoryPath(category) },
    { label: product.name },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product, category)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-white">
        <Container className="py-8 sm:py-10">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <div className="clip-corner relative aspect-square overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.productBrand}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Badge variant="dark">{category.name}</Badge>
                </div>
              </div>
              <p className="mt-3 text-xs text-vtr-gray-dark/70">
                Imagen referencial del producto. Confirma presentación y acabado
                con un asesor.
              </p>
            </div>

            <div>
              <h1 className="text-4xl leading-[0.95] text-vtr-black sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-vtr-gray-dark sm:text-lg">
                {product.shortDescription}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={getCategoryPath(category)}
                  className="text-xs font-bold uppercase tracking-[0.1em] text-vtr-green underline-offset-4 hover:underline"
                >
                  Ver más de {category.name}
                </Link>
                <Link
                  href={getProductBrandPath(category, productBrandSlug)}
                  className="text-xs font-bold uppercase tracking-[0.1em] text-vtr-green underline-offset-4 hover:underline"
                >
                  Ver más de {product.productBrand}
                </Link>
              </div>

              <div className="mt-7 border-t border-vtr-black/10 pt-6">
                <p className="text-sm font-semibold text-vtr-black">
                  Precio y disponibilidad por WhatsApp
                </p>
                <p className="mt-1 text-sm leading-relaxed text-vtr-gray-dark">
                  No publicamos precios en el sitio. La cotización se ajusta al
                  volumen y a la disponibilidad actual.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={quoteHref}
                    external
                    variant="whatsapp"
                    size="lg"
                    icon={<WhatsAppIcon className="h-5 w-5" />}
                    analyticsEvent="quote_click"
                    analyticsParams={{
                      source: "product_detail",
                      category: category.slug,
                    }}
                  >
                    Cotizar este producto
                  </Button>
                  <Button
                    href="/mayoristas"
                    variant="outline"
                    size="lg"
                    icon={<ArrowRightIcon className="h-5 w-5" />}
                  >
                    Lista de precios
                  </Button>
                </div>
                <Button
                  href={buildWhatsAppUrl(generalQuoteMessage())}
                  external
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-vtr-black hover:bg-vtr-black/5"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                  analyticsEvent="whatsapp_click"
                  analyticsParams={{
                    source: "product_detail_general",
                  }}
                >
                  Consultar otro producto
                </Button>
              </div>

              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="border border-vtr-black/10 bg-white px-4 py-3"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark/70">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-vtr-black">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-vtr-black/10 bg-white py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Ficha del producto" title="Descripción" />
            <p className="mt-4 text-sm leading-relaxed text-vtr-gray-dark sm:text-base">
              {product.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="También te puede interesar"
                title="Productos relacionados"
              />
              <Button
                href="/catalogo"
                variant="outline"
                icon={<ArrowRightIcon className="h-4 w-4" />}
              >
                Ver catálogo
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => {
                const itemCategory = getCategory(item.categorySlug);
                if (!itemCategory) return null;
                return (
                  <ProductCard
                    key={item.id}
                    product={item}
                    category={itemCategory}
                  />
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
