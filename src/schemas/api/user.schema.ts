import { z } from "zod";
import { BaseResponseSchema } from "./baseResponse.schema";

export const UserReponseSchema = BaseResponseSchema(z.object(
  {
   name: z.string(),
   email: z.string()
  })
)