import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/catalog";
import { getCategoryPath, getCategoryProductCount } from "@/lib/catalog";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/sample-badge";

export function CategoryCard({
  category,
  priority = false,
}: {
  category: Category;
  priority?: boolean;
}) {
  const count = getCategoryProductCount(category.slug);

  return (
    <Link
      href={getCategoryPath(category)}
      className="group relative block h-full overflow-hidden bg-vtr-black focus-visible:outline-offset-4"
    >
      <div className="clip-corner relative h-full min-h-64 overflow-hidden">
        <Image
          src={category.image}
          alt={`Categoría ${category.name}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vtr-black via-vtr-black/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            {String(category.order).padStart(2, "0")} / Catálogo
          </span>
          <SampleBadge isSample={category.isSample} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-vtr-amber">
            {count} referencia{count === 1 ? "" : "s"}
          </p>
          <h3 className="mt-1 text-3xl text-white">{category.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">
            {category.tagline}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
            Ver categoría
            <ArrowUpRightIcon className="h-4 w-4 text-vtr-amber transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
