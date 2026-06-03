const { z } = require('zod');

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional().or(z.literal('')),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional().default(''),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  category: z.string().min(2),
  image: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string().url()).optional().default([]),
  brand: z.string().optional().default(''),
  stock: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).optional().default(0),
  ratingCount: z.number().int().nonnegative().optional().default(0),
  sku: z.string().optional().default(''),
  specifications: z.object({
    color: z.string().optional().default(''),
    size: z.string().optional().default(''),
    weight: z.string().optional().default(''),
    dimensions: z.string().optional().default(''),
  }).optional(),
  featured: z.boolean().optional().default(false),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
};
