"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { FilterIcon, SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Option = { slug: string; name: string };

type SearchFilterFormProps = {
  categories: Option[];
  fixedCategory?: Option;
};

const inputClasses =
  "h-11 w-full border border-vtr-black/15 bg-white px-3 text-sm text-vtr-black outline-none transition-colors placeholder:text-vtr-black/40 focus:border-vtr-green";

const labelClasses =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark";

export function SearchFilterForm({
  categories,
  fixedCategory,
}: SearchFilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(
    fixedCategory?.slug ?? searchParams.get("categoria") ?? "",
  );

  const hasFilters = Boolean(q || (!fixedCategory && category));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (!fixedCategory && category) params.set("categoria", category);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });

    trackEvent(q.trim() ? "search_submit" : "filter_apply", {
      query: q.trim(),
      category: fixedCategory?.slug ?? category,
      page: pathname,
    });
  }

  function clearFilters() {
    setQ("");
    setCategory(fixedCategory?.slug ?? "");
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
            ? "sm:grid-cols-[minmax(0,1fr)_auto]"
            : "sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]",
        )}
      >
        <div>
          <label htmlFor="catalogo-q" className={labelClasses}>
            Buscar producto
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vtr-black/40" />
            <input
              id="catalogo-q"
              name="q"
              type="search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Ej: cdi cg 150, caucho nitron"
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
