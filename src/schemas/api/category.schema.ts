import z from 'zod'
import { BaseResponseSchema } from './baseResponse.schema';

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
});

export const ResponseCategorySchema = BaseResponseSchema(z.array(CategorySchema))