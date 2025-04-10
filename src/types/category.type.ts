import { CategorySchema } from '@/schemas/api';
import z from 'zod';

export type Category = z.infer<typeof CategorySchema>