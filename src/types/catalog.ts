import type { z } from "zod";
import type {
  categorySchema,
  productSchema,
  specSchema,
} from "@/lib/schemas";

export type Category = z.infer<typeof categorySchema>;
export type ProductSpec = z.infer<typeof specSchema>;
export type Product = z.infer<typeof productSchema>;

export type ProductFilters = {
  q?: string;
  categorySlug?: string;
};
