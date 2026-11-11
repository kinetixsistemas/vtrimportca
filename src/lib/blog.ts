import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogFrontmatterSchema } from "@/lib/schemas";
import type { BlogPost } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

function readPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDirectory, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = blogFrontmatterSchema.parse(data);
      return { ...frontmatter, slug, content };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const posts = readPosts();

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
