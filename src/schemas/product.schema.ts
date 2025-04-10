import z from 'zod';

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string().url()
})