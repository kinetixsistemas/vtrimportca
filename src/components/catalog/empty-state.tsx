import Link from "next/link";
import { SearchIcon } from "@/components/ui/icons";

export function EmptyState({
  title = "No encontramos productos con esos filtros",
  description = "Prueba con otra palabra, cambia la marca o el modelo, o limpia los filtros para ver todo el catálogo.",
  clearHref = "/catalogo",
}: {
  title?: string;
  description?: string;
  clearHref?: string;
}) {
  return (
    <div className="border border-dashed border-vtr-black/20 bg-white px-6 py-14 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center bg-vtr-gray-light text-vtr-green">
        <SearchIcon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-2xl text-vtr-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-vtr-gray-dark">
        {description}
      </p>
      <Link
        href={clearHref}
        className="mt-6 inline-flex items-center gap-2 border-2 border-vtr-green px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-vtr-green transition-colors hover:bg-vtr-green hover:text-white"
      >
        Ver todo el catálogo
      </Link>
    </div>
  );
}
