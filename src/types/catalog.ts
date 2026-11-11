import type { z } from "zod";
import type {
  brandSchema,
  categorySchema,
  compatibilitySchema,
  modelSchema,
  productSchema,
  specSchema,
} from "@/lib/schemas";

export type Category = z.infer<typeof categorySchema>;
export type MotorcycleModel = z.infer<typeof modelSchema>;
export type MotorcycleBrand = z.infer<typeof brandSchema>;
export type Compatibility = z.infer<typeof compatibilitySchema>;
export type ProductSpec = z.infer<typeof specSchema>;
export type Product = z.infer<typeof productSchema>;

export type ProductFilters = {
  q?: string;
  categorySlug?: string;
  brandSlug?: string;
  modelSlug?: string;
};

export type CompatibilityGroup = {
  brandName: string;
  models: string[];
};
