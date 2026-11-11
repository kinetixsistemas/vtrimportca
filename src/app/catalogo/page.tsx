import { Suspense } from "react";
import type { Metadata } from "next";
import { categories, brands } from "@/lib/catalog";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { SearchFilterForm } from "@/components/catalog/search-filter-form";
import {
  CatalogResults,
  CatalogResultsSkeleton,
  FilterSkeleton,
} from "@/components/catalog/catalog-results";

export const metadata: Metadata = pageMetadata({
  title: "Catálogo mayorista de repuestos y accesorios para motos",
  description:
    "Explora el catálogo al mayor por categoría, marca y modelo de moto. Repuestos, cauchos, cascos, accesorios, carrocería y baterías. Cotiza por WhatsApp.",
  path: "/catalogo",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo" },
];

export default function CatalogoPage(props: PageProps<"/catalogo">) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-green">
                Catálogo · Atención B2B
              </p>
              <h1 className="mt-3 text-5xl leading-[0.9] text-vtr-black sm:text-6xl">
                Catálogo mayorista
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-vtr-gray-dark sm:text-lg">
                Busca por producto, referencia, marca o modelo de moto. Cada
                ficha incluye compatibilidad y un botón para cotizar por
                WhatsApp. No mostramos precios públicos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">{categories.length} categorías</Badge>
              <Badge variant="outline">Sin precios públicos</Badge>
              <Badge variant="amber">Catálogo referencial</Badge>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="space-y-8">
          <Suspense fallback={<FilterSkeleton />}>
            <SearchFilterForm
              categories={categories.map((category) => ({
                slug: category.slug,
                name: category.name,
              }))}
              brands={brands.map((brand) => ({
                slug: brand.slug,
                name: brand.name,
                models: brand.models,
              }))}
            />
          </Suspense>

          <Suspense fallback={<CatalogResultsSkeleton />}>
            <CatalogResults searchParams={props.searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
