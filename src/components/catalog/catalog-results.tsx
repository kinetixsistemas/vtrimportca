import type { Category } from "@/types/catalog";
import {
  filterProducts,
  getCategory,
  getCategoryPath,
} from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { EmptyState } from "@/components/catalog/empty-state";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function CatalogResults({
  searchParams,
  category,
}: {
  searchParams: SearchParams;
  category?: Category;
}) {
  const params = await searchParams;
  const q = first(params.q)?.trim();
  const categorySlug = category?.slug ?? first(params.categoria);

  const results = filterProducts({
    q,
    categorySlug,
  });

  const activeFilters = [q ? `“${q}”` : null].filter(Boolean);

  return (
    <div>
      <div
        className="mb-6 flex flex-col gap-1 border-b border-vtr-black/10 pb-4 sm:flex-row sm:items-end sm:justify-between"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-vtr-black">
          {results.length} producto{results.length === 1 ? "" : "s"}
          {category ? ` en ${category.name}` : ""}
        </p>
        {activeFilters.length > 0 ? (
          <p className="text-xs text-vtr-gray-dark">
            Filtros activos: {activeFilters.join(" · ")}
          </p>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((product) => {
            const productCategory = getCategory(product.categorySlug);
            if (!productCategory) return null;
            return (
              <ProductCard
                key={product.id}
                product={product}
                category={productCategory}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          clearHref={category ? getCategoryPath(category) : "/catalogo"}
        />
      )}
    </div>
  );
}

export function CatalogResultsSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse border-b border-vtr-black/10 bg-vtr-black/5" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="clip-corner h-96 animate-pulse bg-white"
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="sr-only">Cargando resultados del catálogo…</span>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div
      className="h-40 animate-pulse border border-vtr-black/10 bg-white sm:h-24"
      aria-hidden="true"
    />
  );
}
