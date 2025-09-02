import z from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
});

export const createProductValidationSchema = z.object({
  name: z.string().min(2).max(100),
  brand: z.string().min(2).max(100),
  description: z.string().min(2).max(500).optional(),
  price: z.number().min(0),
  category: z.string().min(2).max(100),
  stock: z.number().min(0),
  stars: z.number().min(0).max(5),
  deliveryDate: z.string().datetime(),
  discount: z.number().min(0).max(100),
  saleRate: z.number().min(0).max(5000),
  images: z.array(z.string().min(2).max(100)).optional(),
  banner: z.string().min(2).max(100).optional(),
  isActive: z.boolean().optional(),
});
