import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { SampleBadge } from "@/components/ui/sample-badge";
import { ArrowRightIcon } from "@/components/ui/icons";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="clip-corner group flex h-full flex-col overflow-hidden border border-vtr-black/10 bg-white">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-vtr-gray-light"
        aria-label={`Leer: ${post.title}`}
      >
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="dark">
              {tag}
            </Badge>
          ))}
          <SampleBadge isSample={post.isSample} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-vtr-gray-dark/70">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} de lectura</span>
        </div>
        <h3 className="mt-3 text-2xl leading-tight text-vtr-black">
          <Link
            href={`/blog/${post.slug}`}
            className="underline-offset-4 hover:text-vtr-green hover:underline"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-vtr-gray-dark">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-vtr-green underline-offset-4 hover:underline"
        >
          Leer artículo
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
