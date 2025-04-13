import { ProductSchema, ResponseProductSchema, ResponseProductsSchema } from "@/schemas/api/product.schema";
import { z } from "zod";

export type ResponseProducts = z.infer<typeof ResponseProductsSchema>;
export type ResponseProduct = z.infer<typeof ResponseProductSchema>;
export type Product = z.infer<typeof ProductSchema>;