import { z } from "zod";
import { BaseResponseSchema } from "./baseResponse.schema";
import { ProductSchema } from "./product.schema";

export const UserReponseSchema = BaseResponseSchema(z.object(
  {
   name: z.string(),
   email: z.string(),
   favorites: z.array(ProductSchema),
  })
)