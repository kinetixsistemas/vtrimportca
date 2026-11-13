import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getProductPath } from "@/lib/catalog";
import type { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import type { BlogPost } from "@/types/blog";
import type { Category, Product } from "@/types/catalog";

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/carrucel/siruis-parts-caucho-carrucel.webp",
  imageAlt,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const canonical = path;
  const images = [
    {
      url: image,
      alt: imageAlt ?? title,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "es_VE",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function organizationGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl("/logo-vtr.svg"),
        image: absoluteUrl("/images/carrucel/siruis-parts-caucho-carrucel.webp"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        areaServed: { "@type": "Country", name: "Venezuela" },
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl("/images/carrucel/siruis-parts-caucho-carrucel.webp"),
        logo: absoluteUrl("/logo-vtr.svg"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: siteConfig.city,
          addressCountry: "VE",
        },
        areaServed: { "@type": "Country", name: "Venezuela" },
        parentOrganization: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "es-VE",
        publisher: { "@id": absoluteUrl("/#organization") },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/catalogo?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function productJsonLd(product: Product, category: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery.map((image) => absoluteUrl(image)),
    description: `${product.shortDescription} ${product.description}`,
    brand: { "@type": "Brand", name: product.productBrand },
    category: category.name,
    url: absoluteUrl(getProductPath(product)),
  };
}

export function itemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es-VE",
    image: absoluteUrl(post.cover),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
