import { ProductSchema } from '@/schemas/api';
import z from 'zod';
export type Product = z.infer<typeof ProductSchema>;