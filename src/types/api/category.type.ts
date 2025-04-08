import { CategorySchema, ResponseCategorySchema } from "@/schemas/api/index";
import { z } from "zod";

export type ResponseCategory = z.infer<typeof ResponseCategorySchema>;
export type Category = z.infer<typeof CategorySchema>;