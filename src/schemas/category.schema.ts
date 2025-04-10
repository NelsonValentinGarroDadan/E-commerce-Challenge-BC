import z from 'zod';

export const CategirySchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
})