import z from 'zod';
import { BaseResponseSchema } from './baseResponse.schema';
import { PaginationMetaSchema } from './paginationMeta.schema';

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string().url()
})

export const ResponseProductsSchema = BaseResponseSchema(
    ProductSchema.array(),
    PaginationMetaSchema
);
export const ResponseProductSchema = BaseResponseSchema(
    ProductSchema
);
