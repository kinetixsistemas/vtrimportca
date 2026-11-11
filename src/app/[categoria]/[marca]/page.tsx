import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategory,
  getCategoryPath,
  getProductBrandBySlug,
  getProductBrandPath,
  getProductBrandsByCategory,
  getProductPath,
  getProductsByCategoryAndBrand,
} from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductCard } from "@/components/catalog/product-card";
import { ArrowRightIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return categories.flatMap((category) =>
    getProductBrandsByCategory(category.slug).map((brand) => ({
      categoria: category.slug,
      marca: brand.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; marca: string }>;
}): Promise<Metadata> {
  const { categoria, marca } = await params;
  const category = getCategory(categoria);
  const brand = category
    ? getProductBrandBySlug(category.slug, marca)
    : undefined;

  if (!category || !brand) {
    return pageMetadata({
      title: "Marca no encontrada",
      description: "La marca solicitada no existe en esta categoría.",
      path: `/${categoria}/${marca}`,
      noIndex: true,
    });
  }

  const brandProducts = getProductsByCategoryAndBrand(
    category.slug,
    brand.slug,
  );

  return pageMetadata({
    title: `${brand.name} en ${category.name} al mayor`,
    description: `Productos ${brand.name} de ${category.name} para motos. ${brandProducts.length} referencias disponibles para cotizar por WhatsApp al mayor.`,
    path: getProductBrandPath(category, brand.slug),
    image: brandProducts[0]?.image,
    imageAlt: `${brand.name} — ${category.name} para motos`,
  });
}

export default async function MarcaPage({
  params,
}: {
  params: Promise<{ categoria: string; marca: string }>;
}) {
  const { categoria, marca } = await params;
  const category = getCategory(categoria);
  const brand = category
    ? getProductBrandBySlug(category.slug, marca)
    : undefined;

  if (!category || !brand) notFound();

  const brandProducts = getProductsByCategoryAndBrand(
    category.slug,
    brand.slug,
  );
  if (brandProducts.length === 0) notFound();

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: category.name, href: getCategoryPath(category) },
    { label: brand.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={itemListJsonLd({
          name: `${brand.name} en ${category.name}`,
          items: brandProducts.map((product) => ({
            name: product.name,
            path: getProductPath(product),
          })),
        })}
      />

      <section className="relative isolate overflow-hidden bg-vtr-black text-white">
        <Image
          src={brandProducts[0]?.image ?? category.image}
          alt={`${brand.name} en ${category.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vtr-black via-vtr-black/85 to-vtr-black/40" />
        <Container className="relative py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
              Marca · {category.name}
            </p>
            <h1 className="mt-3 text-5xl leading-[0.9] text-white sm:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Referencias de {brand.name} dentro de {category.name}. Cotiza al
              mayor por WhatsApp según disponibilidad y volumen.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="amber">{brand.count} referencias</Badge>
              <Badge variant="light">{category.name}</Badge>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href={getCategoryPath(category)}
                variant="primary"
                size="lg"
                icon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Ver toda la categoría
              </Button>
              <Button href="/catalogo" variant="ghost" size="lg">
                Catálogo completo
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="mb-6 flex flex-col gap-2 border-b border-vtr-black/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm font-semibold text-vtr-black">
              {brandProducts.length} producto
              {brandProducts.length === 1 ? "" : "s"} de {brand.name} en{" "}
              {category.name}
            </p>
            <Link
              href={getCategoryPath(category)}
              className="text-xs font-bold uppercase tracking-[0.1em] text-vtr-green underline-offset-4 hover:underline"
            >
              Ver otras marcas de {category.name}
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {brandProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
