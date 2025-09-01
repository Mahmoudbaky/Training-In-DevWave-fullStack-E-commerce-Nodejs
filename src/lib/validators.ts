import z from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
});

export const createProductValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  price: z.number().min(0),
  category: z.string().min(2).max(100),
  image: z.string().min(2).max(100).optional(),
  banner: z.string().min(2).max(100).optional(),
  isActive: z.boolean().optional(),
});
