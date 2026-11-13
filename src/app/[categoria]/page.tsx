import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategoryByUrlSegment,
  getCategoryPath,
  getCategoryProductCount,
  getProductBrandPath,
  getProductBrandsByCategory,
  getProductPath,
  getProductsByCategory,
} from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { SearchFilterForm } from "@/components/catalog/search-filter-form";
import {
  CatalogResults,
  CatalogResultsSkeleton,
  FilterSkeleton,
} from "@/components/catalog/catalog-results";

export function generateStaticParams() {
  return categories.map((category) => ({
    categoria: getCategoryPath(category).replace(/^\//, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryByUrlSegment(categoria);

  if (!category) {
    return pageMetadata({
      title: "Categoría no encontrada",
      description: "La categoría solicitada no existe en el catálogo.",
      path: `/${categoria}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${category.name} para motos al mayor`,
    description: `${category.description} Compra al mayor en VTR Import C.A. y cotiza por WhatsApp.`,
    path: getCategoryPath(category),
    image: category.image,
    imageAlt: `Categoría ${category.name} de VTR Import`,
  });
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { categoria } = await params;
  const category = getCategoryByUrlSegment(categoria);

  if (!category) notFound();

  const count = getCategoryProductCount(category.slug);
  const categoryProducts = getProductsByCategory(category.slug);
  const productBrands = getProductBrandsByCategory(category.slug);
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: category.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={itemListJsonLd({
          name: `${category.name} para motos`,
          items: categoryProducts.map((product) => ({
            name: product.name,
            path: getProductPath(product),
          })),
        })}
      />

      <section className="relative isolate overflow-hidden bg-vtr-black text-white">
        <Image
          src={category.image}
          alt={`Categoría ${category.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vtr-black via-vtr-black/80 to-vtr-black/30" />
        <div className="tire-pattern absolute inset-0" aria-hidden="true" />
        <Container className="relative py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <div className="mt-6 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-amber">
              {String(category.order).padStart(2, "0")} / Catálogo
            </p>
            <h1 className="mt-3 text-5xl leading-[0.9] text-white sm:text-6xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {category.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="amber">{count} productos</Badge>
              <Badge variant="light">{category.tagline}</Badge>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="space-y-8">
          <Suspense fallback={<FilterSkeleton />}>
            <SearchFilterForm
              categories={categories.map((item) => ({
                slug: item.slug,
                name: item.name,
              }))}
              fixedCategory={{ slug: category.slug, name: category.name }}
            />
          </Suspense>

          {productBrands.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 border-y border-vtr-black/10 py-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-vtr-gray-dark/70">
                Marcas en {category.name}:
              </span>
              {productBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={getProductBrandPath(category, brand.slug)}
                  className="border border-vtr-black/15 px-2.5 py-1 text-[11px] font-semibold text-vtr-gray-dark transition-colors hover:border-vtr-green hover:text-vtr-green"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          ) : null}

          <Suspense fallback={<CatalogResultsSkeleton />}>
            <CatalogResults searchParams={searchParams} category={category} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
