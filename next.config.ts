import type { NextConfig } from "next";

const categorySlugs = [
  "repuestos",
  "cauchos",
  "cascos",
  "accesorios",
  "carroceria",
  "baterias",
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/terminos",
        destination: "/legales#terminos",
        permanent: true,
      },
      {
        source: "/privacidad",
        destination: "/legales#privacidad",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/legales#cookies",
        permanent: true,
      },
      ...categorySlugs.flatMap((slug) => [
        {
          source: `/${slug}`,
          destination: `/${slug}-motos`,
          statusCode: 301,
        },
        {
          source: `/catalogo/${slug}`,
          destination: `/${slug}-motos`,
          statusCode: 301,
        },
        {
          source: `/catalogo/${slug}/:producto`,
          destination: "/productos/:producto",
          statusCode: 301,
        },
      ]),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
