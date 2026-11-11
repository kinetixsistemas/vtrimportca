import { z } from "zod";

export const categorySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  image: z.string().startsWith("/"),
  order: z.number().int().nonnegative(),
  isSample: z.boolean(),
});

export const modelSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  years: z.string().min(1),
});

export const brandSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  isSample: z.boolean(),
  models: z.array(modelSchema).min(1),
});

export const specSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const compatibilitySchema = z.object({
  brandSlug: z.string().min(1),
  modelSlugs: z.array(z.string().min(1)).min(1),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  categorySlug: z.string().min(1),
  name: z.string().min(1),
  reference: z.string().min(1),
  productBrand: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  image: z.string().startsWith("/"),
  gallery: z.array(z.string().startsWith("/")).min(1),
  specs: z.array(specSchema).min(1),
  compatibility: z.array(compatibilitySchema),
  featured: z.boolean(),
  isSample: z.boolean(),
  tags: z.array(z.string().min(1)),
});

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().min(1),
  cover: z.string().startsWith("/"),
  coverAlt: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  readingTime: z.string().min(1),
  isSample: z.boolean(),
});
