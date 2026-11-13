import categoriesJson from "@/data/categories.json";
import productsJson from "@/data/products.json";
import { categorySchema, productSchema } from "@/lib/schemas";
import type { Category, Product, ProductFilters } from "@/types/catalog";

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Catálogo: ${label} duplicado "${value}".`);
    }
    seen.add(value);
  }
}

const parsedCategories = categorySchema.array().parse(categoriesJson);
const parsedProducts = productSchema.array().parse(productsJson);

assertUnique(
  parsedCategories.map((category) => category.slug),
  "slug de categoría",
);
assertUnique(
  parsedProducts.map((product) => product.slug),
  "slug de producto",
);

const categoryBySlug = new Map(parsedCategories.map((c) => [c.slug, c]));

for (const product of parsedProducts) {
  if (!categoryBySlug.has(product.categorySlug)) {
    throw new Error(
      `Catálogo: el producto "${product.slug}" apunta a la categoría inexistente "${product.categorySlug}".`,
    );
  }
}

export const categories: Category[] = [...parsedCategories].sort(
  (a, b) => a.order - b.order,
);

export const products: Product[] = parsedProducts;

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_URL_SUFFIX = "-motos";

export function getCategoryPath(category: Category | string): string {
  const slug = typeof category === "string" ? category : category.slug;
  return `/${slug}${CATEGORY_URL_SUFFIX}`;
}

export function getCategoryByUrlSegment(segment: string): Category | undefined {
  if (!segment.endsWith(CATEGORY_URL_SUFFIX)) return undefined;
  return getCategory(segment.slice(0, -CATEGORY_URL_SUFFIX.length));
}

export function getProductPath(product: Product | string): string {
  const slug = typeof product === "string" ? product : product.slug;
  return `/productos/${slug}`;
}

export function getProductBySlugAny(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductBrandSlug(product: Product): string {
  return slugify(product.productBrand);
}

export type ProductBrandSummary = {
  slug: string;
  name: string;
  count: number;
};

export function getProductBrandsByCategory(
  categorySlug: string,
): ProductBrandSummary[] {
  const brands = new Map<string, ProductBrandSummary>();

  for (const product of products) {
    if (product.categorySlug !== categorySlug) continue;
    const slug = getProductBrandSlug(product);
    const current = brands.get(slug);
    if (current) {
      current.count += 1;
    } else {
      brands.set(slug, {
        slug,
        name: product.productBrand,
        count: 1,
      });
    }
  }

  return [...brands.values()].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function getProductBrandBySlug(
  categorySlug: string,
  brandSlug: string,
): ProductBrandSummary | undefined {
  return getProductBrandsByCategory(categorySlug).find(
    (brand) => brand.slug === brandSlug,
  );
}

export function getProductsByCategoryAndBrand(
  categorySlug: string,
  brandSlug: string,
): Product[] {
  return products
    .filter(
      (product) =>
        product.categorySlug === categorySlug &&
        getProductBrandSlug(product) === brandSlug,
    )
    .sort(sortProducts);
}

export function getProductBrandPath(
  category: Category | string,
  brandSlug: string,
): string {
  const slug = typeof category === "string" ? category : category.slug;
  return `/${slug}/${brandSlug}`;
}

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products
    .filter((product) => product.categorySlug === categorySlug)
    .sort(sortProducts);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products
    .filter((product) => product.featured)
    .sort(sortProducts)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      let score = candidate.categorySlug === product.categorySlug ? 3 : 0;
      score += candidate.tags.filter((tag) => product.tags.includes(tag)).length;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || sortProducts(a.candidate, b.candidate))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getCategoryProductCount(categorySlug: string): number {
  return products.filter((product) => product.categorySlug === categorySlug)
    .length;
}

export function filterProducts(filters: ProductFilters): Product[] {
  const query = filters.q ? normalizeText(filters.q) : "";
  const tokens = query.split(/\s+/).filter(Boolean);

  return products
    .filter((product) => {
      if (filters.categorySlug && product.categorySlug !== filters.categorySlug) {
        return false;
      }

      if (tokens.length > 0) {
        const haystack = normalizeText(buildSearchHaystack(product));
        if (!tokens.every((token) => haystack.includes(token))) return false;
      }

      return true;
    })
    .sort(sortProducts);
}

function buildSearchHaystack(product: Product): string {
  const category = getCategory(product.categorySlug);
  return [
    product.name,
    product.productBrand,
    product.shortDescription,
    product.description,
    product.tags.join(" "),
    category?.name ?? "",
  ].join(" ");
}

function sortProducts(a: Product, b: Product): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return a.name.localeCompare(b.name, "es");
}

export function getCatalogStats() {
  return {
    products: products.length,
    categories: categories.length,
    brands: new Set(products.map((product) => product.productBrand)).size,
  };
}
