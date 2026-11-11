import Link from "next/link";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  tone = "light",
  className,
}: {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <nav aria-label="Ruta de navegación" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "font-medium underline-offset-4 hover:underline",
                    tone === "light"
                      ? "text-vtr-gray-dark hover:text-vtr-green"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-semibold",
                    tone === "light" ? "text-vtr-black" : "text-white",
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-xs",
                    tone === "light" ? "text-vtr-black/35" : "text-white/35",
                  )}
                >
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
