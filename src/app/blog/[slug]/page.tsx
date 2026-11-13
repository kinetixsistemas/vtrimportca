import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import { pageMetadata, breadcrumbJsonLd, blogPostingJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl, generalQuoteMessage } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/blog/blog-card";
import { mdxComponents } from "@/components/blog/mdx-components";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: "Artículo no encontrado",
      description: "El artículo solicitado no existe.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.cover,
    imageAlt: post.coverAlt,
    type: "article",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="border-b border-vtr-black/10 bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 text-4xl leading-[0.95] text-vtr-black sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-vtr-gray-dark sm:text-lg">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.1em] text-vtr-gray-dark/70">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} de lectura</span>
            </div>
          </div>

          <div className="clip-corner relative mt-8 aspect-[16/9] overflow-hidden bg-vtr-gray-light">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <article className="prose prose-vtr max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-vtr-black/10 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-green">
                Guía práctica
              </p>
              <p className="mt-2 text-sm leading-relaxed text-vtr-gray-dark">
                Contenido para repuesteras, talleres y distribuidores que buscan
                mejorar su surtido, su rotación y su operación mayorista.
              </p>
            </div>

            <div className="clip-corner bg-vtr-black p-5 text-white">
              <p className="font-display text-2xl font-extrabold italic">
                ¿Necesitas surtir tu negocio?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Solicita la lista de precios al mayor y recibe atención directa.
              </p>
              <div className="mt-4">
                <Button
                  href={buildWhatsAppUrl(generalQuoteMessage())}
                  external
                  variant="whatsapp"
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                  analyticsEvent="whatsapp_click"
                  analyticsParams={{ source: "blog_sidebar" }}
                >
                  Cotizar por WhatsApp
                </Button>
              </div>
            </div>

            <div className="border border-vtr-black/10 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark/70">
                Sigue explorando
              </p>
              <Link
                href="/catalogo"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-vtr-green underline-offset-4 hover:underline"
              >
                Ver catálogo mayorista
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-vtr-black/10 bg-white py-12 sm:py-16">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-vtr-green">
                  Más artículos
                </p>
                <h2 className="mt-2 text-3xl text-vtr-black sm:text-4xl">
                  Sigue leyendo
                </h2>
              </div>
              <Button
                href="/blog"
                variant="outline"
                icon={<ArrowRightIcon className="h-4 w-4" />}
              >
                Ver blog
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
