import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "@/types/catalog";
import { getProductPath } from "@/lib/catalog";
import { buildWhatsAppUrl, productQuoteMessage } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SampleBadge } from "@/components/ui/sample-badge";
import {
  ArrowRightIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) {
  const quoteHref = buildWhatsAppUrl(
    productQuoteMessage({
      productName: product.name,
      categoryName: category.name,
    }),
  );

  return (
    <article className="group relative h-full drop-shadow-[0_16px_20px_rgba(11,11,11,0.12)] transition-transform duration-300 hover:-translate-y-1">
      <div className="clip-corner flex h-full flex-col overflow-hidden bg-white">
        <Link
          href={getProductPath(product)}
          className="relative block aspect-square overflow-hidden bg-white"
          aria-label={`Ver ficha de ${product.name}`}
        >
          <Image
            src={product.image}
            alt={`${product.name} — ${product.productBrand}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <Badge variant="dark">{category.name}</Badge>
            <SampleBadge isSample={product.isSample} />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-2xl leading-none text-vtr-black">
            <Link
              href={getProductPath(product)}
              className="transition-colors hover:text-vtr-green"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-vtr-gray-dark">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
            <Button
              href={quoteHref}
              external
              variant="whatsapp"
              size="sm"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              analyticsEvent="quote_click"
              analyticsParams={{
                source: "product_card",
                category: category.slug,
              }}
            >
              Cotizar
            </Button>
            <Link
              href={getProductPath(product)}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-vtr-black underline-offset-4 hover:text-vtr-green hover:underline"
            >
              Ver ficha
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
