"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { FilterIcon, SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Option = { slug: string; name: string };
type BrandOption = Option & {
  models: Array<{ slug: string; name: string; years: string }>;
};

type SearchFilterFormProps = {
  categories: Option[];
  brands: BrandOption[];
  fixedCategory?: Option;
};

const inputClasses =
  "h-11 w-full border border-vtr-black/15 bg-white px-3 text-sm text-vtr-black outline-none transition-colors placeholder:text-vtr-black/40 focus:border-vtr-green";

const labelClasses =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark";

export function SearchFilterForm({
  categories,
  brands,
  fixedCategory,
}: SearchFilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(
    fixedCategory?.slug ?? searchParams.get("categoria") ?? "",
  );
  const [brand, setBrand] = useState(searchParams.get("marca") ?? "");
  const [model, setModel] = useState(searchParams.get("modelo") ?? "");

  const selectedBrand = useMemo(
    () => brands.find((item) => item.slug === brand),
    [brands, brand],
  );

  const hasFilters = Boolean(
    q || (!fixedCategory && category) || brand || model,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (!fixedCategory && category) params.set("categoria", category);
    if (brand) params.set("marca", brand);
    if (brand && model) params.set("modelo", model);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });

    trackEvent(q.trim() ? "search_submit" : "filter_apply", {
      query: q.trim(),
      category: fixedCategory?.slug ?? category,
      brand,
      model,
      page: pathname,
    });
  }

  function clearFilters() {
    setQ("");
    setCategory(fixedCategory?.slug ?? "");
    setBrand("");
    setModel("");
    router.push(pathname, { scroll: false });
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      aria-label="Buscar y filtrar productos"
      className="border border-vtr-black/10 bg-white p-4 shadow-sm sm:p-6"
    >
      <div
        className={cn(
          "grid gap-4",
          fixedCategory
            ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
            : "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]",
        )}
      >
        <div>
          <label htmlFor="catalogo-q" className={labelClasses}>
            Buscar producto o referencia
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vtr-black/40" />
            <input
              id="catalogo-q"
              name="q"
              type="search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Ej: cdi cg 150, YUB-REP-004"
              className={cn(inputClasses, "pl-9")}
              autoComplete="off"
            />
          </div>
        </div>

        {!fixedCategory ? (
          <div>
            <label htmlFor="catalogo-categoria" className={labelClasses}>
              Categoría
            </label>
            <select
              id="catalogo-categoria"
              name="categoria"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClasses}
            >
              <option value="">Todas</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label htmlFor="catalogo-marca" className={labelClasses}>
            Marca de moto
          </label>
          <select
            id="catalogo-marca"
            name="marca"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              setModel("");
            }}
            className={inputClasses}
          >
            <option value="">Todas</option>
            {brands.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="catalogo-modelo" className={labelClasses}>
            Modelo
          </label>
          <select
            id="catalogo-modelo"
            name="modelo"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            disabled={!selectedBrand}
            className={cn(inputClasses, !selectedBrand && "opacity-60")}
          >
            <option value="">
              {selectedBrand ? "Todos" : "Elige una marca"}
            </option>
            {selectedBrand?.models.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name} ({item.years})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full lg:w-auto"
            icon={<FilterIcon className="h-4 w-4" />}
          >
            Filtrar
          </Button>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="h-11 shrink-0 px-2 text-xs font-semibold uppercase tracking-[0.1em] text-vtr-gray-dark underline underline-offset-4 hover:text-vtr-green"
            >
              Limpiar
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
