import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/blog/blog-card";
import { EmptyState } from "@/components/catalog/empty-state";

export const metadata: Metadata = pageMetadata({
  title: "Blog para el comercio de repuestos de motos",
  description:
    "Ideas, guías y criterios para repuesteras, talleres y distribuidores de motos. Contenido sobre surtido, rotación, logística y ventas B2B.",
  path: "/blog",
});

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Blog" },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-green">
              Blog
            </p>
            <h1 className="mt-3 text-5xl leading-[0.9] text-vtr-black sm:text-6xl">
              Ideas para vender mejor
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-vtr-gray-dark sm:text-lg">
              Contenido práctico para negocios que viven del mercado de motos.
              Artículos de ejemplo para demostrar la estructura del blog.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Todavía no hay artículos"
              description="Cuando publiquemos contenido, aparecerá aquí."
            />
          )}
        </Container>
      </section>

      <section className="border-t border-vtr-black/10 bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading
            eyebrow="Contenido de demostración"
            title="Artículos de ejemplo"
            description="Los textos del blog son ficticios y sirven para validar el diseño. Reemplázalos por contenido real antes de publicar."
          />
          <div className="text-sm text-vtr-gray-dark">
            <p className="font-semibold text-vtr-black">¿Quieres proponer un tema?</p>
            <p className="mt-1">Escríbenos y lo evaluamos con el equipo.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
