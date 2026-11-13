import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type QueryParams = Record<string, string | undefined>;

function buildHref(basePath: string, params: QueryParams, page: number): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }

  if (page > 1) search.set("page", String(page));

  const query = search.toString();
  return `${query ? `${basePath}?${query}` : basePath}#resultados`;
}

const itemClasses =
  "inline-flex h-10 min-w-10 items-center justify-center border border-vtr-black/15 bg-white px-3 text-sm font-semibold text-vtr-black transition-colors hover:border-vtr-green hover:text-vtr-green";

const activeClasses =
  "border-vtr-green bg-vtr-green text-white hover:border-vtr-green hover:text-white";

const disabledClasses = "border-vtr-black/10 text-vtr-black/30";

export function Pagination({
  page,
  totalPages,
  basePath,
  params = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  params?: QueryParams;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginación del catálogo"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={buildHref(basePath, params, page - 1)}
          rel="prev"
          aria-label="Página anterior"
          className={itemClasses}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(itemClasses, disabledClasses)} aria-hidden="true">
          <ChevronLeftIcon className="h-4 w-4" />
        </span>
      )}

      {pages.map((item) => (
        <Link
          key={item}
          href={buildHref(basePath, params, item)}
          aria-label={`Ir a la página ${item}`}
          aria-current={item === page ? "page" : undefined}
          className={cn(itemClasses, item === page && activeClasses)}
        >
          {item}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={buildHref(basePath, params, page + 1)}
          rel="next"
          aria-label="Página siguiente"
          className={itemClasses}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(itemClasses, disabledClasses)} aria-hidden="true">
          <ChevronRightIcon className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
