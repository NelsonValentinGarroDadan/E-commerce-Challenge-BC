import { ProductSchema, ResponseProductSchema } from "@/schemas/api/product.schema";
import { z } from "zod";

export type ResponseProduct = z.infer<typeof ResponseProductSchema>;
export type Product = z.infer<typeof ProductSchema>;